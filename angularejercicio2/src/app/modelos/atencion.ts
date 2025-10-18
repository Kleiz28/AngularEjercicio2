export interface Atencion {
  id: number;
  pacienteId: number;
  especialidadId: number;
  fecha: Date;
  diagnostico: string;
  tratamiento: string;
  pacienteNombre?: string;
  especialidadNombre?: string;
}