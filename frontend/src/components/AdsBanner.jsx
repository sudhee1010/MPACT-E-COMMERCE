import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Upload,
  X,
  Image as ImageIcon,
  Trash2,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export function AdsBanner() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState(null); // NEW IMAGE ONLY
  const [preview, setPreview] = useState(""); // existing or new image
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState("desktop"); // desktop | mobile
  const [loading, setLoading] = useState(true);

  // 🔹 Load existing banner
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get("/api/banners");
        if (res.data) {
          setTitle(res.data.title || "");
          setSubtitle(res.data.subtitle || "");
          setPreview(res.data.image?.url || "");
        }
      } catch (err) {
        toast.error("Failed to load banner");
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // 🔹 Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Save / Update banner
  const handleSubmit = async () => {
    // ❌ Only block if NO existing image AND NO new image
    if (!preview && !imageFile) {
      toast.error("Banner image is required");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();
      data.append("title", title);
      data.append("subtitle", subtitle);

      // 🔥 Image optional on update
      if (imageFile) {
        data.append("image", imageFile);
      }

      await api.post("/api/banners", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Banner saved successfully");
      setImageFile(null); // reset after save
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save banner"
      );
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Delete banner
  const handleDelete = async () => {
    if (!window.confirm("Delete homepage banner?")) return;

    try {
      await api.delete("/api/banners");
      setTitle("");
      setSubtitle("");
      setPreview("");
      setImageFile(null);
      toast.success("Banner deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete banner"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading banner...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-[#1b1b1b] rounded-xl border border-yellow-400/20 p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-yellow-400/20 pb-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="text-yellow-400" size={26} />
          <h2 className="text-2xl font-bold text-white">
            Homepage Banner
          </h2>
        </div>

        {/* Preview Toggle */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setView("desktop")}
            className={view === "desktop" ? "bg-yellow-400 text-black" : ""}
            variant="outline"
          >
            <Monitor size={16} />
          </Button>
          <Button
            size="sm"
            onClick={() => setView("mobile")}
            className={view === "mobile" ? "bg-yellow-400 text-black" : ""}
            variant="outline"
          >
            <Smartphone size={16} />
          </Button>
        </div>
      </div>

      {/* Title */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Banner title"
        className="bg-black border-gray-700 text-white"
      />

      {/* Subtitle */}
      <Textarea
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Banner subtitle"
        className="bg-black border-gray-700 text-white min-h-[90px]"
      />

      {/* Image Upload + Preview */}
      <div className="space-y-2">
        {preview ? (
          <div
            className={`relative overflow-hidden rounded-lg border border-gray-700 mx-auto ${
              view === "mobile"
                ? "max-w-[380px] h-[420px]"
                : "h-[360px]"
            }`}
          >
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="Banner preview"
            />

            {/* Live Text Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold">
                {title || "Banner Title"}
              </h3>
              <p className="text-gray-200 text-sm mt-2">
                {subtitle || "Banner subtitle goes here"}
              </p>
            </div>

            {/* Remove image (only frontend state) */}
            <button
              onClick={() => {
                setPreview("");
                setImageFile(null);
              }}
              className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400 transition">
            <Upload className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">
              Click to upload banner image
            </span>
            <span className="text-xs text-gray-500 mt-1">
              1920 × 600 recommended
            </span>
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10"
        >
          {saving ? "Saving..." : "Save Banner"}
        </Button>

        {preview && (
          <Button
            onClick={handleDelete}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600/20"
          >
            <Trash2 size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
