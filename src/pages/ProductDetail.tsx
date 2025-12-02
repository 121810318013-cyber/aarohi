import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const cartItem = product ? cart.find(item => item.id === product.id) : null;

  if (!product) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/collections">
          <Button>Back to Collections</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      addToCart(product);
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Link to="/collections">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-smooth group-hover:-translate-x-1" />
            Back to Collections
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section with Zoom */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted mb-4">
              <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={3}
              >
                <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </TransformComponent>
              </TransformWrapper>
              {product.discountPercent && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.discountPercent}% OFF
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                Pinch to zoom
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] overflow-hidden rounded-lg border-2 transition-smooth ${
                    selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {product.category} • {product.fabricType}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline space-x-3 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-accent">
                    Save ₹{(product.price - product.discountPrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Fabric Type:</dt>
                <dd className="font-medium">{product.fabricType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Availability:</dt>
                <dd className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Product ID:</dt>
                <dd className="font-medium font-mono text-sm">{product.id}</dd>
              </div>
            </dl>
          </div>

          {/* Add to Cart Actions */}
          <div className="border-t border-border pt-6 space-y-4">
            {cartItem ? (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDecrement}
                  className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="font-bold text-xl text-primary px-8">{cartItem.quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleIncrement}
                  className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-lg py-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            )}

            <Link to="/cart" className="block">
              <Button variant="outline" size="lg" className="w-full">
                View Cart
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
