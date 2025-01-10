import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor() {}
}
