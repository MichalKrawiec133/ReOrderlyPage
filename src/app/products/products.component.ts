import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; 
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CartProduct } from '../models/cart-product.model';
import { BeginSubscriptionService } from '../services/begin-subscription.service';
import { OrderSubscriptionProducts } from '../models/order-subscription-products.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; 
  
  quantity: { [key: number]: number } = {};
  quantitySubscription: { [key: number]: number } = {};

  constructor(private productService: ProductService, private cartService: CartService, private beginSubscriptionService: BeginSubscriptionService) {}

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
    const qty = this.quantity[product.productId] || 1; 

    if (qty > product.productQuantity) {
        alert(`Nie możesz dodać więcej niż ${product.productQuantity} sztuk tego produktu.`);
        return; 
    } else if (qty < 1){

      alert(`Dodaj minimum 1 sztukę tego produktu.`);
      return;
    }

    const cartProduct = new CartProduct(
        product.productId,
        product.productName,
        product.productPrice,
        product.productQuantity,
        product.imagePath,
        qty
    );

    this.cartService.addToCart(cartProduct);
    

    this.quantity[product.productId] = 1; 

  }


  addToSubscription(product: Product): void {
    const qty = this.quantity[product.productId] || 1; 

    if (qty > product.productQuantity) {
        alert(`Nie możesz dodać więcej niż ${product.productQuantity} sztuk tego produktu.`);
        return; 
    } else if (qty < 1) {
        alert(`Dodaj minimum 1 sztukę tego produktu.`);
        return;
    }

    const beginSubscription = new OrderSubscriptionProducts(
      0,
      product,
      qty
  );

    this.beginSubscriptionService.addToSubscription(beginSubscription); 

    this.quantity[product.productId] = 1; 
}



}

