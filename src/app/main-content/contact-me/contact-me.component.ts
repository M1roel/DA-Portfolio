import { CommonModule, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * ContactMeComponent is the component for handling the contact form and submission.
 */
@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {
  http = inject(HttpClient);
  privacyChecked: boolean = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;
  nameError: string = '';
  emailError: string = '';
  messageError: string = '';

  post = {
    endPoint: 'https://peterpfautsch.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Validates the input fields for the contact form.
   * 
   * @returns {Promise<boolean>} Returns true if all inputs are valid, otherwise false.
   */
  async validateInputs(): Promise<boolean> {
    const isNameValid = this.checkName();
    const isEmailValid = this.checkEmail();
    const isMessageValid = this.checkMessage();

    const results = await Promise.all([isNameValid, isEmailValid, isMessageValid]);

    return results.every((result) => result === true);
  }

  /**
   * Checks if the name input is valid.
   * 
   * @returns {Promise<boolean>} Returns true if the name is valid, otherwise false.
   */
  async checkName(): Promise<boolean> {
    const namePattern = /^[A-Za-z]{3,}$/;
    const nameInput = document.getElementById('name') as HTMLInputElement;

    if (!namePattern.test(this.contactData.name)) {
      this.nameError = 'Your name is required';
      nameInput.classList.add('input-error');
      nameInput.classList.remove('input-done');
      return false;
    } else {
      this.nameError = '';
      nameInput.classList.remove('input-error');
      nameInput.classList.add('input-done');
      return true;
    }
  }

  /**
   * Checks if the email input is valid.
   * 
   * @returns {Promise<boolean>} Returns true if the email is valid, otherwise false.
   */
  async checkEmail(): Promise<boolean> {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    if (!emailPattern.test(this.contactData.email)) {
      this.emailError = 'Your Email is required';
      emailInput.classList.add('input-error');
      return false;
    } else {
      this.emailError = '';
      emailInput.classList.remove('input-error');
      return true;
    }
  }

  /**
   * Checks if the message input is valid.
   * 
   * @returns {Promise<boolean>} Returns true if the message is valid, otherwise false.
   */
  async checkMessage(): Promise<boolean> {
    const wordCount = this.contactData.message.trim().split(/\s+/).length;
    const messageInput = document.getElementById('message') as HTMLInputElement;
    if (wordCount < 4) {
      this.messageError = 'Your message is required';
      return false;
    } else {
      this.messageError = '';
      messageInput.classList.remove('input-error');
      return true;
    }
  }

  /**
   * Handles the form submission.
   * 
   * @param {NgForm} ngForm The Angular form object.
   */
  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted) {
      const isFormValid = await this.validateInputs();
      if (isFormValid && !this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: (response) => {
              this.showSuccessMessage();
              ngForm.resetForm();
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.info('send post complete'),
          });
      } else if (isFormValid && this.mailTest) {
        alert('Mail test is active. Form not sent.');
        ngForm.resetForm();
      }
    }
  }

  /**
   * Displays a success message after the form is successfully submitted.
   */
  showSuccessMessage() {
    const successMessageElement = document.getElementById('success-message');
    if (successMessageElement) {
      successMessageElement.style.display = 'block';
      setTimeout(() => {
        successMessageElement.style.display = 'none';
      }, 2000);
    }
  }

  icons = [
    {
      url: 'https://github.com/M1roel',
      image: '../../../../assets/img/github_button.png',
      originalImage: '../../../../assets/img/github_button.png',
      alt: 'GitHub',
      hoverImage: '../../../../assets/img/github_button_hover.png',
    },
    {
      url: 'mailto:p.pfautsch@arcor.de',
      image: '../../../../assets/img/email_button.png',
      originalImage: '../../../../assets/img/email_button.png',
      alt: 'Email',
      hoverImage: '../../../../assets/img/email_button_hover.png',
    },
    {
      url: 'https://www.linkedin.com/in/peter-pfautsch-379bb62aa/',
      image: '../../../../assets/img/linkedin_button.png',
      originalImage: '../../../../assets/img/linkedin_button.png',
      alt: 'LinkedIn',
      hoverImage: '../../../../assets/img/linkedin_button_hover.png',
    },
  ];

  /**
   * Handles the hover event on the social media icons, changing the icon image.
   * 
   * @param {any} icon The icon object that is being hovered.
   */
  onHover(icon: any) {
    icon.image = icon.hoverImage;
  }

  /**
   * Handles the leave event on the social media icons, reverting the icon image.
   * 
   * @param {any} icon The icon object that is being hovered out.
   */
  onLeave(icon: any) {
    icon.image = icon.originalImage;
  }

  /**
   * Constructor for initializing the component with language and viewport settings.
   * 
   * @param {TranslateService} translate The translation service.
   * @param {ViewportScroller} viewportScroller The viewport scroller service.
   */
  constructor(private translate: TranslateService, private viewportScroller: ViewportScroller) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Changes the language of the application.
   * 
   * @param {Event} event The event object triggered by the language switch.
   * @param {string} language The language to switch to.
   */
  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}
