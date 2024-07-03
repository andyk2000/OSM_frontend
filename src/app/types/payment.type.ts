/* eslint-disable prettier/prettier */
interface Payment {
  id: number;
  item_name: string;
  storeId: number;
  userId: number;
  amount: number;
  date: Date;
}

interface PaymentCard {
  storeCount: number;
  serviceCount: number;
  totalPayment: number;
}

export type { Payment, PaymentCard };
