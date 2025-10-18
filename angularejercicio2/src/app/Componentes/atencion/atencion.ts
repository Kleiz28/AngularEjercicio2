import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data';
import { EspecialidadService } from '../../services/especialidad';
import { Atencion } from '../../modelos/atencion';
import { Paciente } from '../../modelos/paciente';
import { Especialidad } from '../../modelos/especialidad';

@Component({
  selector: 'app-atencion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="row">
      <div class="col-12">
        <h2>Registro de Atenciones Médicas</h2>
        <a routerLink="/inicio" class="btn btn-secondary mb-3">← Volver al Inicio</a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Nueva Atención</h5>
          </div>
          <div class="card-body">
            <form [formGroup]="atencionForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Paciente</label>
                <select class="form-control" formControlName="pacienteId"
                        [class.is-invalid]="atencionForm.get('pacienteId')?.invalid && atencionForm.get('pacienteId')?.touched">
                  <option value="">Seleccione un paciente</option>
                  <option *ngFor="let paciente of pacientes" [value]="paciente.id">
                    {{ paciente.nombre }} - DNI: {{ paciente.dni }}
                  </option>
                </select>
                <div class="invalid-feedback" *ngIf="atencionForm.get('pacienteId')?.errors?.['required']">
                  El paciente es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Especialidad</label>
                <select class="form-control" formControlName="especialidadId"
                        [class.is-invalid]="atencionForm.get('especialidadId')?.invalid && atencionForm.get('especialidadId')?.touched">
                  <option value="">Seleccione una especialidad</option>
                  <option *ngFor="let especialidad of especialidades" [value]="especialidad.id">
                    {{ especialidad.nombre }}
                  </option>
                </select>
                <div class="invalid-feedback" *ngIf="atencionForm.get('especialidadId')?.errors?.['required']">
                  La especialidad es requerida
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Diagnóstico</label>
                <textarea class="form-control" formControlName="diagnostico" rows="3"
                          [class.is-invalid]="atencionForm.get('diagnostico')?.invalid && atencionForm.get('diagnostico')?.touched"></textarea>
                <div class="invalid-feedback" *ngIf="atencionForm.get('diagnostico')?.errors?.['required']">
                  El diagnóstico es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Tratamiento</label>
                <textarea class="form-control" formControlName="tratamiento" rows="3"
                          [class.is-invalid]="atencionForm.get('tratamiento')?.invalid && atencionForm.get('tratamiento')?.touched"></textarea>
                <div class="invalid-feedback" *ngIf="atencionForm.get('tratamiento')?.errors?.['required']">
                  El tratamiento es requerido
                </div>
              </div>

              <button type="submit" class="btn btn-success" [disabled]="atencionForm.invalid || pacientes.length === 0 || especialidades.length === 0">
                {{ pacientes.length === 0 ? 'Primero registre pacientes' : especialidades.length === 0 ? 'Cargando especialidades...' : 'Registrar Atención' }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Atenciones Registradas</h5>
          </div>
          <div class="card-body">
            <div *ngIf="atenciones.length === 0" class="alert alert-info">
              No hay atenciones registradas
            </div>
            <div *ngFor="let atencion of atenciones" class="card mb-2">
              <div class="card-body">
                <h6>Atención #{{ atencion.id }}</h6>
                <p class="mb-1"><strong>Paciente:</strong> {{ atencion.pacienteNombre }}</p>
                <p class="mb-1"><strong>Especialidad:</strong> {{ atencion.especialidadNombre }}</p>
                <p class="mb-1"><strong>Fecha:</strong> {{ atencion.fecha | date:'medium' }}</p>
                <p class="mb-1"><strong>Diagnóstico:</strong> {{ atencion.diagnostico }}</p>
                <p class="mb-0"><strong>Tratamiento:</strong> {{ atencion.tratamiento }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AtencionComponent implements OnInit {
  atencionForm: FormGroup;
  atenciones: Atencion[] = [];
  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private especialidadService: EspecialidadService
  ) {
    this.atencionForm = this.fb.group({
      pacienteId: ['', [Validators.required]],
      especialidadId: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      tratamiento: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.actualizarDatos();
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: (data: Especialidad[]) => this.especialidades = data,
      error: (error: any) => console.error('Error cargando especialidades:', error)
    });
  }

  onSubmit() {
    if (this.atencionForm.valid) {
      const atencionData = {
        ...this.atencionForm.value,
        fecha: new Date()
      };

      // Agregar nombre de especialidad para mostrar
      const atencionConNombre = {
        ...atencionData,
        especialidadNombre: this.especialidades.find(e => e.id === atencionData.especialidadId)?.nombre
      };

      this.dataService.agregarAtencion(atencionData);
      this.atencionForm.reset();
      this.actualizarDatos();
    }
  }

  private actualizarDatos() {
    this.atenciones = this.dataService.obtenerAtenciones();
    this.pacientes = this.dataService.obtenerPacientes();
  }
}