import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/logo.png';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description: 'Every saree in our collection is carefully selected for its superior quality and craftsmanship.',
    },
    {
      icon: Sparkles,
      title: 'Timeless Elegance',
      description: 'We curate designs that blend traditional heritage with contemporary style.',
    },
    {
      icon: Award,
      title: 'Authentic Products',
      description: 'We work directly with skilled artisans to bring you genuine, handcrafted sarees.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority, with dedicated support at every step.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <img src={logo} alt="Aarohi Selections Logo" className="h-24 w-auto mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Aarohi Selections</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Your destination for authentic and exquisite Indian sarees
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground text-left">
              <p>
                Aarohi Selections was born from a deep appreciation for the timeless art of Indian textile craftsmanship. 
                Our journey began with a simple vision: to bring the finest traditional sarees to fashion-conscious women 
                who value authenticity and quality.
              </p>
              <p>
                Named after the ascending musical notes that represent growth and elevation, Aarohi embodies our commitment 
                to rising standards in both product quality and customer service. Each saree in our collection is a 
                testament to the skilled artisans who pour their heart and soul into creating these masterpieces.
              </p>
              <p>
                From the luxurious silks of Kanjivaram to the intricate weaves of Banarasi, from elegant designer pieces 
                to traditional wedding sarees, we curate only the finest selections. Every piece tells a story of heritage, 
                craftsmanship, and timeless elegance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Aarohi Selections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-smooth">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Promise to You</h2>
              <div className="space-y-4 text-lg">
                <p>
                  At Aarohi Selections, we promise to deliver not just sarees, but experiences. Each purchase is backed by:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="mr-3">✓</span>
                    <span>100% authentic, handcrafted products from verified artisans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">✓</span>
                    <span>Transparent pricing with no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">✓</span>
                    <span>Dedicated customer support throughout your shopping journey</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">✓</span>
                    <span>Secure packaging and timely delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">✓</span>
                    <span>Easy returns and exchange policy</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions or want to know more about our collection? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth">
                Contact Us
              </button>
            </a>
            <a href="/collections">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-smooth">
                Browse Collections
              </button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
