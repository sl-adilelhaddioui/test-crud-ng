import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RequestCardComponent } from './request-card/request-card.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { CommonModule } from '@angular/common';
import { RequestsService } from './services/requests.service';

export interface Request {
  name: string;
  user: string;
  contract?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RequestCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private dialog = inject(MatDialog);
  private requestsService = inject(RequestsService);
  requests: Request[] = [];

  constructor() {
    effect(() => {
      this.requests = this.requestsService.getRequestList();
    });
  }

  openDialog(): void {
    this.dialog.open(DialogFormComponent);
  }

  onRequestDelete(requestIndex: number): void {
    this.requestsService.removeRequest(requestIndex);
  }

  onRequestEdit(request: Request, requestIndex: number): void {
    this.dialog.open(DialogFormComponent, {
      data: { request: request, index: requestIndex }
    });
  }
}
