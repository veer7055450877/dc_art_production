import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Booking, Service, PortfolioItem } from '../../types';
import { Button } from '../../components/ui/Button';
import { LogOut, LayoutDashboard, Calendar, Image, MessageSquare, HelpCircle, Plus, Trash2, Edit2 } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
    
    // Fetch all data for dashboard
    const fetchData = async () => {
        const [bData, sData, pData] = await Promise.all([
            api.getBookings(),
            api.getServices(),
            api.getPortfolio()
        ]);
        setBookings(bData);
        setServices(sData);
        setPortfolio(pData);
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch(activeTab) {
        case 'bookings':
            return (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-charcoal">Recent Bookings</h2>
                    <span className="bg-gold-400/20 text-gold-600 px-3 py-1 rounded-full text-xs font-bold">{bookings.length} Total</span>
                  </div>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="p-4 font-medium">Client</th>
                          <th className="p-4 font-medium">Event Date</th>
                          <th className="p-4 font-medium">Contact</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bookings.map(booking => (
                          <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-charcoal">{booking.name}</td>
                            <td className="p-4 text-gray-600">{booking.date}</td>
                            <td className="p-4">
                              <div className="text-sm font-medium text-gray-800">{booking.phone}</div>
                              <div className="text-xs text-gray-500">{booking.email}</div>
                            </td>
                            <td className="p-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">{booking.status}</span></td>
                            <td className="p-4">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            );
        
        case 'services':
            return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-charcoal">Services List</h2>
                        <Button size="sm" className="flex items-center gap-2"><Plus size={16} /> Add Service</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map(service => (
                            <div key={service.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-start bg-gray-50 hover:border-gold-400 transition-colors">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-charcoal">{service.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                                    <span className="inline-block mt-2 text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-400">Icon: {service.icon_name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'portfolio':
             return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-charcoal">Portfolio Items</h2>
                        <Button size="sm" className="flex items-center gap-2"><Plus size={16} /> Add Item</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {portfolio.map(item => (
                            <div key={item.id} className="group relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img src={item.type === 'video' ? (item.poster || item.src) : item.src} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <p className="text-white font-serif text-sm truncate">{item.title}</p>
                                    <p className="text-gold-400 text-xs uppercase tracking-wider">{item.category}</p>
                                    <div className="flex justify-end gap-2 mt-2">
                                         <button className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white hover:text-charcoal"><Edit2 size={12} /></button>
                                         <button className="p-1.5 bg-white/20 rounded-full text-white hover:bg-red-500"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">
                                    {item.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return (
                <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-lg text-gray-500">Management for <span className="font-bold capitalize text-charcoal">{activeTab}</span> is coming soon.</p>
                </div>
            );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white hidden md:flex flex-col shadow-xl z-10">
        <div className="p-6 text-2xl font-serif font-bold text-gold-400 tracking-wider border-b border-white/10">DC Admin</div>
        <nav className="flex-1 px-4 space-y-2 py-6">
          {[
              { id: 'bookings', icon: Calendar, label: 'Bookings' },
              { id: 'services', icon: LayoutDashboard, label: 'Services' },
              { id: 'portfolio', icon: Image, label: 'Portfolio' },
              { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
              { id: 'faqs', icon: HelpCircle, label: 'FAQs' }
          ].map((item) => (
            <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${activeTab === item.id ? 'bg-gold-400 text-charcoal font-medium shadow-md transform translate-x-1' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <item.icon size={20} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 w-full p-2 rounded hover:bg-red-500/10 transition-colors">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen bg-[#f3f4f6]">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-serif text-charcoal capitalize font-bold">{activeTab}</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your website content</p>
            </div>
            <div className="md:hidden">
                <Button size="sm" onClick={handleLogout}>Logout</Button>
            </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[600px]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
