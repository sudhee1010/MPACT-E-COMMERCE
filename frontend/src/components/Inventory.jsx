import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  History,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';

const initialInventory = [
  { id: 'INV001', productName: 'Wireless Headphones', sku: 'WH-001', warehouse: 'Main Warehouse', currentStock: 0, minStock: 50, maxStock: 500, status: 'Out of Stock', lastUpdated: '2026-01-08', unitCost: 45.99 },
  { id: 'INV002', productName: 'Smart Watch', sku: 'SW-002', warehouse: 'Main Warehouse', currentStock: 0, minStock: 30, maxStock: 200, status: 'Out of Stock', lastUpdated: '2026-01-08', unitCost: 199.99 },
  { id: 'INV003', productName: 'Bluetooth Speaker', sku: 'BS-003', warehouse: 'Secondary Warehouse', currentStock: 0, minStock: 20, maxStock: 150, status: 'Out of Stock', lastUpdated: '2026-01-07', unitCost: 79.99 },
  { id: 'INV004', productName: 'Laptop Stand', sku: 'LS-004', warehouse: 'Main Warehouse', currentStock: 0, minStock: 25, maxStock: 300, status: 'Out of Stock', lastUpdated: '2026-01-07', unitCost: 29.99 },
  { id: 'INV005', productName: 'USB-C Cable', sku: 'UC-005', warehouse: 'Secondary Warehouse', currentStock: 15, minStock: 100, maxStock: 1000, status: 'Low Stock', lastUpdated: '2026-01-06', unitCost: 9.99 },
];

const stockMovements = [
  { id: 'MV001', productName: 'Wireless Headphones', type: 'In', quantity: 50, warehouse: 'Main Warehouse', date: '2026-01-08', reason: 'Supplier delivery' },
  { id: 'MV002', productName: 'Smart Watch', type: 'Out', quantity: 15, warehouse: 'Main Warehouse', date: '2026-01-08', reason: 'Customer orders' },
  { id: 'MV003', productName: 'Bluetooth Speaker', type: 'Out', quantity: 10, warehouse: 'Secondary Warehouse', date: '2026-01-07', reason: 'Customer orders' },
  { id: 'MV004', productName: 'Laptop Stand', type: 'Adjustment', quantity: -5, warehouse: 'Main Warehouse', date: '2026-01-07', reason: 'Damaged items' },
];

