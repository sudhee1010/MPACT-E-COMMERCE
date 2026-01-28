import React, { useState, useEffect } from 'react';

import { Plus, Search, Edit, Trash2, Eye, AlertTriangle, Upload, X, Tag } from 'lucide-react';

const initialProducts = [
  {
    id: 'P001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 129.99,
    stock: 45,
    status: 'Active',
    stockStatus: 'In Stock',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
    description: 'Premium wireless headphones with noise cancellation',
    specifications: [
      { key: 'Battery Life', value: '30 hours' },
      { key: 'Connectivity', value: 'Bluetooth 5.0' },
    ],
    badges: ['HIGH QUALITY', 'WIRELESS'],
  },
  {
    id: 'P002',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 299.99,
    stock: 23,
    status: 'Active',
    stockStatus: 'Low Stock',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'],
    description: 'Advanced smartwatch with fitness tracking',
    specifications: [
      { key: 'Display', value: 'AMOLED 1.4"' },
      { key: 'Water Resistance', value: '5ATM' },
    ],
    badges: ['WATERPROOF', 'FITNESS'],
  },
  {
    id: 'P003',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 49.99,
    stock: 67,
    status: 'Active',
    stockStatus: 'In Stock',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300'],
    description: 'Ergonomic aluminum laptop stand',
    specifications: [
      { key: 'Material', value: 'Aluminum' },
      { key: 'Weight', value: '800g' },
    ],
    badges: ['ECO-FRIENDLY', 'DURABLE'],
  },
  {
    id: 'P004',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 19.99,
    stock: 120,
    status: 'Active',
    stockStatus: 'In Stock',
    images: ['https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=300'],
    description: 'Fast charging USB-C cable',
    specifications: [
      { key: 'Length', value: '2 meters' },
      { key: 'Power', value: '100W' },
    ],
    badges: ['FAST CHARGING'],
  },
  {
    id: 'P005',
    name: 'Phone Case',
    category: 'Accessories',
    price: 24.99,
    stock: 89,
    status: 'Active',
    stockStatus: 'In Stock',
    images: ['https://images.unsplash.com/photo-1601593346740-925612772716?w=300'],
    description: 'Protective phone case with premium finish',
    specifications: [
      { key: 'Material', value: 'TPU + PC' },
      { key: 'Drop Protection', value: '10ft' },
    ],
    badges: ['SHOCKPROOF', 'SLIM'],
  },
];

const categories = [
  'Electronics',
  'Accessories',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Food & Beverages',
];

