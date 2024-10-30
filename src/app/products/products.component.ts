import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; 
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        
      },
      (error) => {
        console.error('Błąd podczas ładowania produktów', error);
      }
    );
  }

  addToCart(product: Product): void {
    // TODO: dodac logike dodawania do koszyka po dodaniu komponentu koszyk. 
    console.log('Dodano do koszyka:', product);
  }
}

