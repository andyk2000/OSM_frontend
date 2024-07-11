/* eslint-disable prettier/prettier */
interface StoreInfo {
  id: number;
  name: string;
  address: string;
  description: string;
  userId: number;
  storeUrl: string;
  logo: string;
  email: string;
  phone: string;
}

interface StoreCard {
  revenue: number;
  services: number;
  serviceSold: number;
}

interface NewStore {
  name: string;
  address: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
}

interface StoreTables {
  dataAvailable: boolean;
  tableRecords:{
      id: number;
      item_name: string;
      amount: number;
      userId: number;
      date: string;
      user: {
        names: string;
        email: string;
      };
    },
  bestProduct:
    {
      id: number;
      name: string;
      recurrence: number;
    }
  bestUser: {
      id: number;
      name: string;
      recurrence: number;
    }
}

interface Records {
  id: number;
  item_name: string;
  amount: number;
  userId: number;
  date: string;
  user: {
    names: string;
    email: string;
  };
}
export type { StoreInfo, StoreCard, NewStore, StoreTables, Records };
