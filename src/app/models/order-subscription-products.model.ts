import { Product } from "./product.model"; 

export class OrderSubscriptionProducts {
    orderSubscriptionProductId: number;
    products: Product; 
    productQuantity: number; 

    constructor(
        orderSubscriptionProductId: number,
        products: Product,
        productQuantity: number
    ) {
        this.orderSubscriptionProductId = orderSubscriptionProductId;
        this.products = products; 
        this.productQuantity = productQuantity; 
    }
}
