import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigation = () => {
    if (!user) return [];

    const baseNav = [
      { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    ];

    switch (user.role) {
      case 'farmer':
        return [
          ...baseNav,
          { name: 'My Farm', path: '/farm', icon: '🌱' },
          { name: 'Marketplace', path: '/marketplace', icon: '🏪' },
          { name: 'Warehouse Receipts', path: '/warehouse', icon: '📋' },
          { name: 'Extension', path: '/extension', icon: '🎓' },
        ];
      case 'buyer':
        return [
          ...baseNav,
          { name: 'Marketplace', path: '/marketplace', icon: '🏪' },
          { name: 'My Purchases', path: '/purchases', icon: '🛒' },
          { name: 'Contracts', path: '/contracts', icon: '📄' },
        ];
      case 'extension_officer':
        return [
          ...baseNav,
          { name: 'Farmers', path: '/farmers', icon: '👥' },
          { name: 'Field Reports', path: '/reports', icon: '📝' },
          { name: 'Extension', path: '/extension', icon: '🎓' },
        ];
      case 'admin':
        return [
          ...baseNav,
          { name: 'Analytics', path: '/analytics', icon: '📈' },
          { name: 'Users', path: '/users', icon: '👥' },
          { name: 'System', path: '/system', icon: '⚙️' },
        ];
      default:
        return baseNav;
    }
  };

  const navigation = getNavigation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">NADLP</h1>
                <p className="text-xs text-gray-500">National Agri Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;