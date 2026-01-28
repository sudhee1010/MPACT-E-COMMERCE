import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, X, Clock, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog.jsx';
import { Label } from '../components/ui/Label.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select.jsx';
import { Switch } from '../components/ui/Switch.jsx';

const initialAds = [
  {
    id: 'AD001',
    title: 'Summer Sale Banner',
    description: 'Limited time offer - Up to 70% off',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    ctaText: 'Shop Now',
    ctaLink: '/summer-sale',
    position: 'homepage-top',
    active: true,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    impressions: 15420,
    clicks: 856,
  },
  {
    id: 'AD002',
    title: 'New Collection Launch',
    description: 'Discover our latest arrivals',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    ctaText: 'Explore',
    ctaLink: '/new-collection',
    position: 'homepage-middle',
    active: true,
    startDate: '2026-01-10',
    endDate: '2026-02-28',
    impressions: 8932,
    clicks: 421,
  },
  {
    id: 'AD003',
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ctaText: 'Learn More',
    ctaLink: '/shipping',
    position: 'sidebar',
    active: true,
    impressions: 5234,
    clicks: 178,
  },
];

export function AdsBanner() {
  const [ads, setAds] = useState(initialAds);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ctaText: '',
    ctaLink: '',
    position: 'homepage-top',
    active: true,
    startDate: '',
    endDate: '',
  });

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAd = () => {
    const newAd = {
      id: `AD${String(ads.length + 1).padStart(3, '0')}`,
      ...formData,
      impressions: 0,
      clicks: 0,
    };
    setAds([...ads, newAd]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditAd = () => {
    if (!editingAd) return;
    setAds(ads.map(a => a.id === editingAd.id ? { ...a, ...formData, impressions: a.impressions, clicks: a.clicks } : a));
    resetForm();
    setEditingAd(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ad banner?')) {
      setAds(ads.filter((a) => a.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      ctaText: '',
      ctaLink: '',
      position: 'homepage-top',
      active: true,
      startDate: '',
      endDate: '',
    });
  };

  const openEditDialog = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      image: ad.image,
      ctaText: ad.ctaText,
      ctaLink: ad.ctaLink,
      position: ad.position,
      active: ad.active,
      startDate: ad.startDate || '',
      endDate: ad.endDate || '',
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getPositionLabel = (position) => {
    const labels = {
      'homepage-top': 'Homepage - Top',
      'homepage-middle': 'Homepage - Middle',
      'homepage-bottom': 'Homepage - Bottom',
      'product-page': 'Product Page',
      'checkout': 'Checkout Page',
      'sidebar': 'Sidebar',
    };
    return labels[position] || position;
  };

  const calculateCTR = (impressions, clicks) => {
    if (impressions === 0) return '0.00';
    return ((clicks / impressions) * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Input
              placeholder="Search ads by title or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
              <Plus size={20} className="mr-2" />
              Add Ad Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Ad Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter banner title"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="image" className="text-gray-300">Banner Image</Label>
                <div className="space-y-2">
                  {formData.image && (
                    <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <label htmlFor="image-upload" className="block">
                    <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                      <Upload size={16} className="inline mr-2" />
                      <span className="text-sm text-gray-300">Upload Image</span>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste image URL..."
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText" className="text-gray-300">CTA Text</Label>
                  <Input
                    id="ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Shop Now"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink" className="text-gray-300">CTA Link</Label>
                  <Input
                    id="ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/sale"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="position" className="text-gray-300">Position</Label>
                <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-gray-700">
                    <SelectItem value="homepage-top" className="text-white">Homepage - Top</SelectItem>
                    <SelectItem value="homepage-middle" className="text-white">Homepage - Middle</SelectItem>
                    <SelectItem value="homepage-bottom" className="text-white">Homepage - Bottom</SelectItem>
                    <SelectItem value="product-page" className="text-white">Product Page</SelectItem>
                    <SelectItem value="checkout" className="text-white">Checkout Page</SelectItem>
                    <SelectItem value="sidebar" className="text-white">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-gray-300">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Active</Label>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>
              <Button onClick={handleAddAd} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Add Ad Banner
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editingAd} onOpenChange={(open) => !open && setEditingAd(null)}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Ad Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title" className="text-gray-300">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter banner title"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-description" className="text-gray-300">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-image" className="text-gray-300">Banner Image</Label>
                <div className="space-y-2">
                  {formData.image && (
                    <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <label htmlFor="edit-image-upload" className="block">
                    <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                      <Upload size={16} className="inline mr-2" />
                      <span className="text-sm text-gray-300">Upload Image</span>
                    </div>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste image URL..."
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-ctaText" className="text-gray-300">CTA Text</Label>
                  <Input
                    id="edit-ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Shop Now"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-ctaLink" className="text-gray-300">CTA Link</Label>
                  <Input
                    id="edit-ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/sale"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-position" className="text-gray-300">Position</Label>
                <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-gray-700">
                    <SelectItem value="homepage-top" className="text-white">Homepage - Top</SelectItem>
                    <SelectItem value="homepage-middle" className="text-white">Homepage - Middle</SelectItem>
                    <SelectItem value="homepage-bottom" className="text-white">Homepage - Bottom</SelectItem>
                    <SelectItem value="product-page" className="text-white">Product Page</SelectItem>
                    <SelectItem value="checkout" className="text-white">Checkout Page</SelectItem>
                    <SelectItem value="sidebar" className="text-white">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-startDate" className="text-gray-300">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endDate" className="text-gray-300">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Active</Label>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>
              <Button onClick={handleEditAd} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Update Ad Banner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <BarChart3 size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Banners</p>
              <p className="text-2xl font-bold text-white">{ads.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Eye size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Banners</p>
              <p className="text-2xl font-bold text-white">{ads.filter(a => a.active).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Eye size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Impressions</p>
              <p className="text-2xl font-bold text-white">{ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-600/20 rounded-lg">
              <BarChart3 size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Clicks</p>
              <p className="text-2xl font-bold text-white">{ads.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all">
            <div className="aspect-video bg-gray-800 relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ad.active ? 'bg-green-900/80 text-green-400 border border-green-700' : 'bg-red-900/80 text-red-400 border border-red-700'
                  }`}
                >
                  {ad.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{ad.title}</h3>
                  <p className="text-sm text-gray-400">{ad.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-900/50 text-blue-400 border border-blue-700 rounded">
                    {getPositionLabel(ad.position)}
                  </span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Impressions</p>
                  <p className="text-sm font-semibold text-white">{ad.impressions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Clicks</p>
                  <p className="text-sm font-semibold text-white">{ad.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">CTR</p>
                  <p className="text-sm font-semibold text-white">{calculateCTR(ad.impressions, ad.clicks)}%</p>
                </div>
              </div>

              {/* Dates */}
              {(ad.startDate || ad.endDate) && (
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <Clock size={14} />
                  <span>
                    {ad.startDate && new Date(ad.startDate).toLocaleDateString()} - {ad.endDate && new Date(ad.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewAd(ad)}
                  className="flex-1 bg-blue-600/20 border-blue-700 text-blue-400 hover:bg-blue-600/30"
                >
                  <Eye size={16} className="mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(ad)}
                  className="flex-1 bg-yellow-400/20 border-yellow-700 text-yellow-400 hover:bg-yellow-400/30"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-600/20 border-red-700 text-red-400 hover:bg-red-600/30"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewAd} onOpenChange={(open) => !open && setPreviewAd(null)}>
        <DialogContent className="max-w-3xl bg-[#2a2a2a] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Banner Preview</DialogTitle>
          </DialogHeader>
          {previewAd && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                <img src={previewAd.image} alt={previewAd.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{previewAd.title}</h3>
                    <p className="text-lg text-gray-200 mb-4">{previewAd.description}</p>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                      {previewAd.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Position:</p>
                  <p className="text-white font-medium">{getPositionLabel(previewAd.position)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status:</p>
                  <p className="text-white font-medium">{previewAd.active ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}