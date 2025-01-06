import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Footer component that displays social media links and handles language switching.
 * This component also dynamically displays the current year.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  /**
   * Returns the current year dynamically.
   * @returns {number} - The current year.
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Array of icons for social media and contact links.
   */
  icons = [
    { 
      url: 'https://github.com/M1roel', 
      image: '../../../../assets/img/github_button.png',
      originalImage: '../../../../assets/img/github_button.png',
      alt: 'GitHub', 
      hoverImage: '../../../../assets/img/github_button_hover.png' 
    },
    { 
      url: 'mailto:p.pfautsch@arcor.de', 
      image: '../../../../assets/img/email_button.png',
      originalImage: '../../../../assets/img/email_button.png',
      alt: 'Email', 
      hoverImage: '../../../../assets/img/email_button_hover.png' 
    },
    { 
      url: 'https://www.linkedin.com/in/peter-pfautsch-379bb62aa/', 
      image: '../../../../assets/img/linkedin_button.png',
      originalImage: '../../../../assets/img/linkedin_button.png',
      alt: 'LinkedIn', 
      hoverImage: '../../../../assets/img/linkedin_button_hover.png' 
    }
  ];

  /**
   * Changes the icon image to its hover state.
   * @param {any} icon - The icon object to modify.
   */
  onHover(icon: any) {
    icon.image = icon.hoverImage;
  }

  /**
   * Resets the icon image to its original state.
   * @param {any} icon - The icon object to modify.
   */
  onLeave(icon: any) {
    icon.image = icon.originalImage;
  }

  /**
   * Initializes the translation service and sets the default language.
   * @param {TranslateService} translate - Service for managing translations.
   */
  constructor(private translate: TranslateService) {
      this.translate.addLangs(['de', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  
    /**
     * Switches the application language.
     * @param {Event} event - The DOM event triggered by the language change action.
     * @param {string} language - The language code to switch to.
     */
    useLanguage(event: Event, language: string): void {
      event.preventDefault();
      this.translate.use(language);
    }
}
