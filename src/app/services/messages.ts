import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

@Injectable({
  providedIn: 'root',
})
export class Messages {

  // Nombre del fichero donde se guardarán los mensajes (solo para móvil)
  private readonly FILE_NAME = 'mensajes.txt';

  // Claves para localStorage en web
  private readonly KEY_CORREO = 'correo';
  private readonly KEY_MENSAJE = 'mensaje';

  async guardarMensaje(correo: string, mensaje: string) {
    console.log("Función guardarMensaje");
    console.log(correo);
    console.log(mensaje);

    if (Capacitor.getPlatform() == "web") {
      console.log("Estás en navegador");

      // Guardar las claves individuales en localStorage
      localStorage.setItem(this.KEY_CORREO, correo);
      localStorage.setItem(this.KEY_MENSAJE, mensaje);

    } else {
      console.log("Estás en una plataforma móvil");

      const nuevoMensaje = `Correo: ${correo} - Mensaje: ${mensaje}\n`;

      try {
        // Intentamos leer el fichero para saber si existe
        let contenidoExistente: string = '';

        try {
          const resultado = await Filesystem.readFile({
            path: this.FILE_NAME,
            directory: Directory.Documents,
            encoding: Encoding.UTF8
          });
          
          // Asegurarnos de que sea string
          contenidoExistente = typeof resultado.data === 'string' 
            ? resultado.data 
            : resultado.data.toString();

          console.log("Fichero existente, se añadirá al final");
        } catch (readError) {
          // Si falla la lectura, el fichero no existe
          console.log("El fichero no existe, se creará uno nuevo");
          contenidoExistente = '';
        }

        // Escribir el fichero (si existía, se sobreescribe con el contenido antiguo + el nuevo)
        const contenidoFinal = contenidoExistente + nuevoMensaje;

        await Filesystem.writeFile({
          path: this.FILE_NAME,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
          data: contenidoFinal
        });

        console.log("Mensaje guardado correctamente");

      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
      }
    }

  } // guardarMensaje

  async leerMensaje() {
    console.log("Función leerMensaje");

    if (Capacitor.getPlatform() == "web") {
      // Leer las claves individuales
      const correo = localStorage.getItem(this.KEY_CORREO) || 'No hay correo guardado';
      const mensaje = localStorage.getItem(this.KEY_MENSAJE) || 'No hay mensaje guardado';

      console.log(`Correo: ${correo}`);
      console.log(`Mensaje: ${mensaje}`);

      alert(`Correo: ${correo}\nMensaje: ${mensaje}`);

    } else {
      try {
        const resultado = await Filesystem.readFile({
          path: this.FILE_NAME,
          directory: Directory.Documents,
          encoding: Encoding.UTF8
        });

        // Asegurarnos de que sea string
        const contenido = typeof resultado.data === 'string' 
          ? resultado.data 
          : resultado.data.toString();

        console.log(contenido);
        alert(contenido);

      } catch (error) {
        console.log("No hay mensajes guardados o el fichero no existe");
        alert("No hay mensajes guardados");
      }
    }
  }

  /**
   * Borra todas las claves de localStorage (solo para web)
   */
  borrarTodasLasClaves() {
    if (Capacitor.getPlatform() == "web") {
      localStorage.removeItem(this.KEY_CORREO);
      localStorage.removeItem(this.KEY_MENSAJE);
      console.log("Todas las claves han sido borradas");
      alert("Todas las claves han sido borradas");
    } else {
      console.log("Esta función solo está disponible para web");
      alert("Esta función solo está disponible para web");
    }
  }

  /**
   * Borra una clave específica de localStorage (solo para web)
   * @param clave - La clave que se quiere borrar ('correo' o 'mensaje')
   */
  borrarClaveEspecifica(clave: string) {
    if (Capacitor.getPlatform() == "web") {
      const clavesValidas = ['correo', 'mensaje'];
      if (clavesValidas.includes(clave)) {
        localStorage.removeItem(clave);
        console.log(`Clave '${clave}' borrada`);
        alert(`Clave '${clave}' borrada`);
      } else {
        console.log(`Clave '${clave}' no válida. Usa: ${clavesValidas.join(', ')}`);
        alert(`Clave '${clave}' no válida. Usa: ${clavesValidas.join(', ')}`);
      }
    } else {
      console.log("Esta función solo está disponible para web");
      alert("Esta función solo está disponible para web");
    }
  }

  consultarPlataforma() {
    console.log(Capacitor.getPlatform());
    alert(`Plataforma: ${Capacitor.getPlatform()}`);
  }

} // Fin clase