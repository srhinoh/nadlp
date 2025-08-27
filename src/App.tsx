import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuthState } from './hooks/useAuth';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Farm from './pages/Farm';
import Extension from './pages/Extension';
import Warehouse from './pages/Warehouse';

function App() {
  const auth = useAuthState();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={!auth.user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={auth.user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/marketplace" 
              element={auth.user ? <Marketplace /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/farm" 
              element={auth.user?.role === 'farmer' ? <Farm /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/extension" 
              element={auth.user ? <Extension /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/warehouse" 
              element={auth.user ? <Warehouse /> : <Navigate to="/login" />} 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;