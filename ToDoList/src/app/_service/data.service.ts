import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../_interface/todo';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverurl = 'http://localhost:4000/todos';

  constructor(private _http: HttpClient) 
  { 
  }


  public gettodo(): Observable <Todo[]>
  {
    const httpoptions = 
    {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    //return this._http.get<Todo[]>('${this.serverurl}/todos',httpoptions);
    return this._http.get<Todo[]>(this.serverurl,httpoptions);
  }


  public posttodo(object: Todo): Observable <Todo>
  {
    const httpoptions = 
    {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.post<Todo>(this.serverurl,object,httpoptions);
  }


  public deletetodo(object: Todo): Observable <Todo>
  {
    const httpoptions = 
    {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.delete<Todo>(this.serverurl+'/'+object.id,httpoptions);
  }

  public puttodo(object: Todo): Observable <Todo>
  {
    const httpoptions = 
    {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.put<Todo>(this.serverurl+'/'+object.id, object, httpoptions);
  }

}
