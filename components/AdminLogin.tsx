
import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 模拟鉴权
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onSuccess();
      } else {
        setError('账号或密码错误，请联系系统管理员');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white rounded-[48px] p-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Staff Portal</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Management Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Username"
              className="w-full bg-slate-50 border-2 border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-bold outline-none focus:border-primary/10 transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="password"
              placeholder="Password"
              className="w-full bg-slate-50 border-2 border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-bold outline-none focus:border-primary/10 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold px-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : 'Authenticate'}
            </button>
          </div>
        </form>

        <p className="text-center text-[10px] text-slate-300 mt-10 font-medium">Kaiyan Study v2.5 Admin Engine</p>
      </div>
    </div>
  );
};

export default AdminLogin;
