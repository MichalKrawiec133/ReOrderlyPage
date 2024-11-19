import { User } from "./user.model"; 
import { OrderSubscriptionProducts } from "./order-subscription-products.model"; 

export class OrderSubscription {
    orderSubscriptionId: number;
    user: User; 
    intervalDays: number;
    orderDate: string; 
    orderSubscriptionProducts: OrderSubscriptionProducts[]; 

    constructor(
        orderSubscriptionId: number,
        user: User,
        intervalDays: number,
        orderDate: string,
        orderSubscriptionProducts: OrderSubscriptionProducts[] 
    ) {
        this.orderSubscriptionId = orderSubscriptionId;
        this.user = user;
        this.intervalDays = intervalDays;
        this.orderDate = orderDate;
        this.orderSubscriptionProducts = orderSubscriptionProducts; 
    }
}
