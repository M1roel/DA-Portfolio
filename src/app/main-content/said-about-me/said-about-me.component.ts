import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * SaidAboutMeComponent displays testimonials or feedback from people about the user's projects.
 */
@Component({
  selector: 'app-said-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './said-about-me.component.html',
  styleUrls: ['./said-about-me.component.scss']
})
export class SaidAboutMeComponent implements AfterViewInit {

  @ViewChildren('saidAbout') saidAboutElements!: QueryList<ElementRef>;

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
      name: 'Borna',
      project: 'Kochwelt',
      descriptionKey: 'ABOUT.DESCRIPTION_BORNA'
    }
  ];

  constructor(private translate: TranslateService, private renderer: Renderer2) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target); // Stop observing once the element is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    this.saidAboutElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }

  useLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}