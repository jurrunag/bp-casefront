import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProductService } from 'src/app/services/financialProduct.service';
import { environment } from '../../environments/environment';
import { ProductoFinanciero } from './interface.service';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService],
    });
    service = TestBed.inject(FinancialProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProduct', () => {
    const dummyData: ProductoFinanciero[] = [
      {
        logo: 'Logo 1',
        name: 'Dato 1',
        description: 'Dato 3',
        date_release: 'Dato 4',
        date_revision: 'Dato 5',
      },
    ];

    service.getProduct().subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpTestingController.expectOne(`${environment.apiProduct}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should call updateProduct', () => {
    const request = {
      id: '1',
      name: 'Updated Name',
    };

    service.updateProduct(request).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiProduct}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should call createProduct', () => {
    const request = {
      id: '1',
      name: 'New Product',
    };

    service.createProduct(request).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiProduct}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call deleteProduct', () => {
    const id = '1';

    service.deleteProduct(id).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiProduct}?id=${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call verifyProduct', () => {
    const id = '1';

    service.verifyProduct(id).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiProduct}/verification?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
