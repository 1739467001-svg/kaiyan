
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, Users, Calendar, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', signups: 12, revenue: 2400 },
  { name: 'Tue', signups: 19, revenue: 3800 },
  { name: 'Wed', signups: 32, revenue: 6400 },
  { name: 'Thu', signups: 25, revenue: 5000 },
  { name: 'Fri', signups: 45, revenue: 9000 },
  { name: 'Sat', signups: 60, revenue: 12000 },
  { name: 'Sun', signups: 55, revenue: 11000 },
];

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-slate-500 font-medium">{title}</span>
      <div className={`p-2 rounded-lg ${color} text-white`}>
        <Icon size={16} />
      </div>
    </div>
    <div className="text-xl font-bold text-slate-800">{value}</div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="今日报名" value="24" icon={Users} color="bg-primary" />
        <StatCard title="今日营收" value="¥4,800" icon={TrendingUp} color="bg-secondary" />
        <StatCard title="场地预约" value="8" icon={Calendar} color="bg-amber-500" />
        <StatCard title="累计会员" value="1,248" icon={Package} color="bg-indigo-500" />
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4">营收走势 (本周)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} dot={{ r: 4, fill: '#0284c7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4">报名人数分布</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="signups" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
