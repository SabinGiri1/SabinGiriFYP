import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, X, ShoppingBag } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContext);
  
  // Cart data
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    axios.get(`${backendUrl}/api/products`)
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

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      // If product already in cart, increase quantity
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      // Add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item._id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900 flex items-center">
          <ShoppingBag className="mr-2" />
          Medicine and Nutrition Shop
        </h1>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="text-amber-700 hover:text-amber-900 p-2 relative"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
            </span>
          )}
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Products grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isCartOpen ? 'md:w-2/3' : 'w-full'}`}>
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
                      onClick={() => addToCart(product)}
                      className="text-amber-700 font-medium hover:text-amber-900 transition flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add to Cart
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

        {/* Cart sidebar */}
        {isCartOpen && (
          <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold text-amber-900">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-amber-700 hover:text-amber-900"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="max-h-96 overflow-auto py-2">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center py-3 border-b">
                      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden mr-4">
                        <img 
                          src={item.imageUrl || "/api/placeholder/100/100"} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-amber-900">{item.name}</h4>
                        <p className="text-amber-800 font-medium">${item.price}</p>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item._id, -1)}
                          className="text-amber-600 hover:text-amber-800 p-1"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 min-w-6 text-center">{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, 1)}
                          className="text-amber-600 hover:text-amber-800 p-1"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="ml-3 text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-lg font-bold mb-4">
                    <span className="text-amber-900">Total:</span>
                    <span className="text-amber-800">${calculateTotal()}</span>
                  </div>
                  <button className="w-full text-amber-700 border border-amber-700 py-3 rounded-lg font-medium hover:bg-amber-50 transition">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <ShoppingCart size={48} className="mx-auto text-amber-200 mb-4" />
                <p className="text-amber-700">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-amber-700 hover:text-amber-900 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
