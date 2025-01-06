import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * HeroSectionComponent represents the hero section of the application and handles language switching and smooth scrolling.
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

  /**
   * Smoothly scrolls the page to a specified section.
   * 
   * @param {Event} event The event object triggered by the action (e.g., button click).
   * @param {string} sectionId The ID of the section to scroll to.
   */
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  /**
   * Constructor for initializing the HeroSectionComponent and setting up translation languages.
   * 
   * @param {TranslateService} translate The translation service used to handle language changes.
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Switches the language of the application.
   * 
   * @param {Event} event The event object triggered by the language switch.
   * @param {string} language The language to switch to.
   */
  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}
