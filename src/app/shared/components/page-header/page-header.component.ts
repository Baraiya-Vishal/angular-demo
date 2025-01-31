import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonConfig } from '../../../interface/ButtonConfig';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderStateService } from '../../services/page-header-state.service';

@Component({
  selector: 'app-page-header',
  imports: [MatToolbarModule,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  title: string = '';
  buttons: ButtonConfig[] = [];

  constructor(private headerStateService: PageHeaderStateService) {}

  ngOnInit(): void {
    // Subscribe to title and buttons from the service
    this.headerStateService.title$.subscribe((title) => {
      this.title = title;
    });

    this.headerStateService.buttons$.subscribe((buttons) => {
      this.buttons = buttons;
    });
  }
}
