import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Image as ImageIcon, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Switch } from '../components/ui/Switch';

const initialBanners = [
  {
    id: 'B001',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    active: true,
  },
  {
    id: 'B002',
    title: 'New Arrivals',
    subtitle: 'Check out our latest collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    buttonText: 'Explore',
    buttonLink: '/new',
    active: true,
  },
];

const initialCarousel = [
  {
    id: 'C001',
    title: 'Premium Headphones',
    description: 'Experience crystal clear sound',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    order: 1,
    active: true,
  },
  {
    id: 'C002',
    title: 'Smart Watches',
    description: 'Stay connected in style',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    order: 2,
    active: true,
  },
  {
    id: 'C003',
    title: 'Tech Accessories',
    description: 'Enhance your workspace',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    order: 3,
    active: true,
  },
];

const initialHeroSections = [
  {
    id: 'H001',
    heading: 'Welcome to Our Store',
    subheading: 'Discover amazing products at unbeatable prices',
    backgroundImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920',
    ctaText: 'Start Shopping',
    ctaLink: '/products',
    active: true,
  },
];

export default function CMS() {
  const [banners, setBanners] = useState(initialBanners);
  const [carouselSlides, setCarouselSlides] = useState(initialCarousel);
  const [heroSections, setHeroSections] = useState(initialHeroSections);

  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isCarouselDialogOpen, setIsCarouselDialogOpen] = useState(false);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

  const [editingBanner, setEditingBanner] = useState(null);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [editingHero, setEditingHero] = useState(null);

  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    active: true,
  });

  const [carouselForm, setCarouselForm] = useState({
    title: '',
    description: '',
    image: '',
    active: true,
  });

  const [heroForm, setHeroForm] = useState({
    heading: '',
    subheading: '',
    backgroundImage: '',
    ctaText: '',
    ctaLink: '',
    active: true,
  });

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
      image: banner.image,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      active: banner.active,
    });
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      subtitle: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      active: true,
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
    
    // Update order
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
      image: slide.image,
      active: slide.active,
    });
  };

  const resetCarouselForm = () => {
    setCarouselForm({
      title: '',
      description: '',
      image: '',
      active: true,
    });
  };

  // Hero Section Functions
  const handleAddHero = () => {
    const newHero = {
      id: `H${String(heroSections.length + 1).padStart(3, '0')}`,
      ...heroForm,
    };
    setHeroSections([...heroSections, newHero]);
    resetHeroForm();
    setIsHeroDialogOpen(false);
  };

  const handleEditHero = () => {
    if (!editingHero) return;
    setHeroSections(heroSections.map(h => 
      h.id === editingHero.id ? { ...h, ...heroForm } : h
    ));
    resetHeroForm();
    setEditingHero(null);
  };

  const handleDeleteHero = (id) => {
    if (window.confirm('Are you sure you want to delete this hero section?')) {
      setHeroSections(heroSections.filter(h => h.id !== id));
    }
  };

  const openEditHeroDialog = (hero) => {
    setEditingHero(hero);
    setHeroForm({
      heading: hero.heading,
      subheading: hero.subheading,
      backgroundImage: hero.backgroundImage,
      ctaText: hero.ctaText,
      ctaLink: hero.ctaLink,
      active: hero.active,
    });
  };

  const resetHeroForm = () => {
    setHeroForm({
      heading: '',
      subheading: '',
      backgroundImage: '',
      ctaText: '',
      ctaLink: '',
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="banners" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="hero">Hero Sections</TabsTrigger>
        </TabsList>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Banners</h3>
            <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <Plus size={20} className="mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Enter banner title"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtitle</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Image URL</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Text</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonText}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                      placeholder="Shop Now"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Link</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonLink}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                      placeholder="/shop"
                    />
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
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">

                <DialogHeader>
                  <DialogTitle>Edit Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Enter banner title"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtitle</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Image URL</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Text</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonText}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                      placeholder="Shop Now"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Link</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonLink}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                      placeholder="/shop"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={bannerForm.active}
                      onCheckedChange={(checked) => setBannerForm({ ...bannerForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditBanner} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Banner
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-[#2a2a2a] rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white-900">{banner.title}</h4>
                      <p className="text-sm text-white-600">{banner.subtitle}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        banner.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditBannerDialog(banner)}
                      className="flex-1"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="text-red-600 hover:bg-red-50"
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
            <h3 className="text-lg font-semibold">Manage Carousel Slides</h3>
            <Dialog open={isCarouselDialogOpen} onOpenChange={setIsCarouselDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">

                <DialogHeader>
                  <DialogTitle>Add Carousel Slide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={carouselForm.title}
                      onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={carouselForm.description}
                      onChange={(e) => setCarouselForm({ ...carouselForm, description: e.target.value })}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={carouselForm.image}
                      onChange={(e) => setCarouselForm({ ...carouselForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={carouselForm.active}
                      onCheckedChange={(checked) => setCarouselForm({ ...carouselForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddCarousel} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Slide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Carousel Dialog */}
            <Dialog open={!!editingCarousel} onOpenChange={(open) => !open && setEditingCarousel(null)}>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Carousel Slide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={carouselForm.title}
                      onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={carouselForm.description}
                      onChange={(e) => setCarouselForm({ ...carouselForm, description: e.target.value })}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={carouselForm.image}
                      onChange={(e) => setCarouselForm({ ...carouselForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={carouselForm.active}
                      onCheckedChange={(checked) => setCarouselForm({ ...carouselForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditCarousel} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Slide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {carouselSlides.map((slide, index) => (
              <div key={slide.id} className="bg-grey rounded-lg shadow-sm p-4 flex gap-4">
                <div className="w-32 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white-900">{slide.title}</h4>
                      <p className="text-sm text-white-600">{slide.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        slide.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
                    className="p-1 text-white-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button
                    onClick={() => moveCarouselSlide(slide.id, 'down')}
                    disabled={index === carouselSlides.length - 1}
                    className="p-1 text-white-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveDown size={18} />
                  </button>
                  <button
                    onClick={() => openEditCarouselDialog(slide)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCarousel(slide.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Hero Sections Tab */}
        <TabsContent value="hero" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Hero Sections</h3>
            <Dialog open={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Hero Section
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Hero Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label className="text-gray-300">Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Enter banner title"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtitle</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Image URL</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Text</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonText}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                      placeholder="Shop Now"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Button Link</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={bannerForm.buttonLink}
                      onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                      placeholder="/shop"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Active</Label>
                    <Switch
                      checked={heroForm.active}
                      onCheckedChange={(checked) => setHeroForm({ ...heroForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddHero} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Hero Section
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Hero Dialog */}
            <Dialog open={!!editingHero} onOpenChange={(open) => !open && setEditingHero(null)}>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Hero Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Heading</Label>
                    <Input
                      value={heroForm.heading}
                      onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
                      placeholder="Enter heading"
                    />
                  </div>
                  <div>
                    <Label>Subheading</Label>
                    <Textarea
                      value={heroForm.subheading}
                      onChange={(e) => setHeroForm({ ...heroForm, subheading: e.target.value })}
                      placeholder="Enter subheading"
                    />
                  </div>
                  <div>
                    <Label>Background Image URL</Label>
                    <Input
                      value={heroForm.backgroundImage}
                      onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>CTA Button Text</Label>
                    <Input
                      value={heroForm.ctaText}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <Label>CTA Button Link</Label>
                    <Input
                      value={heroForm.ctaLink}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaLink: e.target.value })}
                      placeholder="/products"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={heroForm.active}
                      onCheckedChange={(checked) => setHeroForm({ ...heroForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditHero} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Hero Section
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {heroSections.map((hero) => (
              <div key={hero.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={hero.backgroundImage}
                    alt={hero.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h2 className="text-3xl font-bold mb-2">{hero.heading}</h2>
                      <p className="text-lg mb-4">{hero.subheading}</p>
                      <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md">
                        {hero.ctaText}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        hero.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {hero.active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditHeroDialog(hero)}
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteHero(hero.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
