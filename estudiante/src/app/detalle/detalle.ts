import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Estudiante, EstudianteService, Reporte } from '../services/estudiante.service';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html'
})
export class Detalle implements OnInit {

  estudiante?: Estudiante;
  reporte?: Reporte;
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.servicio.obtenerEstudiante(id).subscribe({
      next: (encontrado) => {
        if (!encontrado) {
          this.error = 'Estudiante no encontrado.';
        } else {
          this.estudiante = encontrado;
          this.reporte = this.servicio.calcular(encontrado);
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al leer estudiantes.json', err);
        this.error = 'No se pudo cargar el detalle.';
        this.cargando = false;
      }
    });
  }

  get colorObservacion(): string {
    if (this.reporte?.observacion === 'Excelente') return 'bg-success';
    if (this.reporte?.observacion === 'Regular') return 'bg-warning text-dark';
    return 'bg-danger';
  }
}