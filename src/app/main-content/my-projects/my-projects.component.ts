import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  projects = [
    {
      name: 'JOIN',
      stack: 'HTML | CSS | JavaScript | Firebase',
      descriptionKey: 'PROJECTS.DESCRIPTION_JOIN',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/M1roel/DA-Join',
      liveDemo: 'http://join.peterpfautsch.de/'
    },
    {
      name: 'Sharkie',
      stack: 'HTML | CSS | JavaScript',
      descriptionKey: 'PROJECTS.DESCRIPTION_SHARKIE',
      image: '../../../assets/img/sharkie-project.png',
      github: 'https://github.com/M1roel/DA-Sharkie',
      liveDemo: 'http://sharkie.peterpfautsch.de/'
    },
    {
      name: 'CRM',
      stack: 'Angular | TypeScript | SCSS | Firebase',
      descriptionKey: 'PROJECTS.DESCRIPTION_CRM',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/project3',
      liveDemo: 'https://live-demo3.com'
    }
  ];

  constructor(private translate: TranslateService) {
      this.translate.addLangs(['de', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  
    useLanguage(event: Event, language: string): void {
      event.preventDefault();
      this.translate.use(language);
    }
}
