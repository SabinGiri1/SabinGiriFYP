import { useState } from 'react';
import { PlusCircle, Image, Package, DollarSign, List, Info, Box } from 'lucide-react';
import axios from 'axios';

const AddProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',  // This will be the URL of the image
    imageFile: null // This will hold the image file itself
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProduct(prev => ({
        ...prev,
        imageFile: files[0], // Set the first file selected
        imageUrl: URL.createObjectURL(files[0]) // Create a preview URL for the selected image
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (!product.price || isNaN(product.price) || product.price <= 0) newErrors.price = 'Valid price is required';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (!product.stock || isNaN(product.stock) || product.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!product.imageFile) newErrors.imageFile = 'Image file is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('stock', product.stock);
        formData.append('imageFile', product.imageFile);
  
        const response = await axios.post('http://localhost:4000/api/products/add-product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
  
        setProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          imageUrl: '',
          imageFile: null
        });
  
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product: ' + (error.response?.data?.error || error.message));
      }
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircle className="mr-2 text-indigo-600" size={24} />
        Add New Product
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Package className="mr-2 text-indigo-500" size={16} />
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Info className="mr-2 text-indigo-500" size={16} />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <DollarSign className="mr-2 text-indigo-500" size={16} />
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Box className="mr-2 text-indigo-500" size={16} />
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.stock ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <List className="mr-2 text-indigo-500" size={16} />
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product category"
          />
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Image className="mr-2 text-indigo-500" size={16} />
            Choose Image
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.imageFile ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.imageFile && <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>}
        </div>

        {/* Image Preview */}
        {product.imageUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
            <div className="border rounded-lg p-2 max-w-xs">
              <img
                src={product.imageUrl}
                alt="Product preview"
                className="rounded-lg w-full h-auto"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=Image+not+found';
                }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <PlusCircle className="mr-2" size={18} />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
