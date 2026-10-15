import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante.service';
 
@Component({
  selector: 'app-estudiantes',
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiante.html'
})
export class Estudiantes implements OnInit {
 
  estudiantes = signal<Estudiante[]>([]);
  cargando = signal(true);
  error = signal('');
 
  constructor(private servicio: EstudianteService) {}
 
  ngOnInit(): void {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        this.estudiantes.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al leer estudiantes.json', err);
        this.error.set('No se pudieron cargar los estudiantes.');
        this.cargando.set(false);
      }
    });
  }
}