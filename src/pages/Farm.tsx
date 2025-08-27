import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import Badge from '../components/Common/Badge';
import { useAuth } from '../hooks/useAuth';
import { MapPin, Plus, Edit, Trash2, Sprout, Calendar, BarChart3 } from 'lucide-react';
import { mockFarmers } from '../data/mockData';

const Farm: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  
  // Get farmer data (in real app, this would come from API)
  const farmerData = mockFarmers.find(f => f.id === user?.id);

  if (!farmerData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Farmer profile not found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddPlot = () => {
    alert('Add new plot functionality would be implemented here');
  };

  const handleEditPlot = (plotId: string) => {
    alert(`Edit plot ${plotId} functionality would be implemented here`);
  };

  const handleDeletePlot = (plotId: string) => {
    if (confirm('Are you sure you want to delete this plot?')) {
      alert(`Delete plot ${plotId} functionality would be implemented here`);
    }
  };

  const totalArea = farmerData.plots.reduce((sum, plot) => sum + plot.size, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Farm</h1>
            <p className="text-gray-600 mt-2">Manage your plots, crops, and farm operations</p>
          </div>
          <Button onClick={handleAddPlot} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Plot
          </Button>
        </div>

        {/* Farmer Profile Summary */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Profile</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Farmer ID:</span>
                  <p className="text-sm text-gray-900">{farmerData.farmerId}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Name:</span>
                  <p className="text-sm text-gray-900">{farmerData.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Phone:</span>
                  <p className="text-sm text-gray-900">{farmerData.phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Cooperative:</span>
                  <p className="text-sm text-gray-900">{farmerData.cooperative}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Location</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">County:</span>
                  <p className="text-sm text-gray-900">{farmerData.county}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Sub-County:</span>
                  <p className="text-sm text-gray-900">{farmerData.subCounty}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Ward:</span>
                  <p className="text-sm text-gray-900">{farmerData.ward}</p>
                </div>
                <div className="flex items-center mt-4">
                  <Badge variant="success">
                    {farmerData.verified ? 'Verified' : 'Pending Verification'}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Farm Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Plots:</span>
                  <span className="text-sm font-semibold text-gray-900">{farmerData.plots.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Area:</span>
                  <span className="text-sm font-semibold text-gray-900">{totalArea} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Irrigated Plots:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {farmerData.plots.filter(p => p.irrigation).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Crops:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {farmerData.plots.filter(p => p.currentCrop).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerData.plots.map((plot) => (
            <Card 
              key={plot.id} 
              hover 
              className={`cursor-pointer transition-all duration-200 ${
                selectedPlot === plot.id ? 'ring-2 ring-green-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedPlot(selectedPlot === plot.id ? null : plot.id)}
            >
              {/* Plot Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plot.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {plot.size} acres
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPlot(plot.id);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlot(plot.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Current Crop */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Sprout className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Current Crop</span>
                </div>
                {plot.currentCrop ? (
                  <Badge variant="success">{plot.currentCrop}</Badge>
                ) : (
                  <Badge variant="secondary">No active crop</Badge>
                )}
              </div>

              {/* Plot Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Soil Type:</span>
                  <span className="text-gray-900">{plot.soilType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Irrigation:</span>
                  <Badge variant={plot.irrigation ? 'success' : 'secondary'} size="sm">
                    {plot.irrigation ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="text-gray-900 capitalize">{plot.tenure}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedPlot === plot.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Plot Coordinates</h4>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-600">
                      {plot.coordinates.length} coordinates defined
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Lat: {plot.coordinates[0]?.lat.toFixed(4)}, 
                      Lng: {plot.coordinates[0]?.lng.toFixed(4)}
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-gray-900 mb-3">Crop History</h4>
                  {plot.crops.length > 0 ? (
                    <div className="space-y-2">
                      {plot.crops.slice(0, 3).map((crop, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{crop.crop} - {crop.variety}</span>
                            <span className="text-gray-500">{crop.season}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No crop history recorded</p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}

          {/* Add New Plot Card */}
          <Card 
            className="border-2 border-dashed border-gray-300 hover:border-green-500 cursor-pointer transition-colors flex items-center justify-center min-h-[300px]"
            onClick={handleAddPlot}
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Plot</h3>
              <p className="text-gray-600">Register a new plot on your farm</p>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        {farmerData.plots.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plots registered</h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first plot to begin managing your farm digitally.
            </p>
            <Button onClick={handleAddPlot}>
              Add Your First Plot
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Farm;