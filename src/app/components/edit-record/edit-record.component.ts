import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProductService } from 'src/app/services/financialProduct.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss']
})
export class EditRecordComponent implements OnInit {
  editForm: FormGroup;
  mensaje = 'Este campo es requerido.';
  productId: string | null= '';
  
  constructor(
    private fb: FormBuilder,
    private financial: FinancialProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      releaseDate: ['', Validators.required],
      revisionDate: ['']
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    const itemStr = this.getLocalStorage('item');
    if (itemStr !== null) {
      const item = JSON.parse(itemStr);
      this.editForm.patchValue({
        id: item.id,
        name: item.name,
        description: item.description,
        logo: item.logo,
        releaseDate: item.date_release,
        revisionDate: item.date_revision
      });

    }
  }
  
  getLocalStorage(key: string) {
    const itemStr = localStorage.getItem(key);
  
    if (itemStr === null) {
      return null;
    }
  
    const item = JSON.parse(itemStr);
  
    if (item === null) {
      return null;
    }
  
    const now = new Date();
  
    if (!item.value && !item.expiry) {
      return localStorage.getItem(key);
    }
  
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
  
    return JSON.stringify(item.value);
  }
  
  hasErrorAndTouched(fieldName: string): boolean {
    const control = this.editForm.get(fieldName);
    return control !== null && control !== undefined && control.invalid && control.touched;
  }

  onSubmit() {
    console.log('this.editForm.value.revisionDate', this.editForm.value.revisionDate);
    
    const request = {
      id: this.editForm.value.id,
      name: this.editForm.value.name,
      description: this.editForm.value.description,
      logo: this.editForm.value.logo,
      date_release: this.editForm.value.releaseDate,
      date_revision: this.editForm.value.revisionDate
    }

    this.financial.updateProduct(request).subscribe({
      next:
        data => {
          console.log('Edicion Exitosa', data);
          this.router.navigate(['/main']);
        },
      error: (err: any) => {
        if (err.status === 400) {
          console.log('Error 400: Falta el header authorId', err);
        } else if (err.status === 206) {
          console.log('Error 206:', err.name);
        } else if (err.status === 401) {
          console.log('Error 401: Unauthorized', err);
        } else {
          console.error('Error desconocido', err);
        }
      }
    })
  }

  mostrarAdelante(event: Event) {
    const fechaSeleccionada = (event.target as HTMLInputElement).value;
    const fecha = new Date(fechaSeleccionada);
    fecha.setFullYear(fecha.getFullYear() + 1);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();

    const fechaFormateada = `${año}-${mes}-${dia}`;

    const revisionDateControl = this.editForm.get('revisionDate');

    if (revisionDateControl) {
      revisionDateControl.setValue(fechaFormateada);
    }
  }

  restart() {
    this.router.navigate([`/main`]);
  }

  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    this.editForm.patchValue({ logo: selectedFile });
  }
}
