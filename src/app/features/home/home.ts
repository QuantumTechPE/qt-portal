import { Component, inject } from '@angular/core';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';

/** Pantalla inicial. Las funcionalidades nuevas van en src/app/features/<nombre>/. */
@Component({
  selector: 'app-home',
  template: `
    <h1>{{ config().appName }}</h1>
    <p data-testid="environment">Ambiente: {{ config().environment }}</p>
  `,
})
export class Home {
  protected readonly config = inject(RuntimeConfigService).config;
}
