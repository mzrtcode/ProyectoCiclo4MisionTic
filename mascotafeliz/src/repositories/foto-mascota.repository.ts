import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {FotoMascota, FotoMascotaRelations} from '../models';

export class FotoMascotaRepository extends DefaultCrudRepository<
  FotoMascota,
  typeof FotoMascota.prototype.id,
  FotoMascotaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(FotoMascota, dataSource);
  }
}
