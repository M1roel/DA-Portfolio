import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * SaidAboutMeComponent displays testimonials or feedback from people about the user's projects.
 */
@Component({
  selector: 'app-said-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './said-about-me.component.html',
  styleUrl: './said-about-me.component.scss'
})
export class SaidAboutMeComponent {

  /**
   * Array of testimonials, each containing the name of the person, their project, and a description key for translation.
   */
  abouts = [
    {
      name: 'Dennis',
      project: 'JOIN',
      descriptionKey: 'ABOUT.DESCRIPTION_DENNIS'
    },
    {
      name: 'Benjamin',
      project: 'JOIN',
      descriptionKey: 'ABOUT.DESCRIPTION_BENJAMIN'
    },
    {
      name: 'Borna',
      project: 'Kochwelt',
      descriptionKey: 'ABOUT.DESCRIPTION_BORNA'
    }
  ];

  /**
   * Constructor for initializing the SaidAboutMeComponent and setting up the translation service.
   * 
   * @param {TranslateService} translate The translation service used for managing languages.
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Changes the language of the application.
   * 
   * @param {Event} event The event object triggered by the language switch.
   * @param {string} language The language to switch to (e.g., 'en' for English).
   */
  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}
