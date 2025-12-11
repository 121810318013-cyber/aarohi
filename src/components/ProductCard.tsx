import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
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
      <div
        className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 will-change-transform"
      >
        {/* Image Container */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-muted"
          onMouseEnter={() => setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
          
          {/* Secondary Image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          )}

          {/* Subtle gradient for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Discount Badge */}
          {product.discountPercent && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
              {product.discountPercent}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton 
              productId={product.id} 
              productName={product.name}
              className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-md"
            />
          </div>

          {/* Quick View Indicator */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              View Details
            </span>
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
      </div>
    </Link>
  );
};
