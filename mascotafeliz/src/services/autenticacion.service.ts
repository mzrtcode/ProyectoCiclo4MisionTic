import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories'; //Importamos el Repositorio usuario
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuariosRepository) //Inyectamos el repostorio de usuario
    public usuarioRepository: UsuariosRepository

  ) { }

  //Metodo para generar clave
  generarClave() {
    let clave: string = generador(8, false);
    return clave;
  }
  //Metodo para cifrar clave
  cifrarClave(clave: string) {
    let claveCifrada: string = cryptoJS.MD5(clave);
    return claveCifrada;
  }
  //Agregamos este metodo
  identificarUsuario(usuario: string, clave: string) {
    try {
      let user = this.usuarioRepository.findOne({where: {correo: usuario, clave: clave}});
      if (user) return user;
      else return false;

    } catch (e) {
      return false;
    }
  }

  generarTokenJWT(usuario: Usuarios) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre
      }
    },
      Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}

