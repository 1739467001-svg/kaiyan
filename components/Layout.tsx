
import React from 'react';
import { Home, Compass, MapPin, User, ChevronLeft, Languages } from 'lucide-react';
import { useLanguage } from '../i18n';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  hideNav?: boolean;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, showBack, onBack, title, hideNav, hideHeader }) => {
  const { t, toggleLanguage, language } = useLanguage();

  const tabs = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'activities', label: t('nav.activities'), icon: Compass },
    { id: 'venues', label: t('nav.venues'), icon: MapPin },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 shadow-2xl overflow-hidden relative border-x border-slate-100">
      {/* Header */}
      {!hideHeader && (
        <header className="sticky top-0 z-50 glass-morphism px-6 py-4 flex items-center justify-between border-b border-slate-100/50">
          {showBack ? (
            <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">开</div>
              <div>
                  <h1 className="text-base font-black text-slate-800 tracking-tight leading-none mb-1">
                  {title || (language === 'zh' ? "开堰研学" : "Kaiyan Study")}
                  </h1>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Digital Learning Platform</p>
              </div>
            </div>
          )}
          {!showBack && (
              <button 
                onClick={toggleLanguage}
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors shadow-sm"
              >
                  {language === 'zh' ? <span className="text-xs font-black">EN</span> : <span className="text-xs font-black">中</span>}
              </button>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
        {children}
      </main>

      {/* Navigation Bar */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-slate-100 flex items-center px-2 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-[100]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col items-center justify-center gap-1 group relative transition-all duration-300"
              >
                <div className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-primary text-white shadow-lg shadow-primary/30 -translate-y-1' : 'text-slate-400 group-hover:bg-slate-50'
                }`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-black transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-400'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Layout;
