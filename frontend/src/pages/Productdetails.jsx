import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products/product-details/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, backendUrl]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1
    };
    
    setCart(prevCart => [...prevCart, newItem]);
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return <ErrorView error={error} onGoBack={() => navigate(-1)} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <BackButton onClick={() => navigate(-1)} />
      
      <div className="flex flex-col md:flex-row">
        <ProductImage src={product.imageUrl} alt={product.name} />
        
        <div className="md:ml-6 flex flex-col justify-between mt-4 md:mt-0">
          <ProductInfo product={product} />
          
          <AddToCartButton 
            onClick={handleAddToCart} 
            disabled={!product.stock || product.stock <= 0}
            inStock={product.stock > 0}
          />
        </div>
      </div>
    </div>
  );
};

// Component for loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Component for error view or product not found
const ErrorView = ({ error, onGoBack }) => (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-center">
    <p className="text-red-500">{error || 'Product not found'}</p>
    <button
      onClick={onGoBack}
      className="mt-4 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
    >
      <ArrowLeft className="mr-2" /> Go Back
    </button>
  </div>
);

// Back button component
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
  >
    <ArrowLeft className="mr-1" /> Back to Products
  </button>
);

// Product image component
const ProductImage = ({ src, alt }) => (
  <img
    src={src || "https://via.placeholder.com/400"}
    alt={alt}
    className="w-full md:w-1/2 h-96 object-contain rounded-lg bg-gray-100"
  />
);

// Product information component
const ProductInfo = ({ product }) => (
  <div>
    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
    <p className="mt-2 text-gray-600">{`Category: ${product.category || 'N/A'}`}</p>
    <p className="mt-2 text-gray-600">{`Stock: ${product.stock || 0} available`}</p>
    <p className="mt-4 text-gray-700">{product.description || 'No description available'}</p>
    <p className="mt-4 text-2xl font-bold text-gray-800">${product.price?.toFixed(2) || '0.00'}</p>
  </div>
);

// Add to cart button component
const AddToCartButton = ({ onClick, disabled, inStock }) => (
  <button
    onClick={onClick}
    className="mt-6 flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
    disabled={disabled}
  >
    <ShoppingCart className="mr-2" /> 
    {inStock ? 'Add to Cart' : 'Out of Stock'}
  </button>
);

export default ProductDetails;