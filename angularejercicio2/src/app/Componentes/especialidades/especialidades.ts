import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EspecialidadService } from '../../services/especialidad';
import { Especialidad } from '../../modelos/especialidad';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  template: `
    <div class="row">
      <div class="col-12">
        <h2>Gestión de Especialidades</h2>
        <a routerLink="/inicio" class="btn btn-secondary mb-3">← Volver al Inicio</a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Registrar Especialidad</h5>
          </div>
          <div class="card-body">
            <form [formGroup]="especialidadForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" formControlName="nombre"
                       [class.is-invalid]="especialidadForm.get('nombre')?.invalid && especialidadForm.get('nombre')?.touched">
                <div class="invalid-feedback" *ngIf="especialidadForm.get('nombre')?.errors?.['required']">
                  El nombre es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea class="form-control" formControlName="descripcion"
                          [class.is-invalid]="especialidadForm.get('descripcion')?.invalid && especialidadForm.get('descripcion')?.touched"></textarea>
                <div class="invalid-feedback" *ngIf="especialidadForm.get('descripcion')?.errors?.['required']">
                  La descripción es requerida
                </div>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="especialidadForm.invalid">
                Registrar Especialidad
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Especialidades Registradas</h5>
          </div>
          <div class="card-body">
            <div *ngIf="especialidades.length === 0" class="alert alert-info">
              Cargando especialidades...
            </div>
            <div *ngFor="let especialidad of especialidades" class="card mb-2">
              <div class="card-body">
                <h6>{{ especialidad.nombre }}</h6>
                <p class="mb-0">{{ especialidad.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EspecialidadesComponent implements OnInit {
  especialidadForm: FormGroup;
  especialidades: Especialidad[] = [];

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService
  ) {
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: (data: Especialidad[]) => this.especialidades = data,
      error: (error: any) => console.error('Error cargando especialidades:', error)
    });
  }

  onSubmit() {
    if (this.especialidadForm.valid) {
      const nuevaEspecialidad: Especialidad = {
        id: 0, // json-server genera el ID
        ...this.especialidadForm.value
      };

      this.especialidadService.agregarEspecialidad(nuevaEspecialidad).subscribe({
        next: (especialidad: Especialidad) => {
          this.especialidades.push(especialidad);
          this.especialidadForm.reset();
        },
        error: (error: any) => console.error('Error agregando especialidad:', error)
      });
    }
  }
}