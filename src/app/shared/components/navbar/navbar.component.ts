import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * Navbar component that provides navigation and language switch functionality.
 * This component includes a menu toggle and scroll behavior for smooth navigation to sections.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})

export class NavbarComponent {
  menuOpen: boolean = false;

  constructor(private translate: TranslateService) {}

  /**
   * Toggles the state of the navigation menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Switches the language using the TranslateService.
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
  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
