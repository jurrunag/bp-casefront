import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialProductService } from 'src/app/services/financialProduct.service';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let productService: FinancialProductService;

  const mockProductService = {
    getProduct: () => of([]),
    verifyProduct: (termino: string) => of(true), 
    deleteProduct: (id: number) => of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FinancialProductService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(FinancialProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set list and result on ngOnInit', () => {
    const productList = [
      {
        logo: 'Logo 1',
        name: 'Dato 1',
        description: 'Dato 3',
        date_release: 'Dato 4',
        date_revision: 'Dato 5',
      },
    ];
    spyOn(productService, 'getProduct').and.returnValue(of(productList));

    component.ngOnInit();

    expect(component.list).toEqual(productList);
    expect(component.result).toEqual(productList.length);
  });

  it('should set resultadoBusqueda on buscar', () => {
    const termino = 'Producto buscado';
    spyOn(productService, 'verifyProduct').and.returnValue(of(true));

    component.buscar(termino);

    expect(component.resultadoBusqueda).toBe('Existe el Producto buscado');
  });

  it('should call editar', () => {
    const item = {
      id: 1,
      logo: 'Logo 1',
      name: 'Dato 1',
      description: 'Dato 3',
      date_release: 'Dato 4',
      date_revision: 'Dato 5',
    };
    spyOn(productService, 'deleteProduct').and.returnValue(of({}));

    component.editar(item);

    expect(localStorage.getItem('item')).toBe(JSON.stringify(item));
  });

  it('should call eliminar', () => {
    const item = {
      id: 1,
      logo: 'Logo 1',
      name: 'Dato 1',
      description: 'Dato 3',
      date_release: 'Dato 4',
      date_revision: 'Dato 5',
    };
    spyOn(productService, 'deleteProduct').and.returnValue(of({}));
    component.eliminar(item);
    expect(productService.deleteProduct).toHaveBeenCalled();
  });
});
