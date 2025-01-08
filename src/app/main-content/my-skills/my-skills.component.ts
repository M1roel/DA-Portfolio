import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * MySkillsComponent displays a list of skills with their respective icons and handles language switching.
 */
@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {

  /**
   * Array of skills with associated image icons to be displayed in the component.
   */
  skills = [
    { name: 'Angular', img: '../../../assets/img/angular-icon.png' },
    { name: 'TypeScript', img: '../../../assets/img/typescript-icon.png' },
    { name: 'JavaScript', img: '../../../assets/img/javascript-icon.png' },
    { name: 'HTML', img: '../../../assets/img/html-icon.png' },
    { name: 'CSS', img: '../../../assets/img/css-icon.png' },
    { name: 'Rest-Api', img: '../../../assets/img/api-icon.png' },
    { name: 'Firebase', img: '../../../assets/img/firebase-icon.png' },
    { name: 'GIT', img: '../../../assets/img/git-icon.png' },
    { name: 'Scrum', img: '../../../assets/img/scrum-icon.png' },
    { name: 'Material design', img: '../../../assets/img/materialdesign-icon.png' },
    { name: 'Python', img: '../../../assets/img/python-icon.png' },
    { name: 'Linux', img: '../../../assets/img/linux-icon.png' },
    { name: 'Flask', img: '../../../assets/img/flask-icon.png' },
    { name: 'Challenge me', img: '../../../assets/img/challenge-icon.png' }
  ];


  /**
   * Flag to determine if the tooltip is visible.
   */
  tooltipVisible: boolean = false;

  /**
   * Displays a tooltip when the 'Challenge me' skill is hovered.
   * 
   * @param {string} skillName The name of the skill for which the tooltip is to be displayed.
   */
  tooltipX: number = 0;
  tooltipY: number = 0;

  showTooltip(skillName: string, event: MouseEvent) {
    if (skillName === 'Challenge me') {
      this.tooltipVisible = true;
      this.tooltipX = event.clientX + 20; // 10px rechts der Maus
      this.tooltipY = event.clientY - 50; // 10px unter der Maus
    }
  }

  /**
   * Hides the tooltip.
   */
  hideTooltip() {
    this.tooltipVisible = false;
  }

  /**
   * Constructor for initializing the MySkillsComponent and setting up the translation service.
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
