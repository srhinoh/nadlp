import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import Badge from '../components/Common/Badge';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import { Search, Filter, MapPin, Calendar, Star } from 'lucide-react';
import { mockListings, mockCommodities, kenyanCounties } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { Listing } from '../types';

const Marketplace: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Filter listings based on current filters
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCommodity = !selectedCommodity || listing.commodity === selectedCommodity;
    const matchesCounty = !selectedCounty || listing.county === selectedCounty;
    const matchesGrade = !selectedGrade || listing.grade === selectedGrade;
    
    const matchesPriceRange = (!priceRange.min || listing.currentPrice >= parseInt(priceRange.min)) &&
                             (!priceRange.max || listing.currentPrice <= parseInt(priceRange.max));

    return matchesSearch && matchesCommodity && matchesCounty && matchesGrade && matchesPriceRange && listing.status === 'active';
  });

  const handleMakeOffer = (listing: Listing) => {
    // In a real app, this would open a modal or navigate to an offer page
    alert(`Making offer on ${listing.commodity} from ${listing.farmerName}`);
  };

  const handleCreateListing = () => {
    // In a real app, this would navigate to create listing page
    alert('Create new listing feature would be implemented here');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600 mt-2">Discover and trade quality agricultural products</p>
          </div>
          {user?.role === 'farmer' && (
            <Button onClick={handleCreateListing} className="mt-4 sm:mt-0">
              Create Listing
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search commodities, farmers, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <p className="text-sm text-gray-500">
                {filteredListings.length} listings found
              </p>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
                  <select
                    value={selectedCommodity}
                    onChange={(e) => setSelectedCommodity(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Commodities</option>
                    {mockCommodities.map(commodity => (
                      <option key={commodity.id} value={commodity.name}>{commodity.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Counties</option>
                    {kenyanCounties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Grades</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="AA">AA</option>
                    <option value="AB">AB</option>
                    <option value="Export Grade">Export Grade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (KES)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (KES)</label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} hover className="h-full flex flex-col">
              {/* Listing Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {listing.commodity}
                  </h3>
                  <p className="text-sm text-gray-600">{listing.variety} • {listing.grade}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              {/* Quantity and Price */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    KES {listing.currentPrice}
                  </span>
                  <span className="text-sm text-gray-500">per {listing.unit}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {listing.quantity.toLocaleString()} {listing.unit} available
                </p>
              </div>

              {/* Location and Farmer */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  {listing.farmerName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Valid until {new Date(listing.validUntil).toLocaleDateString()}
                </div>
              </div>

              {/* Certifications */}
              {listing.certifications.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {listing.certifications.map((cert) => (
                      <Badge key={cert} variant="info" size="sm">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-4 flex-grow">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {listing.description}
                </p>
              </div>

              {/* Delivery Terms */}
              <div className="mb-4">
                <p className="text-xs text-gray-500">
                  <strong>Delivery:</strong> {listing.deliveryTerms}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                {user?.role === 'buyer' ? (
                  <Button
                    onClick={() => handleMakeOffer(listing)}
                    className="w-full"
                    variant="primary"
                  >
                    Make Offer
                  </Button>
                ) : user?.role === 'farmer' && listing.farmerId === user.id ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    Your Listing
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more listings.
            </p>
            {user?.role === 'farmer' && (
              <Button onClick={handleCreateListing}>
                Create Your First Listing
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;