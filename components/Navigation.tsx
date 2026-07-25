
import React from 'react';
import { Home, ShoppingBag, User, BarChart2 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'store', icon: ShoppingBag, label: 'Store' },
    { id: 'stats', icon: BarChart2, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 pb-safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              activeTab === tab.id ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <tab.icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
