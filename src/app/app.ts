import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RuntimeConfigService } from './core/config/runtime-config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly config = inject(RuntimeConfigService).config;
}
