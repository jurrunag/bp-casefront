import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialProductService } from 'src/app/services/financialProduct.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  list = [];
  result = 10;

  constructor(
    private finacial: FinancialProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.finacial.getProduct().subscribe({
      next: data =>{
        this.list = data;
        console.log('data', data);
        this.result = data.length
      },
      error: (err: any) => {
        if (err.status === 400) {
          console.log('Error 400: Falta el header authorId', err);
        } else if (err.status === 206) {
          console.log('Error 206:', err.name);
        } else {
          console.error('Error desconocido', err);
        }
      }
    })
  }

  agregarProduct() {
    this.router.navigate(['/record']);
  }
}