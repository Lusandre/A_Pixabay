import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  texto = '';
  mostrar = false;
  suscripcion: Subscription;

  constructor(private _imagenService: ImagenService) {
    this.suscripcion = _imagenService.getError().subscribe((msg) => {
      this.mostrarMensaje();
      this.texto = msg;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }
}
