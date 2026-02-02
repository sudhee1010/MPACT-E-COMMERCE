import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Image as ImageIcon, Upload, X, ChevronLeft, ChevronRight, Play, FileText, Users, Calendar, Film, Tag, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Switch } from '../components/ui/Switch';

// Initial Home Carousel data
const initialHomeCarousel = [
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

// Initial About Us sections
const initialAboutSections = [
  {
    id: 'A001',
    title: 'Our Story',
    content: 'Founded in 2010, we started as a small team with a big vision. Over the years, we have grown into a trusted name in our industry, serving thousands of satisfied customers worldwide. Our journey has been guided by our core values of integrity, innovation, and customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    order: 1,
    active: true,
  },
  {
    id: 'A002',
    title: 'Our Mission',
    content: 'To empower individuals and businesses through innovative solutions that simplify their lives and drive growth. We believe in creating value through exceptional products and services that make a real difference.',
    image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800',
    order: 2,
    active: true,
  },
  {
    id: 'A003',
    title: 'Our Values',
    content: 'Integrity, Innovation, Excellence, and Community. These values guide every decision we make and every interaction we have. We believe in doing business the right way and making a positive impact on our community.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    order: 3,
    active: true,
  },
];

// Initial Blog posts
const initialBlogPosts = [
  {
    id: 'B001',
    title: 'Latest Trends in Technology for 2024',
    excerpt: 'Discover the newest innovations shaping our digital future. From AI to quantum computing, learn what trends will dominate the tech landscape this year.',
    content: 'The technology landscape is evolving at an unprecedented pace. In 2024, we are witnessing several key trends that are shaping our digital future. Artificial Intelligence continues to dominate, with more sophisticated applications emerging daily. Quantum computing is moving from theoretical to practical applications, promising breakthroughs in various fields. Additionally, edge computing is becoming increasingly important as we generate more data than ever before. This article explores these trends in detail, providing insights into what businesses and individuals should expect in the coming months.',
    author: 'John Doe',
    date: '2024-01-15',
    category: 'Technology',
    tags: ['AI', 'Innovation', 'Future Tech'],
    readTime: '5 min',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
    active: true,
  },
  {
    id: 'B002',
    title: 'Sustainable Business Practices in Modern Companies',
    excerpt: 'How forward-thinking companies are adopting eco-friendly approaches to reduce their carbon footprint and contribute to a greener future.',
    content: 'Sustainability is no longer just a buzzword; it is a business imperative. Modern companies are recognizing that sustainable practices are not only good for the environment but also good for business. From reducing waste in manufacturing processes to implementing green energy solutions, businesses are finding innovative ways to minimize their environmental impact. This article explores case studies of companies that have successfully integrated sustainability into their core operations, the benefits they have realized, and practical steps other businesses can take to follow their lead.',
    author: 'Jane Smith',
    date: '2024-01-10',
    category: 'Business',
    tags: ['Sustainability', 'Green Business', 'Eco-Friendly'],
    readTime: '7 min',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    active: true,
  },
];

// Initial Home Videos data
const initialHomeVideos = [
  {
    id: 'V001',
    videoFile: null,
    videoPreview: '',
    active: true,
  },
  {
    id: 'V002',
    videoFile: null,
    videoPreview: '',
    active: true,
  },
];

export default function CMS() {
  const [homeCarousel, setHomeCarousel] = useState(initialHomeCarousel);
  const [aboutSections, setAboutSections] = useState(initialAboutSections);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [homeVideos, setHomeVideos] = useState(initialHomeVideos);

  const [isHomeCarouselDialogOpen, setIsHomeCarouselDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isHomeVideosDialogOpen, setIsHomeVideosDialogOpen] = useState(false);

  const [editingAbout, setEditingAbout] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  const [homeCarouselForm, setHomeCarouselForm] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    active: true,
  });

  const [aboutForm, setAboutForm] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
    active: true,
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: '',
    category: '',
    tags: '',
    readTime: '',
    isFeatured: false,
    image: null,
    imagePreview: '',
    active: true,
  });

  const [homeVideosForm, setHomeVideosForm] = useState({
    videoFile: null,
    videoPreview: '',
    active: true,
  });

  // File upload handler
  const handleFileUpload = (event, setForm, formKey, previewKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          [formKey]: file,
          [previewKey]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded file
  const handleRemoveFile = (setForm, formKey, previewKey) => {
    setForm(prev => ({
      ...prev,
      [formKey]: null,
      [previewKey]: ''
    }));
  };

  // Home Carousel Functions
  const handleAddHomeCarousel = () => {
    const newSlide = {
      id: `C${String(homeCarousel.length + 1).padStart(3, '0')}`,
      title: homeCarouselForm.title,
      description: homeCarouselForm.description,
      image: homeCarouselForm.imagePreview,
      order: homeCarousel.length + 1,
      active: homeCarouselForm.active,
    };
    setHomeCarousel([...homeCarousel, newSlide]);
    resetHomeCarouselForm();
    setIsHomeCarouselDialogOpen(false);
  };

  const handleDeleteHomeCarousel = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setHomeCarousel(homeCarousel.filter(c => c.id !== id));
    }
  };

  const moveHomeCarouselSlide = (id, direction) => {
    const index = homeCarousel.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newSlides = [...homeCarousel];
    if (direction === 'up' && index > 0) {
      [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
    } else if (direction === 'down' && index < newSlides.length - 1) {
      [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
    }
    
    // Update order
    newSlides.forEach((slide, idx) => {
      slide.order = idx + 1;
    });
    
    setHomeCarousel(newSlides);
  };

  const resetHomeCarouselForm = () => {
    setHomeCarouselForm({
      title: '',
      description: '',
      image: null,
      imagePreview: '',
      active: true,
    });
  };

  // About Us Functions
  const handleAddAbout = () => {
    const newSection = {
      id: `A${String(aboutSections.length + 1).padStart(3, '0')}`,
      title: aboutForm.title,
      content: aboutForm.content,
      image: aboutForm.imagePreview,
      order: aboutSections.length + 1,
      active: aboutForm.active,
    };
    setAboutSections([...aboutSections, newSection]);
    resetAboutForm();
    setIsAboutDialogOpen(false);
  };

  const handleEditAbout = () => {
    if (!editingAbout) return;
    setAboutSections(aboutSections.map(a => 
      a.id === editingAbout.id ? { 
        ...a, 
        title: aboutForm.title,
        content: aboutForm.content,
        image: aboutForm.imagePreview,
        active: aboutForm.active
      } : a
    ));
    resetAboutForm();
    setEditingAbout(null);
  };

  const handleDeleteAbout = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setAboutSections(aboutSections.filter(a => a.id !== id));
    }
  };

  const moveAboutSection = (id, direction) => {
    const index = aboutSections.findIndex(a => a.id === id);
    if (index === -1) return;
    
    const newSections = [...aboutSections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    
    // Update order
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });
    
    setAboutSections(newSections);
  };

  const openEditAboutDialog = (section) => {
    setEditingAbout(section);
    setAboutForm({
      title: section.title,
      content: section.content,
      image: null,
      imagePreview: section.image,
      active: section.active,
    });
  };

  const resetAboutForm = () => {
    setAboutForm({
      title: '',
      content: '',
      image: null,
      imagePreview: '',
      active: true,
    });
  };

  // Blog Functions
  const handleAddBlog = () => {
    const tagsArray = blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const newPost = {
      id: `B${String(blogPosts.length + 1).padStart(3, '0')}`,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      author: blogForm.author,
      date: blogForm.date || new Date().toISOString().split('T')[0],
      category: blogForm.category,
      tags: tagsArray,
      readTime: blogForm.readTime,
      isFeatured: blogForm.isFeatured,
      image: blogForm.imagePreview,
      active: blogForm.active,
    };
    setBlogPosts([...blogPosts, newPost]);
    resetBlogForm();
    setIsBlogDialogOpen(false);
  };

  const handleEditBlog = () => {
    if (!editingBlog) return;
    
    const tagsArray = blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    setBlogPosts(blogPosts.map(b => 
      b.id === editingBlog.id ? { 
        ...b, 
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        author: blogForm.author,
        date: blogForm.date,
        category: blogForm.category,
        tags: tagsArray,
        readTime: blogForm.readTime,
        isFeatured: blogForm.isFeatured,
        image: blogForm.imagePreview,
        active: blogForm.active
      } : b
    ));
    resetBlogForm();
    setEditingBlog(null);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(b => b.id !== id));
    }
  };

  const openEditBlogDialog = (post) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      tags: post.tags.join(', '),
      readTime: post.readTime,
      isFeatured: post.isFeatured,
      image: null,
      imagePreview: post.image,
      active: post.active,
    });
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      date: '',
      category: '',
      tags: '',
      readTime: '',
      isFeatured: false,
      image: null,
      imagePreview: '',
      active: true,
    });
  };

  // Home Videos Functions
  const handleAddHomeVideo = () => {
    const newVideo = {
      id: `V${String(homeVideos.length + 1).padStart(3, '0')}`,
      videoFile: homeVideosForm.videoFile,
      videoPreview: homeVideosForm.videoPreview,
      active: homeVideosForm.active,
    };
    setHomeVideos([...homeVideos, newVideo]);
    resetHomeVideosForm();
    setIsHomeVideosDialogOpen(false);
  };

  const handleDeleteHomeVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setHomeVideos(homeVideos.filter(v => v.id !== id));
    }
  };

  const resetHomeVideosForm = () => {
    setHomeVideosForm({
      videoFile: null,
      videoPreview: '',
      active: true,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="homeCarousel" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homeCarousel">Home Carousel</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="homeVideos">Home Videos</TabsTrigger>
        </TabsList>

        {/* Home Carousel Tab - No Edit Option */}
        <TabsContent value="homeCarousel" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Home Carousel Slides</h3>
            <Dialog open={isHomeCarouselDialogOpen} onOpenChange={setIsHomeCarouselDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Home Carousel Slide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={homeCarouselForm.title}
                      onChange={(e) => setHomeCarouselForm({ ...homeCarouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={homeCarouselForm.description}
                      onChange={(e) => setHomeCarouselForm({ ...homeCarouselForm, description: e.target.value })}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <Label>Image</Label>
                    {homeCarouselForm.imagePreview ? (
                      <div className="relative mt-2">
                        <img
                          src={homeCarouselForm.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setHomeCarouselForm, 'image', 'imagePreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setHomeCarouselForm, 'image', 'imagePreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={homeCarouselForm.active}
                      onCheckedChange={(checked) => setHomeCarouselForm({ ...homeCarouselForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddHomeCarousel} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Slide
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {homeCarousel.map((slide, index) => (
              <div key={slide.id} className="bg-[#2a2a2a] rounded-lg shadow-sm p-4 flex gap-4 border border-gray-700">
                <div className="w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{slide.title}</h4>
                      <p className="text-sm text-gray-300">{slide.description}</p>
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
                    onClick={() => moveHomeCarouselSlide(slide.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button
                    onClick={() => moveHomeCarouselSlide(slide.id, 'down')}
                    disabled={index === homeCarousel.length - 1}
                    className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveDown size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteHomeCarousel(slide.id)}
                    className="p-1 text-red-400 hover:bg-red-900 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* About Us Tab */}
        <TabsContent value="about" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage About Us Content</h3>
            <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Section
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add About Us Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      placeholder="e.g., Our Story, Mission, Values"
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={aboutForm.content}
                      onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                      placeholder="Enter detailed content for this section"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label>Image (Optional)</Label>
                    {aboutForm.imagePreview ? (
                      <div className="relative mt-2">
                        <img
                          src={aboutForm.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setAboutForm, 'image', 'imagePreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setAboutForm, 'image', 'imagePreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={aboutForm.active}
                      onCheckedChange={(checked) => setAboutForm({ ...aboutForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddAbout} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Section
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit About Dialog */}
            <Dialog open={!!editingAbout} onOpenChange={(open) => !open && setEditingAbout(null)}>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit About Us Section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      placeholder="e.g., Our Story, Mission, Values"
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={aboutForm.content}
                      onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                      placeholder="Enter detailed content for this section"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label>Image (Optional)</Label>
                    {aboutForm.imagePreview ? (
                      <div className="relative mt-2">
                        <img
                          src={aboutForm.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setAboutForm, 'image', 'imagePreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setAboutForm, 'image', 'imagePreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={aboutForm.active}
                      onCheckedChange={(checked) => setAboutForm({ ...aboutForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleEditAbout} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Section
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {aboutSections.map((section, index) => (
              <div key={section.id} className="bg-[#2a2a2a] rounded-lg shadow-sm overflow-hidden border border-gray-700">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="text-blue-400" size={20} />
                        <h4 className="text-xl font-semibold text-white">{section.title}</h4>
                      </div>
                      <p className="text-gray-300 whitespace-pre-line mb-4">{section.content}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => moveAboutSection(section.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <MoveUp size={18} />
                      </button>
                      <button
                        onClick={() => moveAboutSection(section.id, 'down')}
                        disabled={index === aboutSections.length - 1}
                        className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <MoveDown size={18} />
                      </button>
                    </div>
                  </div>
                  {section.image && (
                    <div className="mb-4">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        section.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {section.active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditAboutDialog(section)}
                        className="bg-gray-800 text-white hover:bg-gray-700 border-gray-600"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAbout(section.id)}
                        className="text-red-400 hover:bg-red-900 border-red-600"
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

        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
            <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Post
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      placeholder="Enter post excerpt (short description)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Enter full blog content"
                      rows={8}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Author</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        type="date"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        placeholder="Technology, Business, etc."
                      />
                    </div>
                    <div>
                      <Label>Read Time</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        placeholder="e.g., 5 min"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      placeholder="AI, Innovation, Technology, etc."
                    />
                  </div>
                  <div>
                    <Label>Featured Image</Label>
                    {blogForm.imagePreview ? (
                      <div className="relative mt-2">
                        <img
                          src={blogForm.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setBlogForm, 'image', 'imagePreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setBlogForm, 'image', 'imagePreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={blogForm.isFeatured}
                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, isFeatured: checked })}
                        />
                        <Label>Featured Post</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={blogForm.active}
                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, active: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleAddBlog} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Blog Dialog */}
            <Dialog open={!!editingBlog} onOpenChange={(open) => !open && setEditingBlog(null)}>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      placeholder="Enter post excerpt (short description)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Enter full blog content"
                      rows={8}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Author</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        type="date"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        placeholder="Technology, Business, etc."
                      />
                    </div>
                    <div>
                      <Label>Read Time</Label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        placeholder="e.g., 5 min"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      placeholder="AI, Innovation, Technology, etc."
                    />
                  </div>
                  <div>
                    <Label>Featured Image</Label>
                    {blogForm.imagePreview ? (
                      <div className="relative mt-2">
                        <img
                          src={blogForm.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setBlogForm, 'image', 'imagePreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setBlogForm, 'image', 'imagePreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={blogForm.isFeatured}
                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, isFeatured: checked })}
                        />
                        <Label>Featured Post</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={blogForm.active}
                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, active: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleEditBlog} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-[#2a2a2a] rounded-lg shadow-sm overflow-hidden border border-gray-700">
                <div className="relative h-48 bg-gray-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.isFeatured && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{post.title}</h4>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <FileText size={12} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditBlogDialog(post)}
                      className="flex-1 bg-gray-800 text-white hover:bg-gray-700 border-gray-600"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBlog(post.id)}
                      className="text-red-400 hover:bg-red-900 border-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Home Videos Tab - No Edit Option */}
        <TabsContent value="homeVideos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Home Videos</h3>
            <Dialog open={isHomeVideosDialogOpen} onOpenChange={setIsHomeVideosDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus size={20} className="mr-2" />
                  Add Video
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload New Home Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Video File</Label>
                    {homeVideosForm.videoPreview ? (
                      <div className="relative mt-2">
                        <video
                          src={homeVideosForm.videoPreview}
                          className="w-full h-48 object-cover rounded-lg"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(setHomeVideosForm, 'videoFile', 'videoPreview')}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Film className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">Click to upload video</p>
                            <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, setHomeVideosForm, 'videoFile', 'videoPreview')}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Active</Label>
                    <Switch
                      checked={homeVideosForm.active}
                      onCheckedChange={(checked) => setHomeVideosForm({ ...homeVideosForm, active: checked })}
                    />
                  </div>
                  <Button onClick={handleAddHomeVideo} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Upload Video
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeVideos.map((video) => (
              <div key={video.id} className="bg-[#2a2a2a] rounded-lg shadow-sm overflow-hidden border border-gray-700">
                <div className="relative aspect-video bg-gray-900">
                  <video
                    src={video.videoPreview}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="text-blue-400" size={16} />
                      <span className="text-xs text-gray-400">Home Video</span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        video.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {video.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteHomeVideo(video.id)}
                      className="flex-1 text-red-400 hover:bg-red-900 border-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
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