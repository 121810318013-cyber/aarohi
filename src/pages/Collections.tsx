import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SaleCountdown } from '@/components/SaleCountdown';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Sale configuration
const SALE_ACTIVE = true;
const SALE_END_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

type SortOption = 'default' | 'price-low' | 'price-high' | 'discount' | 'name-az' | 'name-za';

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const fabricTypes = ['All', ...Array.from(new Set(products.map(p => p.fabricType)))];

  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.discountPrice || p.price));

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesFabric = selectedFabric === 'All' || product.fabricType === selectedFabric;
      const price = product.discountPrice || product.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesDiscount = !showOnlyDiscount || (product.discountPercent && product.discountPercent > 0);
      const matchesStock = !showInStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesFabric && matchesPrice && matchesDiscount && matchesStock;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'discount':
        result = [...result].sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case 'name-az':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedFabric, sortBy, priceRange, showOnlyDiscount, showInStock]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFabric('All');
    setSortBy('default');
    setPriceRange([0, 20000]);
    setShowOnlyDiscount(false);
    setShowInStock(false);
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedFabric !== 'All',
    priceRange[0] !== 0 || priceRange[1] !== 20000,
    showOnlyDiscount,
    showInStock,
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-smooth"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Fabric Type Filter */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Fabric Type</h3>
        <div className="flex flex-wrap gap-2">
          {fabricTypes.map(fabric => (
            <Button
              key={fabric}
              size="sm"
              variant={selectedFabric === fabric ? 'default' : 'outline'}
              onClick={() => setSelectedFabric(fabric)}
              className="transition-smooth"
            >
              {fabric}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={maxPrice}
            min={minPrice}
            step={500}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Toggle Filters */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyDiscount}
            onChange={(e) => setShowOnlyDiscount(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm">Only show discounted items</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showInStock}
            onChange={(e) => setShowInStock(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm">Only show in-stock items</span>
        </label>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      {/* Sale Countdown */}
      <SaleCountdown endDate={SALE_END_DATE} isActive={SALE_ACTIVE} title="🔥 Festive Sale Ends In" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collections</h1>
        <p className="text-lg text-muted-foreground">
          Explore our exquisite range of traditional and contemporary sarees
        </p>
      </motion.div>

      {/* Search and Sort Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search sarees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex gap-2">
          {/* Mobile Filters Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
              <SelectItem value="name-az">Name: A to Z</SelectItem>
              <SelectItem value="name-za">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-64 flex-shrink-0"
        >
          <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
            <h2 className="font-semibold mb-4 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </h2>
            <FilterContent />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
