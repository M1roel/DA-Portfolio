import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  mailTest = true;
  nameError: string = '';
  emailError: string = '';
  messageError: string = '';

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

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

  async checkName(): Promise<boolean> {
    const namePattern = /^[A-Za-z]{3,}$/;
    const nameInput = document.getElementById('name') as HTMLInputElement;

    if (!namePattern.test(this.contactData.name)) {
      this.nameError = 'Your name is required.';
      nameInput.classList.add('input-error');
      return false;
    } else {
      this.nameError = '';
      nameInput.classList.remove('input-error');
      return true;
    }
  }

  async checkEmail(): Promise<boolean> {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    if (!emailPattern.test(this.contactData.email)) {
      this.emailError = 'Your Email is required';
      emailInput.classList.add('input.error');
      return false;
    } else {
      this.emailError = '';
      emailInput.classList.remove('input-error');
      return true;
    }
  }

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

  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted) {
      const isFormValid = await this.validateInputs();
      if (isFormValid && !this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: (response) => {
              alert('Message sent successfully!');
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
}
