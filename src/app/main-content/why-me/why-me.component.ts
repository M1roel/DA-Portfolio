import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * WhyMeComponent is responsible for providing information about why the user should be chosen for a particular role or task.
 */
@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent implements OnInit {

  /**
   * Constructor for the WhyMeComponent.
   * @param el - Reference to the host element of this component. Used to manipulate the DOM directly.
   */
  constructor(private el: ElementRef) {
  }

  /**
   * Lifecycle hook that runs after the component is initialized.
   * Sets up an Intersection Observer to detect when the `.why-me` element becomes visible in the viewport
   * and applies a `visible` CSS class for animations or styling.
   */
  ngOnInit() {
    const element = this.el.nativeElement.querySelector('.why-me');
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
    } else {
      console.error('.why-me element not found!');
    }
  }
}
