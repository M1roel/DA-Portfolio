import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {
  skills = [
    { name: 'Angular', img: '../../../assets/img/angular-icon.png'},
    { name: 'TypeScript', img: '../../../assets/img/typescript-icon.png'},
    { name: 'JavaScript', img: '../../../assets/img/javascript-icon.png'},
    { name: 'HTML', img: '../../../assets/img/html-icon.png'},
    { name: 'CSS', img: '../../../assets/img/css-icon.png'},
    { name: 'Rest-Api', img: '../../../assets/img/api-icon.png'},
    { name: 'Firebase', img: '../../../assets/img/firebase-icon.png'},
    { name: 'GIT', img: '../../../assets/img/git-icon.png'},
    { name: 'Scrum', img: '../../../assets/img/scrum-icon.png'},
    { name: 'Material design', img: '../../../assets/img/materialdesign-icon.png'},
    { name: 'Python', img: '../../../assets/img/python-icon.png'},
    { name: 'Linux', img: '../../../assets/img/linux-icon.png'},
    { name: 'Flask', img: '../../../assets/img/flask-icon.png'},
    { name: 'Challenge me', img: '../../../assets/img/challenge-icon.png'}
  ]
}
