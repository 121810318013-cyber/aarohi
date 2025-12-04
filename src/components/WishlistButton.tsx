import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export const WishlistButton = ({ productId, productName, className = '', size = 'icon' }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isWishlisted) {
      const updated = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
      toast.info(`${productName} removed from wishlist`);
    } else {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
      toast.success(`${productName} added to wishlist`);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleWishlist}
      className={`relative group ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isWishlisted ? 'filled' : 'empty'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-foreground/60 group-hover:text-red-500'
            }`} 
          />
        </motion.div>
      </AnimatePresence>
      {isWishlisted && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
        </motion.div>
      )}
    </Button>
  );
};
