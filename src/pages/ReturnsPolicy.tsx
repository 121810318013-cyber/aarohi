import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Video, Package, CheckCircle, XCircle } from 'lucide-react';

const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Returns & Replacement Policy</h1>
        <p className="text-lg text-muted-foreground text-center mb-8">
          We want you to be completely satisfied with your purchase
        </p>

        {/* Important Notice */}
        <Card className="mb-8 border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="flex items-center text-accent">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg font-semibold mb-2">
              Only Replacement Option Available - No Refunds
            </p>
            <p className="text-muted-foreground">
              We offer replacement only for damaged products. Refunds are not available under any circumstances.
              Please read the complete policy below before making a purchase.
            </p>
          </CardContent>
        </Card>

        {/* Video Proof Requirement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="h-6 w-6 mr-2 text-primary" />
              Mandatory Video Proof Requirement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To be eligible for replacement, you must provide a complete unboxing video of the product.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Video Requirements:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  Video must be continuous without any cuts or edits
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  Must clearly show the sealed package before opening
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  Must capture the complete unboxing process
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  Must clearly show the damage/defect in the product
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  Invoice/order ID should be visible in the video
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Eligible for Replacement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="bg-green-500/10">
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-6 w-6 mr-2" />
                Eligible for Replacement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  Product received is damaged or defective
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  Wrong product delivered
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  Missing items from the order
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  Manufacturing defects
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-red-500/10">
              <CardTitle className="flex items-center text-red-600">
                <XCircle className="h-6 w-6 mr-2" />
                Not Eligible for Replacement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  Change of mind after purchase
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  Product damaged due to misuse
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  No video proof of unboxing
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  Request made after 48 hours of delivery
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Replacement Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-6 w-6 mr-2 text-primary" />
              Replacement Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Record Unboxing Video', desc: 'Record a continuous video while unboxing the product' },
                { step: 2, title: 'Contact Us Within 48 Hours', desc: 'Reach out via WhatsApp with the unboxing video and order details' },
                { step: 3, title: 'Video Verification', desc: 'Our team will verify the video and damage claim' },
                { step: 4, title: 'Pickup Arranged', desc: 'We will arrange pickup of the damaged product' },
                { step: 5, title: 'Replacement Shipped', desc: 'New product will be shipped once we receive the original' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact for Returns */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Need to Request a Replacement?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us via WhatsApp with your unboxing video and order details
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20need%20to%20request%20a%20replacement%20for%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-semibold transition-colors"
            >
              Contact on WhatsApp
            </a>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReturnsPolicy;
