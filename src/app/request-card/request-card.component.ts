import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  @Input({required: true}) projectName!: string;
  @Input({required: true}) user!: string;
  @Input() contract!: number;

}
