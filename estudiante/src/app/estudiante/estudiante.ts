import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiante.html'
})
export class Estudiantes implements OnInit {

  estudiantes: Estudiante[] = [];
  cargando = true;
  error = '';

  constructor(private servicio: EstudianteService) {}

  ngOnInit(): void {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        this.estudiantes = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al leer estudiantes.json', err);
        this.error = 'No se pudieron cargar los estudiantes.';
        this.cargando = false;
      }
    });
  }
}