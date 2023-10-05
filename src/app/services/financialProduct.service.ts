import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductoFinanciero } from './interface.service';

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
    return this.http.get<ProductoFinanciero>(`${environment.apiProduct}`, this.httpOptions);
  }
  
  updateProduct(request:any): Observable<any>{
    return this.http.put<ProductoFinanciero>(`${environment.apiProduct}`,request, this.httpOptions);
  }

  createProduct(request:any): Observable<any>{
    return this.http.post<any>(`${environment.apiProduct}`,request ,this.httpOptions);
  }
 
  deleteProduct(id:string): Observable<any>{
    return this.http.delete<any>(`${environment.apiProduct}?id=${id}`,this.httpOptions);
  }

  verifyProduct(id:string): Observable<any>{
    return this.http.get<any>(`${environment.apiProduct}/verification?id=${id}`,this.httpOptions);
  }


}
