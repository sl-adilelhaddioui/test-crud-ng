import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Request } from '../app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  @Input({ required: true }) request!: Request;
  @Output() requestDelete = new EventEmitter();
  @Output() requestEdit = new EventEmitter<Request>();
}