export function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [movements] = useState(stockMovements);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMovements, setShowMovements] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    warehouse: 'Main Warehouse',
    quantity: '',
    type: 'In',
    reason: '',
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);
  const lowStockCount = inventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter(item => item.status === 'Out of Stock').length;

  const handleAddStock = () => {
    alert(`Stock added: ${formData.quantity} units of ${formData.productName}`);
    setFormData({ productName: '', sku: '', warehouse: 'Main Warehouse', quantity: '', type: 'In', reason: '' });
    setIsAddStockOpen(false);
  };

  const handleAdjustStock = () => {
    if (!selectedItem) return;
    alert(`Stock adjusted for ${selectedItem.productName}`);
    setSelectedItem(null);
    setIsAdjustOpen(false);
  };

  const openAdjustDialog = (item) => {
    setSelectedItem(item);
    setFormData({
      productName: item.productName,
      sku: item.sku,
      warehouse: item.warehouse,
      quantity: '',
      type: 'Adjustment',
      reason: '',
    });
    setIsAdjustOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowMovements(!showMovements)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium"
          >
            <History size={20} className="mr-2" />
            {showMovements ? 'View Stock' : 'View History'}
          </Button>

          <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                <Plus size={20} className="mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Add Stock</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label className="text-gray-300">Product Name</Label>
                  <Input
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="Enter product name"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">SKU</Label>
                  <Input
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Enter SKU"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Warehouse</Label>
                  <Select value={formData.warehouse} onValueChange={(value) => setFormData({ ...formData, warehouse: value })}>
                    <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="Main Warehouse" className="text-white">Main Warehouse</SelectItem>
                      <SelectItem value="Secondary Warehouse" className="text-white">Secondary Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Quantity</Label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Reason</Label>
                  <Textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="e.g., Supplier delivery"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button onClick={handleAddStock} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  Add Stock
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAdjustOpen} onOpenChange={(open) => !open && setIsAdjustOpen(false)}>
            <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Adjust Stock</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label className="text-gray-300">Product</Label>
                  <Input
                    value={formData.productName}
                    disabled
                    className="bg-[#1a1a1a] border-gray-700 text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Current Stock</Label>
                  <Input
                    value={selectedItem?.currentStock || 0}
                    disabled
                    className="bg-[#1a1a1a] border-gray-700 text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Adjustment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="In" className="text-white">Add Stock</SelectItem>
                      <SelectItem value="Out" className="text-white">Remove Stock</SelectItem>
                      <SelectItem value="Adjustment" className="text-white">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Quantity</Label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Reason</Label>
                  <Textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="e.g., Damaged items, returns, etc."
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button onClick={handleAdjustStock} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  Update Stock
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Package size={20} className="text-yellow-400" />
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <p className="text-sm text-gray-400">Total Inventory Value</p>
          <p className="text-2xl font-bold text-white mt-1">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-green-400 mt-1">+8.2% from last month</p>
        </div>

        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Package size={20} className="text-yellow-400" />
          </div>
          <p className="text-sm text-gray-400">Total Products</p>
          <p className="text-2xl font-bold text-white mt-1">{inventory.length}</p>
          <p className="text-sm text-gray-400 mt-1">Across 2 warehouses</p>
        </div>

        <div className="bg-[#2a2a2a] border border-red-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle size={20} className="text-red-400" />
            <TrendingDown size={16} className="text-red-400" />
          </div>
          <p className="text-sm text-gray-400">Low Stock Items</p>
          <p className="text-2xl font-bold text-white mt-1">{lowStockCount}</p>
          <p className="text-sm text-red-400 mt-1">Requires attention</p>
        </div>

        <div className="bg-[#2a2a2a] border border-red-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <p className="text-sm text-gray-400">Out of Stock</p>
          <p className="text-2xl font-bold text-white mt-1">{outOfStockCount}</p>
          <p className="text-sm text-red-400 mt-1">Urgent restock needed</p>
        </div>
      </div>

      {!showMovements ? (
        /* Inventory Table */
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Warehouse</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Stock Level</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-white">{item.productName}</p>
                      <p className="text-xs text-gray-500">Updated: {item.lastUpdated}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-400 font-mono">{item.sku}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-400">{item.warehouse}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white">{item.currentStock} units</p>
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.status === 'Out of Stock'
                                ? 'bg-red-400'
                                : item.status === 'Low Stock'
                                ? 'bg-yellow-400'
                                : 'bg-green-400'
                            }`}
                            style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Min: {item.minStock} | Max: {item.maxStock}</p>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'In Stock'
                            ? 'bg-green-900/50 text-green-400 border border-green-700'
                            : item.status === 'Low Stock'
                            ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                            : 'bg-red-900/50 text-red-400 border border-red-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-yellow-400">
                        ${(item.currentStock * item.unitCost).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500">${item.unitCost}/unit</p>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => openAdjustDialog(item)}
                        className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Stock Movements Table */
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Stock Movement History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Warehouse</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Reason</th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-sm text-gray-400">{movement.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-white">{movement.productName}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          movement.type === 'In'
                            ? 'bg-green-900/50 text-green-400 border border-green-700'
                            : movement.type === 'Out'
                            ? 'bg-red-900/50 text-red-400 border border-red-700'
                            : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                        }`}
                      >
                        {movement.type}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-sm font-medium ${
                          movement.type === 'In' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {movement.type === 'In' ? '+' : ''}{movement.quantity}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-sm text-gray-400">{movement.warehouse}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{movement.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
