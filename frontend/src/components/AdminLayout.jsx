import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Package,
  ShoppingCart,
  Users,
  Image,
  Settings,
  BarChart3,
  Monitor,
} from "lucide-react";

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: "Inbox", path: "/inbox", icon: Menu },
    { label: "CMS", path: "/cms", icon: Image },
    { label: "Ads Banner", path: "/adsbanner", icon: Monitor },
  ];

  const settingsItems = [
    { label: "Personal Settings", path: "/personalsettings", icon: Users },
    { label: "Global Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#1a1a1a] text-white">
      
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#0f0f0f] fixed inset-y-0 left-0 z-50 
        ${open ? "block" : "hidden"} lg:block`}
      >
        <div className="p-6 text-2xl font-bold text-yellow-400">
          Admin Panel
        </div>

        {[...menuItems, ...settingsItems].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 transition ${active(
                item.path
              )}`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </aside>

      {/* Content */}
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">

        <header className="bg-[#0f0f0f] border-b border-gray-800 p-4 flex items-center justify-between">
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X /> : <Menu />}
          </button>

          <h2 className="capitalize text-lg">
            {location.pathname.replace("/", "")}
          </h2>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
