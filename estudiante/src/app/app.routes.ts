import { Routes } from '@angular/router';
import { Estudiantes } from './estudiante/estudiante';
import { Detalle } from './detalle/detalle';

export const routes: Routes = [
  { path: 'estudiantes', component: Estudiantes },
  { path: 'detalle/:id', component: Detalle },
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' }
];