import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, promoCodes } from '@/context/CartContext';
import { Trash2, Plus, Minus, Tag, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, appliedPromo, applyPromoCode, removePromoCode, finalTotal } = useCart();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link to="/collections">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-24 h-32 object-cover rounded-lg border border-border"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-smooth">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • {item.fabricType}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="text-lg font-bold text-primary">
                          ₹{(item.discountPrice || item.price).toLocaleString()}
                        </span>
                        {item.discountPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm text-muted-foreground ml-auto">
                          Subtotal: ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24 space-y-4"
          >
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedPromo ? (
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-accent">{appliedPromo.code}</p>
                        <p className="text-sm text-muted-foreground">{appliedPromo.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removePromoCode}
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                      />
                      <Button onClick={handleApplyPromo}>Apply</Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Available Promo Codes:</p>
                      {promoCodes.map((promo) => (
                        <button
                          key={promo.code}
                          onClick={() => {
                            setPromoInput(promo.code);
                            applyPromoCode(promo.code);
                          }}
                          className="w-full text-left p-3 bg-muted hover:bg-muted/80 rounded-lg transition-smooth border border-border"
                        >
                          <p className="font-semibold text-sm text-primary">{promo.code}</p>
                          <p className="text-xs text-muted-foreground">{promo.description}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>Discount ({appliedPromo.discount}%)</span>
                    <span>-₹{((cartTotal * appliedPromo.discount) / 100).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">₹{finalTotal.toLocaleString()}</span>
                </div>
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/collections">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
