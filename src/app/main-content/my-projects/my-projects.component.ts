import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  projects = [
    {
      name: 'JOIN',
      stack: 'HTML | CSS | JavaScript | Firebase',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/M1roel/DA-Join',
      liveDemo: 'https://live-demo1.com'
    },
    {
      name: 'Sharkie',
      stack: 'HTML | CSS | JavaScript',
      description: 'Jump, run and throw game based on object-oriented approach. Help Sharkie to find coins and poisoned bottles to fight against the crazy orca.',
      image: '../../../assets/img/sharkie-project.png',
      github: 'https://github.com/M1roel/DA-Sharkie',
      liveDemo: 'https://live-demo2.com'
    },
    {
      name: 'CRM',
      stack: 'Angular | TypeScript | SCSS | Firebase',
      description: 'A CRM (Customer Relationship Management) system manages customer interactions, streamlines sales, and enhances customer service through data organization and communication tracking.',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/project3',
      liveDemo: 'https://live-demo3.com'
    }
  ];
}
