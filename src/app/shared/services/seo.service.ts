import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Setzt Titel, Description und Canonical-Link einer Seite
   */
  updateMetaData(title: string, description: string, url: string): void {
    this.setTitle(title);
    this.setDescription(description);
    this.setCanonicalURL(url);
  }

  /**
   * Seitentitel setzen
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Meta-Description setzen oder aktualisieren
   */
  setDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  /**
   * Canonical-Link setzen oder aktualisieren
   */
  setCanonicalURL(url: string): void {
    // Entferne vorhandene Canonical-Tags
    const existingLinks = this.document.querySelectorAll("link[rel='canonical']");
    existingLinks.forEach(link => link.remove());

    // Neues Link-Tag erzeugen
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);

    this.document.head.appendChild(link);
  }
}
