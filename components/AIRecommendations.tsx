
import React, { useState, useEffect } from 'react';
import { Sparkles, Banana, ArrowRight } from 'lucide-react';
import { getPersonalizedRecommendation } from '../services/gemini';
import { STORE_ITEMS } from '../data';
import { StoreItem } from '../types';

interface AIRecommendationsProps {
  onSelectItem: (item: StoreItem) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ onSelectItem }) => {
  const [playstyle, setPlaystyle] = useState('');
  const [recommendation, setRecommendation] = useState<{ item: StoreItem; reason: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getRec = async () => {
    if (!playstyle.trim()) return;
    setLoading(true);
    try {
      const res = await getPersonalizedRecommendation(playstyle, STORE_ITEMS);
      const item = STORE_ITEMS.find(i => i.id === res.itemId) || STORE_ITEMS[0];
      setRecommendation({ item, reason: res.reason });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-6 border-2 border-yellow-400/20 space-y-4">
      <div className="flex items-center space-x-2 text-yellow-400">
        <Sparkles size={20} />
        <h2 className="font-bold pixel-font text-[10px]">BANANA INTELLIGENCE</h2>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-zinc-500 font-semibold px-1">TELL US YOUR PLAYSTYLE</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={playstyle}
            onChange={(e) => setPlaystyle(e.target.value)}
            placeholder="e.g. I like building huge maps..."
            className="flex-1 bg-zinc-800 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 transition-all outline-none"
          />
          <button
            onClick={getRec}
            disabled={loading}
            className="bg-yellow-400 text-black p-3 rounded-2xl disabled:opacity-50 active:scale-95 transition-all"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" /> : <ArrowRight size={20} />}
          </button>
        </div>
      </div>

      {recommendation && (
        <div 
          onClick={() => onSelectItem(recommendation.item)}
          className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700 flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-2 duration-500 cursor-pointer hover:bg-zinc-800 transition-colors"
        >
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img src={recommendation.item.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-yellow-400">{recommendation.item.name}</h4>
            <p className="text-xs text-zinc-400 line-clamp-2">{recommendation.reason}</p>
          </div>
          <Banana className="text-yellow-400 animate-float" size={24} />
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
