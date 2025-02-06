import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
export class ContactMeComponent implements AfterViewInit {
  @ViewChild('contactMe') contactMeElement!: ElementRef;

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
    const nameValue = this.contactData.name.trim();
    if (nameValue.length < 3) {
      this.nameError = this.translate.instant('CONTACT.FORM.NAME_TOO_SHORT');
      return false;
    }
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(nameValue)) {
      this.nameError = this.translate.instant(
        'CONTACT.FORM.NAME_INVALID_CHARACTERS'
      );
      return false;
    }
    this.nameError = '';
    return true;
  }

  /**
   * Checks if the email input is valid.
   *
   * @returns {Promise<boolean>} Returns true if the email is valid, otherwise false.
   */
  async checkEmail(): Promise<boolean> {
    const emailValue = this.contactData.email;
    if (!emailValue.includes('@')) {
      this.emailError = this.translate.instant('CONTACT.FORM.EMAIL_MISSING_AT');
      return false;
    }
    const [localPart, domainPart] = emailValue.split('@');
    if (!localPart || !domainPart) {
      this.emailError = this.translate.instant('CONTACT.FORM.EMAIL_INCOMPLETE');
      return false;
    }
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainPattern.test(domainPart)) {
      this.emailError = this.translate.instant(
        'CONTACT.FORM.EMAIL_INVALID_DOMAIN'
      );
      return false;
    }
    this.emailError = '';
    return true;
  }

  /**
   * Checks if the message input is valid.
   *
   * @returns {Promise<boolean>} Returns true if the message is valid, otherwise false.
   */
  async checkMessage(): Promise<boolean> {
    const messagePattern = /^([\wäöüÄÖÜß,.!?]+(\s|$)){4,}$/; // Mindestens 4 Wörter
    if (!messagePattern.test(this.contactData.message.trim())) {
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
      }, 3500);
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
  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.translate = translate;
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wenn das Element sichtbar wird, wird die 'visible' Klasse hinzugefügt
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target); // Stoppe das Beobachten, sobald das Element sichtbar ist
          }
        });
      },
      { threshold: 0.1 }
    );

    // Beobachte das contact-me Element
    if (this.contactMeElement) {
      observer.observe(this.contactMeElement.nativeElement);
    }
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
