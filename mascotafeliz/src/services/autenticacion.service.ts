import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { UsuariosRepository } from '../repositories';
import { Llaves } from '../config/llaves';
import { Usuarios } from '../models';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}
  @repository(UsuariosRepository)
  public usuariosRepository : UsuariosRepository 

  /*
   * Add service methods here
   */

  generarClave(){
    let clave = generador(8,false);
    return clave;
  }

  cifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave);
    return claveCifrada;
  }

  IdentificarUsuario(usuario: string, clave:string){
    try{
      let p = this.usuariosRepository.findOne({where:{correo:usuario,clave:clave}});
      if (p){
        return p;
      }
      return false;

    }catch (error) {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuarios){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        nombre : usuario.nombre,
        apellido : usuario.apellido,
        clave : usuario.clave,
        documento : usuario.documento,
        correo : usuario.correo,
        telefono : usuario.telefono,
        rol : usuario.rol
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token : string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos; 
    } catch(error){
      return false;
    }
  }
}
