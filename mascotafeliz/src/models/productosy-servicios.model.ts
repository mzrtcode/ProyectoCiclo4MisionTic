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
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  proveedor: string;


  constructor(data?: Partial<ProductosyServicios>) {
    super(data);
  }
}

export interface ProductosyServiciosRelations {
  // describe navigational properties here
}

export type ProductosyServiciosWithRelations = ProductosyServicios & ProductosyServiciosRelations;
