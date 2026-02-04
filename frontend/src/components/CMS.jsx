import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Image as ImageIcon, Upload, X, ChevronLeft, ChevronRight, Play, FileText, Users, Calendar, Film, Tag, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Switch } from '../components/ui/Switch';
import api from "../api/axios";
import toast from "react-hot-toast";
import ConfirmDialog from "../components/ui/ConfirmDialog";




export default function CMS() {
  const [homeCarousel, setHomeCarousel] = useState([]);
  const [about, setAbout] = useState(null);
  const [heroTitle, setHeroTitle] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [loadingHero, setLoadingHero] = useState(false);
  const [loadingHighlight, setLoadingHighlight] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loadingKnowMore, setLoadingKnowMore] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);



  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);

  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    readTime: 5,
    isFeatured: false,
    author: "",
    coverImage: null,
    imagePreview: ""
  });

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      description: "",
      content: "",
      category: "",
      tags: "",
      readTime: 5,
      isFeatured: false,
      author: "",
      coverImage: null,
      imagePreview: ""
    });
  };

  const [videos, setVideos] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoSaving, setVideoSaving] = useState(false);

  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoFile: null,
    videoPreview: ""
  });



  const [editingBlog, setEditingBlog] = useState(null);
  // const [homeVideos, setHomeVideos] = useState(initialHomeVideos);

  const [isHomeCarouselDialogOpen, setIsHomeCarouselDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isHomeVideosDialogOpen, setIsHomeVideosDialogOpen] = useState(false);


  const [knowMore, setKnowMore] = useState({
    sectionTitle: "",
    heading: "",
    imageHeading: "",
    description: "",
    image: "",
    imageFile: null,
    imagePreview: ""
  });


  const [homeCarouselForm, setHomeCarouselForm] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    active: true,
  });



  // const [homeVideosForm, setHomeVideosForm] = useState({
  //   videoFile: null,
  //   videoPreview: '',
  //   active: true,
  // });

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

  const openConfirm = (action) => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };


  // Home Carousel Functions

  const handleAddHomeCarousel = async () => {
    if (!homeCarouselForm.image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoadingBanner(true);

      const formData = new FormData();
      formData.append("image", homeCarouselForm.image);

      const { data } = await api.post(
        "/api/hero-banners/create-hero",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setHomeCarousel(prev => [...prev, data]);
      resetHomeCarouselForm();
      setIsHomeCarouselDialogOpen(false);

      toast.success("Banner uploaded successfully");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoadingBanner(false);
    }
  };


  useEffect(() => {
    fetchHeroBanners();
  }, []);

  const fetchHeroBanners = async () => {
    try {
      const { data } = await api.get("api/hero-banners/admin");
      setHomeCarousel(data);
    } catch (err) {
      console.error(err);
    }
  };



  const handleDeleteHomeCarousel = (id) => {
    openConfirm(async () => {
      try {
        setConfirmLoading(true);
        await api.delete(`/api/hero-banners/${id}`);
        setHomeCarousel(prev =>
          prev.filter(b => b._id !== id)
        );
        toast.success("Banner deleted");
      } catch {
        toast.error("Delete failed");
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
  };



  const moveHomeCarouselSlide = async (id, direction) => {
    const index = homeCarousel.findIndex(b => b._id === id);
    if (index === -1) return;

    const updated = [...homeCarousel];

    if (direction === "up" && index > 0) {
      [updated[index], updated[index - 1]] =
        [updated[index - 1], updated[index]];
    }

    if (direction === "down" && index < updated.length - 1) {
      [updated[index], updated[index + 1]] =
        [updated[index + 1], updated[index]];
    }

    // assign new order
    const reordered = updated.map((b, i) => ({
      ...b,
      order: i + 1,
    }));

    setHomeCarousel(reordered);

    try {
      await Promise.all(
        reordered.map(b =>
          api.put(`/api/hero-banners/${b._id}`, { order: b.order })
        )
      );
    } catch {
      toast.error("Order update failed");
    }
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
  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await api.get("/api/aboutus");
      setAbout(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (about?.heroTitle) {
      setHeroTitle(about.heroTitle);
    }
  }, [about]);

  const handleSaveHeroTitle = async () => {
    try {
      const { data } = await api.put("/api/aboutus/hero-title", {
        heroTitle,
      });

      toast.success(data.message);
      fetchAbout();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving");
    }
  };

  const handleAddHighlight = async () => {
    if (!newHighlight.trim()) return;

    try {
      await api.post("/api/aboutus/highlight", {
        text: newHighlight,
      });

      toast.success("Highlight added");
      setNewHighlight("");
      fetchAbout();
    } catch {
      toast.error("Error adding highlight");
    }
  };

  const handleDeleteHighlight = async (id) => {
    try {
      await api.delete(`/api/aboutus/highlight/${id}`);
      toast.success("Deleted");
      fetchAbout();
    } catch {
      toast.error("Error deleting");
    }
  };

  const handleAddVideo = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      setLoadingVideo(true);

      await api.post("/api/aboutus/video", formData);

      toast.success("Video uploaded");
      fetchAbout();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoadingVideo(false);
    }
  };



  const handleDeleteVideo = async (id) => {
    try {
      await api.delete(`/api/aboutus/video/${id}`);
      toast.success("Deleted");
      fetchAbout();
    } catch {
      toast.error("Error deleting");
    }
  };


  const handleSaveKnowMore = async () => {
    const formData = new FormData();
    formData.append("sectionTitle", knowMore.sectionTitle);
    formData.append("heading", knowMore.heading);
    formData.append("imageHeading", knowMore.imageHeading);
    formData.append("description", knowMore.description);

    if (knowMore.imageFile) {
      formData.append("image", knowMore.imageFile);
    }

    try {
      setLoadingKnowMore(true);

      await api.put("/api/aboutus/know-more", formData);

      toast.success("Updated");
      fetchAbout();
    } catch {
      toast.error("Error updating");
    } finally {
      setLoadingKnowMore(false);
    }
  };



  const handleDeleteKnowMoreImage = async () => {
    await api.delete("/api/aboutus/know-more/image");
    fetchAbout();
  };

  useEffect(() => {
    if (about?.knowMore) {
      setKnowMore({
        sectionTitle: about.knowMore.sectionTitle || "",
        heading: about.knowMore.heading || "",
        imageHeading: about.knowMore.imageHeading || "",
        description: about.knowMore.description || "",
        image: about.knowMore.image || "",
        imageFile: null,
        imagePreview: about.knowMore.image || ""
      });
    }
  }, [about]);






  // Blog Functions
  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/api/blog-categories");
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const fetchBlogs = async () => {
    try {
      setBlogLoading(true);
      const { data } = await api.get("/api/blogs");
      setBlogs(data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setBlogLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    try {
      setBlogSaving(true);

      const formData = new FormData();
      Object.keys(blogForm).forEach((key) => {
        if (key === "coverImage") {
          if (blogForm.coverImage)
            formData.append("coverImage", blogForm.coverImage);
        } else {
          formData.append(key, blogForm[key]);
        }
      });

      await api.post("/api/blogs", formData);

      toast.success("Blog created");
      resetBlogForm();
      setIsBlogDialogOpen(false);
      fetchBlogs();

    } catch {
      toast.error("Create failed");
    } finally {
      setBlogSaving(false);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      setBlogSaving(true);

      const formData = new FormData();
      Object.keys(blogForm).forEach((key) => {
        if (key === "coverImage") {
          if (blogForm.coverImage)
            formData.append("coverImage", blogForm.coverImage);
        } else {
          formData.append(key, blogForm[key]);
        }
      });

      await api.put(`/api/blogs/${editingBlog._id}`, formData);

      toast.success("Blog updated");
      setEditingBlog(null);
      resetBlogForm();
      setIsBlogDialogOpen(false);
      fetchBlogs();

    } catch {
      toast.error("Update failed");
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlog = (id) => {
    openConfirm(async () => {
      try {
        setConfirmLoading(true);
        await api.delete(`/api/blogs/${id}`);
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } catch {
        toast.error("Delete failed");
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
  };






  // Home Videos Functions
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setVideoLoading(true);
      const { data } = await api.get("/api/videos");
      setVideos(data);
    } catch {
      toast.error("Failed to load videos");
    } finally {
      setVideoLoading(false);
    }
  };

  const handleUploadVideo = async () => {
    if (!videoForm.videoFile) {
      toast.error("Please select a video");
      return;
    }

    try {
      setVideoSaving(true);

      const formData = new FormData();
      formData.append("title", videoForm.title);
      formData.append("description", videoForm.description);
      formData.append("video", videoForm.videoFile);

      await api.post("/api/videos", formData);

      toast.success("Video uploaded");
      setVideoForm({
        title: "",
        description: "",
        videoFile: null,
        videoPreview: ""
      });
      fetchVideos();

    } catch {
      toast.error("Upload failed");
    } finally {
      setVideoSaving(false);
    }
  };

  const handleToggleVideo = async (id) => {
    try {
      await api.put(`/api/videos/${id}/toggle`);
      fetchVideos();
    } catch {
      toast.error("Failed to update status");
    }
  };


  const handleDeleteVideoCMS = (id) => {
    openConfirm(async () => {
      try {
        setConfirmLoading(true);
        await api.delete(`/api/videos/${id}`);
        toast.success("Deleted successfully");
        fetchVideos();
      } catch {
        toast.error("Delete failed");
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
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
                  {/* <div>
                    <Label>Title</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={homeCarouselForm.title}
                      onChange={(e) => setHomeCarouselForm({ ...homeCarouselForm, title: e.target.value })}
                      placeholder="Enter slide title"
                    />
                  </div> */}
                  {/* <div>
                    <Label>Description</Label>
                    <Textarea
                      className="bg-gray-800 border-gray-700 text-white"
                      value={homeCarouselForm.description}
                      onChange={(e) => setHomeCarouselForm({ ...homeCarouselForm, description: e.target.value })}
                      placeholder="Enter description"
                    />
                  </div> */}
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
                  <Button
                    onClick={handleAddHomeCarousel}
                    disabled={loadingBanner}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loadingBanner ? "Uploading..." : "Add Slide"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {homeCarousel.map((slide, index) => (
              <div key={slide._id} className="bg-[#2a2a2a] rounded-lg shadow-sm p-4 flex gap-4 border border-gray-700">
                <div className="w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={slide.image.url}
                    alt="Hero Banner"
                    className="w-full h-full object-cover"
                  />

                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    {/* <div>
                      <h4 className="font-semibold text-white mb-1">{slide.title}</h4>
                      <p className="text-sm text-gray-300">{slide.description}</p>
                    </div> */}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${slide.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => moveHomeCarouselSlide(slide._id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button
                    onClick={() => moveHomeCarouselSlide(slide._id, 'down')}
                    disabled={index === homeCarousel.length - 1}
                    className="p-1 text-gray-300 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveDown size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteHomeCarousel(slide._id)}
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

        <TabsContent value="about" className="space-y-6">
          {/* HERO TITLE CARD */}
          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-blue-400" size={20} />
              <h4 className="text-lg font-semibold text-white">Hero Title</h4>
            </div>

            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter Hero Title"
            />

            <Button
              onClick={handleSaveHeroTitle}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </div>



          {/* HIGHLIGHTS CARD */}
          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="text-blue-400" size={20} />
              <h4 className="text-lg font-semibold text-white">Highlights</h4>
            </div>

            <div className="flex gap-2 mb-4">
              <Input
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Add new highlight"
              />
              <Button onClick={handleAddHighlight} className="bg-blue-600">
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {about?.highlights?.map((h) => (
                <div
                  key={h._id}
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-md"
                >
                  <span className="text-gray-300">{h.text}</span>
                  <button
                    onClick={() => handleDeleteHighlight(h._id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>



          {/* VIDEOS CARD */}
          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Film className="text-blue-400" size={20} />
              <h4 className="text-lg font-semibold text-white">About Videos</h4>
            </div>

            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 mb-4">

              {loadingVideo && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                  <span className="text-white animate-pulse">Uploading...</span>
                </div>
              )}

              <Film className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">Click to upload video</p>

              <input
                type="file"
                hidden
                disabled={loadingVideo}
                accept="video/*"
                onChange={(e) => handleAddVideo(e.target.files[0])}
              />
            </label>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {about?.videos?.map((v) => (
                <div
                  key={v._id}
                  className="relative bg-gray-800 rounded-lg overflow-hidden"
                >
                  <video
                    src={v.videoUrl}
                    controls
                    className="w-full h-48 object-cover"
                  />

                  <button
                    onClick={() => handleDeleteVideo(v._id)}
                    className="absolute top-2 right-2 bg-red-600 p-1 rounded-full"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>



          {/* KNOW MORE CARD */}
          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="text-blue-400" size={20} />
              <h4 className="text-lg font-semibold text-white">Know More Section</h4>
            </div>

            <Input
              placeholder="Section Title"
              value={knowMore.sectionTitle}
              onChange={(e) =>
                setKnowMore({ ...knowMore, sectionTitle: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
            />

            {/* <Input
              placeholder="Heading"
              value={knowMore.heading}
              onChange={(e) =>
                setKnowMore({ ...knowMore, heading: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
            /> */}

            <Input
              placeholder="Image Heading (Text inside image)"
              value={knowMore.imageHeading}
              onChange={(e) =>
                setKnowMore({ ...knowMore, imageHeading: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
            />

            <Textarea
              placeholder="Description"
              rows={4}
              value={knowMore.description}
              onChange={(e) =>
                setKnowMore({ ...knowMore, description: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
            />

            {/* EXISTING IMAGE */}
            {knowMore.imagePreview && (
              <div className="relative w-full">
                <img
                  src={knowMore.imagePreview}
                  alt="Know More Preview"
                  className="w-full max-h-[400px] object-contain rounded-lg bg-gray-800"
                />

                <button
                  onClick={handleDeleteKnowMoreImage}
                  className="absolute top-2 right-2 bg-red-600 p-1 rounded-full"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}


            {/* UPLOAD IMAGE */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Upload Image</span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setKnowMore({
                      ...knowMore,
                      imageFile: file,
                      imagePreview: reader.result
                    });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            <Button
              onClick={handleSaveKnowMore}
              disabled={loadingKnowMore}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loadingKnowMore ? "Processing..." : "Save Know More"}
            </Button>

          </div>

        </TabsContent>







        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-6">

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Blogs</h3>

            <Dialog
              open={isBlogDialogOpen}
              onOpenChange={(open) => {
                setIsBlogDialogOpen(open);

                if (!open) {
                  setEditingBlog(null);
                  resetBlogForm();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  + Add Blog
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingBlog ? "Edit Blog" : "Create Blog"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">

                  <Input
                    placeholder="Title"
                    className="bg-gray-800"
                    value={blogForm.title}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, title: e.target.value })
                    }
                  />

                  <Textarea
                    placeholder="Short Description"
                    className="bg-gray-800"
                    value={blogForm.description}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, description: e.target.value })
                    }
                  />

                  <Textarea
                    placeholder="Full Content (HTML)"
                    className="bg-gray-800"
                    rows={6}
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, content: e.target.value })
                    }
                  />

                  <select
                    className="bg-gray-800 p-2 rounded w-full"
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder="Tags (comma separated)"
                    className="bg-gray-800"
                    value={blogForm.tags}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, tags: e.target.value })
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Read Time (minutes)"
                    className="bg-gray-800"
                    value={blogForm.readTime}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, readTime: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Author"
                    className="bg-gray-800"
                    value={blogForm.author}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, author: e.target.value })
                    }
                  />

                  <div>
                    <Label>Cover Image</Label>

                    {blogForm.imagePreview && (
                      <img
                        src={blogForm.imagePreview}
                        className="w-full h-60 object-cover rounded mt-2"
                      />
                    )}

                    <input
                      type="file"
                      className="mt-2 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBlogForm({
                            ...blogForm,
                            coverImage: file,
                            imagePreview: reader.result
                          });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>


                  <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 p-4 rounded-lg">
                    <div>
                      <p className="text-white font-semibold text-sm">Featured Blog</p>
                      <p className="text-xs text-gray-400">
                        Highlight this blog on homepage
                      </p>
                    </div>

                    <Switch
                      checked={blogForm.isFeatured}
                      onCheckedChange={(checked) =>
                        setBlogForm({ ...blogForm, isFeatured: checked })
                      }
                      className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-gray-600"
                    />
                  </div>

                  <Button
                    disabled={blogSaving}
                    onClick={editingBlog ? handleUpdateBlog : handleCreateBlog}
                    className="w-full bg-blue-600"
                  >
                    {blogSaving
                      ? "Processing..."
                      : editingBlog
                        ? "Update Blog"
                        : "Create Blog"}
                  </Button>

                </div>
              </DialogContent>
            </Dialog>
          </div>

          {blogLoading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden"
                >
                  <img
                    src={blog.coverImage}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold">{blog.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {blog.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-400">
                        {blog.category?.name}
                      </span>
                      {blog.isFeatured && (
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                          ⭐ Featured
                        </span>
                      )}


                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingBlog(blog);
                          setBlogForm({
                            ...blog,
                            tags: blog.tags.join(", "),
                            imagePreview: blog.coverImage
                          });
                          setIsBlogDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>





        {/* Home Videos Tab - No Edit Option */}
        <TabsContent value="homeVideos" className="space-y-6">

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Videos</h3>

            <Dialog open={isHomeVideosDialogOpen} onOpenChange={setIsHomeVideosDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  + Upload Video
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload Video</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">

                  {/* <Input
            placeholder="Title"
            className="bg-gray-800"
            value={videoForm.title}
            onChange={(e) =>
              setVideoForm({ ...videoForm, title: e.target.value })
            }
          /> */}

                  {/* <Textarea
            placeholder="Description"
            className="bg-gray-800"
            value={videoForm.description}
            onChange={(e) =>
              setVideoForm({ ...videoForm, description: e.target.value })
            }
          /> */}

                  {videoForm.videoPreview && (
                    <video
                      src={videoForm.videoPreview}
                      className="w-full h-56 object-cover rounded"
                      controls
                    />
                  )}

                  <input
                    className='cursor-pointer'
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setVideoForm({
                          ...videoForm,
                          videoFile: file,
                          videoPreview: reader.result
                        });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />

                  <Button
                    disabled={videoSaving}
                    onClick={handleUploadVideo}
                    className="w-full bg-blue-600"
                  >
                    {videoSaving ? "Uploading..." : "Upload Video"}
                  </Button>

                </div>
              </DialogContent>
            </Dialog>
          </div>


          {videoLoading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden relative"
                >

                  {/* VIDEO */}
                  <video
                    src={video.videoUrl}
                    className="h-48 w-full object-cover"
                    controls
                  />

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDeleteVideoCMS(video._id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>

                  {/* STATUS SECTION */}
                  <div className="p-4 flex items-center justify-between">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${video.isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-600 text-white"
                        }`}
                    >
                      {video.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => handleToggleVideo(video._id)}
                      className={
                        video.isActive
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }
                    >
                      {video.isActive ? "Deactivate" : "Activate"}
                    </Button>

                  </div>

                </div>
              ))}
            </div>
          )}
        </TabsContent>

      </Tabs>

      <ConfirmDialog
        open={confirmOpen}
        onClose={setConfirmOpen}
        onConfirm={() => confirmAction && confirmAction()}
        loading={confirmLoading}
      />

    </div>
  );
}