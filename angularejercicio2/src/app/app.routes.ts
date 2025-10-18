import { Routes } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio';
import { PacientesComponent } from './Componentes/pacientes/pacientes';
import { EspecialidadesComponent } from './Componentes/especialidades/especialidades';
import { AtencionComponent } from './Componentes/atencion/atencion';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'pacientes', component: PacientesComponent},
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'atencion', component: AtencionComponent },
  { path: '**', redirectTo: '' }
];