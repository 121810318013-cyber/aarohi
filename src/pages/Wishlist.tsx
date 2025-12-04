import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistIds(wishlist);
    };
    
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const clearWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]));
    setWishlistIds([]);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <Button variant="outline" onClick={clearWishlist} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </motion.div>

      {wishlistProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <Heart className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Save your favorite sarees here by clicking the heart icon on any product
          </p>
          <Link to="/collections">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="h-5 w-5" />
              Explore Collections
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {wishlistProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Link to="/collections">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Wishlist;