export function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    stockStatus: 'In Stock',
    images: [],
    description: '',
    specifications: [],
    badges: [],
  });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsAddOpen(false);
        setEditingProduct(null);
      }
    };

    if (isAddOpen || editingProduct) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isAddOpen, editingProduct]);


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: formData.status,
      stockStatus: formData.stockStatus,
      images: formData.images || ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
      description: formData.description,
      specifications: formData.specifications,
      badges: formData.badges,
    };
    setProducts([...products, newProduct]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p =>
      p.id === editingProduct.id
        ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
        : p
    ));
    resetForm();
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
      stockStatus: 'In Stock',
      images: [],
      description: '',
      specifications: [],
      badges: [],
    });
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
      stockStatus: product.stockStatus,
      images: product.images,
      description: product.description || '',
      specifications: product.specifications,
      badges: product.badges,
    });
  };

  const toggleOutOfStock = (id) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStockStatus = p.stockStatus === 'Out of Stock' ? 'In Stock' : 'Out of Stock';
        const newStock = newStockStatus === 'Out of Stock' ? 0 : p.stock;
        return { ...p, stockStatus: newStockStatus, stock: newStock };
      }
      return p;
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, images: [...formData.images, reader.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1, width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                backgroundColor: '#2a2a2a',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
                color: 'white',
                fontSize: '0.875rem',
                lineHeight: '1.25rem'
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: '#facc15',
            color: 'black',
            fontWeight: '500',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            lineHeight: '1.25rem'
          }}
        >
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Add Product
        </button>

        {/* Add Product Dialog */}
        {isAddOpen && (
          <div
            onClick={() => setIsAddOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '1rem'
            }}
          >

            <div style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              width: '100%',
              maxWidth: '28rem',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '1.5rem 1.5rem 0.5rem 1.5rem',
                borderBottom: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
                  Add New Product
                </h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Images
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          {formData.images.map((image, index) => (
                            <div key={index} style={{
                              position: 'relative',
                              width: '100%',
                              height: '8rem',
                              backgroundColor: '#1f2937',
                              borderRadius: '0.5rem',
                              overflow: 'hidden',
                              border: '1px solid #374151'
                            }}>
                              <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
                                style={{
                                  position: 'absolute',
                                  top: '0.5rem',
                                  right: '0.5rem',
                                  padding: '0.25rem',
                                  backgroundColor: '#dc2626',
                                  borderRadius: '9999px',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <label htmlFor="image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                            <div style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}>
                              <Upload size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Upload Images</span>
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <input
                        type="text"
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setFormData({ ...formData, images: [...formData.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Stock Status
                    </label>
                    <select
                      value={formData.stockStatus}
                      onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        minHeight: '6rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Specifications
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.specifications.map((spec, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].key = e.target.value;
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            placeholder="Key"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].value = e.target.value;
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            placeholder="Value"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSpecs = formData.specifications.filter((_, i) => i !== index);
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#dc2626',
                              borderRadius: '9999px',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, specifications: [...formData.specifications, { key: '', value: '' }] });
                        }}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.25rem',
                          backgroundColor: '#16a34a',
                          borderRadius: '9999px',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Badges
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.badges.map((badge, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={badge}
                            onChange={(e) => {
                              const newBadges = [...formData.badges];
                              newBadges[index] = e.target.value;
                              setFormData({ ...formData, badges: newBadges });
                            }}
                            placeholder="Badge"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newBadges = formData.badges.filter((_, i) => i !== index);
                              setFormData({ ...formData, badges: newBadges });
                            }}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#dc2626',
                              borderRadius: '9999px',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, badges: [...formData.badges, ''] });
                        }}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.25rem',
                          backgroundColor: '#16a34a',
                          borderRadius: '9999px',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddProduct}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#facc15',
                      color: 'black',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem'
                    }}
                  >
                    Add Product
                  </button>
                </div>
              </div>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}>
                <button
                  onClick={() => setIsAddOpen(false)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Dialog */}
        {editingProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              width: '100%',
              maxWidth: '28rem',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '1.5rem 1.5rem 0.5rem 1.5rem',
                borderBottom: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
                  Edit Product
                </h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Images
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          {formData.images.map((image, index) => (
                            <div key={index} style={{
                              position: 'relative',
                              width: '100%',
                              height: '8rem',
                              backgroundColor: '#1f2937',
                              borderRadius: '0.5rem',
                              overflow: 'hidden',
                              border: '1px solid #374151'
                            }}>
                              <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
                                style={{
                                  position: 'absolute',
                                  top: '0.5rem',
                                  right: '0.5rem',
                                  padding: '0.25rem',
                                  backgroundColor: '#dc2626',
                                  borderRadius: '9999px',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <label htmlFor="edit-image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                            <div style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}>
                              <Upload size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Upload Images</span>
                            </div>
                            <input
                              id="edit-image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <input
                        type="text"
                        value=""
                        onChange={(e) => {
                          const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                          if (urls.length > 0) {
                            setFormData({ ...formData, images: [...formData.images, ...urls] });
                            e.target.value = '';
                          }
                        }}
                        placeholder="Or paste image URLs (comma-separated)..."
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #374151',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Stock Status
                    </label>
                    <select
                      value={formData.stockStatus}
                      onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        minHeight: '6rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Specifications
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.specifications.map((spec, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].key = e.target.value;
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            placeholder="Key"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => {
                              const newSpecs = [...formData.specifications];
                              newSpecs[index].value = e.target.value;
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            placeholder="Value"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSpecs = formData.specifications.filter((_, i) => i !== index);
                              setFormData({ ...formData, specifications: newSpecs });
                            }}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#dc2626',
                              borderRadius: '9999px',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, specifications: [...formData.specifications, { key: '', value: '' }] });
                        }}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.25rem',
                          backgroundColor: '#16a34a',
                          borderRadius: '9999px',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Badges
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.badges.map((badge, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={badge}
                            onChange={(e) => {
                              const newBadges = [...formData.badges];
                              newBadges[index] = e.target.value;
                              setFormData({ ...formData, badges: newBadges });
                            }}
                            placeholder="Badge"
                            style={{
                              flex: 1,
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #374151',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              lineHeight: '1.25rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newBadges = formData.badges.filter((_, i) => i !== index);
                              setFormData({ ...formData, badges: newBadges });
                            }}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#dc2626',
                              borderRadius: '9999px',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, badges: [...formData.badges, ''] });
                        }}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.25rem',
                          backgroundColor: '#16a34a',
                          borderRadius: '9999px',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleEditProduct}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#facc15',
                      color: 'black',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem'
                    }}
                  >
                    Update Product
                  </button>
                </div>
              </div>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}>
                <button
                  onClick={() => setEditingProduct(null)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid rgba(250, 204, 21, 0.2)',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <div style={{ aspectRatio: '1/1', backgroundColor: '#1f2937' }}>
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', color: 'white', margin: 0 }}>{product.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>{product.category}</p>
                </div>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  borderRadius: '9999px',
                  backgroundColor: product.status === 'Active' ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)',
                  color: product.status === 'Active' ? '#4ade80' : '#f87171',
                  border: `1px solid ${product.status === 'Active' ? '#16a34a' : '#dc2626'}`
                }}>
                  {product.status}
                </span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{
                  display: 'inline-flex',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  borderRadius: '9999px',
                  backgroundColor: product.stockStatus === 'In Stock'
                    ? 'rgba(22, 163, 74, 0.2)'
                    : product.stockStatus === 'Low Stock'
                      ? 'rgba(234, 179, 8, 0.2)'
                      : 'rgba(220, 38, 38, 0.2)',
                  color: product.stockStatus === 'In Stock'
                    ? '#4ade80'
                    : product.stockStatus === 'Low Stock'
                      ? '#facc15'
                      : '#f87171',
                  border: `1px solid ${product.stockStatus === 'In Stock'
                      ? '#16a34a'
                      : product.stockStatus === 'Low Stock'
                        ? '#eab308'
                        : '#dc2626'
                    }`
                }}>
                  {product.stockStatus}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#facc15', margin: 0 }}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                    Stock: {product.stock}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleOutOfStock(product.id)}
                    style={{
                      padding: '0.5rem',
                      color: product.stockStatus === 'Out of Stock' ? '#4ade80' : '#f87171',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                    title={product.stockStatus === 'Out of Stock' ? 'Mark as In Stock' : 'Mark as Out of Stock'}
                  >
                    <AlertTriangle size={18} />
                  </button>
                  <button
                    onClick={() => openEditDialog(product)}
                    style={{
                      padding: '0.5rem',
                      color: '#facc15',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '0.5rem',
                      color: '#f87171',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}