import { User, Farmer, Listing, Commodity, Extension, MarketData, Analytics, WarehouseReceipt } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.kamau@email.com',
    name: 'John Kamau',
    phone: '+254712345678',
    role: 'farmer',
    verified: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'grace.wanjiku@email.com',
    name: 'Grace Wanjiku',
    phone: '+254723456789',
    role: 'farmer',
    verified: true,
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    email: 'david.otieno@agribusiness.co.ke',
    name: 'David Otieno',
    phone: '+254734567890',
    role: 'buyer',
    verified: true,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    email: 'mary.chepkemoi@extension.gov.ke',
    name: 'Mary Chepkemoi',
    phone: '+254745678901',
    role: 'extension_officer',
    verified: true,
    createdAt: new Date('2024-01-05')
  }
];

// Mock Farmers
export const mockFarmers: Farmer[] = [
  {
    ...mockUsers[0],
    role: 'farmer',
    farmerId: 'KE-NAD-001234',
    cooperative: 'Kiambu Coffee Cooperative',
    county: 'Kiambu',
    subCounty: 'Githunguri',
    ward: 'Ikinu',
    idNumber: '12345678',
    gender: 'male',
    ageGroup: 'adult',
    plots: [
      {
        id: 'plot-1',
        farmerId: '1',
        name: 'Main Coffee Plot',
        size: 2.5,
        coordinates: [
          { lat: -1.0232, lng: 36.9062 },
          { lat: -1.0242, lng: 36.9072 },
          { lat: -1.0252, lng: 36.9062 },
          { lat: -1.0242, lng: 36.9052 }
        ],
        soilType: 'Red volcanic soil',
        irrigation: true,
        tenure: 'owned',
        crops: [],
        currentCrop: 'Coffee'
      }
    ]
  },
  {
    ...mockUsers[1],
    role: 'farmer',
    farmerId: 'KE-NAD-001235',
    cooperative: 'Nakuru Maize Growers',
    county: 'Nakuru',
    subCounty: 'Njoro',
    ward: 'Mauche',
    idNumber: '23456789',
    gender: 'female',
    ageGroup: 'adult',
    plots: [
      {
        id: 'plot-2',
        farmerId: '2',
        name: 'Maize Field A',
        size: 5.0,
        coordinates: [
          { lat: -0.3301, lng: 36.0961 },
          { lat: -0.3311, lng: 36.0971 },
          { lat: -0.3321, lng: 36.0961 },
          { lat: -0.3311, lng: 36.0951 }
        ],
        soilType: 'Clay loam',
        irrigation: false,
        tenure: 'owned',
        crops: [],
        currentCrop: 'Maize'
      }
    ]
  }
];

// Mock Commodities
export const mockCommodities: Commodity[] = [
  {
    id: '1',
    name: 'Maize',
    category: 'Cereals',
    varieties: ['H513', 'H614', 'DH04', 'Local'],
    grades: ['Grade 1', 'Grade 2', 'Grade 3'],
    standardUnit: 'kg'
  },
  {
    id: '2',
    name: 'Coffee',
    category: 'Cash Crops',
    varieties: ['Arabica', 'Robusta'],
    grades: ['AA', 'AB', 'C', 'PB', 'T'],
    standardUnit: 'kg'
  },
  {
    id: '3',
    name: 'Avocado',
    category: 'Horticulture',
    varieties: ['Hass', 'Fuerte', 'Jumbo'],
    grades: ['Export Grade', 'Local Grade'],
    standardUnit: 'kg'
  },
  {
    id: '4',
    name: 'Tomatoes',
    category: 'Horticulture',
    varieties: ['Roma', 'Beefsteak', 'Cherry'],
    grades: ['Grade 1', 'Grade 2'],
    standardUnit: 'kg'
  }
];

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'John Kamau',
    commodity: 'Coffee',
    variety: 'Arabica',
    grade: 'AA',
    quantity: 500,
    unit: 'kg',
    reservePrice: 850,
    currentPrice: 900,
    location: 'Githunguri, Kiambu',
    county: 'Kiambu',
    deliveryTerms: 'FOB Farm Gate',
    validUntil: new Date('2024-03-15'),
    status: 'active',
    certifications: ['Organic', 'Fair Trade'],
    photos: [],
    description: 'Premium grade AA coffee beans, sun-dried and carefully processed.',
    offers: [],
    createdAt: new Date('2024-02-15')
  },
  {
    id: '2',
    farmerId: '2',
    farmerName: 'Grace Wanjiku',
    commodity: 'Maize',
    variety: 'H513',
    grade: 'Grade 1',
    quantity: 2000,
    unit: 'kg',
    reservePrice: 45,
    currentPrice: 48,
    location: 'Njoro, Nakuru',
    county: 'Nakuru',
    deliveryTerms: 'Ex-Warehouse',
    validUntil: new Date('2024-04-01'),
    status: 'active',
    certifications: [],
    photos: [],
    description: 'High quality grade 1 maize, well dried and stored.',
    offers: [],
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    farmerId: '1',
    farmerName: 'John Kamau',
    commodity: 'Avocado',
    variety: 'Hass',
    grade: 'Export Grade',
    quantity: 1000,
    unit: 'kg',
    reservePrice: 120,
    currentPrice: 130,
    location: 'Githunguri, Kiambu',
    county: 'Kiambu',
    deliveryTerms: 'FOB Nairobi',
    validUntil: new Date('2024-03-30'),
    status: 'active',
    certifications: ['KEPHIS Export Certificate', 'GlobalGAP'],
    photos: [],
    description: 'Export quality Hass avocados, ready for international market.',
    offers: [],
    createdAt: new Date('2024-02-25')
  }
];

