import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Llaves} from '../config/llaves';
import {FotoMascota} from '../models';
import {FotoMascotaRepository} from '../repositories';

export class CargaArchivosController {
  constructor(
    @repository(FotoMascotaRepository)
    private fotoRepository: FotoMascotaRepository
  ) { }



  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenMascota/{id_mascota}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de la mascota.',
      },
    },
  })
  async cargarImagenMascota(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.string("id_mascota") id: string
  ): Promise<object | false> {
    const rutaImagenMascota = path.join(__dirname, Llaves.carpetaImagenMascotas);
    let res = await this.StoreFileToPath(rutaImagenMascota, Llaves.nombreCampoImagenMascota, request, response, Llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let foto = new FotoMascota();
        foto.id_mascota = id;
        foto.nombre = nombre_archivo;
        await this.fotoRepository.save(foto);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }



  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: Llaves.tamMaxImagenMascota
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
