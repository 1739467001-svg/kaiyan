
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.activities': { zh: '研学', en: 'Activities' },
  'nav.venues': { zh: '场地', en: 'Venues' },
  'nav.profile': { zh: '我的', en: 'Profile' },
  
  // App Home
  'app.banner.title': { zh: '开启智慧研学新体验', en: 'Discover Smart Learning' },
  'app.menu.courses': { zh: '研学课程', en: 'Courses' },
  'app.menu.venues': { zh: '场地预约', en: 'Venues' },
  'app.menu.mentors': { zh: '导师团队', en: 'Mentors' },
  'app.menu.admin': { zh: '管理入口', en: 'Admin' },
  'app.recommend': { zh: '热门研学推荐', en: 'Popular Activities' },
  'app.viewMore': { zh: '查看更多', en: 'View More' },
  'app.searchPlaceholder': { zh: '搜索研学活动...', en: 'Search activities...' },
  'app.allThemes': { zh: '全部主题', en: 'All Themes' },

  // Themes
  'theme.nature': { zh: '自然探索', en: 'Nature' },
  'theme.history': { zh: '人文历史', en: 'History' },
  'theme.science': { zh: '科技实践', en: 'Science' },
  'theme.art': { zh: '艺术创作', en: 'Art' },

  // Profile
  'profile.joined': { zh: '已加入开堰研学', en: 'Member for' },
  'profile.days': { zh: '天', en: 'days' },
  'profile.bookings': { zh: '我的预约记录', en: 'My Bookings' },
  'profile.noBookings': { zh: '暂无预约', en: 'No Bookings Yet' },
  'profile.viewTicket': { zh: '查看票据', en: 'View Ticket' },
  'profile.adminEntry': { zh: '员工后台入口', en: 'Staff Portal Entry' },
  
  // Booking
  'booking.title': { zh: '确认预约信息', en: 'Confirm Booking' },
  'booking.item': { zh: '预约项目', en: 'Item' },
  'booking.name': { zh: '预订人姓名', en: 'Your Name' },
  'booking.namePlaceholder': { zh: '请输入真实姓名', en: 'Enter your name' },
  'booking.phone': { zh: '联系电话', en: 'Phone Number' },
  'booking.phonePlaceholder': { zh: '请输入手机号码', en: 'Enter phone number' },
  'booking.submit': { zh: '确认提交预约', en: 'Submit Booking' },
  'booking.success': { zh: '预约成功!', en: 'Success!' },
  'booking.successDesc': { zh: '您的预约申请已提交给团队审核。', en: 'Your request has been submitted.' },
  
  // Detail
  'detail.duration': { zh: '时长', en: 'Duration' },
  'detail.rating': { zh: '评分', en: 'Rating' },
  'detail.stock': { zh: '剩余名额', en: 'Stock' },
  'detail.description': { zh: '活动详情', en: 'Description' },
  'detail.bookNow': { zh: '立即预约', en: 'Book Now' },
  'detail.capacity': { zh: '容纳人数', en: 'Capacity' },
  'detail.pricing': { zh: '参考价格', en: 'Pricing' },
  'detail.facilities': { zh: '配套设施', en: 'Facilities' },
  'detail.reserve': { zh: '预约场地', en: 'Reserve Venue' },
  'detail.persons': { zh: '人', en: 'Persons' },
  'detail.perHour': { zh: '元/小时', en: '¥/H' },
  'detail.perPerson': { zh: '元/人', en: '/Person' },
  'detail.address': { zh: '地址', en: 'Address' },
  'detail.detailsBooking': { zh: '详情与预订', en: 'Details & Booking' },

  // Ticket
  'ticket.title': { zh: '电子票据详情', en: 'E-Ticket Details' },
  'ticket.organizer': { zh: '主办方联系方式', en: 'Organizer Contact' },
  'ticket.scan': { zh: '扫码核销入场', en: 'Scan for Check-in' },
  'ticket.visitor': { zh: '参与人', en: 'Visitor' },
  'ticket.time': { zh: '预约时间', en: 'Date & Time' },
  
  // Admin
  'admin.title': { zh: '开堰管理系统', en: 'Kaiyan Admin' },
  'admin.dashboard': { zh: '运营总览', en: 'Dashboard' },
  'admin.activities': { zh: '研学库管理', en: 'Activities' },
  'admin.venues': { zh: '场地资源', en: 'Resources' },
  'admin.settings': { zh: '系统设置', en: 'Settings' },
  'admin.exit': { zh: '退出系统', en: 'Logout' },
  'admin.addActivity': { zh: '新增研学活动', en: 'New Activity' },
  'admin.addVenue': { zh: '新增场地资源', en: 'New Venue' },
  'admin.searchPlaceholder': { zh: '快速检索业务数据...', en: 'Search data...' },
  'admin.columns.title': { zh: '课程标题', en: 'Title' },
  'admin.columns.theme': { zh: '所属主题', en: 'Theme' },
  'admin.columns.price': { zh: '单价', en: 'Price' },
  'admin.columns.stock': { zh: '库存/余位', en: 'Stock' },
  'admin.columns.action': { zh: '操作', en: 'Action' },
  'admin.columns.name': { zh: '场地名称', en: 'Venue Name' },
  'admin.columns.type': { zh: '类型', en: 'Type' },
  'admin.columns.capacity': { zh: '容量', en: 'Capacity' },
  'admin.columns.pricePerHour': { zh: '时租价格', en: 'Price/Hour' },
  
  'admin.stats.revenue': { zh: '今日总收入', en: 'Revenue' },
  'admin.stats.signups': { zh: '实时报名人数', en: 'Live Signups' },
  'admin.stats.utilization': { zh: '资源利用率', en: 'Utilization' },
  'admin.stats.growth': { zh: '会员增长量', en: 'Growth' },
  'admin.stats.trend': { zh: '营收数据趋势', en: 'Revenue Trend' },
  'admin.stats.updates': { zh: '实时动态', en: 'Live Updates' },

  // Admin Forms
  'form.venueName': { zh: '场地名称', en: 'Venue Name' },
  'form.venueType': { zh: '场地类型', en: 'Venue Type' },
  'form.capacity': { zh: '容纳人数', en: 'Capacity' },
  'form.pricePerHour': { zh: '每小时价格', en: 'Price per Hour' },
  'form.address': { zh: '具体位置', en: 'Location' },
  'form.facilities': { zh: '配套设施 (用逗号分隔)', en: 'Facilities (comma separated)' },
  'form.submitVenue': { zh: '确认上架场地', en: 'Publish Venue' },
  
  // Activity Card
  'card.book': { zh: '立即报名', en: 'Book' },
  'card.stock': { zh: '剩', en: 'Left' },
  'card.stockUnit': { zh: '名额', en: '' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
