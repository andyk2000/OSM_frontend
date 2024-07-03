/* eslint-disable prettier/prettier */
interface StoreInfo {
  id: number;
  name: string;
  address: string;
  description: string;
  userId: number;
  storeUrl: string;
}

interface StoreCard {
  revenue: number;
  services: number;
  serviceSold: number;
}

export type { StoreInfo, StoreCard };
