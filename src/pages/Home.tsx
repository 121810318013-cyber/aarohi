import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Truck, HeartHandshake } from 'lucide-react';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const banners = [
  { image: heroBanner1, title: 'Exquisite Collection', subtitle: 'Discover timeless elegance' },
  { image: heroBanner2, title: 'Luxury Sarees', subtitle: 'For every special moment' },
  { image: heroBanner3, title: 'Traditional Beauty', subtitle: 'Crafted with perfection' },
];

const trustBadges = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹5000' },
  { icon: Shield, title: '100% Authentic', desc: 'Genuine products only' },
  { icon: HeartHandshake, title: 'Easy Returns', desc: 'Hassle-free process' },
  { icon: Sparkles, title: 'Premium Quality', desc: 'Handcrafted with care' },
];

const features = [
  {
    title: 'Authentic Quality',
    description: 'Handpicked sarees from trusted artisans ensuring premium quality and authenticity.',
    gradient: 'from-primary/20 to-primary/5'
  },
  {
    title: 'Timeless Elegance',
    description: 'Classic designs that blend traditional craftsmanship with modern aesthetics.',
    gradient: 'from-accent/20 to-accent/5'
  },
  {
    title: 'Customer Satisfaction',
    description: 'Dedicated support and hassle-free shopping experience for all our valued customers.',
    gradient: 'from-primary/20 to-accent/5'
  },
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${banners[currentBanner].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-hero" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl text-white"
              >
                <div className="h-1 w-16 bg-accent mb-4 md:mb-6 rounded-full" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight">
                  {banners[currentBanner].title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-8 text-white/90">
                  {banners[currentBanner].subtitle}
                </p>
                <Link to="/collections">
                  <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-smooth shadow-glow group">
                    <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                    Explore Collections
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Banner Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'w-8 bg-accent' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">Our Collection</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured Collections
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections of our finest sarees, crafted with love and tradition
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/collections">
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth group">
              Explore All Collections
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 md:py-12 border-y border-border bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="text-center p-3 md:p-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="mx-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <badge.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm md:text-base">{badge.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">
              Our Promise
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose Aarohi Selections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`relative overflow-hidden text-center p-4 md:p-6 rounded-xl bg-gradient-to-br ${feature.gradient} bg-card border border-border/50 shadow-elegant hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
