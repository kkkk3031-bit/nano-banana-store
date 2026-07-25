
import React, { useState, useEffect } from 'react';
import { Category, StoreItem, User as UserType } from './types';
import { STORE_ITEMS, MOCK_SERVER_STATS, MOCK_CHART_DATA } from './data';
import Navigation from './components/Navigation';
import ItemCard from './components/ItemCard';
import AIRecommendations from './components/AIRecommendations';
import { 
  Users, 
  Activity, 
  ShoppingBag, 
  User, 
  ArrowLeft, 
  Share2, 
  CreditCard, 
  Lock,
  Banana,
  LogOut,
  // Added Star to imports to fix the error on line 141
  Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [isSplash, setIsSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) setIsLoggedIn(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nano Banana Store',
        text: `Check out this ${selectedItem?.name} on Nano Banana Store!`,
        url: window.location.href,
      });
    }
  };

  if (isSplash) {
    return (
      <div className="fixed inset-0 banana-gradient flex flex-col items-center justify-center space-y-6 z-50">
        <div className="bg-white p-6 rounded-[2rem] shadow-2xl animate-bounce">
          <Banana size={80} className="text-yellow-400 fill-yellow-400" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="pixel-font text-white text-xl mc-shadow tracking-tighter">NANO BANANA</h1>
          <p className="text-zinc-900/60 font-bold uppercase tracking-[0.3em] text-[10px]">Mobile Store</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="pixel-font text-yellow-400 text-lg">WELCOME BACK</h2>
          <p className="text-zinc-500 text-xs">Enter your Minecraft username to continue</p>
        </div>
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-2 flex items-center space-x-3 focus-within:border-yellow-400 transition-all">
            <div className="bg-zinc-800 p-3 rounded-2xl">
              <User className="text-zinc-400" size={24} />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border-none w-full text-zinc-100 outline-none font-bold"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-5 rounded-3xl active:scale-95 transition-all shadow-xl shadow-yellow-400/10"
          >
            LAUNCH STORE
          </button>
        </form>
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center max-w-[200px]">
          By continuing you agree to the banana rules and server guidelines
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 max-w-lg mx-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
            <Banana size={20} className="text-black" />
          </div>
          <div>
            <h1 className="pixel-font text-[10px] text-zinc-100 tracking-tighter leading-none">NANO BANANA</h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase">Server Store</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">432 ON</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 space-y-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Greeting */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-zinc-100">Hey, {username}! 👋</h2>
              <p className="text-zinc-500 text-sm">Ready to boost your Minecraft experience?</p>
            </div>

            {/* AI Section */}
            <AIRecommendations onSelectItem={(item) => setSelectedItem(item)} />

            {/* Top Categories Shortcut */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => { setActiveTab('store'); setSelectedCategory(Category.VIP); }}
                className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between aspect-square active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Star className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">VIP Ranks</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Browse Exclusives</p>
                </div>
              </div>
              <div 
                onClick={() => { setActiveTab('store'); setSelectedCategory(Category.KITS); }}
                className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between aspect-square active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-green-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">New Kits</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Combat Ready</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'store' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-zinc-100">Browse Store</h2>
            
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {['All', ...Object.values(Category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STORE_ITEMS
                .filter(i => selectedCategory === 'All' || i.category === selectedCategory)
                .map(item => (
                  <ItemCard key={item.id} item={item} onSelect={(i) => setSelectedItem(i)} />
                ))
              }
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-zinc-100">Server Activity</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-2">
                <Users className="text-blue-400" size={20} />
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-zinc-100">{MOCK_SERVER_STATS.onlinePlayers}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Players Online</p>
                </div>
              </div>
              <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-2">
                <Activity className="text-green-400" size={20} />
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-zinc-100">{MOCK_SERVER_STATS.tps.toFixed(1)}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Server TPS</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-400 uppercase mb-6 tracking-widest">Player Traffic (24h)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                      itemStyle={{ color: '#facc15' }}
                    />
                    <Area type="monotone" dataKey="players" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorPlayers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400/20 p-3 rounded-2xl">
                  <ShoppingBag className="text-yellow-400" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100">{MOCK_SERVER_STATS.recentPurchases}</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Items bought today</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-center border border-zinc-800 space-y-4">
              <div className="relative inline-block">
                <img 
                  src={`https://minotar.net/helm/${username}/128`} 
                  alt={username} 
                  className="w-24 h-24 rounded-3xl shadow-2xl border-4 border-zinc-800 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-xl border-4 border-zinc-900">
                  <Banana size={16} className="text-black" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">{username}</h2>
                <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Default Rank</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-2">Account Options</h3>
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 divide-y divide-zinc-800">
                <button className="w-full px-6 py-4 flex items-center justify-between group active:bg-zinc-800 transition-all first:rounded-t-3xl last:rounded-b-3xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-zinc-800 p-2 rounded-xl group-hover:bg-zinc-700">
                      <ShoppingBag size={20} className="text-zinc-300" />
                    </div>
                    <span className="font-bold text-zinc-300">Purchase History</span>
                  </div>
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full px-6 py-4 flex items-center justify-between group active:bg-zinc-800 transition-all text-red-400"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-zinc-800 p-2 rounded-xl group-hover:bg-zinc-700">
                      <LogOut size={20} />
                    </div>
                    <span className="font-bold">Log Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex flex-col p-6 animate-in slide-in-from-bottom-10 duration-500">
          <button 
            onClick={() => setSelectedItem(null)}
            className="self-start bg-zinc-900 p-3 rounded-2xl border border-zinc-800 mb-6 active:scale-95 transition-all"
          >
            <ArrowLeft size={24} className="text-zinc-100" />
          </button>
          
          <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-zinc-800">
              <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-yellow-400 font-bold text-xs tracking-widest uppercase">{selectedItem.category}</span>
                  <h2 className="text-3xl font-bold text-zinc-100">{selectedItem.name}</h2>
                </div>
                <button onClick={handleShare} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl hover:bg-white/20 transition-all">
                  <Share2 size={24} className="text-white" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Description</h3>
                <p className="bg-zinc-900 p-5 rounded-3xl text-zinc-400 text-sm leading-relaxed border border-zinc-800">
                  {selectedItem.description}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Key Benefits</h3>
                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
                  {selectedItem.benefits.map((benefit, idx) => (
                    <div key={idx} className="px-6 py-4 flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-zinc-300 text-sm font-semibold">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 font-bold uppercase">Price</p>
              <p className="text-2xl font-bold text-zinc-100 font-mono">${selectedItem.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="bg-yellow-400 text-black px-12 py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-yellow-400/20 active:scale-95 transition-all"
            >
              BUY NOW
            </button>
          </div>
        </div>
      )}

      {/* Checkout Drawer */}
      {showCheckout && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-zinc-900 rounded-t-[3rem] p-8 space-y-8 animate-in slide-in-from-bottom-20 duration-500 shadow-2xl">
            <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto" />
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-zinc-100">Secure Checkout</h2>
              <p className="text-zinc-500 text-sm">Payment for: <span className="text-zinc-100 font-bold">{selectedItem?.name}</span></p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-zinc-800 p-5 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-yellow-400 active:scale-95 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-700 p-3 rounded-2xl">
                    <CreditCard size={24} className="text-zinc-300" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-zinc-100">Credit / Debit Card</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Visa, Mastercard, AMEX</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-yellow-400" />
              </button>

              <button className="w-full bg-zinc-800 p-5 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-yellow-400 active:scale-95 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-700 p-3 rounded-2xl">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6 w-auto" alt="PayPal" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-zinc-100">PayPal Express</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Instant Delivery</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-yellow-400" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              <Lock size={12} />
              <span>SSL Secure Encrypted Transaction</span>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-zinc-800 text-zinc-400 py-5 rounded-3xl font-bold active:scale-95 transition-all"
              >
                CANCEL
              </button>
              <button 
                onClick={() => {
                  alert("Purchase simulated successfully! The item will be delivered to your account instantly on Nano Banana.");
                  setShowCheckout(false);
                  setSelectedItem(null);
                }}
                className="flex-1 bg-yellow-400 text-black py-5 rounded-3xl font-bold active:scale-95 transition-all"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navigation activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
};

export default App;
