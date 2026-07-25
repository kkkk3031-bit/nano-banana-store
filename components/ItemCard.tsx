
import React from 'react';
import { StoreItem } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

interface ItemCardProps {
  item: StoreItem;
  onSelect: (item: StoreItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  const rarityColors = {
    Common: 'text-zinc-400',
    Rare: 'text-green-400',
    Epic: 'text-purple-400',
    Legendary: 'text-yellow-400',
  };

  return (
    <div 
      onClick={() => onSelect(item)}
      className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 active:scale-95 transition-all group cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold tracking-widest flex items-center space-x-1">
          <Star size={10} className={rarityColors[item.rarity]} fill="currentColor" />
          <span className={rarityColors[item.rarity]}>{item.rarity.toUpperCase()}</span>
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-bold text-zinc-100 line-clamp-1">{item.name}</h3>
        <p className="text-xs text-zinc-400 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-green-500 font-bold font-mono">${item.price.toFixed(2)}</span>
          <button className="bg-yellow-400 text-black p-2 rounded-xl hover:bg-yellow-300 transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
