import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Shield, Truck, HeartHandshake } from 'lucide-react';
import { ParallaxSection, ParallaxText } from '@/components/ParallaxSection';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const banners = [
  { image: heroBanner1, title: 'Exquisite Collection', subtitle: 'Discover timeless elegance' },
  { image: heroBanner2, title: 'Luxury Sarees', subtitle: 'For every special moment' },
  { image: heroBanner3, title: 'Traditional Beauty', subtitle: 'Crafted with perfection' },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.slice(0, 4);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Banner with Parallax */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banners[currentBanner].image})` }}
                animate={{ scale: [1, 1.05] }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <div className="absolute inset-0 bg-gradient-hero" />
              </motion.div>
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="max-w-2xl text-white"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="h-1 bg-accent mb-4 md:mb-6 rounded-full"
                  />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight">
                    {banners[currentBanner].title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-8 text-white/90">
                    {banners[currentBanner].subtitle}
                  </p>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Link to="/collections">
                      <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-smooth shadow-glow group">
                        <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                        Explore Collections
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Animated Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className="relative h-2 overflow-hidden rounded-full transition-all"
              aria-label={`Go to banner ${index + 1}`}
            >
              <motion.div
                className={`h-full rounded-full ${index === currentBanner ? 'bg-accent' : 'bg-white/50'}`}
                initial={false}
                animate={{ width: index === currentBanner ? 32 : 8 }}
                transition={{ duration: 0.3 }}
              />
              {index === currentBanner && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Featured Collections with Parallax */}
      <ParallaxSection speed={0.15} className="relative z-10">
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">Our Collection</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured Collections
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections of our finest sarees, crafted with love and tradition
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/collections">
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth group">
              Explore All Collections
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </Link>
        </motion.div>
        </section>
      </ParallaxSection>

      {/* Trust Badges with Parallax */}
      <ParallaxText speed={0.1}>
        <section className="py-8 md:py-12 border-y border-border bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹5000' },
              { icon: Shield, title: '100% Authentic', desc: 'Genuine products only' },
              { icon: HeartHandshake, title: 'Easy Returns', desc: 'Hassle-free process' },
              { icon: Sparkles, title: 'Premium Quality', desc: 'Handcrafted with care' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-3 md:p-4"
              >
                <motion.div 
                  className="mx-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <badge.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </motion.div>
                <h4 className="font-semibold text-sm md:text-base">{badge.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{badge.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </section>
      </ParallaxText>

      {/* Why Choose Us with Parallax */}
      <ParallaxSection speed={0.1} direction="down">
        <section className="bg-muted/30 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.span variants={fadeInUp} className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">
              Our Promise
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose Aarohi Selections
            </motion.h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
          >
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative overflow-hidden text-center p-4 md:p-6 rounded-xl bg-gradient-to-br ${feature.gradient} bg-card border border-border/50 shadow-elegant hover:shadow-lg transition-smooth`}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </section>
      </ParallaxSection>
    </div>
  );
};

export default Home;
