/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Upload, X, ChevronLeft, ChevronRight, Eye, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Switch } from '../components/ui/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
// import exampleImage from '../assets/84138733411d48a8e23fe82c3916134f03d8b019.png';

const initialBadges = [
  { id: 'PB001', name: 'NO PRESERVATIVES', backgroundColor: '#1a472a', textColor: '#4ade80', borderColor: '#22c55e', active: true },
  { id: 'PB002', name: 'HIGH PROTEIN', backgroundColor: '#422006', textColor: '#fbbf24', borderColor: '#f59e0b', active: true },
  { id: 'PB003', name: 'NO SUGAR', backgroundColor: '#1a472a', textColor: '#4ade80', borderColor: '#22c55e', active: true },
  { id: 'PB004', name: 'LACTOSE FREE', backgroundColor: '#422006', textColor: '#fbbf24', borderColor: '#f59e0b', active: true },
  { id: 'PB005', name: 'KETO', backgroundColor: '#422006', textColor: '#fbbf24', borderColor: '#f59e0b', active: true },
  { id: 'PB006', name: 'ORGANIC', backgroundColor: '#1a472a', textColor: '#4ade80', borderColor: '#22c55e', active: true },
  { id: 'PB007', name: 'GLUTEN FREE', backgroundColor: '#422006', textColor: '#fbbf24', borderColor: '#f59e0b', active: true },
  { id: 'PB008', name: 'VEGAN', backgroundColor: '#1a472a', textColor: '#4ade80', borderColor: '#22c55e', active: true },
];

const initialBanners = [
  {
    id: 'B001',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    images: ['https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200'],
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    active: true,
    position: 'top',
  },
];

const initialCarousel = [
  {
    id: 'C001',
    title: 'Premium Headphones',
    description: 'Experience crystal clear sound with premium audio quality',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
    buttonText: 'View Details',
    buttonLink: '/products/headphones',
    order: 1,
    active: true,
  },
];

const initialPromos = [
  {
    id: 'P001',
    title: 'New Arrivals',
    description: 'Check out our latest collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    badgeText: 'NEW',
    ctaText: 'Explore',
    ctaLink: '/new',
    active: true,
    backgroundColor: '#fbbf24',
  },
];