// Mock Extensions
export const mockExtensions: Extension[] = [
  {
    id: '1',
    title: 'Pest Alert: Fall Armyworm Detection in Western Kenya',
    content: 'Fall armyworm has been detected in several farms across Western Kenya. Farmers should inspect their maize fields daily and apply recommended control measures immediately.',
    type: 'alert',
    priority: 'critical',
    targetAudience: ['farmers'],
    counties: ['Busia', 'Kakamega', 'Vihiga', 'Bungoma'],
    crops: ['Maize'],
    language: 'en',
    publishedAt: new Date('2024-02-28'),
    expiresAt: new Date('2024-03-15')
  },
  {
    id: '2',
    title: 'Weather Advisory: Heavy Rains Expected',
    content: 'Heavy rains are expected across Central Kenya in the next 5 days. Farmers should prepare drainage systems and delay any planned harvesting activities.',
    type: 'weather',
    priority: 'high',
    targetAudience: ['farmers'],
    counties: ['Kiambu', 'Murang\'a', 'Nyeri', 'Kirinyaga'],
    crops: [],
    language: 'en',
    publishedAt: new Date('2024-03-01'),
    expiresAt: new Date('2024-03-07')
  },
  {
    id: '3',
    title: 'Coffee Processing Best Practices',
    content: 'Learn the best practices for coffee processing to achieve premium grades and better market prices. This training covers pulping, fermentation, and drying techniques.',
    type: 'training',
    priority: 'medium',
    targetAudience: ['farmers'],
    counties: ['Kiambu', 'Murang\'a', 'Nyeri'],
    crops: ['Coffee'],
    language: 'en',
    publishedAt: new Date('2024-02-20')
  }
];

// Mock Market Data
export const mockMarketData: MarketData[] = [
  { commodity: 'Maize', county: 'Nakuru', averagePrice: 47, highPrice: 52, lowPrice: 43, volume: 15000, date: new Date('2024-03-01') },
  { commodity: 'Coffee', county: 'Kiambu', averagePrice: 890, highPrice: 950, lowPrice: 830, volume: 2500, date: new Date('2024-03-01') },
  { commodity: 'Avocado', county: 'Kiambu', averagePrice: 125, highPrice: 140, lowPrice: 110, volume: 8000, date: new Date('2024-03-01') },
  { commodity: 'Tomatoes', county: 'Kajiado', averagePrice: 65, highPrice: 80, lowPrice: 50, volume: 12000, date: new Date('2024-03-01') }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalFarmers: 15420,
  totalListings: 2847,
  totalTrades: 1523,
  totalValue: 125800000,
  topCommodities: [
    { name: 'Maize', volume: 45000, value: 21600000 },
    { name: 'Coffee', volume: 12500, value: 11125000 },
    { name: 'Avocado', volume: 25000, value: 3125000 },
    { name: 'Tomatoes', volume: 35000, value: 2275000 }
  ],
  priceIndices: mockMarketData,
  productionForecast: [
    { crop: 'Maize', expectedYield: 2500000, county: 'Nakuru' },
    { crop: 'Coffee', expectedYield: 450000, county: 'Kiambu' },
    { crop: 'Tea', expectedYield: 350000, county: 'Kericho' }
  ]
};

// Mock Warehouse Receipts
export const mockWarehouseReceipts: WarehouseReceipt[] = [
  {
    id: '1',
    wrNumber: 'WR-2024-001234',
    farmerId: '2',
    warehouseId: 'WH-NK-001',
    commodity: 'Maize',
    quantity: 1500,
    grade: 'Grade 1',
    moisture: 13.5,
    weight: 1500,
    storageDate: new Date('2024-02-15'),
    expiryDate: new Date('2024-08-15'),
    liens: [],
    insured: true,
    status: 'active'
  }
];

// Counties in Kenya
export const kenyanCounties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
  'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
  'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
  'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi',
  'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta',
  'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga',
  'Wajir', 'West Pokot'
];