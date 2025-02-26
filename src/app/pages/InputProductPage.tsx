"use client"

import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { baserowApi } from '../../utils/baserow';

export function InputProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSucces] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  //load semua product
  const loadProducts = async () => {
    const data = await baserowApi.getProducts();
    setProducts(data);
  };

  //handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await baserowApi.updateProduct(editingId, formData);
    } else {
      await baserowApi.createProduct(formData);
    }

    setShowSucces(true);
    setFormData({ name: '', price: 0, description: '', stock: 0 });
    setEditingId(null);
    loadProducts();
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-6 text-center">Product Input</h1>
      
      {/* Product Name */}
      <form onSubmit={handleSubmit} className="bg-[#fdfdfd] shadow-xl rounded-lg p-6">
        <div className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 outline-none transition-all"
            />
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price (IDR)</label>
            <input
              type="number"
              placeholder="Enter price..."
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 outline-none transition-all"
            />
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Enter description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 outline-none transition-all h-24"
            />
          </div>

          {/* Product Stock */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              placeholder="Enter stock..."
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 outline-none transition-all"
            />
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-colors duration-200 flex justify-center items-center"
        >
          {editingId ? 'Update Product' : 'Add New Product'}
        </button>
      </form>

      {/* pop up form input success */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-center">
          Product has been successfully added!
        </div>
      )}
    </div>
  );
}
