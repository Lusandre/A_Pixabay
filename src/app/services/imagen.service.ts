import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private error$ = new Subject<string>();
  private busqueda$ = new Subject<string>();

  constructor(private http: HttpClient) {}
  setError(mensaje: string) {
    return this.error$.next(mensaje);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  setBusqueda(termino: string) {
    return this.busqueda$.next(termino);
  }

  getBusqueda(): Observable<string> {
    return this.busqueda$.asObservable();
  }

  getImagenes(busqueda: string, imgPorPagina: number, pagActual: number) {
    const KEY = '29218401-d54f2ba09c4f241ae81da119c';
    const URL = `https://pixabay.com/api/?key=${KEY}`;
    return this.http.get<any>(`${URL}`, {
      params: {
        q: busqueda,
        per_page: imgPorPagina,
        page: pagActual,
      },
    });
  }
}
