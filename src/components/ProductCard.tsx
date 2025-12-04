import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      addToCart(product);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elegant transition-smooth hover:shadow-lg"
      >
        {/* Image Carousel */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-muted"
          onMouseEnter={() => setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount Badge */}
          {product.discountPercent && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-md"
            >
              {product.discountPercent}% OFF
            </motion.div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <WishlistButton 
              productId={product.id} 
              productName={product.name}
              className="bg-background/80 backdrop-blur-sm hover:bg-background"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-smooth">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{product.category} • {product.fabricType}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            {product.discountPrice ? (
              <>
                <span className="text-xl font-bold text-primary">
                  ₹{product.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          {cartItem ? (
            <div className="flex items-center justify-between bg-primary/10 rounded-lg p-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDecrement}
                className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-primary px-4">{cartItem.quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleIncrement}
                className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>
      </motion.div>
    </Link>
  );
};
