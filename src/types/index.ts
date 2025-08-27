// Core Types for NADLP Platform

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'farmer' | 'buyer' | 'extension_officer' | 'admin';
  verified: boolean;
  createdAt: Date;
}

export interface Farmer extends User {
  role: 'farmer';
  farmerId: string; // Unique NADLP Farmer ID
  cooperative?: string;
  county: string;
  subCounty: string;
  ward: string;
  idNumber: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: 'youth' | 'adult' | 'senior';
  plots: Plot[];
}

export interface Plot {
  id: string;
  farmerId: string;
  name: string;
  size: number; // in acres
  coordinates: GeoCoordinates[];
  soilType: string;
  irrigation: boolean;
  tenure: 'owned' | 'leased' | 'communal';
  crops: CropHistory[];
  currentCrop?: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface CropHistory {
  id: string;
  crop: string;
  variety: string;
  plantingDate: Date;
  expectedHarvest: Date;
  actualYield?: number;
  quality?: string;
  season: string;
}

export interface Commodity {
  id: string;
  name: string;
  category: string;
  varieties: string[];
  grades: string[];
  standardUnit: string;
}

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  commodity: string;
  variety: string;
  grade: string;
  quantity: number;
  unit: string;
  reservePrice: number;
  currentPrice: number;
  location: string;
  county: string;
  deliveryTerms: string;
  validUntil: Date;
  status: 'active' | 'sold' | 'expired' | 'withdrawn';
  certifications: string[];
  photos: string[];
  description: string;
  offers: Offer[];
  createdAt: Date;
}

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  price: number;
  quantity: number;
  deliveryDate: Date;
  terms: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: Date;
}

export interface Contract {
  id: string;
  listingId: string;
  offerId: string;
  farmerId: string;
  buyerId: string;
  commodity: string;
  quantity: number;
  agreedPrice: number;
  deliveryDate: Date;
  deliveryLocation: string;
  terms: string;
  status: 'pending' | 'active' | 'fulfilled' | 'disputed';
  escrowAmount: number;
  createdAt: Date;
}

export interface WarehouseReceipt {
  id: string;
  wrNumber: string;
  farmerId: string;
  warehouseId: string;
  commodity: string;
  quantity: number;
  grade: string;
  moisture: number;
  weight: number;
  storageDate: Date;
  expiryDate: Date;
  liens: Lien[];
  insured: boolean;
  status: 'active' | 'released' | 'expired';
}

export interface Lien {
  id: string;
  financialInstitution: string;
  amount: number;
  interestRate: number;
  dueDate: Date;
  status: 'active' | 'released';
}

export interface Extension {
  id: string;
  title: string;
  content: string;
  type: 'advisory' | 'alert' | 'training' | 'weather';
  priority: 'low' | 'medium' | 'high' | 'critical';
  targetAudience: string[];
  counties: string[];
  crops: string[];
  language: 'en' | 'sw';
  publishedAt: Date;
  expiresAt?: Date;
}

export interface MarketData {
  commodity: string;
  county: string;
  averagePrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  date: Date;
}

export interface Analytics {
  totalFarmers: number;
  totalListings: number;
  totalTrades: number;
  totalValue: number;
  topCommodities: { name: string; volume: number; value: number }[];
  priceIndices: MarketData[];
  productionForecast: { crop: string; expectedYield: number; county: string }[];
}