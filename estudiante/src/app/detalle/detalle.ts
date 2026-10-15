
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Estudiante, EstudianteService, Reporte } from '../services/estudiante.service';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html'
})
export class Detalle implements OnInit {

  estudiante = signal<Estudiante | undefined>(undefined);
  reporte = signal<Reporte | undefined>(undefined);
  cargando = signal(true);
  error = signal('');

  colorObservacion = computed(() => {
    const obs = this.reporte()?.observacion;
    if (obs === 'Excelente') return 'bg-success';
    if (obs === 'Regular') return 'bg-warning text-dark';
    return 'bg-danger';
  });

  constructor(
    private route: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.servicio.obtenerEstudiante(id).subscribe({
      next: (encontrado) => {
        if (!encontrado) {
          this.error.set('Estudiante no encontrado.');
        } else {
          this.estudiante.set(encontrado);
          this.reporte.set(this.servicio.calcular(encontrado));
        }
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al leer estudiantes.json', err);
        this.error.set('No se pudo cargar el detalle.');
        this.cargando.set(false);
      }
    });
  }
}