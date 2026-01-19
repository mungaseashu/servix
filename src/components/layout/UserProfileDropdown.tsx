import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, Package, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout, getUserRole } from "@/services/api";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const userRole = getUserRole();

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-accent font-medium capitalize">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {userRole === 'user' && (
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Home</span>
                </Link>
              )}

              {userRole === 'provider' && (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Dashboard</span>
                  </Link>
                  <Link
                    to="/collabhub"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Collab Hub</span>
                  </Link>
                </>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Profile Settings</span>
              </Link>

              <div className="border-t border-gray-100 my-2"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDropdown;
