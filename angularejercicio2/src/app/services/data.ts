import { Injectable } from '@angular/core';
import { Paciente } from '../modelos/paciente';
import { Especialidad } from '../modelos/especialidad';
import { Atencion } from '../modelos/atencion';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private pacientes: Paciente[] = [
    { id: 1, nombre: 'Juan Pérez', dni: '12345678', telefono: '999888777', email: 'juan@email.com', direccion: 'Av. Principal 123' },
    { id: 2, nombre: 'María García', dni: '87654321', telefono: '999777888', email: 'maria@email.com', direccion: 'Jr. Secundario 456' }
  ];

  private atenciones: Atencion[] = [];
  private nextId = 3;

  // Pacientes
  agregarPaciente(paciente: Omit<Paciente, 'id'>): Paciente {
    const nuevoPaciente: Paciente = {
      ...paciente,
      id: this.nextId++
    };
    this.pacientes.push(nuevoPaciente);
    return nuevoPaciente;
  }

  obtenerPacientes(): Paciente[] {
    return [...this.pacientes];
  }

  // Atenciones
  agregarAtencion(atencion: Omit<Atencion, 'id'>): Atencion {
    const nuevaAtencion: Atencion = {
      ...atencion,
      id: this.nextId++
    };
    this.atenciones.push(nuevaAtencion);
    return nuevaAtencion;
  }

  obtenerAtenciones(): Atencion[] {
    return this.atenciones.map(atencion => {
      const paciente = this.pacientes.find(p => p.id === atencion.pacienteId);
      return {
        ...atencion,
        pacienteNombre: paciente?.nombre || 'Paciente desconocido'
      };
    });
  }
}
