import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="row">
      <div class="col-12 text-center">
        <h1>Sistema de Atención Médica</h1>
        <p class="lead">Gestión integral de pacientes, especialidades y atenciones médicas</p>
        
        <div class="row mt-5">
          <div class="col-md-4 mb-3">
            <div class="card text-bg-primary">
              <div class="card-body text-center">
                <h5 class="card-title">Pacientes</h5>
                <p class="card-text">Registro y gestión de pacientes</p>
                <a routerLink="/pacientes" class="btn btn-light">Gestionar</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card text-bg-success">
              <div class="card-body text-center">
                <h5 class="card-title">Especialidades</h5>
                <p class="card-text">Administrar especialidades médicas</p>
                <a routerLink="/especialidades" class="btn btn-light">Gestionar</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card text-bg-warning">
              <div class="card-body text-center">
                <h5 class="card-title">Atención</h5>
                <p class="card-text">Registro de atenciones médicas</p>
                <a routerLink="/atencion" class="btn btn-light">Gestionar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InicioComponent { }