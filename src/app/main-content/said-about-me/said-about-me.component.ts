import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-said-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './said-about-me.component.html',
  styleUrl: './said-about-me.component.scss'
})
export class SaidAboutMeComponent {
  abouts = [
    {
      name: 'Max Muster',
      project: 'JOIN',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    },
    {
      name: 'Max Muster',
      project: 'JOIN',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    },
    {
      name: 'Max Muster',
      project: 'JOIN',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    }
  ];
}
