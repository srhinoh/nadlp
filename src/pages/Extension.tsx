import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import Badge from '../components/Common/Badge';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import { useAuth } from '../hooks/useAuth';
import { Search, AlertTriangle, BookOpen, Cloud, Sprout, Filter, Calendar, MapPin } from 'lucide-react';
import { mockExtensions } from '../data/mockData';
import { Extension } from '../types';

const ExtensionPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredExtensions = mockExtensions.filter(extension => {
    const matchesSearch = extension.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         extension.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || extension.type === selectedType;
    const matchesPriority = !selectedPriority || extension.priority === selectedPriority;

    return matchesSearch && matchesType && matchesPriority;
  });

  const getExtensionIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5" />;
      case 'weather':
        return <Cloud className="w-5 h-5" />;
      case 'training':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Sprout className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const handleCreateAdvisory = () => {
    alert('Create new advisory functionality would be implemented here');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Extension Services</h1>
            <p className="text-gray-600 mt-2">
              Access agricultural advisories, training, and expert guidance
            </p>
          </div>
          {user?.role === 'extension_officer' && (
            <Button onClick={handleCreateAdvisory} className="mt-4 sm:mt-0">
              Create Advisory
            </Button>
          )}
        </div>

        {/* Stats Cards for Extension Officers */}
        {user?.role === 'extension_officer' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {mockExtensions.filter(e => e.priority === 'critical').length}
              </h3>
              <p className="text-gray-600">Critical Alerts</p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {mockExtensions.filter(e => e.type === 'training').length}
              </h3>
              <p className="text-gray-600">Training Modules</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {mockExtensions.filter(e => e.type === 'advisory').length}
              </h3>
              <p className="text-gray-600">Advisories Published</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {mockExtensions.filter(e => e.type === 'weather').length}
              </h3>
              <p className="text-gray-600">Weather Alerts</p>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search advisories, alerts, or training materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

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
                {filteredExtensions.length} items found
              </p>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Types</option>
                    <option value="advisory">Advisory</option>
                    <option value="alert">Alert</option>
                    <option value="training">Training</option>
                    <option value="weather">Weather</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Extension Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExtensions.map((extension) => (
            <ExtensionCard 
              key={extension.id} 
              extension={extension} 
              getIcon={getExtensionIcon}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredExtensions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No extension content found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface ExtensionCardProps {
  extension: Extension;
  getIcon: (type: string) => React.ReactNode;
  getPriorityColor: (priority: string) => "danger" | "warning" | "info" | "secondary";
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ 
  extension, 
  getIcon, 
  getPriorityColor 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card hover className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            extension.type === 'alert' ? 'bg-red-100 text-red-600' :
            extension.type === 'weather' ? 'bg-blue-100 text-blue-600' :
            extension.type === 'training' ? 'bg-green-100 text-green-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {getIcon(extension.type)}
          </div>
          <div>
            <Badge variant={getPriorityColor(extension.priority)} size="sm">
              {extension.priority.toUpperCase()}
            </Badge>
            <p className="text-xs text-gray-500 mt-1 capitalize">
              {extension.type}
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
        {extension.title}
      </h3>

      {/* Content */}
      <div className="mb-4 flex-grow">
        <p className={`text-sm text-gray-600 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {extension.content}
        </p>
        {extension.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-600 text-sm mt-2 hover:text-green-700"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-3 mb-4">
        {/* Target Audience */}
        <div className="flex flex-wrap gap-1">
          {extension.targetAudience.map((audience) => (
            <Badge key={audience} variant="info" size="sm">
              {audience}
            </Badge>
          ))}
        </div>

        {/* Counties */}
        {extension.counties.length > 0 && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">
              {extension.counties.length > 3 
                ? `${extension.counties.slice(0, 3).join(', ')} +${extension.counties.length - 3} more`
                : extension.counties.join(', ')
              }
            </span>
          </div>
        )}

        {/* Crops */}
        {extension.crops.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {extension.crops.map((crop) => (
              <Badge key={crop} variant="secondary" size="sm">
                {crop}
              </Badge>
            ))}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(extension.publishedAt).toLocaleDateString()}
          </div>
          {extension.expiresAt && (
            <span>
              Expires: {new Date(extension.expiresAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        <Button variant="outline" size="sm" className="w-full">
          View Full Details
        </Button>
      </div>
    </Card>
  );
};

export default ExtensionPage;