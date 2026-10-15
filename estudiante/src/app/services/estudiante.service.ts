import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Estudiante {
    id: number;
    nombre: string;
    nota1: number;
    nota2: number;
    nota3: number;
}

export interface Reporte {
    suma: number;
    promedio: number;
    estado: string;
    observacion: string;
}


@Injectable({
    providedIn: 'root'
})
export class EstudianteService {

    private url = 'https://careli2021.github.io/api_examen/api/estudiante.json';

    constructor(private http: HttpClient) { }

    obtenerEstudiantes(): Observable<Estudiante[]> {
        return this.http.get<Estudiante[]>(this.url);
    }

    obtenerEstudiante(id: number): Observable<Estudiante | undefined> {
        return this.obtenerEstudiantes().pipe(
            map(lista => lista.find(e => e.id === id))
        );
    }

    calcular(e: Estudiante): Reporte {
        const suma = e.nota1 + e.nota2 + e.nota3;
        const promedio = Math.round((suma / 3) * 100) / 100;

        const estado = promedio >= 13 ? 'Aprobado' : 'Desaprobado';

        let observacion = '';
        if (promedio >= 17) {
            observacion = 'Excelente';
        } else if (promedio >= 13) {
            observacion = 'Regular';
        } else {
            observacion = 'En riesgo';
        }

        return { suma, promedio, estado, observacion };
    }
}