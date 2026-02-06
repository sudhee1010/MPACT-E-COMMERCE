import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomeAds() {
  const { user, loading } = useAuth();
  const [banner, setBanner] = useState(null);
  const [visible, setVisible] = useState(false);

  // 🔑 Detect LOGIN only (not refresh)
  useEffect(() => {
    if (loading) return;

    // Not logged in → do nothing
    if (!user) {
      setBanner(null);
      setVisible(false);
      return;
    }

    // ✅ LOGIN DETECTED
    const lastLogin = localStorage.getItem("lastLoginUser");

    if (lastLogin !== user._id) {
      // 🔄 New login session
      sessionStorage.removeItem("bannerClosedAt");
      localStorage.setItem("lastLoginUser", user._id);
    }
  }, [user, loading]);

  // 🔥 Fetch banner
  useEffect(() => {
    if (loading || !user) return;

    const fetchBanner = async () => {
      try {
        const res = await api.get("/api/banners");
        const data = res.data;

        if (!data?.image?.url || !data.updatedAt) return;

        setBanner(data);

        const bannerUpdatedAt = new Date(data.updatedAt).getTime();
        const bannerClosedAt = Number(
          sessionStorage.getItem("bannerClosedAt")
        );

        // ✅ Show banner if:
        // - not closed yet
        // - OR admin updated banner
        if (!bannerClosedAt || bannerUpdatedAt > bannerClosedAt) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      } catch (err) {
        console.error("Failed to fetch banner", err);
      }
    };

    fetchBanner();
  }, [user, loading]);

  const closeBanner = () => {
    sessionStorage.setItem("bannerClosedAt", Date.now().toString());
    setVisible(false);
  };

  if (!banner || !visible) return null;

  return (
    <div className="fixed bottom-[110px] right-6 z-[950] max-w-[360px] sm:max-w-[420px]">
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-yellow-400/30">

        {/* Close */}
        <button
          onClick={closeBanner}
          className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full"
        >
          <X size={14} />
        </button>

        {/* Image */}
        <img
          src={banner.image.url}
          alt={banner.title || "Advertisement"}
          className="w-full h-[220px] object-cover"
        />

        {/* Overlay */}
        {(banner.title || banner.subtitle) && (
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
            {banner.title && (
              <h3 className="text-white font-bold text-lg">
                {banner.title}
              </h3>
            )}
            {banner.subtitle && (
              <p className="text-gray-200 text-sm mt-1">
                {banner.subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

