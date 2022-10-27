import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductosyServicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Proveedor: string;


  constructor(data?: Partial<ProductosyServicios>) {
    super(data);
  }
}

export interface ProductosyServiciosRelations {
  // describe navigational properties here
}

export type ProductosyServiciosWithRelations = ProductosyServicios & ProductosyServiciosRelations;
