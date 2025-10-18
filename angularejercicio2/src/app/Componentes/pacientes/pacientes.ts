import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data';
import { Paciente } from '../../modelos/paciente';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="row">
      <div class="col-12">
        <h2>Gestión de Pacientes</h2>
        <a routerLink="/inicio" class="btn btn-secondary mb-3">← Volver al Inicio</a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Registrar Paciente</h5>
          </div>
          <div class="card-body">
            <form [formGroup]="pacienteForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Nombre completo</label>
                <input type="text" class="form-control" formControlName="nombre"
                       [class.is-invalid]="pacienteForm.get('nombre')?.invalid && pacienteForm.get('nombre')?.touched">
                <div class="invalid-feedback" *ngIf="pacienteForm.get('nombre')?.errors?.['required']">
                  El nombre es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">DNI</label>
                <input type="text" class="form-control" formControlName="dni"
                       [class.is-invalid]="pacienteForm.get('dni')?.invalid && pacienteForm.get('dni')?.touched">
                <div class="invalid-feedback" *ngIf="pacienteForm.get('dni')?.errors?.['required']">
                  El DNI es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" formControlName="telefono"
                       [class.is-invalid]="pacienteForm.get('telefono')?.invalid && pacienteForm.get('telefono')?.touched">
                <div class="invalid-feedback" *ngIf="pacienteForm.get('telefono')?.errors?.['required']">
                  El teléfono es requerido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" formControlName="email"
                       [class.is-invalid]="pacienteForm.get('email')?.invalid && pacienteForm.get('email')?.touched">
                <div class="invalid-feedback" *ngIf="pacienteForm.get('email')?.errors?.['required']">
                  El email es requerido
                </div>
                <div class="invalid-feedback" *ngIf="pacienteForm.get('email')?.errors?.['email']">
                  Formato de email inválido
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Dirección</label>
                <textarea class="form-control" formControlName="direccion"
                          [class.is-invalid]="pacienteForm.get('direccion')?.invalid && pacienteForm.get('direccion')?.touched"></textarea>
                <div class="invalid-feedback" *ngIf="pacienteForm.get('direccion')?.errors?.['required']">
                  La dirección es requerida
                </div>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="pacienteForm.invalid">
                Registrar Paciente
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Pacientes Registrados</h5>
          </div>
          <div class="card-body">
            <div *ngFor="let paciente of pacientes" class="card mb-2">
              <div class="card-body">
                <h6>{{ paciente.nombre }}</h6>
                <p class="mb-1"><strong>DNI:</strong> {{ paciente.dni }}</p>
                <p class="mb-1"><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
                <p class="mb-1"><strong>Email:</strong> {{ paciente.email }}</p>
                <p class="mb-0"><strong>Dirección:</strong> {{ paciente.direccion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PacientesComponent {
  pacienteForm: FormGroup;
  pacientes: Paciente[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]]
    });

    this.actualizarPacientes();
  }

  onSubmit() {
    if (this.pacienteForm.valid) {
      this.dataService.agregarPaciente(this.pacienteForm.value);
      this.pacienteForm.reset();
      this.actualizarPacientes();
    }
  }

  private actualizarPacientes() {
    this.pacientes = this.dataService.obtenerPacientes();
  }
}