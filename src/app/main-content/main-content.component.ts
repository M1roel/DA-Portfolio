import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { CommonModule } from '@angular/common';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SaidAboutMeComponent } from './said-about-me/said-about-me.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, WhyMeComponent, MySkillsComponent, MyProjectsComponent, SaidAboutMeComponent, ContactMeComponent],
  templateUrl: './main-content.component.html',
  template: `
  <section>
    <div><app-hero-section></app-hero-section></div>
    <div><app-why-me></app-why-me></div>
    <div><app-my-skills></app-my-skills></div>
    <div><app-my-projects></app-my-projects></div>
    <div><app-said-about-me></app-said-about-me></div>    
    <div><app-contact-me></app-contact-me></div>
  </section>
  `,
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
