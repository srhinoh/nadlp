import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Card from '../components/Common/Card';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'john.kamau@email.com',
    password: 'demo123'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Use demo123 as password for any demo user.');
    }
  };

  const demoUsers = [
    { email: 'john.kamau@email.com', role: 'Farmer' },
    { email: 'grace.wanjiku@email.com', role: 'Farmer' },
    { email: 'david.otieno@agribusiness.co.ke', role: 'Buyer' },
    { email: 'mary.chepkemoi@extension.gov.ke', role: 'Extension Officer' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NADLP</h1>
          <p className="text-gray-600">National Agriculture Digital Linkage Platform</p>
          <p className="text-sm text-gray-500 mt-2">Empowering Kenya's Agriculture Ecosystem</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign In</h2>
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Demo Users:</h3>
            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.email}
                  onClick={() => setFormData({ email: user.email, password: 'demo123' })}
                  className="w-full text-left p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{user.email}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Password: demo123</p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Republic of Kenya - Ministry of Agriculture & Livestock Development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;