import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    { label: 'Total Orders', value: '24', change: '+12%' },
    { label: 'Saved Items', value: '8', change: '+3' },
    { label: 'Total Spent', value: '$45,890', change: '+18%' },
    { label: 'Loyalty Points', value: '2,450', change: '+250' },
  ];

  const recentOrders = [
    { id: 'ORD-001', item: 'Halo Twist Diamond Ring', date: '2025-11-15', status: 'Delivered', amount: '$12,500' },
    { id: 'ORD-002', item: 'Emerald Cut Solitaire', date: '2025-10-28', status: 'In Transit', amount: '$18,900' },
    { id: 'ORD-003', item: 'Vintage Rose Gold Ring', date: '2025-10-10', status: 'Delivered', amount: '$9,800' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-luxury-lightGray">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl font-bold text-luxury-dark mb-2">
            Welcome Back, <span className="text-gradient">Client</span>
          </h1>
          <p className="font-sans text-luxury-darkGray">
            Manage your orders, preferences, and exclusive benefits
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-sm font-sans text-luxury-darkGray uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-4xl font-bold text-luxury-dark">
                  {stat.value}
                </h3>
                <span className="text-sm font-sans text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="font-serif text-2xl font-semibold text-luxury-dark mb-6">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-luxury-lightGray rounded-lg hover:bg-luxury-cream transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-sans text-sm text-luxury-darkGray mb-1">{order.id}</p>
                    <p className="font-serif text-lg font-semibold text-luxury-dark">{order.item}</p>
                    <p className="font-sans text-sm text-luxury-darkGray mt-1">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl font-bold text-luxury-gold mb-2">{order.amount}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-sans ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="font-serif text-2xl font-semibold text-luxury-dark mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Track Order', icon: '📦' },
                { label: 'Contact Support', icon: '💬' },
                { label: 'Book Appointment', icon: '📅' },
                { label: 'Request Custom Design', icon: '✨' },
                { label: 'View Certificates', icon: '📜' },
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-4 bg-luxury-lightGray rounded-lg hover:bg-luxury-gold hover:text-white transition-all text-left"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-sans">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
