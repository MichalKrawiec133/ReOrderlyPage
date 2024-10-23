import { User } from "./user.model"; 
import { OrderSubscriptionProducts } from "./order-subscription-products.model"; 

export class OrderSubscription {
    orderSubscriptionId: number;
    user: User; 
    intervalDays: number;
    orderDate: Date; 
    orderSubscriptionProducts: OrderSubscriptionProducts[]; 

    constructor(
        orderSubscriptionId: number,
        user: User,
        intervalDays: number,
        orderDate: Date,
        orderSubscriptionProducts: OrderSubscriptionProducts[] 
    ) {
        this.orderSubscriptionId = orderSubscriptionId;
        this.user = user;
        this.intervalDays = intervalDays;
        this.orderDate = orderDate;
        this.orderSubscriptionProducts = orderSubscriptionProducts; 
    }
}
