
export enum ActivityTheme {
  NATURE = 'nature',
  HISTORY = 'history',
  SCIENCE = 'science',
  ART = 'art'
}

export enum OrderStatus {
  PENDING_PAY = '待付款',
  PENDING_JOIN = '待参与',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export interface Activity {
  id: string;
  title: string;
  cover: string;
  price: number;
  ageRange: string;
  remainingSlots: number;
  rating: number;
  theme: ActivityTheme;
  duration: string;
  itinerary: string[];
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  facilities: string[];
  image: string;
  pricePerHour: number;
  isAvailable: boolean;
  address: string;
}

export interface Order {
  id: string;
  type: 'activity' | 'venue';
  itemId: string;
  title: string;
  amount: number;
  date: string;
  status: OrderStatus;
  userName: string;
  userPhone: string;
  bookingTime?: string;
}

export type AppRole = 'user' | 'admin';
