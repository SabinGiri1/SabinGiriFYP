import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/api/products/admin`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setError('No products found');
        }
      })
      .catch(err => {
        setError('Error fetching products');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendUrl]);

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800 text-center max-w-md mx-auto mt-10">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-900 flex items-center">
          <ShoppingBag className="mr-2" />
          Medicine and Nutrition Shop
        </h1>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.imageUrl || "/api/placeholder/400/320"} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-900">{product.name}</h3>
                <p className="text-amber-800 text-sm mt-2 h-12 overflow-hidden">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-amber-800">${product.price}</span>
                  <button 
                    onClick={() => viewProductDetails(product._id)}
                    className="text-amber-700 font-medium hover:text-amber-900 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-amber-800">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;