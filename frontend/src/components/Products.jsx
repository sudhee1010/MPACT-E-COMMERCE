// import React, { useState, useEffect } from 'react';

// import { Plus, Search, Edit, Trash2, Eye, AlertTriangle, Upload, X, Tag } from 'lucide-react';

// const initialProducts = [
//   {
//     id: 'P001',
//     name: 'Wireless Headphones',
//     category: 'Electronics',
//     price: 129.99,
//     stock: 45,
//     status: 'Active',
//     stockStatus: 'In Stock',
//     images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
//     description: 'Premium wireless headphones with noise cancellation',
//     specifications: [
//       { key: 'Battery Life', value: '30 hours' },
//       { key: 'Connectivity', value: 'Bluetooth 5.0' },
//     ],
//     badges: ['HIGH QUALITY', 'WIRELESS'],
//   },
//   {
//     id: 'P002',
//     name: 'Smart Watch',
//     category: 'Electronics',
//     price: 299.99,
//     stock: 23,
//     status: 'Active',
//     stockStatus: 'Low Stock',
//     images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'],
//     description: 'Advanced smartwatch with fitness tracking',
//     specifications: [
//       { key: 'Display', value: 'AMOLED 1.4"' },
//       { key: 'Water Resistance', value: '5ATM' },
//     ],
//     badges: ['WATERPROOF', 'FITNESS'],
//   },
//   {
//     id: 'P003',
//     name: 'Laptop Stand',
//     category: 'Accessories',
//     price: 49.99,
//     stock: 67,
//     status: 'Active',
//     stockStatus: 'In Stock',
//     images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300'],
//     description: 'Ergonomic aluminum laptop stand',
//     specifications: [
//       { key: 'Material', value: 'Aluminum' },
//       { key: 'Weight', value: '800g' },
//     ],
//     badges: ['ECO-FRIENDLY', 'DURABLE'],
//   },
//   {
//     id: 'P004',
//     name: 'USB-C Cable',
//     category: 'Accessories',
//     price: 19.99,
//     stock: 120,
//     status: 'Active',
//     stockStatus: 'In Stock',
//     images: ['https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=300'],
//     description: 'Fast charging USB-C cable',
//     specifications: [
//       { key: 'Length', value: '2 meters' },
//       { key: 'Power', value: '100W' },
//     ],
//     badges: ['FAST CHARGING'],
//   },
//   {
//     id: 'P005',
//     name: 'Phone Case',
//     category: 'Accessories',
//     price: 24.99,
//     stock: 89,
//     status: 'Active',
//     stockStatus: 'In Stock',
//     images: ['https://images.unsplash.com/photo-1601593346740-925612772716?w=300'],
//     description: 'Protective phone case with premium finish',
//     specifications: [
//       { key: 'Material', value: 'TPU + PC' },
//       { key: 'Drop Protection', value: '10ft' },
//     ],
//     badges: ['SHOCKPROOF', 'SLIM'],
//   },
// ];

// const categories = [
//   'Electronics',
//   'Accessories',
//   'Clothing',
//   'Home & Garden',
//   'Sports & Outdoors',
//   'Books',
//   'Toys & Games',
//   'Health & Beauty',
//   'Automotive',
//   'Food & Beverages',
// ];

// export function Products() {
//   const [products, setProducts] = useState(initialProducts);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stock: '',
//     status: 'Active',
//     stockStatus: 'In Stock',
//     images: [],
//     description: '',
//     specifications: [],
//     badges: [],
//   });

//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === 'Escape') {
//         setIsAddOpen(false);
//         setEditingProduct(null);
//       }
//     };

//     if (isAddOpen || editingProduct) {
//       window.addEventListener('keydown', handleEsc);
//     }

//     return () => {
//       window.removeEventListener('keydown', handleEsc);
//     };
//   }, [isAddOpen, editingProduct]);


//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddProduct = () => {
//     const newProduct = {
//       id: `P${String(products.length + 1).padStart(3, '0')}`,
//       name: formData.name,
//       category: formData.category,
//       price: parseFloat(formData.price),
//       stock: parseInt(formData.stock),
//       status: formData.status,
//       stockStatus: formData.stockStatus,
//       images: formData.images || ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
//       description: formData.description,
//       specifications: formData.specifications,
//       badges: formData.badges,
//     };
//     setProducts([...products, newProduct]);
//     resetForm();
//     setIsAddOpen(false);
//   };

//   const handleEditProduct = () => {
//     if (!editingProduct) return;
//     setProducts(products.map(p =>
//       p.id === editingProduct.id
//         ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
//         : p
//     ));
//     resetForm();
//     setEditingProduct(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       setProducts(products.filter((p) => p.id !== id));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       category: '',
//       price: '',
//       stock: '',
//       status: 'Active',
//       stockStatus: 'In Stock',
//       images: [],
//       description: '',
//       specifications: [],
//       badges: [],
//     });
//   };

