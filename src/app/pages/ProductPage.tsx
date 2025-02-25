"use client"
import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { baserowApi } from '../../utils/baserow';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk delete modal
  const [deleteId, setDeleteId] = useState<number | null>(null); // State untuk ID item yang akan dihapus
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await baserowApi.getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      await baserowApi.deleteProduct(deleteId);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
      loadProducts();
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsEditModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      await baserowApi.updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      await baserowApi.createProduct(formData);
    }
    setIsEditModalOpen(false);
    setFormData({
      name: '',
      price: 0,
      description: '',
      stock: 0,
    });
    loadProducts();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Product List</h1>
      {isLoading ? (
        // Skeleton Loading in Table Format
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F6F7] border-b border-gray-200">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Real Data di Table
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F6F7] border-b border-gray-200">
                <th className="p-4 text-center">Name</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Description</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4 text-center">Rp.{product.price}</td>
                  <td className="p-4">{product.description}</td>
                  <td className="p-4 text-center">{product.stock}</td>
                  <td className="p-4 space-x-2 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-[#dba605]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(product.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </label>
              <label className="block mb-2">
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </label>
              <label className="block mb-4">
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-2xl mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDelete} // Panggil handleDelete saat konfirmasi
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