export function CMSEnhanced() {
  const [banners, setBanners] = useState(initialBanners);
  const [carouselSlides, setCarouselSlides] = useState(initialCarousel);
  const [promos, setPromos] = useState(initialPromos);
  const [badges, setBadges] = useState(initialBadges);

  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isCarouselDialogOpen, setIsCarouselDialogOpen] = useState(false);
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const [editingBanner, setEditingBanner] = useState(null);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [editingPromo, setEditingPromo] = useState(null);
  const [editingBadge, setEditingBadge] = useState(null);

  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    images: [],
    buttonText: '',
    buttonLink: '',
    active: true,
    position: 'top',
  });

  const [carouselForm, setCarouselForm] = useState({
    title: '',
    description: '',
    images: [],
    buttonText: '',
    buttonLink: '',
    active: true,
  });

  const [promoForm, setPromoForm] = useState({
    title: '',
    description: '',
    image: '',
    badgeText: '',
    ctaText: '',
    ctaLink: '',
    active: true,
    backgroundColor: '#fbbf24',
  });

  const [badgeForm, setBadgeForm] = useState({
    name: '',
    backgroundColor: '#1a472a',
    textColor: '#4ade80',
    borderColor: '#22c55e',
    active: true,
  });

  // Image upload handlers
  const handleBannerImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerForm({ ...bannerForm, images: [...bannerForm.images, reader.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarouselForm({ ...carouselForm, images: [...carouselForm.images, reader.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromoImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPromoForm({ ...promoForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner Functions
  const handleAddBanner = () => {
    const newBanner = {
      id: `B${String(banners.length + 1).padStart(3, '0')}`,
      ...bannerForm,
    };
    setBanners([...banners, newBanner]);
    resetBannerForm();
    setIsBannerDialogOpen(false);
  };

  const handleEditBanner = () => {
    if (!editingBanner) return;
    setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, ...bannerForm } : b));
    resetBannerForm();
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const openEditBannerDialog = (banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      images: banner.images,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      active: banner.active,
      position: banner.position,
    });
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      subtitle: '',
      images: [],
      buttonText: '',
      buttonLink: '',
      active: true,
      position: 'top',
    });
  };

  // Carousel Functions
  const handleAddCarousel = () => {
    const newSlide = {
      id: `C${String(carouselSlides.length + 1).padStart(3, '0')}`,
      ...carouselForm,
      order: carouselSlides.length + 1,
    };
    setCarouselSlides([...carouselSlides, newSlide]);
    resetCarouselForm();
    setIsCarouselDialogOpen(false);
  };

  const handleEditCarousel = () => {
    if (!editingCarousel) return;
    setCarouselSlides(carouselSlides.map(c => 
      c.id === editingCarousel.id ? { ...c, ...carouselForm } : c
    ));
    resetCarouselForm();
    setEditingCarousel(null);
  };

  const handleDeleteCarousel = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setCarouselSlides(carouselSlides.filter(c => c.id !== id));
    }
  };

  const moveCarouselSlide = (id, direction) => {
    const index = carouselSlides.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newSlides = [...carouselSlides];
    if (direction === 'up' && index > 0) {
      [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
    } else if (direction === 'down' && index < newSlides.length - 1) {
      [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
    }
    
    newSlides.forEach((slide, idx) => {
      slide.order = idx + 1;
    });
    
    setCarouselSlides(newSlides);
  };

  const openEditCarouselDialog = (slide) => {
    setEditingCarousel(slide);
    setCarouselForm({
      title: slide.title,
      description: slide.description,
      images: slide.images,
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
      active: slide.active,
    });
  };

  const resetCarouselForm = () => {
    setCarouselForm({
      title: '',
      description: '',
      images: [],
      buttonText: '',
      buttonLink: '',
      active: true,
    });
  };

  // Promo Functions
  const handleAddPromo = () => {
    const newPromo = {
      id: `P${String(promos.length + 1).padStart(3, '0')}`,
      ...promoForm,
    };
    setPromos([...promos, newPromo]);
    resetPromoForm();
    setIsPromoDialogOpen(false);
  };

  const handleEditPromo = () => {
    if (!editingPromo) return;
    setPromos(promos.map(p => p.id === editingPromo.id ? { ...p, ...promoForm } : p));
    resetPromoForm();
    setEditingPromo(null);
  };

  const handleDeletePromo = (id) => {
    if (window.confirm('Are you sure you want to delete this promo?')) {
      setPromos(promos.filter(p => p.id !== id));
    }
  };

  const openEditPromoDialog = (promo) => {
    setEditingPromo(promo);
    setPromoForm({
      title: promo.title,
      description: promo.description,
      image: promo.image,
      badgeText: promo.badgeText,
      ctaText: promo.ctaText,
      ctaLink: promo.ctaLink,
      active: promo.active,
      backgroundColor: promo.backgroundColor,
    });
  };

  const resetPromoForm = () => {
    setPromoForm({
      title: '',
      description: '',
      image: '',
      badgeText: '',
      ctaText: '',
      ctaLink: '',
      active: true,
      backgroundColor: '#fbbf24',
    });
  };

  // Badge Functions
  const handleAddBadge = () => {
    const newBadge = {
      id: `PB${String(badges.length + 1).padStart(3, '0')}`,
      ...badgeForm,
    };
    setBadges([...badges, newBadge]);
    resetBadgeForm();
    setIsBadgeDialogOpen(false);
  };

  const handleEditBadge = () => {
    if (!editingBadge) return;
    setBadges(badges.map(b => b.id === editingBadge.id ? { ...b, ...badgeForm } : b));
    resetBadgeForm();
    setEditingBadge(null);
  };

  const handleDeleteBadge = (id) => {
    if (window.confirm('Are you sure you want to delete this badge?')) {
      setBadges(badges.filter(b => b.id !== id));
    }
  };

  const openEditBadgeDialog = (badge) => {
    setEditingBadge(badge);
    setBadgeForm({
      name: badge.name,
      backgroundColor: badge.backgroundColor,
      textColor: badge.textColor,
      borderColor: badge.borderColor,
      active: badge.active,
    });
  };

  const resetBadgeForm = () => {
    setBadgeForm({
      name: '',
      backgroundColor: '#1a472a',
      textColor: '#4ade80',
      borderColor: '#22c55e',
      active: true,
    });
  };

  const openPreview = (images) => {
    setPreviewImages(images);
    setPreviewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="banners" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#2a2a2a]">
          <TabsTrigger value="banners" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Banners</TabsTrigger>
          <TabsTrigger value="carousel" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Carousel</TabsTrigger>
          <TabsTrigger value="promos" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Promos</TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Product Badges</TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Preview</TabsTrigger>
        </TabsList>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Manage Banners</h3>
            <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Enter banner title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtitle</Label>
                    <Input
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Enter subtitle"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Banner Images</Label>
                    <div className="space-y-2">
                      {bannerForm.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {bannerForm.images.map((image, index) => (
                            <div key={index} className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setBannerForm({ ...bannerForm, images: bannerForm.images.filter((_, i) => i !== index) })}
                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label htmlFor="banner-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Images</span>
                        </div>
                        <input
                          id="banner-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleBannerImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setBannerForm({ ...bannerForm, images: [...bannerForm.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Button Text</Label>
                      <Input
                        value={bannerForm.buttonText}
                        onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                        placeholder="Shop Now"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Button Link</Label>
                      <Input
                        value={bannerForm.buttonLink}
                        onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                        placeholder="/shop"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Position</Label>
                    <Select value={bannerForm.position} onValueChange={(value) => setBannerForm({ ...bannerForm, position: value })}>
                      <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2a2a] border-gray-700">
                        <SelectItem value="top" className="text-white">Top</SelectItem>
                        <SelectItem value="middle" className="text-white">Middle</SelectItem>
                        <SelectItem value="bottom" className="text-white">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={bannerForm.active}
                      onCheckedChange={(checked) => setBannerForm({ ...bannerForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddBanner} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Add Banner
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Banner Dialog */}
            <Dialog open={!!editingBanner} onOpenChange={(open) => !open && setEditingBanner(null)}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Enter banner title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtitle</Label>
                    <Input
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Enter subtitle"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Banner Images</Label>
                    <div className="space-y-2">
                      {bannerForm.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {bannerForm.images.map((image, index) => (
                            <div key={index} className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setBannerForm({ ...bannerForm, images: bannerForm.images.filter((_, i) => i !== index) })}
                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label htmlFor="banner-edit-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Images</span>
                        </div>
                        <input
                          id="banner-edit-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleBannerImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setBannerForm({ ...bannerForm, images: [...bannerForm.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Button Text</Label>
                      <Input
                        value={bannerForm.buttonText}
                        onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                        placeholder="Shop Now"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Button Link</Label>
                      <Input
                        value={bannerForm.buttonLink}
                        onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                        placeholder="/shop"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Position</Label>
                    <Select value={bannerForm.position} onValueChange={(value) => setBannerForm({ ...bannerForm, position: value })}>
                      <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2a2a] border-gray-700">
                        <SelectItem value="top" className="text-white">Top</SelectItem>
                        <SelectItem value="middle" className="text-white">Middle</SelectItem>
                        <SelectItem value="bottom" className="text-white">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={bannerForm.active}
                      onCheckedChange={(checked) => setBannerForm({ ...bannerForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditBanner} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Update Banner
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all">
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={banner.images[0]}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  {banner.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {banner.images.length} images
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{banner.title}</h4>
                      <p className="text-sm text-gray-400">{banner.subtitle}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-900/50 text-blue-400 border border-blue-700 rounded">
                        {banner.position}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${ 
                        banner.active ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}
                    >
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {banner.images.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openPreview(banner.images)}
                        className="flex-1 bg-blue-600/20 border-blue-700 text-blue-400 hover:bg-blue-600/30"
                      >
                        <Eye size={16} className="mr-1" />
                        Preview
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditBannerDialog(banner)}
                      className="flex-1 bg-yellow-400/20 border-yellow-700 text-yellow-400 hover:bg-yellow-400/30"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="bg-red-600/20 border-red-700 text-red-400 hover:bg-red-600/30"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Carousel Tab */}
        <TabsContent value="carousel" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Manage Carousel Slides</h3>
            <Dialog open={isCarouselDialogOpen} onOpenChange={setIsCarouselDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Carousel Slide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={carouselForm.title}
                      onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={carouselForm.description}
                      onChange={(e) => setCarouselForm({ ...carouselForm, description: e.target.value })}
                      placeholder="Enter description"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Slide Images</Label>
                    <div className="space-y-2">
                      {carouselForm.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {carouselForm.images.map((image, index) => (
                            <div key={index} className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setCarouselForm({ ...carouselForm, images: carouselForm.images.filter((_, i) => i !== index) })}
                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label htmlFor="carousel-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Images</span>
                        </div>
                        <input
                          id="carousel-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleCarouselImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setCarouselForm({ ...carouselForm, images: [...carouselForm.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Button Text (Optional)</Label>
                      <Input
                        value={carouselForm.buttonText}
                        onChange={(e) => setCarouselForm({ ...carouselForm, buttonText: e.target.value })}
                        placeholder="View Details"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Button Link (Optional)</Label>
                      <Input
                        value={carouselForm.buttonLink}
                        onChange={(e) => setCarouselForm({ ...carouselForm, buttonLink: e.target.value })}
                        placeholder="/products"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={carouselForm.active}
                      onCheckedChange={(checked) => setCarouselForm({ ...carouselForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddCarousel} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Add Slide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Carousel Dialog */}
            <Dialog open={!!editingCarousel} onOpenChange={(open) => !open && setEditingCarousel(null)}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Carousel Slide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={carouselForm.title}
                      onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={carouselForm.description}
                      onChange={(e) => setCarouselForm({ ...carouselForm, description: e.target.value })}
                      placeholder="Enter description"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Slide Images</Label>
                    <div className="space-y-2">
                      {carouselForm.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {carouselForm.images.map((image, index) => (
                            <div key={index} className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setCarouselForm({ ...carouselForm, images: carouselForm.images.filter((_, i) => i !== index) })}
                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label htmlFor="carousel-edit-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Images</span>
                        </div>
                        <input
                          id="carousel-edit-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleCarouselImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setCarouselForm({ ...carouselForm, images: [...carouselForm.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Button Text (Optional)</Label>
                      <Input
                        value={carouselForm.buttonText}
                        onChange={(e) => setCarouselForm({ ...carouselForm, buttonText: e.target.value })}
                        placeholder="View Details"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Button Link (Optional)</Label>
                      <Input
                        value={carouselForm.buttonLink}
                        onChange={(e) => setCarouselForm({ ...carouselForm, buttonLink: e.target.value })}
                        placeholder="/products"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={carouselForm.active}
                      onCheckedChange={(checked) => setCarouselForm({ ...carouselForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditCarousel} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Update Slide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {carouselSlides.map((slide, index) => (
              <div key={slide.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4 flex gap-4 hover:border-yellow-400/40 transition-all">
                <div className="w-32 h-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0 relative">
                  <img
                    src={slide.images[0]}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {slide.images.length > 1 && (
                    <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {slide.images.length}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{slide.title}</h4>
                      <p className="text-sm text-gray-400">{slide.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        slide.active ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}
                    >
                      {slide.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => moveCarouselSlide(slide.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button
                    onClick={() => moveCarouselSlide(slide.id, 'down')}
                    disabled={index === carouselSlides.length - 1}
                    className="p-1 text-gray-400 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveDown size={18} />
                  </button>
                  {slide.images.length > 1 && (
                    <button
                      onClick={() => openPreview(slide.images)}
                      className="p-1 text-blue-400 hover:bg-blue-600/20 rounded"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => openEditCarouselDialog(slide)}
                    className="p-1 text-yellow-400 hover:bg-yellow-400/10 rounded"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCarousel(slide.id)}
                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Promo Sections Tab */}
        <TabsContent value="promos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Manage Promo Sections</h3>
            <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Promo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Promo Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={promoForm.title}
                      onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                      placeholder="Enter promo title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={promoForm.description}
                      onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                      placeholder="Enter description"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Promo Image</Label>
                    <div className="space-y-2">
                      {promoForm.image && (
                        <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                          <img src={promoForm.image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPromoForm({ ...promoForm, image: '' })}
                            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      <label htmlFor="promo-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Image</span>
                        </div>
                        <input
                          id="promo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePromoImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value={promoForm.image}
                        onChange={(e) => setPromoForm({ ...promoForm, image: e.target.value })}
                        placeholder="Or paste image URL..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Badge Text</Label>
                      <Input
                        value={promoForm.badgeText}
                        onChange={(e) => setPromoForm({ ...promoForm, badgeText: e.target.value })}
                        placeholder="NEW"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Background Color</Label>
                      <Input
                        type="color"
                        value={promoForm.backgroundColor}
                        onChange={(e) => setPromoForm({ ...promoForm, backgroundColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">CTA Text</Label>
                      <Input
                        value={promoForm.ctaText}
                        onChange={(e) => setPromoForm({ ...promoForm, ctaText: e.target.value })}
                        placeholder="Explore"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">CTA Link</Label>
                      <Input
                        value={promoForm.ctaLink}
                        onChange={(e) => setPromoForm({ ...promoForm, ctaLink: e.target.value })}
                        placeholder="/promo"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={promoForm.active}
                      onCheckedChange={(checked) => setPromoForm({ ...promoForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddPromo} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Add Promo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Promo Dialog */}
            <Dialog open={!!editingPromo} onOpenChange={(open) => !open && setEditingPromo(null)}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Promo Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      value={promoForm.title}
                      onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                      placeholder="Enter promo title"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={promoForm.description}
                      onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                      placeholder="Enter description"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Promo Image</Label>
                    <div className="space-y-2">
                      {promoForm.image && (
                        <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                          <img src={promoForm.image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPromoForm({ ...promoForm, image: '' })}
                            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      <label htmlFor="promo-edit-upload" className="block">
                        <div className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-md px-4 py-2 text-center hover:bg-gray-800 transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          <span className="text-sm text-gray-300">Upload Image</span>
                        </div>
                        <input
                          id="promo-edit-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePromoImageUpload}
                          className="hidden"
                        />
                      </label>
                      <Input
                        value={promoForm.image}
                        onChange={(e) => setPromoForm({ ...promoForm, image: e.target.value })}
                        placeholder="Or paste image URL..."
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Badge Text</Label>
                      <Input
                        value={promoForm.badgeText}
                        onChange={(e) => setPromoForm({ ...promoForm, badgeText: e.target.value })}
                        placeholder="NEW"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Background Color</Label>
                      <Input
                        type="color"
                        value={promoForm.backgroundColor}
                        onChange={(e) => setPromoForm({ ...promoForm, backgroundColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">CTA Text</Label>
                      <Input
                        value={promoForm.ctaText}
                        onChange={(e) => setPromoForm({ ...promoForm, ctaText: e.target.value })}
                        placeholder="Explore"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">CTA Link</Label>
                      <Input
                        value={promoForm.ctaLink}
                        onChange={(e) => setPromoForm({ ...promoForm, ctaLink: e.target.value })}
                        placeholder="/promo"
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={promoForm.active}
                      onCheckedChange={(checked) => setPromoForm({ ...promoForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditPromo} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Update Promo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <div key={promo.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all">
                <div className="aspect-square bg-gray-800 relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  {promo.badgeText && (
                    <div 
                      className="absolute top-3 right-3 px-3 py-1 text-sm font-bold text-black rounded-full"
                      style={{ backgroundColor: promo.backgroundColor }}
                    >
                      {promo.badgeText}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{promo.title}</h4>
                      <p className="text-sm text-gray-400">{promo.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        promo.active ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}
                    >
                      {promo.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditPromoDialog(promo)}
                      className="flex-1 bg-yellow-400/20 border-yellow-700 text-yellow-400 hover:bg-yellow-400/30"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeletePromo(promo.id)}
                      className="bg-red-600/20 border-red-700 text-red-400 hover:bg-red-600/30"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Product Badges Tab */}
        <TabsContent value="badges" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Manage Product Badges</h3>
              <p className="text-sm text-gray-400 mt-1">Create reusable badges for product pages</p>
            </div>
            <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Badge
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Product Badge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Badge Name</Label>
                    <Input
                      value={badgeForm.name}
                      onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value.toUpperCase() })}
                      placeholder="NO PRESERVATIVES"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Background</Label>
                      <Input
                        type="color"
                        value={badgeForm.backgroundColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, backgroundColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Text Color</Label>
                      <Input
                        type="color"
                        value={badgeForm.textColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, textColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Border</Label>
                      <Input
                        type="color"
                        value={badgeForm.borderColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, borderColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Preview</Label>
                    <div 
                      className="inline-block px-3 py-1.5 text-xs font-bold rounded border-2"
                      style={{
                        backgroundColor: badgeForm.backgroundColor,
                        color: badgeForm.textColor,
                        borderColor: badgeForm.borderColor,
                      }}
                    >
                      {badgeForm.name || 'BADGE PREVIEW'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={badgeForm.active}
                      onCheckedChange={(checked) => setBadgeForm({ ...badgeForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddBadge} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Add Badge
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Badge Dialog */}
            <Dialog open={!!editingBadge} onOpenChange={(open) => !open && setEditingBadge(null)}>
              <DialogContent className="max-w-md bg-[#2a2a2a] border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Product Badge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Badge Name</Label>
                    <Input
                      value={badgeForm.name}
                      onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value.toUpperCase() })}
                      placeholder="NO PRESERVATIVES"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Background</Label>
                      <Input
                        type="color"
                        value={badgeForm.backgroundColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, backgroundColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Text Color</Label>
                      <Input
                        type="color"
                        value={badgeForm.textColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, textColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Border</Label>
                      <Input
                        type="color"
                        value={badgeForm.borderColor}
                        onChange={(e) => setBadgeForm({ ...badgeForm, borderColor: e.target.value })}
                        className="bg-[#1a1a1a] border-gray-700 h-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Preview</Label>
                    <div 
                      className="inline-block px-3 py-1.5 text-xs font-bold rounded border-2"
                      style={{
                        backgroundColor: badgeForm.backgroundColor,
                        color: badgeForm.textColor,
                        borderColor: badgeForm.borderColor,
                      }}
                    >
                      {badgeForm.name || 'BADGE PREVIEW'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={badgeForm.active}
                      onCheckedChange={(checked) => setBadgeForm({ ...badgeForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditBadge} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Update Badge
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Example Image */}
          <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Reference Example</h4>
            {/* <img src={exampleImage} alt="Badge Examples" className="rounded border border-gray-700" /> */}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/40 transition-all">
                <div className="space-y-3">
                  <div 
                    className="w-full px-3 py-2 text-xs font-bold rounded border-2 text-center"
                    style={{
                      backgroundColor: badge.backgroundColor,
                      color: badge.textColor,
                      borderColor: badge.borderColor,
                    }}
                  >
                    {badge.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        badge.active ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}
                    >
                      {badge.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditBadgeDialog(badge)}
                      className="flex-1 bg-yellow-400/20 border-yellow-700 text-yellow-400 hover:bg-yellow-400/30 text-xs"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBadge(badge.id)}
                      className="bg-red-600/20 border-red-700 text-red-400 hover:bg-red-600/30"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Live Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Live Carousel Preview</h3>
            <CarouselPreview slides={carouselSlides.filter(s => s.active)} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Active Banners</h4>
              <div className="space-y-3">
                {banners.filter(b => b.active).map(banner => (
                  <div key={banner.id} className="bg-[#1a1a1a] rounded-lg p-3">
                    <div className="flex gap-3">
                      <img src={banner.images[0]} alt={banner.title} className="w-20 h-14 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{banner.title}</p>
                        <p className="text-gray-400 text-xs">{banner.position} position</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Active Promos</h4>
              <div className="space-y-3">
                {promos.filter(p => p.active).map(promo => (
                  <div key={promo.id} className="bg-[#1a1a1a] rounded-lg p-3">
                    <div className="flex gap-3">
                      <img src={promo.image} alt={promo.title} className="w-20 h-14 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{promo.title}</p>
                        <span 
                          className="inline-block px-2 py-0.5 text-xs font-bold text-black rounded mt-1"
                          style={{ backgroundColor: promo.backgroundColor }}
                        >
                          {promo.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Image Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl bg-[#2a2a2a] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Image Gallery Preview</DialogTitle>
          </DialogHeader>
          <ImageGalleryPreview images={previewImages} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Carousel Preview Component
function CarouselPreview({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (slides.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-12 text-center">
        <p className="text-gray-400">No active carousel slides to preview</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={currentSlide.images[0]}
          alt={currentSlide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white w-full">
            <h3 className="text-3xl font-bold mb-2">{currentSlide.title}</h3>
            <p className="text-lg mb-4">{currentSlide.description}</p>
            {currentSlide.buttonText && (
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                {currentSlide.buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-yellow-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Image Gallery Preview Component
function ImageGalleryPreview({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden">
        <div className="aspect-video">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-yellow-400' : 'border-transparent'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="text-center text-gray-400 text-sm">
        Image {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
}