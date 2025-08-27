import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import Badge from '../components/Common/Badge';
import { TrendingUp, Users, ShoppingCart, Warehouse, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockAnalytics, mockListings, mockExtensions, mockWarehouseReceipts } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'extension_officer':
        return <ExtensionOfficerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your {user?.role.replace('_', ' ')} activities today.
          </p>
        </div>
        
        {getDashboardContent()}
      </div>
    </Layout>
  );
};

const FarmerDashboard: React.FC = () => {
  const myListings = mockListings.filter(l => l.farmerId === '1');
  const activeListings = myListings.filter(l => l.status === 'active');
  const recentExtensions = mockExtensions.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{activeListings.length}</h3>
          <p className="text-gray-600">Active Listings</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">KES 45,200</h3>
          <p className="text-gray-600">Total Earnings</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Warehouse className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1</h3>
          <p className="text-gray-600">Warehouse Receipts</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
          <p className="text-gray-600">New Alerts</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Listings */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Active Listings</h3>
          <div className="space-y-4">
            {activeListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{listing.commodity} - {listing.variety}</h4>
                  <p className="text-sm text-gray-600">{listing.quantity} {listing.unit} • Grade {listing.grade}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">KES {listing.currentPrice}/{listing.unit}</p>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            ))}
            {activeListings.length === 0 && (
              <p className="text-gray-500 text-center py-8">No active listings. Create your first listing!</p>
            )}
          </div>
        </Card>

        {/* Extension Alerts */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Advisories</h3>
          <div className="space-y-4">
            {recentExtensions.map((extension) => (
              <div key={extension.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={extension.priority === 'critical' ? 'danger' : 
                            extension.priority === 'high' ? 'warning' : 'info'}
                  >
                    {extension.priority.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500 capitalize">{extension.type}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{extension.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{extension.content}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const BuyerDashboard: React.FC = () => {
  const availableListings = mockListings.filter(l => l.status === 'active');
  
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{availableListings.length}</h3>
          <p className="text-gray-600">Available Listings</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">8</h3>
          <p className="text-gray-600">Completed Purchases</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">KES 2.1M</h3>
          <p className="text-gray-600">Total Purchases</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-gray-600">Pending Offers</p>
        </Card>
      </div>

      {/* Available Listings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Commodity Listings</h3>
        <div className="space-y-4">
          {availableListings.slice(0, 5).map((listing) => (
            <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{listing.commodity} - {listing.variety}</h4>
                <p className="text-sm text-gray-600">{listing.quantity} {listing.unit} • {listing.location}</p>
                <div className="flex gap-2 mt-1">
                  {listing.certifications.map((cert) => (
                    <Badge key={cert} variant="success" size="sm">{cert}</Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">KES {listing.currentPrice}/{listing.unit}</p>
                <p className="text-xs text-gray-500">{listing.farmerName}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const ExtensionOfficerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
          <p className="text-gray-600">Registered Farmers</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">89</h3>
          <p className="text-gray-600">Field Visits This Month</p>
        </div>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600">Active Alerts</p>
        </div>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">94%</h3>
          <p className="text-gray-600">Training Completion</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Field Reports</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Coffee Farm Inspection</h4>
              <p className="text-sm text-gray-600">John Kamau's farm - Githunguri</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Maize Field Assessment</h4>
              <p className="text-sm text-gray-600">Grace Wanjiku's farm - Njoro</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Published Advisories</h3>
          <div className="space-y-4">
            {mockExtensions.slice(0, 3).map((extension) => (
              <div key={extension.id} className="p-4 border border-gray-200 rounded-lg">
                <Badge 
                  variant={extension.priority === 'critical' ? 'danger' : 
                          extension.priority === 'high' ? 'warning' : 'info'}
                >
                  {extension.priority.toUpperCase()}
                </Badge>
                <h4 className="font-medium text-gray-900 mt-2">{extension.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{extension.counties.join(', ')}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.totalFarmers.toLocaleString()}</h3>
          <p className="text-gray-600">Registered Farmers</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.totalListings.toLocaleString()}</h3>
          <p className="text-gray-600">Active Listings</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.totalTrades.toLocaleString()}</h3>
          <p className="text-gray-600">Completed Trades</p>
        </div>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">KES {(mockAnalytics.totalValue / 1000000).toFixed(1)}M</h3>
          <p className="text-gray-600">Total Trade Value</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Commodities by Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.topCommodities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Indices</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.priceIndices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="commodity" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="averagePrice" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const DefaultDashboard: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to NADLP</h2>
      <p className="text-gray-600">Your dashboard is being prepared...</p>
    </div>
  );
};

export default Dashboard;