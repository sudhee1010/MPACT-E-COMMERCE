import React, { useState } from 'react';
import { Plus, Edit, Trash2, Percent, Copy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';

const initialCoupons = [
  { id: 'CPN001', code: 'SUMMER50', discount: 50, type: 'Percentage', usageLimit: 100, used: 45, expiryDate: '2026-08-31', status: 'Active' },
  { id: 'CPN002', code: 'WELCOME10', discount: 10, type: 'Fixed', usageLimit: 500, used: 234, expiryDate: '2026-12-31', status: 'Active' },
  { id: 'CPN003', code: 'FLASH25', discount: 25, type: 'Percentage', usageLimit: 50, used: 50, expiryDate: '2025-12-31', status: 'Expired' },
  { id: 'CPN004', code: 'NEWYEAR2026', discount: 30, type: 'Percentage', usageLimit: 200, used: 87, expiryDate: '2026-01-31', status: 'Active' },
];

export function Coupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    type: 'Percentage',
    usageLimit: '',
    expiryDate: '',
  });

  const handleAdd = () => {
    const newCoupon = {
      id: `CPN${String(coupons.length + 1).padStart(3, '0')}`,
      code: formData.code,
      discount: parseFloat(formData.discount),
      type: formData.type,
      usageLimit: parseInt(formData.usageLimit),
      used: 0,
      expiryDate: formData.expiryDate,
      status: 'Active',
    };
    setCoupons([...coupons, newCoupon]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingCoupon) return;
    setCoupons(coupons.map(c => c.id === editingCoupon.id ? {
      ...c,
      code: formData.code,
      discount: parseFloat(formData.discount),
      type: formData.type,
      usageLimit: parseInt(formData.usageLimit),
      expiryDate: formData.expiryDate,
    } : c));
    resetForm();
    setEditingCoupon(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ code: '', discount: '', type: 'Percentage', usageLimit: '', expiryDate: '' });
  };

  const openEditDialog = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount: String(coupon.discount),
      type: coupon.type,
      usageLimit: String(coupon.usageLimit),
      expiryDate: coupon.expiryDate,
    });
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Discount Coupons</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
              <Plus size={20} className="mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-gray-300">Coupon Code</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SUMMER50"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Discount</Label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="0"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="Percentage" className="text-white">Percentage</SelectItem>
                      <SelectItem value="Fixed" className="text-white">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Usage Limit</Label>
                <Input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="100"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label className="text-gray-300">Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Create Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingCoupon} onOpenChange={(open) => !open && setEditingCoupon(null)}>
          <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-gray-300">Coupon Code</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SUMMER50"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Discount</Label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="0"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="Percentage" className="text-white">Percentage</SelectItem>
                      <SelectItem value="Fixed" className="text-white">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Usage Limit</Label>
                <Input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="100"
                  className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label className="text-gray-300">Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>
              <Button onClick={handleEdit} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Update Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Code</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Discount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Usage</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Expiry Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-yellow-400">{coupon.code}</span>
                      <button
                        onClick={() => copyCouponCode(coupon.code)}
                        className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-white font-medium">
                      {coupon.type === 'Percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">{coupon.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white">{coupon.used}/{coupon.usageLimit}</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{coupon.expiryDate}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      coupon.status === 'Active'
                        ? 'bg-green-900/50 text-green-400 border border-green-700'
                        : coupon.status === 'Expired'
                        ? 'bg-red-900/50 text-red-400 border border-red-700'
                        : 'bg-gray-900/50 text-gray-400 border border-gray-700'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditDialog(coupon)}
                        className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}