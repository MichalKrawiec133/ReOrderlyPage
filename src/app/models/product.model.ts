export class Product {
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    imagePath: string;
  
    constructor(
      productId: number,
      productName: string,
      productPrice: number,
      productQuantity: number,
      imagePath: string
    ) {
      this.productId = productId;
      this.productName = productName;
      this.productPrice = productPrice;
      this.productQuantity = productQuantity;
      this.imagePath = imagePath;
    }
  }
  