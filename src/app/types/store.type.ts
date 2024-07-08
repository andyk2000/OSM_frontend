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

export type { StoreInfo, StoreCard, NewStore };
