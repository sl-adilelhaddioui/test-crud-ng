import { Injectable, signal, WritableSignal } from '@angular/core';
import { Request } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private requestList: WritableSignal<Request[]> = signal([{
    name: 'lorem ipsum',
    user: 'John Doe'
  }]);

  getRequestList(): Request[] {
    return this.requestList();
  }

  addRequest(request: Request): void {
    this.requestList.update(value => [...value, request]);
  }

  removeRequest(requestIndex: number): void {
    this.requestList().splice(requestIndex, 1);
  }

  editRequest(newRequest: Request, requestIndex: number): void {
    this.requestList().splice(requestIndex, 1, newRequest);
  }
}
