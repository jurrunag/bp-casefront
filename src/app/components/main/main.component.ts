import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialProductService } from 'src/app/services/financialProduct.service';
import { ProductoFinanciero } from 'src/app/services/interface.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  list: ProductoFinanciero[] = [
    { logo: 'Logo 1', name: 'Dato 1', description: 'Dato 3', date_release: 'Dato 4', date_revision: 'Dato 5' },
  ];
  result = 10;
  mostrarMenuIndex: number | null = null; 
  terminoBusqueda = '';
  resultadoBusqueda = '';


  constructor(
    private finacial: FinancialProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.finacial.getProduct().subscribe({
      next: data =>{
        this.list = data;
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
 
  setLocalStorage(key: string, value: any) {
    const now = new Date();
    const item = {
      value,
      expiry: parseInt(now.getTime().toFixed(0), 10)
    };

    localStorage.setItem(key, JSON.stringify(value));
  }


  toggleMenu(index: number) {
    if (this.mostrarMenuIndex === index) {
      this.mostrarMenuIndex = null;
    } else {
      this.mostrarMenuIndex = index;
    }
  }
  
  editar(item:any) {
    this.setLocalStorage('item', item);
    this.router.navigate([`/record/edit/${item.id}`]);
  }

  eliminar(item:any) {
    this.finacial.deleteProduct(item.id).subscribe({
      next: data =>{
        console.log('Status 200:', data);
      },
      error: (err: any) => {
        if (err.status === 400) {
          console.log('Error 400: Falta el header authorId', err);
        } else if (err.status === 404) {
          console.log('Error 404:', err);
        } else {
          console.error('Error desconocido', err);
        }
      }
    });
  }

  buscar(termino: string) {
    this.finacial.verifyProduct(termino).subscribe(data => {
      if(data) {
        this.resultadoBusqueda = 'Existe el Producto buscado'; 
      } else {
        this.resultadoBusqueda = 'No! Existe el Producto buscado'; 
      }
      console.log('Mensaje: ', this.resultadoBusqueda);
    });
  }

  agregarProduct() {
    this.router.navigate(['/record']);
  }
}