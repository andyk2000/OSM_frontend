/* eslint-disable prettier/prettier */
interface Service {
  id: number;
  name: string;
  price: number;
  storeId: number;
}

interface paidService {
  item_name: string;
  amount: number;
  date: string;
  user: {
    names: string;
    email: string;
  };
}

export type { Service, paidService };
