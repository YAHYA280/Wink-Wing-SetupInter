// renters type
export type Renter = {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: string;
};

// services card
export type Services = {
  id: number;
  title: string;
  text: string;
  icon: string;
};

// reviews card
export type Reviews = {
  id: number;
  name: string;
  review: number;
  text: string;
  image: null | string;
};

// city from dropdown
export type City = {
  id: number;
  name: string;
  location: [number];
};

// neighborhoods from dropdown
export type Neighbourhood = {
  id: number;
  name: string;
  location: [number, number];
};

// radius from dropdown
export type Radius = {
  id: number;
  label: number;
  value: number;
};

// niceToHaves
export type NiceToHaves = {
  id: number;
  label: string;
};

// User
export type User = {
  email: string;
  password: string;
  name: string;
  cityId: number;
  radius: number;
  maxTravelTime: number;
  transportType: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minFloorArea: number;
  furnished: boolean;
  neighbourhoods: [];
  niceToHave: [string];
  alsoSearchFor: [string];
  showOnlyPropertiesFor: [string];
};

// Recent matches
export type RecentMatches = {
  id: number;
  createdAt: string;
  updatedAt: string;
  websiteId: string;
  title: string;
  area: string;
  link: string;
  phone: string;
  garden: boolean;
  pets: boolean;
  balcony: boolean;
  bedrooms: number;
  floorspace: number;
  price: number;
  images: string[];
  location: [number, number];
  found: string;
  furnished: boolean | null;
  bath: number;
};

// Subscription info
export type Subscription = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  stripeSubscriptionId: string;
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
};

// about User
export type UserInfo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  stripeCustomerId: string;
  role: string;
  whatsappNumber: string;
  whatsappNotifications: boolean;
  emailNotifications: boolean;
  referralCode: string;
};

// searchjob
export type SearchJob = {
  id: number;
  title: string;
  city: string;
  neighbourhoods: Neighbourhood[];
  radius: number;
  address: string;
  maxTravelTime: number;
  transportType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  surface: number;
  furnished: boolean | null;
  niceToHave: string[];
  alsoSearchFor: string[];
  showOnlyPropertiesFor: string[];
};
