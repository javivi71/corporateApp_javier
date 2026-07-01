import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GeolocationService } from 'src/app/services/geolocation-service';


@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton]
})
export class NosotrosPage implements OnInit {

  oficinaLat  :number = 50;
  oficinaLon  :number = -5;
  actualLat   :number  = 0;
  actualLon   :number  = 0;
  distancia : number | null =null;

  constructor(private geo:GeolocationService) { }

  ngOnInit() {
    
  }

  async verUbicacion(){
    const coordenadas = await this.geo.getCurrentPosition();
    this.actualLat = coordenadas.latitude;
    this.actualLon = coordenadas.longitude;
  }

  calcularDistancia() {
    this.distancia = this.geo.calcularDistancia(this.oficinaLat,this.oficinaLon,this.actualLat,this.actualLon);
  }

} // Clase

