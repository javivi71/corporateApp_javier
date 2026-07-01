import { Injectable } from '@angular/core';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class Products {
  
  async getProducts(): Promise<Product[]> {
    const response =
    await fetch('assets/data/products.json');
    const products = await response.json();
    return products;
 }

}