//   const openEditDialog = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       price: String(product.price),
//       stock: String(product.stock),
//       status: product.status,
//       stockStatus: product.stockStatus,
//       images: product.images,
//       description: product.description || '',
//       specifications: product.specifications,
//       badges: product.badges,
//     });
//   };

//   const toggleOutOfStock = (id) => {
//     setProducts(products.map(p => {
//       if (p.id === id) {
//         const newStockStatus = p.stockStatus === 'Out of Stock' ? 'In Stock' : 'Out of Stock';
//         const newStock = newStockStatus === 'Out of Stock' ? 0 : p.stock;
//         return { ...p, stockStatus: newStockStatus, stock: newStock };
//       }
//       return p;
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, images: [...formData.images, reader.result] });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//       {/* Header */}
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         alignItems: 'flex-start'
//       }}>
//         <div style={{ flex: 1, width: '100%' }}>
//           <div style={{ position: 'relative' }}>
//             <Search style={{
//               position: 'absolute',
//               left: '0.75rem',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               color: '#9ca3af'
//             }} size={20} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '0.5rem 0.75rem 0.5rem 2.5rem',
//                 backgroundColor: '#2a2a2a',
//                 border: '1px solid #374151',
//                 borderRadius: '0.375rem',
//                 color: 'white',
//                 fontSize: '0.875rem',
//                 lineHeight: '1.25rem'
//               }}
//             />
//           </div>
//         </div>

//         <button
//           onClick={() => setIsAddOpen(true)}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#facc15',
//             color: 'black',
//             fontWeight: '500',
//             borderRadius: '0.375rem',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '0.875rem',
//             lineHeight: '1.25rem'
//           }}
//         >
//           <Plus size={20} style={{ marginRight: '0.5rem' }} />
//           Add Product
//         </button>

//         {/* Add Product Dialog */}
//         {isAddOpen && (
//           <div
//             onClick={() => setIsAddOpen(false)}
//             style={{
//               position: 'fixed',
//               inset: 0,
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               zIndex: 50,
//               padding: '1rem'
//             }}
//           >

//             <div
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 backgroundColor: '#2a2a2a',
//                 border: '1px solid #374151',
//                 borderRadius: '0.5rem',
//                 width: '100%',
//                 maxWidth: '28rem',
//                 maxHeight: '90vh',
//                 overflowY: 'auto'
//               }}
//             >

