import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
  IonContent, IonHeader, IonInput, IonItem, IonLabel, 
  IonTextarea, IonTitle, IonToolbar, IonGrid, IonRow, IonCol 
} from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { Messages } from 'src/app/services/messages';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, 
    IonItem, IonButton, IonTextarea, IonInput, 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonLabel, IonGrid, IonRow, IonCol
  ]
})
export class ContactoPage implements OnInit {
  correo: string = '';
  mensaje: string = '';
  enviado: boolean = false;

  constructor(private servicio: Messages) { }

  ngOnInit() { }

  /**
   * Guarda el mensaje en el servicio (web/móvil)
   */
  guardar() {
    if (this.correo.trim() === '' || this.mensaje.trim() === '') {
      alert('Por favor, completa el correo y el mensaje');
      return;
    }
    this.servicio.guardarMensaje(this.correo, this.mensaje);
    this.enviado = true;
  }

  /**
   * Lee el mensaje guardado
   */
  leer() {
    this.servicio.leerMensaje();
  }

  /**
   * Consulta la plataforma actual (web/móvil)
   */
  consultar() {
    this.servicio.consultarPlataforma();
  }

  /**
   * Envía el mensaje (combina guardar y mostrar confirmación)
   */
  async enviar() {
    console.log("Enviando mensaje...");
    if (this.correo.trim() === '' || this.mensaje.trim() === '') {
      alert('Por favor, completa el correo y el mensaje');
      return;
    }
    this.servicio.guardarMensaje(this.correo, this.mensaje);
    this.enviado = true;
    console.log('Mensaje enviado correctamente');
  }

  /**
   * Borra el correo guardado (solo web)
   */
  borrarCorreo() {
    this.servicio.borrarClaveEspecifica('correo');
    this.correo = '';
    this.enviado = false;
  }

  /**
   * Borra el mensaje guardado (solo web)
   */
  borrarMensaje() {
    this.servicio.borrarClaveEspecifica('mensaje');
    this.mensaje = '';
    this.enviado = false;
  }

  /**
   * Borra todas las claves guardadas (solo web)
   */
  borrarTodo() {
    this.servicio.borrarTodasLasClaves();
    this.correo = '';
    this.mensaje = '';
    this.enviado = false;
  }

}