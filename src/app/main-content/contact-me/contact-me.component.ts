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
  translate = inject(TranslateService);

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

    const results = await Promise.all([
      isNameValid,
      isEmailValid,
      isMessageValid,
    ]);

    return results.every((result) => result === true);
  }

  /**
   * Checks if the name input is valid.
   *
   * @returns {Promise<boolean>} Returns true if the name is valid, otherwise false.
   */
  async checkName(): Promise<boolean> {
    const namePattern = /^[A-Za-z\s]{3,}$/;
    if (!namePattern.test(this.contactData.name)) {
      this.nameError = this.translate.instant('CONTACT.FORM.NAME_HINT');
      return false;
    } else {
      this.nameError = '';
      return true;
    }
  }

  /**
   * Checks if the email input is valid.
   *
   * @returns {Promise<boolean>} Returns true if the email is valid, otherwise false.
   */
  async checkEmail(): Promise<boolean> {
    const allowedDomains = [
      'com', 'org', 'net', 'int', 'edu', 'gov', 'mil', 'co', 'me', 'de', 'uk', 'eu', 'us', 'ca', 'au', 'co.uk',
      'ac.uk', 'gov.uk', 'edu.au', 'jp', 'fr', 'it', 'es', 'cn', 'ru', 'in', 'br', 'pl', 'ch', 'nl', 'se', 'no',
      'fi', 'dk', 'at', 'be', 'cz', 'hu', 'sk', 'bg', 'ro', 'tr', 'il', 'kr', 'ae', 'sa', 'za', 'mx', 'cl', 'co.il',
      'co.in', 'co.kr', 'co.jp', 'gov.in', 'gov.cn', 'gov.sa', 'edu.cn', 'edu.tr', 'edu.in', 'edu.co', 'edu.pk',
      'ws', 'tv', 'asia', 'mobi', 'tel', 'coop', 'aero', 'pro', 'cat', 'eus', 'xxx', 'college', 'church', 'museum'
    ];

    const emailPattern = new RegExp(
      `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(?:${allowedDomains.join('|')})$`
    );

    if (!emailPattern.test(this.contactData.email)) {
      this.emailError = this.translate.instant('CONTACT.FORM.EMAIL_HINT');
      return false;
    } else {
      this.emailError = '';
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
    if (wordCount < 4) {
      this.messageError = this.translate.instant('CONTACT.FORM.MESSAGE_HINT');
      return false;
    } else {
      this.messageError = '';
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
      } else if (!isFormValid) {
        this.resetFormWithErrors();
      } else if (this.mailTest) {
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

  /**
    * Resets the form and displays error messages.
    */
  resetFormWithErrors() {
    // Nur die Felder zurücksetzen, die Fehler haben
    if (!this.contactData.name || this.nameError) {
      this.contactData.name = '';
    }
    if (!this.contactData.email || this.emailError) {
      this.contactData.email = '';
    }
    if (!this.contactData.message || this.messageError) {
      this.contactData.message = '';
    }
  
    // Setze die Fehlernachrichten nur, wenn die Felder ungültig sind
    this.nameError = this.contactData.name
      ? this.nameError
      : this.translate.instant('CONTACT.FORM.NAME_HINT');
    this.emailError = this.contactData.email
      ? this.emailError
      : this.translate.instant('CONTACT.FORM.EMAIL_HINT');
    this.messageError = this.contactData.message
      ? this.messageError
      : this.translate.instant('CONTACT.FORM.MESSAGE_HINT');
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
  constructor(private viewportScroller: ViewportScroller) {
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
