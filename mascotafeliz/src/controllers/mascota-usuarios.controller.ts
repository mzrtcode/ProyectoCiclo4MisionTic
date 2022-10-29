import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  Usuarios,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaUsuariosController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Usuarios> {
    return this.mascotaRepository.usuarios(id);
  }
}
