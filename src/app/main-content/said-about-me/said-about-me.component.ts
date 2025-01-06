import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-said-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './said-about-me.component.html',
  styleUrl: './said-about-me.component.scss'
})
export class SaidAboutMeComponent {
  abouts = [
    {
      name: 'Dennis',
      project: 'JOIN',
      descriptionKey: 'ABOUT.DESCRIPTION_DENNIS'
    },
    {
      name: 'Benjamin',
      project: 'JOIN',
      descriptionKey: 'ABOUT.DESCRIPTION_BENJAMIN'
    },
    {
      name: 'Max Muster',
      project: 'JOIN',
      descriptionKey: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
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
