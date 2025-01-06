import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Navbar component that provides navigation and language switch functionality.
 * This component includes a menu toggle and scroll behavior for smooth navigation to sections.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuOpen: boolean = false;

  /**
   * Initializes the translation service and sets default language to English.
   *
   * @param {TranslateService} translate - Service for managing translations and languages.
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Toggles the state of the navigation menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Switches the application language.
   *
   * @param {Event} event - The DOM event triggered by user interaction.
   * @param {string} language - The language code to switch to.
   */
  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }

  /**
   * Smoothly scrolls to the specified section on the page.
   *
   * @param {Event} event - The DOM event triggered by user interaction.
   * @param {string} sectionId - The ID of the section to scroll to.
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
}
