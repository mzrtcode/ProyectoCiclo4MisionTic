import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

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
}

