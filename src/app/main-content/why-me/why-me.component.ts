import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * WhyMeComponent is responsible for providing information about why the user should be chosen for a particular role or task.
 */
@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss'
})
export class WhyMeComponent {

  /**
   * Constructor for initializing the WhyMeComponent and setting up the translation service.
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
