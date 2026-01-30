
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LayoutDashboard, ClipboardList, MapPin, Settings, LogOut, Search, MoreHorizontal, Plus, X, Image as ImageIcon, CheckCircle, TrendingUp, Users, Package, Trash2 } from 'lucide-react';
import { Activity, ActivityTheme, Venue } from '../types';
import { useLanguage } from '../i18n';

const data = [
  { name: 'Mon', signups: 12, revenue: 2400 },
  { name: 'Tue', signups: 19, revenue: 3800 },
  { name: 'Wed', signups: 32, revenue: 6400 },
  { name: 'Thu', signups: 25, revenue: 5000 },
  { name: 'Fri', signups: 45, revenue: 9000 },
  { name: 'Sat', signups: 60, revenue: 12000 },
  { name: 'Sun', signups: 55, revenue: 11000 },
];

interface AdminAppProps {
  onExit: () => void;
  activities: Activity[];
  venues: Venue[];
  onAddActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  onAddVenue: (venue: Venue) => void;
  onDeleteVenue: (id: string) => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onExit, activities, venues, onAddActivity, onDeleteActivity, onAddVenue, onDeleteVenue }) => {
  const { t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  
  // 新增活动表单状态
  const [newAct, setNewAct] = useState({
    title: '',
    price: '',
    theme: ActivityTheme.NATURE,
    description: '',
    duration: '1天',
    ageRange: '6-12岁'
  });

  // 新增场地表单状态
  const [newVenue, setNewVenue] = useState({
    name: '',
    type: '会议室',
    capacity: '',
    pricePerHour: '',
    facilities: '',
    address: ''
  });

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const act: Activity = {
      id: 'a' + Date.now(),
      title: newAct.title,
      cover: `https://picsum.photos/seed/${Date.now()}/800/600`,
      price: Number(newAct.price),
      ageRange: newAct.ageRange,
      remainingSlots: 20,
      rating: 5.0,
      theme: newAct.theme,
      duration: newAct.duration,
      itinerary: ['09:00 集合出发', '12:00 午餐时间', '16:00 研学总结', '17:00 愉快返程'],
      description: newAct.description
    };
    onAddActivity(act);
    setShowAddActivityModal(false);
    setNewAct({ title: '', price: '', theme: ActivityTheme.NATURE, description: '', duration: '1天', ageRange: '6-12岁' });
  };

  const handleSubmitVenue = (e: React.FormEvent) => {
    e.preventDefault();
    const venue: Venue = {
      id: 'v' + Date.now(),
      name: newVenue.name,
      type: newVenue.type,
      capacity: Number(newVenue.capacity),
      facilities: newVenue.facilities.split(/[,，]/).map(f => f.trim()).filter(Boolean),
      image: `https://picsum.photos/seed/${Date.now()}_venue/800/600`,
      pricePerHour: Number(newVenue.pricePerHour),
      isAvailable: true,
      address: newVenue.address
    };
    onAddVenue(venue);
    setShowAddVenueModal(false);
    setNewVenue({ name: '', type: '会议室', capacity: '', pricePerHour: '', facilities: '', address: '' });
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{title}</p>
      <div className="text-2xl font-black text-slate-800">{value}</div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* 侧边栏 */}
      <div className="w-72 bg-slate-900 m-4 rounded-[40px] flex flex-col p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">K</div>
          <div>
            <h1 className="text-white font-black text-lg tracking-tight">{t('admin.title')}</h1>
            <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em]">v2.5 Enterprise</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: t('admin.dashboard'), icon: LayoutDashboard },
            { id: 'activities', label: t('admin.activities'), icon: ClipboardList },
            { id: 'venues', label: t('admin.venues'), icon: MapPin },
            { id: 'settings', label: t('admin.settings'), icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeMenu === item.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onExit} className="mt-auto flex items-center gap-4 px-6 py-6 text-slate-500 hover:text-rose-400 border-t border-white/5 transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-bold">{t('admin.exit')}</span>
        </button>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-24 px-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
                {activeMenu === 'dashboard' && t('admin.dashboard')}
                {activeMenu === 'activities' && t('admin.activities')}
                {activeMenu === 'venues' && t('admin.venues')}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Workspace / {activeMenu}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary" size={18} />
              <input type="text" placeholder={t('admin.searchPlaceholder')} className="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-xs font-bold shadow-sm w-64 outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
            {activeMenu === 'activities' && (
              <button 
                onClick={() => setShowAddActivityModal(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:shadow-2xl transition-all active:scale-95"
              >
                <Plus size={18} /> {t('admin.addActivity')}
              </button>
            )}
            {activeMenu === 'venues' && (
              <button 
                onClick={() => setShowAddVenueModal(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:shadow-2xl transition-all active:scale-95"
              >
                <Plus size={18} /> {t('admin.addVenue')}
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-10 pb-10">
          {activeMenu === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-4 gap-6">
                <StatCard title={t('admin.stats.revenue')} value="¥28,450" icon={TrendingUp} color="bg-primary" />
                <StatCard title={t('admin.stats.signups')} value="156" icon={Users} color="bg-secondary" />
                <StatCard title={t('admin.stats.utilization')} value="92.4%" icon={Package} color="bg-amber-500" />
                <StatCard title={t('admin.stats.growth')} value="+42" icon={CheckCircle} color="bg-indigo-500" />
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-800 mb-8 flex items-center justify-between">
                    {t('admin.stats.trend')}
                    <span className="text-[10px] text-slate-300 font-bold uppercase">Update 5m ago</span>
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}} />
                        <Line type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={5} dot={{r:6, fill: '#0284c7', strokeWidth: 4, stroke: '#fff'}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="font-black text-slate-800 mb-6">{t('admin.stats.updates')}</h3>
                    <div className="flex-1 space-y-6">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><ClipboardList size={18}/></div>
                                <div>
                                    <p className="text-xs font-black text-slate-800">New Order #324{i}</p>
                                    <p className="text-[10px] text-slate-400">User: Alex Zhang</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-xs font-black text-emerald-500">+¥299</p>
                                    <p className="text-[8px] text-slate-300">Just now</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'activities' && (
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                        <tr>
                            <th className="px-10 py-6">{t('admin.columns.title')}</th>
                            <th className="px-10 py-6">{t('admin.columns.theme')}</th>
                            <th className="px-10 py-6">{t('admin.columns.price')}</th>
                            <th className="px-10 py-6">{t('admin.columns.stock')}</th>
                            <th className="px-10 py-6 text-right">{t('admin.columns.action')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {activities.map(a => (
                            <tr key={a.id} className="hover:bg-slate-50/30 transition-all group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                            <img src={a.cover} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-sm font-black text-slate-800">{a.title}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg uppercase">{t(`theme.${a.theme}`)}</span>
                                </td>
                                <td className="px-10 py-6 text-sm font-black text-slate-800">¥{a.price}</td>
                                <td className="px-10 py-6 text-sm font-bold text-slate-400">{a.remainingSlots}</td>
                                <td className="px-10 py-6 text-right">
                                    <button 
                                      onClick={() => onDeleteActivity(a.id)}
                                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                                    >
                                      <Trash2 size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}

          {activeMenu === 'venues' && (
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                        <tr>
                            <th className="px-10 py-6">{t('admin.columns.name')}</th>
                            <th className="px-10 py-6">{t('admin.columns.type')}</th>
                            <th className="px-10 py-6">{t('admin.columns.capacity')}</th>
                            <th className="px-10 py-6">{t('admin.columns.pricePerHour')}</th>
                            <th className="px-10 py-6 text-right">{t('admin.columns.action')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {venues.map(v => (
                            <tr key={v.id} className="hover:bg-slate-50/30 transition-all group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                            <img src={v.image} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-sm font-black text-slate-800">{v.name}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg uppercase">{v.type}</span>
                                </td>
                                <td className="px-10 py-6 text-sm font-bold text-slate-400">{v.capacity} {t('detail.persons')}</td>
                                <td className="px-10 py-6 text-sm font-black text-slate-800">¥{v.pricePerHour}/H</td>
                                <td className="px-10 py-6 text-right">
                                    <button 
                                      onClick={() => onDeleteVenue(v.id)}
                                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                                    >
                                      <Trash2 size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </main>
      </div>

      {/* 新增活动模态框 */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-white rounded-[48px] p-10 shadow-2xl relative animate-in zoom-in-95 duration-500">
                <button onClick={() => setShowAddActivityModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-800"><X size={24}/></button>
                <h3 className="text-2xl font-black text-slate-800 mb-8">{t('admin.addActivity')}</h3>
                
                <form onSubmit={handleSubmitActivity} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">课程标题</label>
                            <input 
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                                value={newAct.title}
                                onChange={e => setNewAct({...newAct, title: e.target.value})}
                                placeholder="请输入标题"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">课程单价</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                                value={newAct.price}
                                onChange={e => setNewAct({...newAct, price: e.target.value})}
                                placeholder="¥"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">所属主题</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none"
                                value={newAct.theme}
                                onChange={e => setNewAct({...newAct, theme: e.target.value as any})}
                            >
                                {Object.values(ActivityTheme).map(tKey => <option key={tKey} value={tKey}>{t(`theme.${tKey}`)}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">课程时长</label>
                            <input 
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none"
                                value={newAct.duration}
                                onChange={e => setNewAct({...newAct, duration: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">详情描述</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                            value={newAct.description}
                            onChange={e => setNewAct({...newAct, description: e.target.value})}
                            placeholder="描述该课程的核心价值与特色..."
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full py-5 bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]">
                            确认上架课程
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* 新增场地模态框 */}
      {showAddVenueModal && (
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-white rounded-[48px] p-10 shadow-2xl relative animate-in zoom-in-95 duration-500">
                <button onClick={() => setShowAddVenueModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-800"><X size={24}/></button>
                <h3 className="text-2xl font-black text-slate-800 mb-8">{t('admin.addVenue')}</h3>
                
                <form onSubmit={handleSubmitVenue} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.venueName')}</label>
                            <input 
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                                value={newVenue.name}
                                onChange={e => setNewVenue({...newVenue, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.pricePerHour')}</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                                value={newVenue.pricePerHour}
                                onChange={e => setNewVenue({...newVenue, pricePerHour: e.target.value})}
                                placeholder="¥"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.venueType')}</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none"
                                value={newVenue.type}
                                onChange={e => setNewVenue({...newVenue, type: e.target.value})}
                            >
                                <option value="实验室">实验室</option>
                                <option value="会议室">会议室</option>
                                <option value="户外营地">户外营地</option>
                                <option value="多功能厅">多功能厅</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.capacity')}</label>
                            <input 
                                type="number"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none"
                                value={newVenue.capacity}
                                onChange={e => setNewVenue({...newVenue, capacity: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.address')}</label>
                        <input 
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                            value={newVenue.address}
                            onChange={e => setNewVenue({...newVenue, address: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{t('form.facilities')}</label>
                        <textarea 
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary/20"
                            value={newVenue.facilities}
                            onChange={e => setNewVenue({...newVenue, facilities: e.target.value})}
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full py-5 bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]">
                            {t('form.submitVenue')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminApp;
