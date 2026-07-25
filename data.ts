
import { Category, StoreItem, ServerStats } from './types';

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'rank-vip',
    name: 'VIP Rank',
    price: 9.99,
    description: 'Elevate your experience with exclusive lobby access and green name prefix.',
    benefits: ['Green Name Tag', 'Access to /fly in Lobby', 'Priority Queue', '2x Monthly Kits'],
    category: Category.VIP,
    imageUrl: 'https://picsum.photos/seed/vip/400/300',
    rarity: 'Rare'
  },
  {
    id: 'rank-mvp',
    name: 'MVP+ Rank',
    price: 24.99,
    description: 'The ultimate badge of honor on Nano Banana.',
    benefits: ['Golden Name Tag', 'All VIP Perks', 'Nicknaming Permission', 'Special Death Messages'],
    category: Category.VIP,
    imageUrl: 'https://picsum.photos/seed/mvp/400/300',
    rarity: 'Legendary'
  },
  {
    id: 'kit-pvp',
    name: 'Gladiator Kit',
    price: 4.99,
    description: 'Dominate the arena with high-tier diamond gear.',
    benefits: ['Prot IV Diamond Set', 'Sharpness V Sword', '3x Golden Apples'],
    category: Category.KITS,
    imageUrl: 'https://picsum.photos/seed/kit1/400/300',
    rarity: 'Epic'
  },
  {
    id: 'kit-builder',
    name: 'Master Architect',
    price: 3.50,
    description: 'Perfect for creative builders looking for bulk materials.',
    benefits: ['64x Quartz Blocks', '64x Sea Lanterns', 'Access to /worldedit brush'],
    category: Category.KITS,
    imageUrl: 'https://picsum.photos/seed/kit2/400/300',
    rarity: 'Common'
  },
  {
    id: 'cos-banana',
    name: 'Flying Banana Cape',
    price: 12.00,
    description: 'A stylish yellow cape that leaves particle trails.',
    benefits: ['Exclusive Cosmetic', 'Yellow Particle Trail', 'Visible to all players'],
    category: Category.COSMETICS,
    imageUrl: 'https://picsum.photos/seed/cos1/400/300',
    rarity: 'Legendary'
  },
  {
    id: 'boost-exp',
    name: '2x EXP Booster',
    price: 1.99,
    description: 'Double your experience gain for 2 hours.',
    benefits: ['Server-wide Boost', 'Lasts 120 Minutes', 'Stacks with other boosters'],
    category: Category.BOOSTS,
    imageUrl: 'https://picsum.photos/seed/boost/400/300',
    rarity: 'Rare'
  }
];

export const MOCK_SERVER_STATS: ServerStats = {
  onlinePlayers: 432,
  maxPlayers: 1000,
  tps: 19.95,
  recentPurchases: 128
};

export const MOCK_CHART_DATA = [
  { time: '10:00', players: 120, sales: 5 },
  { time: '11:00', players: 250, sales: 12 },
  { time: '12:00', players: 432, sales: 25 },
  { time: '13:00', players: 380, sales: 18 },
  { time: '14:00', players: 410, sales: 30 },
  { time: '15:00', players: 500, sales: 42 },
];
