import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { MyMessage } from '../models/MyMessage';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiUrl: string;

  constructor(
    private httpClient: HttpClient,
  ) {
     this.apiUrl = "http://localhost:8080/api/values"
   }

  get(): Observable<MyMessage[]> {
    return this.httpClient.get<MyMessage[]>(`${this.apiUrl}`);
  }
  post(msg: string): Observable<{}> {
    return this.httpClient.post(`${this.apiUrl}`, {msg});
  }
  put(mes: MyMessage) : Observable<{}> {
    const msg = mes.msg
    console.log(mes);
    return this.httpClient.put(`${this.apiUrl}/${mes.id}`, { msg });
  }
  delete(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
