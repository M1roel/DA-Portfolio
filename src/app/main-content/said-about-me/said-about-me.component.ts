import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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

  /**
   * Constructor to inject necessary services.
   * @param renderer - Angular Renderer2 service to safely manipulate DOM elements.
   */
  constructor(private renderer: Renderer2) {
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   * This method sets up an Intersection Observer to detect when testimonial elements become visible
   * and applies a CSS class for animation or styling purposes.
   */
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

    // Attach the observer to each testimonial element
    this.saidAboutElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }
}