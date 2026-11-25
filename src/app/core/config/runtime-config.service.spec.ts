import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DEFAULT_RUNTIME_CONFIG, RuntimeConfigService } from './runtime-config.service';

describe('RuntimeConfigService', () => {
  let service: RuntimeConfigService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RuntimeConfigService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('parte de los valores por defecto', () => {
    expect(service.config()).toEqual(DEFAULT_RUNTIME_CONFIG);
  });

  it('carga /runtime/config.json y lo combina con los valores por defecto', async () => {
    const loading = service.load();
    httpTesting.expectOne('/runtime/config.json').flush({ environment: 'cert' });
    await loading;

    expect(service.config()).toEqual({ ...DEFAULT_RUNTIME_CONFIG, environment: 'cert' });
  });

  it('mantiene los valores por defecto si el archivo no existe', async () => {
    const loading = service.load();
    httpTesting
      .expectOne('/runtime/config.json')
      .flush('no encontrado', { status: 404, statusText: 'Not Found' });
    await loading;

    expect(service.config()).toEqual(DEFAULT_RUNTIME_CONFIG);
  });
});
