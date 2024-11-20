import { Component, Input } from '@angular/core';
import { Request } from '../app.component';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  @Input({required: true}) request!: Request;
}
