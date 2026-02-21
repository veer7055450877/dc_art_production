import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login({ username, password });
      if (res.success) {
        localStorage.setItem('adminToken', res.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-serif text-charcoal mb-6 text-center">Admin Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-gold-400 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-gold-400 outline-none" 
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-xs text-center text-gray-400 mt-4">Default: admin / password</p>
      </div>
    </div>
  );
};
