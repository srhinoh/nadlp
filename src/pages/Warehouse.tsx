import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import Badge from '../components/Common/Badge';
import Button from '../components/Common/Button';
import { useAuth } from '../hooks/useAuth';
import { Warehouse, FileText, DollarSign, Shield, Calendar, MapPin, Package, TrendingUp } from 'lucide-react';
import { mockWarehouseReceipts, mockFarmers } from '../data/mockData';

const WarehousePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  // Filter warehouse receipts based on user role
  const getRelevantReceipts = () => {
    if (user?.role === 'farmer') {
      return mockWarehouseReceipts.filter(wr => wr.farmerId === user.id);
    }
    return mockWarehouseReceipts; // For other roles, show all
  };

  const relevantReceipts = getRelevantReceipts();

  const handleCreateWR = () => {
    alert('Create Warehouse Receipt functionality would be implemented here');
  };

  const handlePledgeCollateral = (wrId: string) => {
    alert(`Pledge WR ${wrId} as collateral functionality would be implemented here`);
  };

  const handleInsure = (wrId: string) => {
    alert(`Insurance for WR ${wrId} functionality would be implemented here`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warehouse Receipts</h1>
            <p className="text-gray-600 mt-2">
              Digital warehouse receipts for secure storage and credit access
            </p>
          </div>
          {user?.role === 'farmer' && (
            <Button onClick={handleCreateWR} className="mt-4 sm:mt-0">
              Create Receipt
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{relevantReceipts.length}</h3>
            <p className="text-gray-600">Active Receipts</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {relevantReceipts.reduce((sum, wr) => sum + wr.quantity, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Quantity (kg)</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {relevantReceipts.filter(wr => wr.liens.length > 0).length}
            </h3>
            <p className="text-gray-600">Pledged as Collateral</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {relevantReceipts.filter(wr => wr.insured).length}
            </h3>
            <p className="text-gray-600">Insured</p>
          </Card>
        </div>

        {/* Warehouse Receipts List */}
        <div className="space-y-6">
          {relevantReceipts.map((receipt) => {
            const farmer = mockFarmers.find(f => f.id === receipt.farmerId);
            const isExpanded = selectedReceipt === receipt.id;

            return (
              <Card 
                key={receipt.id} 
                hover
                className={`cursor-pointer transition-all duration-200 ${
                  isExpanded ? 'ring-2 ring-green-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedReceipt(isExpanded ? null : receipt.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          WR #{receipt.wrNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {farmer?.name} • {receipt.commodity}
                        </p>
                      </div>
                      <Badge variant={receipt.status === 'active' ? 'success' : 'secondary'}>
                        {receipt.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Commodity</p>
                        <p className="text-sm text-gray-900">{receipt.commodity}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Grade</p>
                        <p className="text-sm text-gray-900">{receipt.grade}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Quantity</p>
                        <p className="text-sm text-gray-900">{receipt.quantity.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Moisture</p>
                        <p className="text-sm text-gray-900">{receipt.moisture}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Stored: {new Date(receipt.storageDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Expires: {new Date(receipt.expiryDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Warehouse: {receipt.warehouseId}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex items-center gap-2 mt-4 lg:mt-0">
                    {receipt.insured && (
                      <Badge variant="info">
                        <Shield className="w-3 h-3 mr-1" />
                        Insured
                      </Badge>
                    )}
                    {receipt.liens.length > 0 && (
                      <Badge variant="warning">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Pledged
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Warehouse Details */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Storage Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Weight:</span>
                            <span className="text-gray-900">{receipt.weight} kg</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Grade:</span>
                            <span className="text-gray-900">{receipt.grade}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Moisture Content:</span>
                            <span className="text-gray-900">{receipt.moisture}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Storage Date:</span>
                            <span className="text-gray-900">
                              {new Date(receipt.storageDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Expiry Date:</span>
                            <span className="text-gray-900">
                              {new Date(receipt.expiryDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Liens & Collateral */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Financial Details</h4>
                        {receipt.liens.length > 0 ? (
                          <div className="space-y-3">
                            {receipt.liens.map((lien) => (
                              <div key={lien.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    {lien.financialInstitution}
                                  </span>
                                  <Badge variant={lien.status === 'active' ? 'warning' : 'success'}>
                                    {lien.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span>KES {lien.amount.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Interest Rate:</span>
                                    <span>{lien.interestRate}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Due Date:</span>
                                    <span>{new Date(lien.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No active liens</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Download WR certificate functionality would be implemented');
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                      
                      {user?.role === 'farmer' && receipt.liens.length === 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePledgeCollateral(receipt.id);
                          }}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Use as Collateral
                        </Button>
                      )}

                      {!receipt.insured && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInsure(receipt.id);
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Get Insurance
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Track commodity functionality would be implemented');
                        }}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {relevantReceipts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Warehouse className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No warehouse receipts found</h3>
            <p className="text-gray-600 mb-6">
              Store your commodities in certified warehouses to generate digital receipts.
            </p>
            {user?.role === 'farmer' && (
              <Button onClick={handleCreateWR}>
                Create Your First Receipt
              </Button>
            )}
          </div>
        )}

        {/* Information Panel */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About Warehouse Receipts
              </h3>
              <p className="text-gray-700 mb-3">
                Digital Warehouse Receipts (WRs) are secure, tamper-proof documents that represent 
                ownership of commodities stored in certified warehouses. They can be used as collateral 
                for loans and provide traceability for your produce.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Secure Storage</Badge>
                <Badge variant="success">Credit Access</Badge>
                <Badge variant="success">Insurance Coverage</Badge>
                <Badge variant="success">Quality Assurance</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default WarehousePage;