import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations} from '../models';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongodbDataSource,
  ) {
    super(Mascota, dataSource);
  }
}
