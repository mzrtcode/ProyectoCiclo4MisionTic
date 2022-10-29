import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuarios,
  Mascota,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosMascotaController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.usuariosRepository.mascotas(id).find(filter);
  }

  @post('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.usuariosRepository.mascotas(id).create(mascota);
  }

  @patch('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.usuariosRepository.mascotas(id).patch(mascota, where);
  }

  @del('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.usuariosRepository.mascotas(id).delete(where);
  }
}