//               <div style={{
//                 padding: '1.5rem 1.5rem 0.5rem 1.5rem',
//                 borderBottom: '1px solid #374151'
//               }}>
//                 <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
//                   Add New Product
//                 </h3>
//               </div>
//               <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Enter product name"
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     />
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Category
//                     </label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       {categories.map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                     <div>
//                       <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         step="0.01"
//                         value={formData.price}
//                         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                         placeholder="0.00"
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                         Stock
//                       </label>
//                       <input
//                         type="number"
//                         value={formData.stock}
//                         onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                         placeholder="0"
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Product Images
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.images.length > 0 && (
//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
//                           {formData.images.map((image, index) => (
//                             <div key={index} style={{
//                               position: 'relative',
//                               width: '100%',
//                               height: '8rem',
//                               backgroundColor: '#1f2937',
//                               borderRadius: '0.5rem',
//                               overflow: 'hidden',
//                               border: '1px solid #374151'
//                             }}>
//                               <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                               <button
//                                 type="button"
//                                 onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
//                                 style={{
//                                   position: 'absolute',
//                                   top: '0.5rem',
//                                   right: '0.5rem',
//                                   padding: '0.25rem',
//                                   backgroundColor: '#dc2626',
//                                   borderRadius: '9999px',
//                                   color: 'white',
//                                   border: 'none',
//                                   cursor: 'pointer'
//                                 }}
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                       <div style={{ display: 'flex', gap: '0.5rem' }}>
//                         <div style={{ flex: 1 }}>
//                           <label htmlFor="image-upload" style={{ display: 'block', cursor: 'pointer' }}>
//                             <div style={{
//                               padding: '0.5rem 1rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               textAlign: 'center',
//                               cursor: 'pointer'
//                             }}>
//                               <Upload size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
//                               <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Upload Images</span>
//                             </div>
//                             <input
//                               id="image-upload"
//                               type="file"
//                               accept="image/*"
//                               onChange={handleImageUpload}
//                               style={{ display: 'none' }}
//                             />
//                           </label>
//                         </div>
//                       </div>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) => {
//                           const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
//                           if (urls.length > 0) {
//                             setFormData({ ...formData, images: [...formData.images, ...urls] });
//                             e.target.value = '';
//                           }
//                         }}
//                         placeholder="Or paste image URLs (comma-separated)..."
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Status
//                     </label>
//                     <select
//                       value={formData.status}
//                       onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Stock Status
//                     </label>
//                     <select
//                       value={formData.stockStatus}
//                       onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="In Stock">In Stock</option>
//                       <option value="Low Stock">Low Stock</option>
//                       <option value="Out of Stock">Out of Stock</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Description
//                     </label>
//                     <textarea
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       placeholder="Enter product description"
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem',
//                         minHeight: '6rem',
//                         resize: 'vertical'
//                       }}
//                     />
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Specifications
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.specifications.map((spec, index) => (
//                         <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                           <input
//                             type="text"
//                             value={spec.key}
//                             onChange={(e) => {
//                               const newSpecs = [...formData.specifications];
//                               newSpecs[index].key = e.target.value;
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             placeholder="Key"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <input
//                             type="text"
//                             value={spec.value}
//                             onChange={(e) => {
//                               const newSpecs = [...formData.specifications];
//                               newSpecs[index].value = e.target.value;
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             placeholder="Value"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newSpecs = formData.specifications.filter((_, i) => i !== index);
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             style={{
//                               padding: '0.25rem',
//                               backgroundColor: '#dc2626',
//                               borderRadius: '9999px',
//                               color: 'white',
//                               border: 'none',
//                               cursor: 'pointer'
//                             }}
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData({ ...formData, specifications: [...formData.specifications, { key: '', value: '' }] });
//                         }}
//                         style={{
//                           alignSelf: 'flex-start',
//                           padding: '0.25rem',
//                           backgroundColor: '#16a34a',
//                           borderRadius: '9999px',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Badges
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.badges.map((badge, index) => (
//                         <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                           <input
//                             type="text"
//                             value={badge}
//                             onChange={(e) => {
//                               const newBadges = [...formData.badges];
//                               newBadges[index] = e.target.value;
//                               setFormData({ ...formData, badges: newBadges });
//                             }}
//                             placeholder="Badge"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newBadges = formData.badges.filter((_, i) => i !== index);
//                               setFormData({ ...formData, badges: newBadges });
//                             }}
//                             style={{
//                               padding: '0.25rem',
//                               backgroundColor: '#dc2626',
//                               borderRadius: '9999px',
//                               color: 'white',
//                               border: 'none',
//                               cursor: 'pointer'
//                             }}
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData({ ...formData, badges: [...formData.badges, ''] });
//                         }}
//                         style={{
//                           alignSelf: 'flex-start',
//                           padding: '0.25rem',
//                           backgroundColor: '#16a34a',
//                           borderRadius: '9999px',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleAddProduct}
//                     style={{
//                       width: '100%',
//                       padding: '0.5rem 1rem',
//                       backgroundColor: '#facc15',
//                       color: 'black',
//                       fontWeight: '500',
//                       borderRadius: '0.375rem',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '0.875rem',
//                       lineHeight: '1.25rem'
//                     }}
//                   >
//                     Add Product
//                   </button>
//                 </div>
//               </div>
//               <div style={{
//                 position: 'absolute',
//                 top: '1rem',
//                 right: '1rem'
//               }}>
//                 <button
//                   onClick={() => setIsAddOpen(false)}
//                   style={{
//                     padding: '0.5rem',
//                     backgroundColor: 'transparent',
//                     color: '#9ca3af',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Product Dialog */}
//         {editingProduct && (
//           <div style={{
//             position: 'fixed',
//             inset: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 50,
//             padding: '1rem'
//           }}>
//             <div style={{
//               backgroundColor: '#2a2a2a',
//               border: '1px solid #374151',
//               borderRadius: '0.5rem',
//               width: '100%',
//               maxWidth: '28rem',
//               maxHeight: '90vh',
//               overflowY: 'auto'
//             }}>
//               <div style={{
//                 padding: '1.5rem 1.5rem 0.5rem 1.5rem',
//                 borderBottom: '1px solid #374151'
//               }}>
//                 <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
//                   Edit Product
//                 </h3>
//               </div>
//               <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Enter product name"
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     />
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Category
//                     </label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       {categories.map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                     <div>
//                       <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         step="0.01"
//                         value={formData.price}
//                         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                         placeholder="0.00"
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                         Stock
//                       </label>
//                       <input
//                         type="number"
//                         value={formData.stock}
//                         onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                         placeholder="0"
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Product Images
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.images.length > 0 && (
//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
//                           {formData.images.map((image, index) => (
//                             <div key={index} style={{
//                               position: 'relative',
//                               width: '100%',
//                               height: '8rem',
//                               backgroundColor: '#1f2937',
//                               borderRadius: '0.5rem',
//                               overflow: 'hidden',
//                               border: '1px solid #374151'
//                             }}>
//                               <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                               <button
//                                 type="button"
//                                 onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
//                                 style={{
//                                   position: 'absolute',
//                                   top: '0.5rem',
//                                   right: '0.5rem',
//                                   padding: '0.25rem',
//                                   backgroundColor: '#dc2626',
//                                   borderRadius: '9999px',
//                                   color: 'white',
//                                   border: 'none',
//                                   cursor: 'pointer'
//                                 }}
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                       <div style={{ display: 'flex', gap: '0.5rem' }}>
//                         <div style={{ flex: 1 }}>
//                           <label htmlFor="edit-image-upload" style={{ display: 'block', cursor: 'pointer' }}>
//                             <div style={{
//                               padding: '0.5rem 1rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               textAlign: 'center',
//                               cursor: 'pointer'
//                             }}>
//                               <Upload size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
//                               <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Upload Images</span>
//                             </div>
//                             <input
//                               id="edit-image-upload"
//                               type="file"
//                               accept="image/*"
//                               onChange={handleImageUpload}
//                               style={{ display: 'none' }}
//                             />
//                           </label>
//                         </div>
//                       </div>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) => {
//                           const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
//                           if (urls.length > 0) {
//                             setFormData({ ...formData, images: [...formData.images, ...urls] });
//                             e.target.value = '';
//                           }
//                         }}
//                         placeholder="Or paste image URLs (comma-separated)..."
//                         style={{
//                           width: '100%',
//                           padding: '0.5rem 0.75rem',
//                           backgroundColor: '#1a1a1a',
//                           border: '1px solid #374151',
//                           borderRadius: '0.375rem',
//                           color: 'white',
//                           fontSize: '0.875rem',
//                           lineHeight: '1.25rem'
//                         }}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Status
//                     </label>
//                     <select
//                       value={formData.status}
//                       onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Stock Status
//                     </label>
//                     <select
//                       value={formData.stockStatus}
//                       onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem'
//                       }}
//                     >
//                       <option value="In Stock">In Stock</option>
//                       <option value="Low Stock">Low Stock</option>
//                       <option value="Out of Stock">Out of Stock</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Description
//                     </label>
//                     <textarea
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       placeholder="Enter product description"
//                       style={{
//                         width: '100%',
//                         padding: '0.5rem 0.75rem',
//                         backgroundColor: '#1a1a1a',
//                         border: '1px solid #374151',
//                         borderRadius: '0.375rem',
//                         color: 'white',
//                         fontSize: '0.875rem',
//                         lineHeight: '1.25rem',
//                         minHeight: '6rem',
//                         resize: 'vertical'
//                       }}
//                     />
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Specifications
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.specifications.map((spec, index) => (
//                         <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                           <input
//                             type="text"
//                             value={spec.key}
//                             onChange={(e) => {
//                               const newSpecs = [...formData.specifications];
//                               newSpecs[index].key = e.target.value;
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             placeholder="Key"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <input
//                             type="text"
//                             value={spec.value}
//                             onChange={(e) => {
//                               const newSpecs = [...formData.specifications];
//                               newSpecs[index].value = e.target.value;
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             placeholder="Value"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newSpecs = formData.specifications.filter((_, i) => i !== index);
//                               setFormData({ ...formData, specifications: newSpecs });
//                             }}
//                             style={{
//                               padding: '0.25rem',
//                               backgroundColor: '#dc2626',
//                               borderRadius: '9999px',
//                               color: 'white',
//                               border: 'none',
//                               cursor: 'pointer'
//                             }}
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData({ ...formData, specifications: [...formData.specifications, { key: '', value: '' }] });
//                         }}
//                         style={{
//                           alignSelf: 'flex-start',
//                           padding: '0.25rem',
//                           backgroundColor: '#16a34a',
//                           borderRadius: '9999px',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
//                       Badges
//                     </label>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                       {formData.badges.map((badge, index) => (
//                         <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                           <input
//                             type="text"
//                             value={badge}
//                             onChange={(e) => {
//                               const newBadges = [...formData.badges];
//                               newBadges[index] = e.target.value;
//                               setFormData({ ...formData, badges: newBadges });
//                             }}
//                             placeholder="Badge"
//                             style={{
//                               flex: 1,
//                               padding: '0.5rem 0.75rem',
//                               backgroundColor: '#1a1a1a',
//                               border: '1px solid #374151',
//                               borderRadius: '0.375rem',
//                               color: 'white',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.25rem'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newBadges = formData.badges.filter((_, i) => i !== index);
//                               setFormData({ ...formData, badges: newBadges });
//                             }}
//                             style={{
//                               padding: '0.25rem',
//                               backgroundColor: '#dc2626',
//                               borderRadius: '9999px',
//                               color: 'white',
//                               border: 'none',
//                               cursor: 'pointer'
//                             }}
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData({ ...formData, badges: [...formData.badges, ''] });
//                         }}
//                         style={{
//                           alignSelf: 'flex-start',
//                           padding: '0.25rem',
//                           backgroundColor: '#16a34a',
//                           borderRadius: '9999px',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleEditProduct}
//                     style={{
//                       width: '100%',
//                       padding: '0.5rem 1rem',
//                       backgroundColor: '#facc15',
//                       color: 'black',
//                       fontWeight: '500',
//                       borderRadius: '0.375rem',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '0.875rem',
//                       lineHeight: '1.25rem'
//                     }}
//                   >
//                     Update Product
//                   </button>
//                 </div>
//               </div>
//               <div style={{
//                 position: 'absolute',
//                 top: '1rem',
//                 right: '1rem'
//               }}>
//                 <button
//                   onClick={(e) => e.stopPropagation()}
//                   style={{
//                     padding: '0.5rem',
//                     backgroundColor: 'transparent',
//                     color: '#9ca3af',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Products Grid */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//         gap: '1rem'
//       }}>
//         {filteredProducts.map((product) => (
//           <div key={product.id} style={{
//             backgroundColor: '#2a2a2a',
//             border: '1px solid rgba(250, 204, 21, 0.2)',
//             borderRadius: '0.5rem',
//             overflow: 'hidden'
//           }}>
//             <div style={{ aspectRatio: '1/1', backgroundColor: '#1f2937' }}>
//               <img
//                 src={product.images[0]}
//                 alt={product.name}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ fontWeight: '600', color: 'white', margin: 0 }}>{product.name}</h3>
//                   <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>{product.category}</p>
//                 </div>
//                 <span style={{
//                   padding: '0.25rem 0.5rem',
//                   fontSize: '0.75rem',
//                   fontWeight: '500',
//                   borderRadius: '9999px',
//                   backgroundColor: product.status === 'Active' ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)',
//                   color: product.status === 'Active' ? '#4ade80' : '#f87171',
//                   border: `1px solid ${product.status === 'Active' ? '#16a34a' : '#dc2626'}`
//                 }}>
//                   {product.status}
//                 </span>
//               </div>
//               <div style={{ marginBottom: '0.75rem' }}>
//                 <span style={{
//                   display: 'inline-flex',
//                   padding: '0.25rem 0.5rem',
//                   fontSize: '0.75rem',
//                   fontWeight: '500',
//                   borderRadius: '9999px',
//                   backgroundColor: product.stockStatus === 'In Stock'
//                     ? 'rgba(22, 163, 74, 0.2)'
//                     : product.stockStatus === 'Low Stock'
//                       ? 'rgba(234, 179, 8, 0.2)'
//                       : 'rgba(220, 38, 38, 0.2)',
//                   color: product.stockStatus === 'In Stock'
//                     ? '#4ade80'
//                     : product.stockStatus === 'Low Stock'
//                       ? '#facc15'
//                       : '#f87171',
//                   border: `1px solid ${product.stockStatus === 'In Stock'
//                     ? '#16a34a'
//                     : product.stockStatus === 'Low Stock'
//                       ? '#eab308'
//                       : '#dc2626'
//                     }`
//                 }}>
//                   {product.stockStatus}
//                 </span>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
//                 <div>
//                   <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#facc15', margin: 0 }}>
//                     ${product.price.toFixed(2)}
//                   </p>
//                   <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
//                     Stock: {product.stock}
//                   </p>
//                 </div>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <button
//                     onClick={() => toggleOutOfStock(product.id)}
//                     style={{
//                       padding: '0.5rem',
//                       color: product.stockStatus === 'Out of Stock' ? '#4ade80' : '#f87171',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       borderRadius: '0.375rem',
//                       cursor: 'pointer'
//                     }}
//                     title={product.stockStatus === 'Out of Stock' ? 'Mark as In Stock' : 'Mark as Out of Stock'}
//                   >
//                     <AlertTriangle size={18} />
//                   </button>
//                   <button
//                     onClick={() => openEditDialog(product)}
//                     style={{
//                       padding: '0.5rem',
//                       color: '#facc15',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       borderRadius: '0.375rem',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     <Edit size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     style={{
//                       padding: '0.5rem',
//                       color: '#f87171',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       borderRadius: '0.375rem',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, AlertTriangle, Upload, X, DollarSign, Package, Percent, Loader2, Image as ImageIcon } from 'lucide-react';
import * as productApi from '../api/productApi';

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
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false); // ✅ ADDED: Image upload state
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    nextCursor: null
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    highlights: '',
    category: '',
    originalPrice: '',
    price: '',
    discountPercent: 0,
    countInStock: '',
    images: [],
    isActive: true,
  });

  // ✅ ADDED: Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (cursor = null) => {
    try {
      setLoading(true);
      const params = {
        limit: 10,
        ...(cursor && { cursor })
      };
      
      const response = await productApi.getProductsApi(params);
      if (cursor) {
        setProducts(prev => [...prev, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setPageInfo(response.data.pageInfo);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED: Load more products
  const loadMoreProducts = () => {
    if (pageInfo.hasNextPage && pageInfo.nextCursor) {
      fetchProducts(pageInfo.nextCursor);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsAddOpen(false);
        setEditingProduct(null);
        resetForm();
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
    (product.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ ADDED: Upload images to Cloudinary (simplified example)
  // Note: In real implementation, you'd upload to your backend which then uploads to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    // This is a simplified example
    // In reality, you should:
    // 1. Send file to your backend
    // 2. Backend uploads to Cloudinary
    // 3. Backend returns { url, public_id }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Set in Cloudinary
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      return {
        url: data.secure_url,
        public_id: data.public_id
      };
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  // ✅ MODIFIED: Handle image upload with Cloudinary
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    try {
      setUploadingImages(true);
      
      // For now, we'll simulate upload with local URLs
      // In production, use the uploadImageToCloudinary function
      const uploadedImages = files.map(file => ({
        url: URL.createObjectURL(file),
        public_id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        isTemp: true
      }));
      
      setFormData({ 
        ...formData, 
        images: [...formData.images, ...uploadedImages] 
      });
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  // ✅ ADDED: Handle image deletion
  const handleImageDelete = async (imageIndex, productId = null) => {
    const image = formData.images[imageIndex];
    
    try {
      // If it's not a temp image and we're editing, delete from backend
      if (!image.isTemp && image.public_id && productId && editingProduct) {
        await productApi.deleteProductImageApi(productId, image._id);
      }
      
      // Remove from local state
      setFormData({ 
        ...formData, 
        images: formData.images.filter((_, i) => i !== imageIndex) 
      });
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  // ✅ MODIFIED: Handle add product with proper image handling
  const handleAddProduct = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category) {
        alert('Please fill in required fields: Name, Price, and Category');
        return;
      }

      // Filter out temp images (these would need actual upload in production)
      const validImages = formData.images.filter(img => !img.isTemp);
      
      // In production, you would upload all images first, then get their URLs
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice || formData.price),
        countInStock: parseInt(formData.countInStock || 0),
        category: formData.category,
        images: validImages, // Send only uploaded images
        discountPercent: formData.discountPercent,
        isActive: formData.isActive
      };

      // Remove temporary fields
      delete productData.isTemp;

      const response = await productApi.createProductApi(productData);
      
      setProducts(prev => [response.data, ...prev]);
      resetForm();
      setIsAddOpen(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  // ✅ MODIFIED: Handle edit product
  const handleEditProduct = async () => {
    if (!editingProduct) return;
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        highlights: formData.highlights,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        countInStock: parseInt(formData.countInStock),
        discountPercent: formData.discountPercent,
        isActive: formData.isActive,
        // Don't send images in update unless they're changed
        // For image updates, use separate endpoints
      };

      const response = await productApi.updateProductApi(
        editingProduct._id,
        productData
      );

      setProducts(prev => 
        prev.map(p => p._id === editingProduct._id ? response.data : p)
      );
      
      resetForm();
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  // ✅ MODIFIED: Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productApi.deleteProductApi(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  // ✅ MODIFIED: Toggle active status
  const toggleActiveStatus = async (id) => {
    try {
      const product = products.find(p => p._id === id);
      if (!product) return;
      
      const updatedProduct = {
        ...product,
        isActive: !product.isActive
      };

      const response = await productApi.updateProductApi(
        id,
        { isActive: updatedProduct.isActive }
      );

      setProducts(prev => 
        prev.map(p => p._id === id ? response.data : p)
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      highlights: '',
      category: '',
      originalPrice: '',
      price: '',
      discountPercent: 0,
      countInStock: '',
      images: [],
      isActive: true,
    });
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      highlights: product.highlights || '',
      category: product.category?._id || product.category || '',
      originalPrice: String(product.originalPrice || product.price),
      price: String(product.price),
      discountPercent: product.discountPercent || 0,
      countInStock: String(product.countInStock || 0),
      images: product.images || [],
      isActive: product.isActive !== false,
    });
  };

  const handlePriceChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    
    if (field === 'originalPrice' || field === 'price') {
      const original = parseFloat(newFormData.originalPrice || newFormData.price);
      const selling = parseFloat(newFormData.price);
      
      if (original > selling && original > 0) {
        newFormData.discountPercent = Math.round(((original - selling) / original) * 100);
      } else {
        newFormData.discountPercent = 0;
      }
    }
    
    setFormData(newFormData);
  };

  // ✅ ADDED: Render loading state
  if (loading && products.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#facc15' }} />
        <span style={{ marginLeft: '1rem', color: '#d1d5db' }}>Loading products...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Error Display */}
      {error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.375rem',
          color: '#dc2626',
          marginBottom: '1rem'
        }}>
          {error}
          <button 
            onClick={() => setError(null)}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              color: '#dc2626',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

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
            onClick={() => {
              setIsAddOpen(false);
              resetForm();
            }}
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
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '32rem',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
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
                  {/* Product Name */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Name *
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

                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Category *
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

                  {/* Price Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        <DollarSign size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Original Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => handlePriceChange('originalPrice', e.target.value)}
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
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875ssrem' }}>
                        <DollarSign size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Selling Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handlePriceChange('price', e.target.value)}
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
                  </div>

                  {/* Discount Display */}
                  {formData.discountPercent > 0 && (
                    <div style={{
                      padding: '0.5rem',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '0.375rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ color: '#22c55e', fontSize: '0.875rem' }}>
                        <Percent size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {formData.discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  {/* Stock and Status */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        <Package size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.countInStock}
                        onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
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
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Status
                      </label>
                      <select
                        value={formData.isActive ? 'Active' : 'Inactive'}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'Active' })}
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
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Highlights */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Highlights (comma-separated)
                    </label>
                    <textarea
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      placeholder="Feature 1, Feature 2, Feature 3"
                      rows="2"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Images
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                          {formData.images.map((image, index) => (
                            <div key={index} style={{
                              position: 'relative',
                              width: '100%',
                              height: '6rem',
                              backgroundColor: '#1f2937',
                              borderRadius: '0.375rem',
                              overflow: 'hidden',
                              border: '1px solid #374151'
                            }}>
                              <img 
                                src={image.url || image} 
                                alt={`Preview ${index + 1}`} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                              <button
                                type="button"
                                onClick={() => handleImageDelete(index)}
                                style={{
                                  position: 'absolute',
                                  top: '0.25rem',
                                  right: '0.25rem',
                                  padding: '0.125rem',
                                  backgroundColor: '#dc2626',
                                  borderRadius: '9999px',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem'
                                }}
                              >
                                <X size={12} />
                              </button>
                              {image.isTemp && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: '0',
                                  left: '0',
                                  right: '0',
                                  backgroundColor: 'rgba(234, 179, 8, 0.9)',
                                  padding: '0.125rem',
                                  fontSize: '0.625rem',
                                  textAlign: 'center',
                                  color: 'black'
                                }}>
                                  Temp
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <label htmlFor="image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '2px dashed #374151',
                          borderRadius: '0.375rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s',
                          opacity: uploadingImages ? 0.5 : 1
                        }}>
                          {uploadingImages ? (
                            <>
                              <Loader2 size={20} className="animate-spin" style={{ display: 'inline-block', marginBottom: '0.5rem', color: '#facc15' }} />
                              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>
                                Uploading...
                              </p>
                            </>
                          ) : (
                            <>
                              <Upload size={20} style={{ display: 'inline-block', marginBottom: '0.5rem', color: '#9ca3af' }} />
                              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>
                                Click to upload or drag and drop
                              </p>
                              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0.25rem 0 0 0' }}>
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploadingImages}
                          style={{ display: 'none' }}
                        />
                      </label>
                      
                      {/* Image URL input for direct links */}
                      <div style={{ marginTop: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Or enter image URLs (one per line)..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              setFormData({
                                ...formData,
                                images: [
                                  ...formData.images,
                                  { url: e.target.value.trim(), public_id: `url_${Date.now()}` }
                                ]
                              });
                              e.target.value = '';
                            }
                          }}
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
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                          Press Enter to add each URL
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddProduct}
                    disabled={!formData.name || !formData.price || !formData.category || uploadingImages}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: (formData.name && formData.price && formData.category && !uploadingImages) 
                        ? '#facc15' 
                        : '#6b7280',
                      color: 'black',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: (formData.name && formData.price && formData.category && !uploadingImages) 
                        ? 'pointer' 
                        : 'not-allowed',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem',
                      transition: 'background-color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {uploadingImages ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Uploading Images...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                </div>
              </div>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}>
                <button
                  onClick={() => {
                    setIsAddOpen(false);
                    resetForm();
                  }}
                  disabled={uploadingImages}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    border: 'none',
                    cursor: uploadingImages ? 'not-allowed' : 'pointer',
                    opacity: uploadingImages ? 0.5 : 1
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
              maxWidth: '32rem',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '1.5rem 1.5rem 0.5rem 1.5rem',
                borderBottom: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
                  Edit Product: {editingProduct.name}
                </h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Same form fields as Add Product Dialog */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      Category *
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
                        Original Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => handlePriceChange('originalPrice', e.target.value)}
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
                        Selling Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handlePriceChange('price', e.target.value)}
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

                  {formData.discountPercent > 0 && (
                    <div style={{
                      padding: '0.5rem',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '0.375rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ color: '#22c55e', fontSize: '0.875rem' }}>
                        {formData.discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.countInStock}
                        onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
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
                        Status
                      </label>
                      <select
                        value={formData.isActive ? 'Active' : 'Inactive'}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'Active' })}
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
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Highlights
                    </label>
                    <textarea
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      rows="2"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Images Section for Edit */}
                  <div>
                    <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      Product Images
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {formData.images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                          {formData.images.map((image, index) => (
                            <div key={index} style={{
                              position: 'relative',
                              width: '100%',
                              height: '6rem',
                              backgroundColor: '#1f2937',
                              borderRadius: '0.375rem',
                              overflow: 'hidden',
                              border: '1px solid #374151'
                            }}>
                              <img 
                                src={image.url || image} 
                                alt={`Preview ${index + 1}`} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                              <button
                                type="button"
                                onClick={() => handleImageDelete(index, editingProduct._id)}
                                style={{
                                  position: 'absolute',
                                  top: '0.25rem',
                                  right: '0.25rem',
                                  padding: '0.125rem',
                                  backgroundColor: '#dc2626',
                                  borderRadius: '9999px',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem'
                                }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <label htmlFor="edit-image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: '#1a1a1a',
                          border: '2px dashed #374151',
                          borderRadius: '0.375rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s'
                        }}>
                          <Upload size={20} style={{ display: 'inline-block', marginBottom: '0.5rem', color: '#9ca3af' }} />
                          <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>
                            Add more images
                          </p>
                        </div>
                        <input
                          id="edit-image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleEditProduct}
                    disabled={!formData.name || !formData.price || !formData.category}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: (formData.name && formData.price && formData.category) 
                        ? '#facc15' 
                        : '#6b7280',
                      color: 'black',
                      fontWeight: '500',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: (formData.name && formData.price && formData.category) 
                        ? 'pointer' 
                        : 'not-allowed',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem',
                      transition: 'background-color 0.2s'
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
                  onClick={() => {
                    setEditingProduct(null);
                    resetForm();
                  }}
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
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#9ca3af',
          backgroundColor: '#2a2a2a',
          borderRadius: '0.5rem',
          border: '1px solid #374151'
        }}>
          <ImageIcon size={48} style={{ display: 'block', margin: '0 auto 1rem', color: '#4b5563' }} />
          <h3 style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>No products found</h3>
          <p>Try adjusting your search or add a new product</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid rgba(250, 204, 21, 0.2)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'translateY(-2px)',
                  borderColor: 'rgba(250, 204, 21, 0.4)'
                }
              }}>
                <div style={{ aspectRatio: '1/1', backgroundColor: '#1f2937', position: 'relative' }}>
                  <img
                    src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {product.discountPercent > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {product.discountPercent}% OFF
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', color: 'white', margin: 0, fontSize: '1rem' }}>{product.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                        {product.category?.name || product.category || 'Uncategorized'}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '9999px',
                      backgroundColor: product.isActive ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)',
                      color: product.isActive ? '#4ade80' : '#f87171',
                      border: `1px solid ${product.isActive ? '#16a34a' : '#dc2626'}`
                    }}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {/* Stock Status based on countInStock */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '9999px',
                      backgroundColor: product.countInStock > 10 
                        ? 'rgba(22, 163, 74, 0.2)' 
                        : product.countInStock > 0 
                          ? 'rgba(234, 179, 8, 0.2)' 
                          : 'rgba(220, 38, 38, 0.2)',
                      color: product.countInStock > 10 
                        ? '#4ade80' 
                        : product.countInStock > 0 
                          ? '#facc15' 
                          : '#f87171',
                      border: `1px solid ${
                        product.countInStock > 10 
                          ? '#16a34a' 
                          : product.countInStock > 0 
                            ? '#eab308' 
                            : '#dc2626'
                      }`
                    }}>
                      {product.countInStock > 10 ? 'In Stock' : product.countInStock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {product.discountPercent > 0 && (
                          <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                            ${product.originalPrice?.toFixed(2) || product.price.toFixed(2)}
                          </span>
                        )}
                        <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#facc15', margin: 0 }}>
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0.25rem 0 0 0' }}>
                        Stock: {product.countInStock || 0}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => toggleActiveStatus(product._id)}
                        style={{
                          padding: '0.5rem',
                          color: product.isActive ? '#f87171' : '#4ade80',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                        title={product.isActive ? 'Deactivate' : 'Activate'}
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
                        onClick={() => handleDelete(product._id)}
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
          
          {/* Load More Button */}
          {pageInfo.hasNextPage && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={loadMoreProducts}
                disabled={loading}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#374151',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Products'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}