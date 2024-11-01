import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriaCreate, CategoriaUpdate } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria  []> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  cadastrar(categoria: CategoriaCreate): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categorias`, categoria);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`);
  }

  update(categoria: CategoriaUpdate, id: number): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoria);
  }
}
