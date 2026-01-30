
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { Activity } from '../types';
import { useLanguage } from '../i18n';

interface ActivityCardProps {
  activity: Activity;
  onClick: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const { t } = useLanguage();
  return (
    <div 
      onClick={() => onClick(activity)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100 mb-4"
    >
      <div className="relative h-48">
        <img src={activity.cover} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">
          {t(`theme.${activity.theme}`)}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="bg-black/40 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={10} /> {activity.duration}
            </span>
            <span className="bg-black/40 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Users size={10} /> {t('card.stock')} {activity.remainingSlots} {t('card.stockUnit')}
            </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 line-clamp-1 mb-1">{activity.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-amber-500 gap-0.5">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{activity.rating}</span>
          </div>
          <span className="text-xs text-slate-400">| {activity.ageRange}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs text-primary font-bold">¥</span>
            <span className="text-xl text-primary font-bold">{activity.price}</span>
            <span className="text-xs text-slate-400 ml-1">{t('detail.perPerson')}</span>
          </div>
          <button className="bg-primary text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-sky-700 active:scale-95 transition-all">
            {t('card.book')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
