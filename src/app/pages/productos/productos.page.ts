import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Products } from 'src/app/services/products';
import { Product } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid,IonRow,IonCol]
})
export class ProductosPage implements OnInit {

  productos:Product[] = [];

  constructor(private servicio:Products) { }

  async ngOnInit() {
    this.productos = await this.servicio.getProducts();
  }

}
