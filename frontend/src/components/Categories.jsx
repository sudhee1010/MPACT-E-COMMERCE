import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

const initialCategories = [
  { id: 'CAT001', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 145, status: 'Active' },
  { id: 'CAT002', name: 'Accessories', description: 'Phone and computer accessories', productCount: 89, status: 'Active' },
  { id: 'CAT003', name: 'Clothing', description: 'Apparel and fashion items', productCount: 67, status: 'Active' },
  { id: 'CAT004', name: 'Home & Garden', description: 'Home decor and garden supplies', productCount: 34, status: 'Active' },
  { id: 'CAT005', name: 'Sports', description: 'Sports equipment and gear', productCount: 23, status: 'Inactive' },
];

export function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

  const handleAdd = () => {
    const newCategory = {
      id: `CAT${String(categories.length + 1).padStart(3, '0')}`,
      name: formData.name,
      description: formData.description,
      productCount: 0,
      status: formData.status,
    };
    setCategories([...categories, newCategory]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingCategory) return;
    setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
    resetForm();
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', status: 'Active' });
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description, status: category.status });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Product Categories</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
              <Plus size={20} className="mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-gray-300">Category Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
          <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-gray-300">Category Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button onClick={handleEdit} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Update Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6 hover:border-yellow-400/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <FolderOpen size={24} className="text-yellow-400" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                category.status === 'Active'
                  ? 'bg-green-900/50 text-green-400 border border-green-700'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-700'
              }`}>
                {category.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{category.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <span className="text-sm text-gray-400">
                {category.productCount} products
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDialog(category)}
                  className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}