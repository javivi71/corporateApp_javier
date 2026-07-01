import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem,IonButton,IonTextarea,IonInput,IonCardContent,IonCardTitle,IonCardHeader,IonCard]
})
export class ContactoPage implements OnInit {
correo:string = '';
mensaje:string = '';
enviado:boolean = false;


  async enviar() {
     await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
          correo:this.correo,
          mensaje:this.mensaje
          })
   });
  }

async cargarUltimoMensaje() {
  const resultado = await Preferences.get({ key: 'ultimoMensaje' });
  if (resultado.value) {
    const datos = JSON.parse(resultado.value);
    this.correo = datos.correo;
    this.mensaje = datos.mensaje;
    this.enviado = true; // para mostrar la tarjeta con los datos
  } else {
    this.enviado = false;
    console.log('No hay mensaje guardado');
  }
}
  constructor() { }

  ngOnInit() {
  }

}
