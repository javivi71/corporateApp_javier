import { Injectable } from '@angular/core';
import {Capacitor} from '@capacitor/core'
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem'

@Injectable({
  providedIn: 'root',
})
export class Messages {
  
   async guardarMensaje(correo:string, mensaje:string){
    console.log("Función guardarMensaje");
    console.log(correo);
    console.log(mensaje);

    if (Capacitor.getPlatform()=="web"){
      console.log("Estás en navegador");
      localStorage.setItem('correo',correo);
      localStorage.setItem('mensaje',mensaje);
    } else {
      console.log("Estás en mobile");
      const dato = correo;
      
        const archivo = await Filesystem.readFile({
        path:'mensaje.txt',
        directory:Directory.Documents ,
        encoding: Encoding.UTF8
      });

      archivo.data = dato;
      console.log(archivo);

      await Filesystem.writeFile({
        path:'mensaje.txt',
        directory:Directory.Documents ,
        encoding: Encoding.UTF8,
        data: dato        
      });
    }

   } //guardarMensaje
   
   async leerMensaje(){
    console.log("Función leerMensaje")
   }
   
   consultarPlataforma(){
      console.log(Capacitor.getPlatform());
   }
    
} // Fin clase
