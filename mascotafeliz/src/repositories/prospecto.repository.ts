import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Prospecto, ProspectoRelations} from '../models';

export class ProspectoRepository extends DefaultCrudRepository<
  Prospecto,
  typeof Prospecto.prototype.id,
  ProspectoRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Prospecto, dataSource);
  }
}
