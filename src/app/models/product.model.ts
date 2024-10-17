export class Product {
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
  
    constructor(
      productId: number,
      productName: string,
      productPrice: number,
      productQuantity: number
    ) {
      this.productId = productId;
      this.productName = productName;
      this.productPrice = productPrice;
      this.productQuantity = productQuantity;
    }
  }
  