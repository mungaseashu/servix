import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with API call
    const mockBookings = [
      {
        id: 1,
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234-567-8900"
        },
        service: {
          name: "Plumbing Repair",
          category: "plumbing"
        },
        date: "2026-01-20",
        time: "10:00",
        duration: 2,
        location: "123 Main St, New York, NY",
        status: "pending",
        price: 150,
        notes: "Kitchen sink repair needed"
      },
      {
        id: 2,
        customer: {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 234-567-8901"
        },
        service: {
          name: "Electrical Installation",
          category: "electrical"
        },
        date: "2026-01-21",
        time: "14:00",
        duration: 3,
        location: "456 Oak Ave, Brooklyn, NY",
        status: "confirmed",
        price: 300,
        notes: "Install new ceiling fan"
      },
      {
        id: 3,
        customer: {
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+1 234-567-8902"
        },
        service: {
          name: "House Cleaning",
          category: "cleaning"
        },
        date: "2026-01-19",
        time: "09:00",
        duration: 4,
        location: "789 Pine St, Queens, NY",
        status: "completed",
        price: 200,
        notes: "Deep cleaning for 2-bedroom apartment"
      }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'confirmed':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
          <p className="text-gray-600">Manage your service bookings and customer requests</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, color: "bg-blue-500" },
            { label: "Pending", value: bookings.filter(b => b.status === 'pending').length, color: "bg-yellow-500" },
            { label: "Confirmed", value: bookings.filter(b => b.status === 'confirmed').length, color: "bg-green-500" },
            { label: "Completed", value: bookings.filter(b => b.status === 'completed').length, color: "bg-purple-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} opacity-20 flex items-center justify-center`}>
                  <div className={`w-6 h-6 rounded ${stat.color}`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">When customers book your services, they'll appear here.</p>
              </div>
            ) : (
              bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.customer.name}</h3>
                          <p className="text-sm text-gray-600">{booking.customer.email}</p>
                          <p className="text-sm text-gray-600">{booking.customer.phone}</p>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{booking.duration} hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">${booking.price}</span>
                        </div>
                      </div>

                      {/* Service Name */}
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {booking.service.name}
                        </span>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="text-sm text-gray-600">
                          <strong>Notes:</strong> {booking.notes}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="ml-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                          Accept
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Decline
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Mark Complete
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
