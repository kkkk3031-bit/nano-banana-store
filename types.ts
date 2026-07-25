
export enum Category {
  VIP = 'VIP',
  KITS = 'Kits',
  COSMETICS = 'Cosmetics',
  BOOSTS = 'Boosts'
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  category: Category;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface User {
  username: string;
  rank: string;
  balance: number;
  ownedItems: string[];
  history: PurchaseRecord[];
}

export interface PurchaseRecord {
  id: string;
  itemName: string;
  date: string;
  price: number;
}

export interface ServerStats {
  onlinePlayers: number;
  maxPlayers: number;
  tps: number;
  recentPurchases: number;
}
