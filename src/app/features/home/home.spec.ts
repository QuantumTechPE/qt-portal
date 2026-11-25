import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Home } from './home';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';

describe('Home', () => {
  it('muestra el nombre y el ambiente de la configuración de runtime', async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: RuntimeConfigService,
          useValue: {
            config: signal({ appName: 'qt-demo', environment: 'prod', apiBaseUrl: '/api' }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('qt-demo');
    expect(el.querySelector('[data-testid="environment"]')?.textContent).toContain('prod');
  });
});
