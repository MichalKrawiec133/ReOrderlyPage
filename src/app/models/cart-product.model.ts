export class CartProduct {
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    imagePath: string;
    quantityToAdd: number;
  
    constructor(
      productId: number,
      productName: string,
      productPrice: number,
      productQuantity: number,
      imagePath: string,
      quantityToAdd: number,
    ) {
      this.productId = productId;
      this.productName = productName;
      this.productPrice = productPrice;
      this.productQuantity = productQuantity;
      this.imagePath = imagePath;
      this.quantityToAdd = quantityToAdd;
    }
  }
  