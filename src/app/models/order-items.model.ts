import { Product } from "./product.model";
export class OrderItems{
    orderItemId: number;
    idProduct: number;
    products: Product;
    idOrder: number;
    orderItemQuantity: number;
    orderPrice: number;
  
    constructor(
      orderItemId: number,
      idProduct: number,
      products: Product,
      idOrder: number,
      orderItemQuantity: number,
      orderPrice: number
    ) {
      this.orderItemId = orderItemId;
      this.idProduct = idProduct;
      this.products = products;
      this.idOrder = idOrder;
      this.orderItemQuantity = orderItemQuantity;
      this.orderPrice = orderPrice;
    }
  }