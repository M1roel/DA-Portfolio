import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * MySkillsComponent displays a list of skills with their respective icons and 
 * provides functionality for language switching and tooltip display.
 */
@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent implements OnInit {

  /**
   * Array of skills with their names and corresponding image paths.
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
   * Indicates whether the tooltip is visible or not.
   */
  tooltipVisible: boolean = false;

  /**
   * X-coordinate position of the tooltip.
   */
  tooltipX: number = 0;

  /**
   * Y-coordinate position of the tooltip.
   */
  tooltipY: number = 0;

  /**
   * Constructs the MySkillsComponent and initializes the translation service.
   * 
   * @param {ElementRef} el Reference to the DOM element associated with this component.
   * @param {TranslateService} translate Service for managing translations and language switching.
   */
  constructor(private el: ElementRef, private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Sets up an IntersectionObserver to trigger animations when the element becomes visible.
   */
  ngOnInit() {
    const element = this.el.nativeElement.querySelector('.skills');
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
    } else {
      console.error('.skills element not found!');
    }
  }

  /**
   * Displays a tooltip when the "Challenge me" skill is hovered.
   * 
   * @param {string} skillName The name of the skill being hovered.
   * @param {MouseEvent} event The mouse event triggered by hovering.
   */
  showTooltip(skillName: string, event: MouseEvent) {
    if (skillName === 'Challenge me') {
      this.tooltipVisible = true;
      this.tooltipX = event.clientX - 100;
      this.tooltipY = event.clientY - 100;
    }
  }

  /**
   * Hides the tooltip.
   */
  hideTooltip() {
    this.tooltipVisible = false;
  }

  /**
   * Changes the current language of the application.
   * 
   * @param {Event} event The event triggered by the language switch action.
   * @param {string} language The language to switch to (e.g., 'en' for English).
   */
  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}
