import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, WhyMeComponent],
  templateUrl: './main-content.component.html',
  template: `
  <section>
    <div><app-hero-section></app-hero-section></div>
    <div><app-why-me></app-why-me></div>
  </section>
  `,
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
