import { Component, inject } from '@angular/core';
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
  public requestsService= inject(RequestsService); // TODO: private

  openDialog(): void {
    this.dialog.open(DialogFormComponent); 
  }

  onRequestDelete(request: Request): void {
    this.requestsService.removeRequest(request);
  }
}
