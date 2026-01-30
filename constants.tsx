
import { Activity, ActivityTheme, Venue } from './types';

const ACTIVITIES_ZH: Activity[] = [
  {
    id: 'a1',
    title: '探秘秦岭大自然：动植物标本研学营',
    cover: 'https://picsum.photos/seed/nature1/800/600',
    price: 299,
    ageRange: '6-12岁',
    remainingSlots: 15,
    rating: 4.9,
    theme: ActivityTheme.NATURE,
    duration: '1天',
    itinerary: ['08:30 集合出发', '10:00 森林认知讲座', '12:00 特色农家餐', '14:00 制作叶脉书签', '16:30 结营返程'],
    description: '走进秦岭深处，通过实地观察与手工制作，激发孩子们对自然的热爱。'
  },
  {
    id: 'a2',
    title: '古法造纸术：传统文化传承实战课',
    cover: 'https://picsum.photos/seed/history1/800/600',
    price: 158,
    ageRange: '8-15岁',
    remainingSlots: 8,
    rating: 4.8,
    theme: ActivityTheme.HISTORY,
    duration: '4小时',
    itinerary: ['14:00 文化背景介绍', '14:30 浆料准备', '15:30 抄纸体验', '17:00 作品展示'],
    description: '亲手体验蔡伦造纸的艺术，了解千年文明的载体是如何诞生的。'
  },
  {
    id: 'a3',
    title: '明日宇航员：水火箭发射与动力学研究',
    cover: 'https://picsum.photos/seed/science1/800/600',
    price: 399,
    ageRange: '10-18岁',
    remainingSlots: 20,
    rating: 5.0,
    theme: ActivityTheme.SCIENCE,
    duration: '2天',
    itinerary: ['Day1: 空气动力学原理学习', 'Day1: 设计图绘制', 'Day2: 组装与调试', 'Day2: 飞行竞赛'],
    description: '硬核科学研学，在实践中掌握物理知识，放飞航天梦想。'
  }
];

const ACTIVITIES_EN: Activity[] = [
  {
    id: 'a1',
    title: 'Qinling Nature Secrets: Bio-Specimen Camp',
    cover: 'https://picsum.photos/seed/nature1/800/600',
    price: 299,
    ageRange: '6-12 Years',
    remainingSlots: 15,
    rating: 4.9,
    theme: ActivityTheme.NATURE,
    duration: '1 Day',
    itinerary: ['08:30 Departure', '10:00 Forest Lecture', '12:00 Farm Lunch', '14:00 Leaf Bookmark DIY', '16:30 Return'],
    description: 'Venture deep into the Qinling Mountains to inspire a love for nature through field observation and crafts.'
  },
  {
    id: 'a2',
    title: 'Ancient Papermaking: Heritage Workshop',
    cover: 'https://picsum.photos/seed/history1/800/600',
    price: 158,
    ageRange: '8-15 Years',
    remainingSlots: 8,
    rating: 4.8,
    theme: ActivityTheme.HISTORY,
    duration: '4 Hours',
    itinerary: ['14:00 History Intro', '14:30 Pulp Prep', '15:30 Paper Making', '17:00 Exhibition'],
    description: 'Experience the art of Cai Lun papermaking and understand how the carrier of millennial civilization was born.'
  },
  {
    id: 'a3',
    title: 'Future Astronaut: Water Rocket & Dynamics',
    cover: 'https://picsum.photos/seed/science1/800/600',
    price: 399,
    ageRange: '10-18 Years',
    remainingSlots: 20,
    rating: 5.0,
    theme: ActivityTheme.SCIENCE,
    duration: '2 Days',
    itinerary: ['Day1: Aerodynamics', 'Day1: Blueprint Design', 'Day2: Assembly', 'Day2: Flight Contest'],
    description: 'Hardcore science workshop to master physics knowledge in practice and fly aerospace dreams.'
  }
];

const VENUES_ZH: Venue[] = [
  {
    id: 'v1',
    name: '创客实验室 101',
    type: '实验室',
    capacity: 30,
    facilities: ['3D打印机', '激光切割机', '示波器', '高速WiFi'],
    image: 'https://picsum.photos/seed/lab1/800/600',
    pricePerHour: 100,
    isAvailable: true,
    address: '开堰研学基地 A栋一层'
  },
  {
    id: 'v2',
    name: '云端会议厅',
    type: '会议室',
    capacity: 100,
    facilities: ['投影仪', '扩音系统', '智能录屏', '茶歇区'],
    image: 'https://picsum.photos/seed/meeting1/800/600',
    pricePerHour: 200,
    isAvailable: true,
    address: '开堰研学基地 B栋顶层'
  },
  {
    id: 'v3',
    name: '星空草坪营地',
    type: '户外营地',
    capacity: 200,
    facilities: ['烧烤位', '露营天幕', '室外电源', '盥洗室'],
    image: 'https://picsum.photos/seed/outdoor1/800/600',
    pricePerHour: 300,
    isAvailable: false,
    address: '开堰研学基地 东侧绿地区'
  }
];

const VENUES_EN: Venue[] = [
  {
    id: 'v1',
    name: 'Maker Lab 101',
    type: 'Laboratory',
    capacity: 30,
    facilities: ['3D Printer', 'Laser Cutter', 'Oscilloscope', 'High-Speed WiFi'],
    image: 'https://picsum.photos/seed/lab1/800/600',
    pricePerHour: 100,
    isAvailable: true,
    address: 'Kaiyan Base, Bldg A, 1F'
  },
  {
    id: 'v2',
    name: 'Cloud Conference Hall',
    type: 'Conference',
    capacity: 100,
    facilities: ['Projector', 'PA System', 'Smart Recording', 'Coffee Break Area'],
    image: 'https://picsum.photos/seed/meeting1/800/600',
    pricePerHour: 200,
    isAvailable: true,
    address: 'Kaiyan Base, Bldg B, Top Floor'
  },
  {
    id: 'v3',
    name: 'Starry Lawn Camp',
    type: 'Outdoor',
    capacity: 200,
    facilities: ['BBQ Spots', 'Camping Tarp', 'Outdoor Power', 'Restrooms'],
    image: 'https://picsum.photos/seed/outdoor1/800/600',
    pricePerHour: 300,
    isAvailable: false,
    address: 'Kaiyan Base, East Green Zone'
  }
];

export const getMockActivities = (lang: string) => lang === 'en' ? ACTIVITIES_EN : ACTIVITIES_ZH;
export const getMockVenues = (lang: string) => lang === 'en' ? VENUES_EN : VENUES_ZH;

// Default export for initial state if needed, though getMockActivities is preferred
export const MOCK_ACTIVITIES = ACTIVITIES_ZH;
export const MOCK_VENUES = VENUES_ZH;
