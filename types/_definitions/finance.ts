import { BaseUser } from "./session";

export interface Bill {
  id: string;
  user: BaseUser;
  amount: string;
  purpose: Purpose;
  reference_number: string;
  total_paid: number;
  balance_due: number;
  status: BillStatus;
  created: Date;
}

export enum Purpose {
  SubscriptionFee = "subscription_fee",
}

export enum BillStatus {
  Paid = "paid",
  Partial = "partial",
  Unpaid = "unpaid",
}

export interface Payment {
  id: string;
  admin: BaseUser;
  bill_reference_number: string;
  amount: number;
  status: PaymentStatus;
  created: Date;
}

export enum PaymentStatus {
  Pending = "pending",
  Recieved = "received",
}
