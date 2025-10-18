import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Sistema Médico</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/inicio">Inicio</a>
          <a class="nav-link" routerLink="/pacientes">Pacientes</a>
          <a class="nav-link" routerLink="/especialidades">Especialidades</a>
          <a class="nav-link" routerLink="/atencion">Atención</a>
        </div>
      </div>
    </nav>
    
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App{
  title = 'sistema-atencion';
}