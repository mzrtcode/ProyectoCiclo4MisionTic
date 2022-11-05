import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuarios } from '../models';
import { UsuariosRepository } from '../repositories';
import { Llaves } from '../config/Llaves';
const generador = require('password-generator')
const cryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuariosRepository)
    public usuarioRepository: UsuariosRepository
  ) {}
   /* 
   * Add service methods here
   */
  
  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let ClaveCifrada = cryptoJS.MD5(clave).toString();
    return ClaveCifrada;
  }

  IdentificarUsuario(usuario:string,clave:string){
     try{
        let p = this.usuarioRepository.findOne({where:{correo:usuario,clave:clave}})
        if(p){
          return p;
        }
          return false;
     }catch{
        return false;
     }
  }
  //El error puede estar aqui
  GenerarTokenJWT(Usuarios:Usuarios){
      let token = jwt.sign({
        date:{
          id:Usuarios.id,
          correo:Usuarios.correo,
          nombre:Usuarios.nombre + "" + Usuarios.apellido
        }

      },
      Llaves.claveJWT);
      return token;  
  }
  ValidarTokenJWT(token:string){
    try{
      let datos = jwt.verify(token,Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
