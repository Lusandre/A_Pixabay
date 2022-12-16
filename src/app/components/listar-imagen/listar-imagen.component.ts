import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit {
  busqueda = '';
  suscription: Subscription;
  listImg: any[] = [];
  loading = false;
  imgPorPagina = 28;
  paginaActual = 1;
  totalPaginas = 0;

  constructor(private _imagenService: ImagenService) {
    this.suscription = _imagenService.getBusqueda().subscribe((res) => {
      this.busqueda = res;
      this.loading = true;
      this.paginaActual = 1;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {}

  obtenerImagenes() {
    this._imagenService
      .getImagenes(this.busqueda, this.imgPorPagina, this.paginaActual)
      .subscribe(
        (data) => {
          this.loading = false;

          if (data.hits.length === 0) {
            this._imagenService.setError(
              'Opss.. No encontramos ningun resultado'
            );
            return;
          }
          this.totalPaginas = Math.ceil(data.totalHits / this.imgPorPagina);
          this.listImg = data.hits;
        },
        (error) => {
          this._imagenService.setError('Opss.. ocurrio un error');
          this.loading = false;
        }
      );
  }
  pagAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImg = [];
    this.obtenerImagenes();
  }
  pagSiguiente() {
    this.paginaActual++;
    this.loading = true;
    this.listImg = [];
    this.obtenerImagenes();
  }
  pagAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }
  pagSiguienteClass() {
    if (this.paginaActual === this.totalPaginas) {
      return false;
    } else {
      return true;
    }
  }
}
