import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

  constructor(private seoService: SeoService) {}

    ngOnInit(): void {
      this.seoService.updateMetaData(
        'Impressum - Peter Pfautsch',
        'Impressum von Peter Pfautsch',
        'https://peterpfautsch.de/imprint'
      );
    }
}
