
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import ActivityCard from './components/ActivityCard';
import AdminApp from './components/AdminApp';
import AdminLogin from './components/AdminLogin';
import { getMockActivities, getMockVenues } from './constants';
import { Activity, Venue, ActivityTheme, AppRole, Order, OrderStatus } from './types';
import { Search, MapPin, Calendar, Clock, ChevronRight, FileText, CheckCircle, Users, Star, ChevronLeft, ShieldCheck, Heart, ClipboardList, Phone, User as UserIcon, X, LogIn, QrCode, MessageCircle } from 'lucide-react';
import { useLanguage } from './i18n';

const App: React.FC = () => {
  const { t, language } = useLanguage();
  // 核心权限状态
  const [role, setRole] = useState<AppRole>('user');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // 核心数据状态 (提升到顶层以便多端同步)
  const [activities, setActivities] = useState<Activity[]>(getMockActivities('zh'));
  const [venues, setVenues] = useState<Venue[]>(getMockVenues('zh'));
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Update data when language changes
  useEffect(() => {
    setActivities(getMockActivities(language));
    setVenues(getMockVenues(language));
  }, [language]);

  // UI 导航状态
  const [activeTab, setActiveTab] = useState('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [viewingTicket, setViewingTicket] = useState<Order | null>(null); // New state for ticket modal
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ActivityTheme | 'all'>('all');

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTheme = selectedTheme === 'all' || a.theme === selectedTheme;
      return matchSearch && matchTheme;
    });
  }, [activities, searchQuery, selectedTheme]);

  // 处理管理员登录
  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setRole('admin');
    setShowLogin(false);
  };

  // 处理退出管理模式
  const handleExitAdmin = () => {
    setRole('user');
    setIsAdminAuthenticated(false);
  };

  // 增加/删除活动的回调
  const handleAddActivity = (newActivity: Activity) => {
    setActivities([newActivity, ...activities]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  // 增加/删除场地的回调
  const handleAddVenue = (newVenue: Venue) => {
    setVenues([newVenue, ...venues]);
  };

  const handleDeleteVenue = (id: string) => {
    setVenues(venues.filter(v => v.id !== id));
  };

  // 如果是管理模式且已授权
  if (role === 'admin' && isAdminAuthenticated) {
    return (
      <AdminApp 
        onExit={handleExitAdmin} 
        activities={activities}
        venues={venues} 
        onAddActivity={handleAddActivity}
        onDeleteActivity={handleDeleteActivity}
        onAddVenue={handleAddVenue}
        onDeleteVenue={handleDeleteVenue}
      />
    );
  }

  // 预约确认逻辑
  const confirmBooking = () => {
    const item = selectedActivity || selectedVenue;
    if (!item) return;

    const newOrder: Order = {
      id: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      type: selectedActivity ? 'activity' : 'venue',
      itemId: item.id,
      title: 'name' in item ? item.name : item.title,
      amount: 'price' in item ? item.price : item.pricePerHour,
      date: formData.date,
      status: OrderStatus.PENDING_JOIN,
      userName: formData.name,
      userPhone: formData.phone,
      bookingTime: new Date().toLocaleString()
    };

    setOrders([newOrder, ...orders]);
    setShowBookingForm(false);
    setShowBookingSuccess(true);
    
    setTimeout(() => {
        setShowBookingSuccess(false);
        setSelectedActivity(null);
        setSelectedVenue(null);
        setActiveTab('profile');
        setFormData({ name: '', phone: '', date: '' }); // 重置表单
    }, 2000);
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="px-4 mt-4">
        <div className="relative h-44 rounded-3xl overflow-hidden shadow-lg shadow-blue-100">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-xl font-extrabold mb-1">{t('app.banner.title')}</h2>
            <p className="text-white/70 text-[10px] tracking-widest uppercase">Kaiyan Education & Innovation</p>
          </div>
        </div>
      </div>

      <div className="px-4 grid grid-cols-4 gap-4">
        {[
          { label: t('app.menu.courses'), icon: '⛺', color: 'bg-orange-50 text-orange-600' },
          { label: t('app.menu.venues'), icon: '🏛️', color: 'bg-emerald-50 text-emerald-600' },
          { label: t('app.menu.mentors'), icon: '👨‍🏫', color: 'bg-blue-50 text-blue-600' },
          { label: t('app.menu.admin'), icon: '🔑', color: 'bg-slate-100 text-slate-800', action: () => setShowLogin(true) },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2" onClick={() => item.action ? item.action() : (idx === 1 && setActiveTab('venues'))}>
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 active:scale-90 transition-all cursor-pointer`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-800">{t('app.recommend')}</h2>
          <button onClick={() => setActiveTab('activities')} className="text-xs text-primary font-bold">{t('app.viewMore')}</button>
        </div>
        <div className="space-y-4">
          {activities.slice(0, 3).map(activity => (
            <ActivityCard key={activity.id} activity={activity} onClick={setSelectedActivity} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-4 space-y-6 pb-20">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-4 border-slate-50 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <div>
                <h2 className="text-lg font-black text-slate-800">张三</h2>
                <p className="text-[10px] text-slate-400">{t('profile.joined')} 128 {t('profile.days')}</p>
            </div>
        </div>
        <button onClick={() => setShowLogin(true)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-primary hover:bg-primary/5 transition-all">
            <ShieldCheck size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-slate-800 flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" />
            {t('profile.bookings')} ({orders.length})
        </h3>
        {orders.length === 0 ? (
            <div className="bg-white rounded-[32px] p-12 text-center border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={24} className="text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t('profile.noBookings')}</p>
            </div>
        ) : (
            <div className="space-y-3">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase mb-1 inline-block ${order.type === 'activity' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {order.type === 'activity' ? 'Activity' : 'Venue'}
                                </span>
                                <h4 className="font-bold text-slate-800 text-sm">{order.title}</h4>
                            </div>
                            <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg uppercase tracking-wider">{order.status}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="text-[10px] text-slate-400 font-bold uppercase">
                                <p className="flex items-center gap-1 mb-1"><Calendar size={10} /> {order.date}</p>
                                <p className="font-mono">#{order.id}</p>
                            </div>
                            <button onClick={() => setViewingTicket(order)} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest active:scale-95 transition-transform">{t('profile.viewTicket')}</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-2 border border-slate-100">
          <button onClick={() => setShowLogin(true)} className="w-full flex items-center gap-4 p-4 hover:bg-rose-50 rounded-2xl transition-colors text-slate-500 hover:text-rose-500">
              <LogIn size={20} />
              <span className="text-sm font-bold">{t('profile.adminEntry')}</span>
          </button>
      </div>
    </div>
  );

  const isDetailView = !!selectedActivity || !!selectedVenue;

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      hideNav={isDetailView}
      hideHeader={isDetailView}
    >
      {/* 登录弹窗 */}
      {showLogin && (
        <AdminLogin 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleAdminLoginSuccess} 
        />
      )}

      {/* 票据详情弹窗 */}
      {viewingTicket && (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="bg-primary p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h3 className="text-lg font-black uppercase tracking-widest relative z-10">{t('ticket.title')}</h3>
                <p className="text-[10px] opacity-80 font-mono mt-1 relative z-10">{viewingTicket.id}</p>
                <button onClick={() => setViewingTicket(null)} className="absolute top-4 right-4 bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors z-20">
                    <X size={16} />
                </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-black text-slate-800 leading-tight">{viewingTicket.title}</h2>
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase ${viewingTicket.type === 'activity' ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        {viewingTicket.type === 'activity' ? t('nav.activities') : t('nav.venues')} Ticket
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('ticket.time')}</p>
                            <p className="text-sm font-black text-slate-800">{viewingTicket.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <UserIcon size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('ticket.visitor')}</p>
                            <p className="text-sm font-black text-slate-800">{viewingTicket.userName} <span className="text-slate-400 font-normal">({viewingTicket.userPhone})</span></p>
                        </div>
                    </div>
                </div>

                {/* Organizer Info */}
                <div className="border-t-2 border-dashed border-slate-100 pt-6">
                    <p className="text-[10px] font-black text-slate-300 uppercase text-center mb-4">{t('ticket.organizer')}</p>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex-1 bg-blue-50 p-3 rounded-xl flex flex-col items-center gap-1">
                            <Phone size={16} className="text-blue-500 mb-1" />
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Phone</p>
                            <p className="text-[10px] font-black text-slate-800">138-0000-0000</p>
                        </div>
                        <div className="flex-1 bg-emerald-50 p-3 rounded-xl flex flex-col items-center gap-1">
                            <MessageCircle size={16} className="text-emerald-500 mb-1" />
                            <p className="text-[8px] font-bold text-slate-400 uppercase">WeChat</p>
                            <p className="text-[10px] font-black text-slate-800">kaiyan_admin</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center pt-2 gap-2">
                    <div className="bg-slate-900 p-2 rounded-xl shadow-xl">
                        <QrCode size={64} className="text-white" />
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-300 uppercase">{t('ticket.scan')}</p>
                </div>
            </div>
            </div>
        </div>
      )}

      {/* 预约弹窗 */}
      {showBookingForm && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end justify-center">
            <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 space-y-6 animate-in slide-in-from-bottom duration-500 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t('booking.title')}</h2>
                    <button onClick={() => setShowBookingForm(false)} className="text-slate-300 hover:text-slate-800"><X size={24}/></button>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">{t('booking.item')}</p>
                        <p className="text-sm font-bold text-slate-800">{selectedActivity?.title || selectedVenue?.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t('booking.name')}</label>
                      <input 
                          className="w-full bg-slate-50 p-4 rounded-2xl text-sm font-bold outline-none border border-slate-100 focus:border-primary" 
                          placeholder={t('booking.namePlaceholder')} 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t('booking.phone')}</label>
                      <input 
                          className="w-full bg-slate-50 p-4 rounded-2xl text-sm font-bold outline-none border border-slate-100 focus:border-primary" 
                          placeholder={t('booking.phonePlaceholder')} 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                </div>
                <button onClick={confirmBooking} className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform">{t('booking.submit')}</button>
            </div>
        </div>
      )}

      {showBookingSuccess && (
        <div className="fixed inset-0 z-[250] bg-white flex flex-col items-center justify-center p-12">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">{t('booking.success')}</h2>
            <p className="text-slate-400 text-sm text-center">{t('booking.successDesc')}</p>
        </div>
      )}
      
      {selectedActivity ? (
        <div className="bg-white min-h-full pb-24">
            <div className="relative h-80">
                <img src={selectedActivity.cover} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedActivity(null)} className="absolute top-6 left-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20 hover:scale-105 transition-transform"><ChevronLeft size={28} /></button>
            </div>
            <div className="p-8 -mt-12 bg-white rounded-t-[48px] relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg uppercase">{t(`theme.${selectedActivity.theme}`)}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-800 mb-6">{selectedActivity.title}</h1>
                <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-50">
                    <div className="text-center">
                        <p className="text-[8px] font-black text-slate-300 uppercase mb-1">{t('detail.duration')}</p>
                        <p className="text-sm font-black text-slate-800">{selectedActivity.duration}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-black text-slate-300 uppercase mb-1">{t('detail.rating')}</p>
                        <p className="text-sm font-black text-amber-500 flex items-center justify-center gap-1"><Star size={14} fill="currentColor"/>{selectedActivity.rating}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-black text-slate-300 uppercase mb-1">{t('detail.stock')}</p>
                        <p className="text-sm font-black text-rose-500">{selectedActivity.remainingSlots}</p>
                    </div>
                </div>
                <div className="py-8">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">{t('detail.description')}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{selectedActivity.description}</p>
                </div>
            </div>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl p-6 flex items-center justify-between border-t border-slate-100 z-[120]">
                <span className="text-2xl font-black text-slate-800">¥{selectedActivity.price}</span>
                <button onClick={() => { setFormData({...formData, date: '2024-11-15'}); setShowBookingForm(true); }} className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all">{t('detail.bookNow')}</button>
            </div>
        </div>
      ) : selectedVenue ? (
        <div className="bg-white min-h-full pb-24">
            <div className="relative h-64">
                <img src={selectedVenue.image} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedVenue(null)} className="absolute top-6 left-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20 hover:scale-105 transition-transform"><ChevronLeft size={28} /></button>
            </div>
            <div className="p-8 -mt-8 bg-white rounded-t-[40px] relative z-10">
                <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedVenue.name}</h2>
                <p className="text-xs text-slate-400 mb-8 flex items-center gap-2"><MapPin size={14}/>{selectedVenue.address}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-emerald-50 p-4 rounded-3xl">
                        <p className="text-[8px] font-black text-emerald-600 uppercase mb-1">{t('detail.capacity')}</p>
                        <p className="text-sm font-black text-emerald-800">{selectedVenue.capacity} {t('detail.persons')}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl">
                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">{t('detail.pricing')}</p>
                        <p className="text-sm font-black text-slate-800">¥{selectedVenue.pricePerHour}{t('detail.perHour')}</p>
                    </div>
                </div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">{t('detail.facilities')}</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedVenue.facilities.map(f => <span key={f} className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-xl border border-slate-100">{f}</span>)}
                </div>
            </div>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 z-[120]">
                <button onClick={() => { setFormData({...formData, date: '09:00 - 12:00'}); setShowBookingForm(true); }} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all">{t('detail.reserve')}</button>
            </div>
        </div>
      ) : (
        <>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'activities' && (
            <div className="p-4 space-y-4">
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder={t('app.searchPlaceholder')} className="w-full bg-white border-2 border-slate-50 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold shadow-sm outline-none focus:border-primary/10 transition-all" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                    {['all', ...Object.values(ActivityTheme)].map(tKey => (
                        <button key={tKey} onClick={() => setSelectedTheme(tKey as any)} className={`px-6 py-2.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${selectedTheme === tKey ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-slate-400 border border-slate-100'}`}>
                            {tKey === 'all' ? t('app.allThemes') : t(`theme.${tKey}`)}
                        </button>
                    ))}
                </div>
                <div className="space-y-4">
                    {filteredActivities.map(a => <ActivityCard key={a.id} activity={a} onClick={setSelectedActivity} />)}
                </div>
            </div>
          )}
          {activeTab === 'venues' && (
             <div className="p-4 space-y-6">
                {venues.map(v => (
                    <div key={v.id} onClick={() => setSelectedVenue(v)} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-50 cursor-pointer group hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500">
                        <div className="relative h-56 overflow-hidden">
                            <img src={v.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-2xl text-[8px] font-black text-slate-800 uppercase tracking-widest shadow-xl">{v.type}</div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 mb-1">{v.name}</h3>
                                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">{v.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-primary">¥{v.pricePerHour}</p>
                                    <p className="text-[8px] font-black text-slate-300 uppercase">{t('detail.perHour')}</p>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-800 text-[10px] font-black rounded-2xl uppercase tracking-widest transition-all">{t('detail.detailsBooking')}</button>
                        </div>
                    </div>
                ))}
             </div>
          )}
          {activeTab === 'profile' && renderProfile()}
        </>
      )}
    </Layout>
  );
};

export default App;
