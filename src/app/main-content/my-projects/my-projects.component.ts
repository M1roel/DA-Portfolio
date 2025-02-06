import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * MyProjectsComponent displays a list of projects with relevant details such as stack, description, and links to GitHub and live demos.
 */
@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent implements AfterViewInit {

  @ViewChildren('project') projectElements!: QueryList<ElementRef>;

  /**
   * Constructor for initializing the component and setting up the render service.
   * 
   *
   * @param {Renderer2} renderer The Renderer2 service used for DOM manipulation.
   */
  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.projectElements.forEach((project) => {
      observer.observe(project.nativeElement);
    });
  }

  /**
   * Array of projects to be displayed in the component.
   */
  projects = [
    {
      name: 'CRM (work in progress)',
      stack: 'Angular | SCSS | Firebase | Material Design',
      descriptionKey: 'PROJECTS.DESCRIPTION_CRM',
      image: '../../../assets/img/crm.jpg',
      github: 'https://github.com/M1roel/simplecrm',
      liveDemo: 'http://crm.peterpfautsch.de/'
    },
    {
      name: 'JOIN',
      stack: 'HTML | CSS | JavaScript | Firebase',
      descriptionKey: 'PROJECTS.DESCRIPTION_JOIN',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/M1roel/DA-Join',
      liveDemo: 'http://join.peterpfautsch.de/public/index.html'
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
      name: 'Pokedex',
      stack: 'HTML | CSS | JAVASCRIPT | Rest-API',
      descriptionKey: 'PROJECTS.DESCRIPTION_POKEDEX',
      image: '../../../assets/img/pokedex-project.png',
      github: 'https://github.com/M1roel/DA-Pokedex',
      liveDemo: 'http://pokedex.peterpfautsch.de/'
    }
  ];
}
