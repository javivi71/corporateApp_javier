import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem,IonButton,IonTextarea,IonInput]
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

  async obtenerPreferencia(key:string){
    const result = await Preferences.get({key});
    return result.value;
  }
  constructor() { }

  ngOnInit() {
  }

}
