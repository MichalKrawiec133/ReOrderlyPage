import { User } from "./user.model"; 
import { Product } from "./product.model"; 

export class OrderSubscription {
    orderSubscriptionId: number;
    idUser: number;
    user: User; 
    idProduct: number;
    products: Product;
    productQuantity: number;
    intervalDays: number;
    orderDate: Date; 

    constructor(
        orderSubscriptionId: number,
        idUser: number,
        user: User,
        idProduct: number,
        products: Product,
        productQuantity: number,
        intervalDays: number,
        orderDate: Date
    ) {
        this.orderSubscriptionId = orderSubscriptionId;
        this.idUser = idUser;
        this.user = user;
        this.idProduct = idProduct;
        this.products = products;
        this.productQuantity = productQuantity;
        this.intervalDays = intervalDays;
        this.orderDate = orderDate;
    }
}
