import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

/**
 * Root component of the Angular application.
 * Manages the overall structure and layout, including internationalization setup.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Peter Pfautsch';

  /**
   * Initializes the translation service and configures the default language.
   * Automatically detects and applies the user's preferred language if supported.
   *
   * @param {TranslateService} translate - Service for managing translations and languages.
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

   /**
   * Switches the language of the application using the TranslateService.
   * 
   * @param {Event} event The event object triggered by the language switch.
   * @param {string} language The language to switch to.
   */
   useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }

  /**
   * Retrieves the current language for display or further processing.
   * 
   * @returns {string} The current language of the application.
   */
  get currentLanguage(): string {
    return this.translate.currentLang;
  }
}
