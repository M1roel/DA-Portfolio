import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private seoService: SeoService) { }

    ngOnInit(): void {
      this.seoService.updateMetaData(
        'Datenschutzerklärung - Peter Pfautsch',
        'Datenschutzerklärung von Peter Pfautsch',
        'https://peterpfautsch.de/datenschutzerklaerung'
      );
  }
}
