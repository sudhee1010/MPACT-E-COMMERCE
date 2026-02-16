import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Image,
  Settings,
  BarChart3,
  Monitor,
  LogOut,
  HelpingHandIcon,
   Star,
} from "lucide-react";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
    const { logout } = useAuth();


      const handleLogout = async () => {
    try {
      await logout();         
      navigate("/");    
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const active = (path) =>
    location.pathname === path
      ? "bg-yellow-400 text-black font-medium"
      : "text-gray-300 hover:bg-gray-800";

  const menuItems = [
    { label: "Dashboard", path: "/admindashboard", icon: Home },
    { label: "Orders", path: "/orders", icon: ShoppingCart },
    { label: "Products", path: "/products", icon: Package },
    { label: "Inventory", path: "/inventory", icon: Package },
    { label: "Categories", path: "/categories", icon: BarChart3 },
    { label: "Customers", path: "/customers", icon: Users },
    { label: "Reports", path: "/reports", icon: BarChart3 },
    { label: "Coupons", path: "/coupons", icon: Package },
    { label: "Distributor Enquiries", path: "/admin-distributor", icon: BarChart3 },
    { label: "CMS", path: "/cms", icon: Image },
    { label: "Ads Banner", path: "/adsbanner", icon: Monitor },
    { label: "Carousel Videos", path: "/carouselvideosadmin", icon: Monitor },
    { label: "Help Support", path: "/help-support", icon: HelpingHandIcon },
      { label: "Reviews", path: "/reviews", icon: Star },

  ];

  const settingsItems = [
    { label: "Personal Settings", path: "/personalsettings", icon: Users },
    // { label: "Global Settings", path: "/settings", icon: Settings },
  ];


  return (
    <>
      <style>{`
        /* Custom scrollbar for sidebar */
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #facc15 #0f0f0f;
        }
        
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #0f0f0f;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #facc15;
          border-radius: 3px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #fbbf24;
        }
        
        /* Equal height for all header elements */
        .header-height {
          height: 64px;
          min-height: 64px;
        }
        
        .header-button {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .header-title {
          height: 40px;
          display: flex;
          align-items: center;
        }
        
        .header-profile {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="min-h-screen w-full flex bg-[#1a1a1a] text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0f0f0f] flex-shrink-0">
          <div className="h-full flex flex-col">
            {/* Logo/Header */}
            <div className="p-6 text-2xl font-bold text-yellow-400 border-b border-gray-800 header-height flex items-center">
              Admin Panel
            </div>

            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto sidebar-scroll py-4">
              {/* Main Menu */}
              <div className="mb-6">
                <div className="px-6 py-2 text-xs uppercase text-gray-500 tracking-wider">
                  Main Menu
                </div>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 h-12 ${active(
                        item.path
                      )}`}
                    >
                      <Icon size={20} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Settings Menu */}
              <div className="mb-6">
                <div className="px-6 py-2 text-xs uppercase text-gray-500 tracking-wider">
                  Settings
                </div>
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 h-12 ${active(
                        item.path
                      )}`}
                    >
                      <Icon size={20} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout Button - Fixed at bottom */}
            <div className="border-t border-gray-800 p-4">
              {/* Admin Info */}
              <div className="px-4 text-center">
                <div className="text-sm text-gray-400">
                  Admin User
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Version 1.0.0
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-[#0f0f0f] border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-30 header-height">
            <div className="flex items-center gap-4 h-full">
              <h2 className="capitalize text-lg md:text-xl font-semibold header-title">
                {location.pathname
                  .replace("/admin/", "")
                  .replace("/", "")
                  .replace(/-/g, " ") || "Dashboard"}
              </h2>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-4 h-full">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors header-button"
              >
                <Home size={18} />
                <span>View Store</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 header-button"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
              
              {/* Admin Profile Icon */}
              <div className="header-profile bg-yellow-400 text-black font-bold rounded-full">
                A
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
            <div className="max-w-full">
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-[#0f0f0f] border-t border-gray-800 p-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MPACT Admin Panel. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}