import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancialProductService } from 'src/app/services/financialProduct.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {

  registration: UntypedFormGroup;
  mensaje = 'Este campo es requerido.';

  constructor(
    private fb: FormBuilder,
    private financial: FinancialProductService,
    private router: Router
  ) {
    this.registration = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      releaseDate: ['', Validators.required],
      revisionDate: ['', Validators.required],
    });
  }

  hasErrorAndTouched(fieldName: string): boolean {
    const control = this.registration.get(fieldName);
    return control !== null && control !== undefined && control.invalid && control.touched;
  }

  onSubmit() {
    console.log('Datos enviados:', this.registration);
  }

  restart() {
    this.registration.reset();
  }

  crearRegistro() {
    const request = {
      id: this.registration.value.id,
      name: this.registration.value.name,
      description: this.registration.value.description,
      logo: this.registration.value.logo,
      date_release: this.registration.value.releaseDate,
      date_revision: this.registration.value.revisionDate
    }
    this.financial.createProduct(request).subscribe({
      next:
        data => {
          console.log('Creacion Exitosa', data);
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

    const revisionDateControl = this.registration.get('revisionDate');

    if (revisionDateControl) {
      revisionDateControl.setValue(fechaFormateada);
    }
  }


  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    this.registration.value.logo = selectedFile;
  }
}