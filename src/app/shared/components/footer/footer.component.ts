import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }

  icons = [
    { 
      url: 'https://github.com/M1roel', 
      image: '../../../../assets/img/github_button.png',
      originalImage: '../../../../assets/img/github_button.png',
      alt: 'GitHub', 
      hoverImage: '../../../../assets/img/github_button_hover.png' 
    },
    { 
      url: 'mailto:p.pfautsch@arcor.de', 
      image: '../../../../assets/img/email_button.png',
      originalImage: '../../../../assets/img/email_button.png',
      alt: 'Email', 
      hoverImage: '../../../../assets/img/email_button_hover.png' 
    },
    { 
      url: 'https://www.linkedin.com/in/peter-pfautsch-379bb62aa/', 
      image: '../../../../assets/img/linkedin_button.png',
      originalImage: '../../../../assets/img/linkedin_button.png',
      alt: 'LinkedIn', 
      hoverImage: '../../../../assets/img/linkedin_button_hover.png' 
    }
  ];

  onHover(icon: any) {
    icon.image = icon.hoverImage;
  }

  onLeave(icon: any) {
    icon.image = icon.originalImage;
  }
}
