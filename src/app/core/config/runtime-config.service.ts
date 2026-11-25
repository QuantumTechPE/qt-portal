import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

/**
 * Configuración de RUNTIME del ambiente. En el clúster viene del repo qt-config
 * (files: config.json de <ambiente>/<servicio>-<ambiente>.yaml, montado en /runtime/),
 * así la MISMA imagen sirve para dev, cert y prod. En local: public/runtime/config.json.
 * Nunca pongas secretos aquí: el navegador lo descarga.
 */
export interface RuntimeConfig {
  appName: string;
  environment: string;
  apiBaseUrl: string;
}

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  appName: 'qt-portal',
  environment: 'local',
  apiBaseUrl: '/api',
};

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private readonly http = inject(HttpClient);
  private readonly state = signal<RuntimeConfig>(DEFAULT_RUNTIME_CONFIG);

  /** Configuración vigente (solo lectura). */
  readonly config = this.state.asReadonly();

  /** Se ejecuta una vez al arrancar la app (provideAppInitializer). */
  async load(): Promise<void> {
    try {
      const loaded = await firstValueFrom(
        this.http.get<Partial<RuntimeConfig>>('/runtime/config.json'),
      );
      this.state.set({ ...DEFAULT_RUNTIME_CONFIG, ...loaded });
    } catch {
      console.warn('No se pudo leer /runtime/config.json: se usan valores por defecto');
    }
  }
}
