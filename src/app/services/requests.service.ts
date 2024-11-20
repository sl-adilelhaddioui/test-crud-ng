import { Injectable, signal, WritableSignal } from '@angular/core';
import { Request } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private requestList: WritableSignal<Request[]> = signal([{
    name: '',
    user: 'John Doe'}]);

  constructor() { }

  getRequestList(): Request[] {
    return this.requestList();
  }

  addRequest(request: Request): void {
    this.requestList.update(value => [...value, request]);
  }
}
