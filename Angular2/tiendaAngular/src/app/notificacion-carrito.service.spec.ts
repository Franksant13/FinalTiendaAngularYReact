/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificacionCarritoService } from './notificacion-carrito.service';

describe('NotificacionCarritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionCarritoService]
    });
  });

  it('should ...', inject([NotificacionCarritoService], (service: NotificacionCarritoService) => {
    expect(service).toBeTruthy();
  }));
});
