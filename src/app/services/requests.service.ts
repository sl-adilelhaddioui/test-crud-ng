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

  removeRequest(request: Request): void {
    this.requestList.update(value => value.filter(
      req =>
        req.name !== request.name ||
        req.user !== request.user ||
        req.contract !== request.contract
    ));
  }

  editRequest(oldRequest: Request, newRequest: Request): void {
    this.requestList.update(list => {
      const foundReq = list.find(req =>
        req.name === oldRequest.name &&
        req.user === oldRequest.user &&
        req.contract === oldRequest.contract);
      if (foundReq) {
        foundReq.name = newRequest.name;
        foundReq.user = newRequest.user;
        foundReq.contract = newRequest.contract;
      }
      return list;
    })
  }
}
