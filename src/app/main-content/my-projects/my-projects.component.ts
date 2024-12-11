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
      stack: 'HTML, CSS, JavaScript',
      description: 'A description of Project 1.',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/project1',
      liveDemo: 'https://live-demo1.com'
    },
    {
      name: 'Sharkie',
      stack: 'HTML, CSS, JavaScript',
      description: 'A description of Project 2.',
      image: '../../../assets/img/sharkie-project.png',
      github: 'https://github.com/project2',
      liveDemo: 'https://live-demo2.com'
    },
    {
      name: 'DaBubble',
      stack: 'Vue.js, Firebase',
      description: 'A description of Project 3.',
      image: '../../../assets/img/join-project.png',
      github: 'https://github.com/project3',
      liveDemo: 'https://live-demo3.com'
    }
  ];
}
