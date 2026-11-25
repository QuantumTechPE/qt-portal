import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { RuntimeConfigService } from './core/config/runtime-config.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        {
          provide: RuntimeConfigService,
          useValue: {
            config: signal({ appName: 'qt-demo', environment: 'dev', apiBaseUrl: '/api' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('crea el shell de la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el ambiente activo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.brand')?.textContent).toContain('qt-demo');
    expect(el.querySelector('[data-testid="env-badge"]')?.textContent).toContain('dev');
  });
});
