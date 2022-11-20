import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoMascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  id_mascota?: string;

  constructor(data?: Partial<FotoMascota>) {
    super(data);
  }
}

export interface FotoMascotaRelations {
  // describe navigational properties here
}

export type FotoMascotaWithRelations = FotoMascota & FotoMascotaRelations;
