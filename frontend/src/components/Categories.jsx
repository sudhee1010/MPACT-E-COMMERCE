
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FolderOpen, Search, AlertCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../components/ui/Dialog";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import api from "../api/axios";
import toast from "react-hot-toast";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  /* ================================
     FETCH CATEGORIES FOR ADMIN
  ================================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/categories/admin");
      setCategories(data);
    } catch (error) {
      console.error("Fetch categories failed", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================================
     FILTER CATEGORIES
  ================================= */
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /* ================================
     HANDLE IMAGE UPLOAD
  ================================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================================
     ADD CATEGORY
  ================================= */
  const handleAdd = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error("Category name is required");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("isActive", formData.isActive);
      
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      await api.post("/api/categories", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category added successfully!");
      fetchCategories();
      resetForm();
      setIsAddOpen(false);
    } catch (error) {
      console.error("Add category error:", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  /* ================================
     UPDATE CATEGORY
  ================================= */
  const handleEdit = async () => {
    if (!editingCategory) return;

    try {
      if (!formData.name.trim()) {
        toast.error("Category name is required");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("isActive", formData.isActive);
      
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      await api.put(`/api/categories/${editingCategory._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category updated successfully!");
      fetchCategories();
      resetForm();
      setEditingCategory(null);
    } catch (error) {
      console.error("Update category error:", error);
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };

  /* ================================
     DELETE CATEGORY
  ================================= */
  const handleDelete = async () => {
    if (!deleteCategory) return;

    try {
      await api.delete(`/api/categories/${deleteCategory._id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
      setDeleteCategory(null);
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Delete category error:", error);
      if (error.response?.data?.productCount > 0) {
        toast.error(`Cannot delete: ${error.response.data.productCount} products exist`);
      } else {
        toast.error(error.response?.data?.message || "Failed to delete category");
      }
    }
  };

  /* ================================
     TOGGLE CATEGORY STATUS
  ================================= */
  const toggleCategoryStatus = async (category) => {
    try {
      await api.put(`/api/categories/${category._id}/toggle-status`);
      toast.success(`Category ${category.isActive ? "deactivated" : "activated"}!`);
      fetchCategories();
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Failed to update category status");
    }
  };

  /* ================================
     HELPERS
  ================================= */
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      isActive: true,
    });
    setImageFile(null);
    setImagePreview("");
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive,
    });
    setImagePreview(category.image?.url || "");
    setImageFile(null);
  };

  const openDeleteDialog = (category) => {
    setDeleteCategory(category);
    setConfirmDeleteOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading categories...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .image-preview-container {
          width: 120px;
          height: 120px;
          border: 2px dashed #facc15;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: rgba(250, 204, 21, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .image-preview-container:hover {
          border-color: #fbbf24;
          background: rgba(250, 204, 21, 0.15);
        }
        
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .no-image {
          color: #facc15;
          text-align: center;
          font-size: 14px;
          padding: 16px;
        }
        
        .category-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(250, 204, 21, 0.1);
        }
      `}</style>

      <div className="space-y-6 p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Product Categories</h2>
            <p className="text-gray-400 mt-1">Manage product categories for your store</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* SEARCH */}
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2a2a2a] border-gray-700 text-white w-full md:w-64"
              />
            </div>

            {/* ADD CATEGORY BUTTON */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium whitespace-nowrap">
                  <Plus size={20} className="mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Categories will appear on the products page
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* IMAGE UPLOAD */}
                  <div className="flex flex-col items-center">
                    <input
                      type="file"
                      id="category-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="category-image" className="image-preview-container">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="image-preview"
                        />
                      ) : (
                        <div className="no-image">
                          <ImageIcon size={32} />
                          <p className="mt-2 text-sm">Add Image</p>
                          <p className="text-xs text-gray-400">(Optional)</p>
                        </div>
                      )}
                    </label>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setImageFile(null);
                        }}
                        className="text-sm text-red-400 hover:text-red-300 mt-2"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  {/* CATEGORY NAME */}
                  <div>
                    <Label className="text-gray-300">Category Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Electronics, Clothing"
                      className="bg-[#1a1a1a] border-gray-700 text-white mt-1"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Describe this category..."
                      className="bg-[#1a1a1a] border-gray-700 text-white mt-1 min-h-[100px]"
                    />
                  </div>

                  {/* STATUS */}
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.isActive}
                          onChange={() => setFormData({ ...formData, isActive: true })}
                          className="text-yellow-400"
                        />
                        <span className="text-gray-300">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={!formData.isActive}
                          onChange={() => setFormData({ ...formData, isActive: false })}
                          className="text-yellow-400"
                        />
                        <span className="text-gray-300">Inactive</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleAdd}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium mt-4"
                  >
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* EDIT CATEGORY DIALOG */}
        <Dialog
          open={!!editingCategory}
          onOpenChange={(open) => {
            if (!open) {
              setEditingCategory(null);
              resetForm();
            }
          }}
        >
          <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription className="text-gray-400">
                Update category details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* IMAGE UPLOAD */}
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  id="edit-category-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="edit-category-image" className="image-preview-container">
                  {imagePreview || editingCategory?.image?.url ? (
                    <img
                      src={imagePreview || editingCategory?.image?.url}
                      alt="Preview"
                      className="image-preview"
                    />
                  ) : (
                    <div className="no-image">
                      <ImageIcon size={32} />
                      <p className="mt-2 text-sm">Update Image</p>
                      <p className="text-xs text-gray-400">(Optional)</p>
                    </div>
                  )}
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  Leave empty to keep current image
                </p>
              </div>

              {/* CATEGORY NAME */}
              <div>
                <Label className="text-gray-300">Category Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-[#1a1a1a] border-gray-700 text-white mt-1"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-[#1a1a1a] border-gray-700 text-white mt-1 min-h-[100px]"
                />
              </div>

              {/* STATUS */}
              <div>
                <Label className="text-gray-300">Status</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.isActive}
                      onChange={() => setFormData({ ...formData, isActive: true })}
                      className="text-yellow-400"
                    />
                    <span className="text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!formData.isActive}
                      onChange={() => setFormData({ ...formData, isActive: false })}
                      className="text-yellow-400"
                    />
                    <span className="text-gray-300">Inactive</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleEdit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium mt-4"
              >
                Update Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* DELETE CONFIRMATION DIALOG */}
        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <DialogContent className="bg-[#2a2a2a] border-red-500/30 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <AlertCircle size={20} />
                Delete Category
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-gray-300">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  "{deleteCategory?.name}"
                </span>
                ?
              </p>

              {deleteCategory?.productCount > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm font-medium">
                    ⚠️ This category has {deleteCategory.productCount} product(s)
                  </p>
                  <p className="text-red-400/80 text-xs mt-1">
                    You cannot delete a category that has products. Please reassign or delete products first.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-400">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setConfirmDeleteOpen(false);
                    setDeleteCategory(null);
                  }}
                  className="text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={deleteCategory?.productCount > 0}
                >
                  {deleteCategory?.productCount > 0 ? "Cannot Delete" : "Yes, Delete"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* CATEGORIES GRID */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
            <FolderOpen className="mx-auto text-gray-600" size={48} />
            <h3 className="text-gray-400 mt-4">No categories found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? "Try a different search" : "Add your first category to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6 hover:border-yellow-400/40 transition-all category-card"
              >
                {/* CATEGORY IMAGE/ICON */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-lg flex items-center justify-center overflow-hidden">
                    {category.image?.url ? (
                      <img
                        src={category.image.url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderOpen size={28} className="text-yellow-400" />
                    )}
                  </div>
                  
                  {/* STATUS BADGE & TOGGLE */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        category.isActive
                          ? "bg-green-900/50 text-green-400 border border-green-700"
                          : "bg-gray-900/50 text-gray-400 border border-gray-700"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => toggleCategoryStatus(category)}
                      className={`text-xs px-2 py-1 rounded ${
                        category.isActive
                          ? "text-red-400 hover:bg-red-400/10"
                          : "text-green-400 hover:bg-green-400/10"
                      }`}
                    >
                      {category.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>

                {/* CATEGORY INFO */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}

                {/* PRODUCT COUNT & ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <span className="text-sm text-gray-400">
                      {category.productCount || 0} product(s)
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated: {new Date(category.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditDialog(category)}
                      className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(category)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
          <div className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Total Categories</p>
            <p className="text-2xl font-bold text-white mt-1">{categories.length}</p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Active Categories</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {categories.filter(c => c.isActive).length}
            </p>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">
              {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
