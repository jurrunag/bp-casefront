import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  public httpOptions = {
    headers: new HttpHeaders({
      authorId: '355',
    })
  };

  constructor(private http: HttpClient) { }
   
  getProduct(): Observable<any>{
    return this.http.get<any>(`${environment.apiProduct}`, this.httpOptions);
  }

  createProduct(request:any): Observable<any>{
    return this.http.post<any>(`${environment.apiProduct}`,request ,this.httpOptions);
  }
 

}
