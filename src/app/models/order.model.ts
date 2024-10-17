import { OrderItems } from "./order-items.model";
import { OrderStatus } from "./order-status.model";
export class Order {
    orderId: number;
    idUser: number;
    orderDate: Date;
    orderStatus: OrderStatus;
    orderItems: OrderItems[];
  
    constructor(
      orderId: number,
      idUser: number,
      orderDate: Date,
      orderStatus: OrderStatus,
      orderItems: OrderItems[]
    ) {
      this.orderId = orderId;
      this.idUser = idUser;
      this.orderDate = orderDate;
      this.orderStatus = orderStatus;
      this.orderItems = orderItems;
    }
  }
  