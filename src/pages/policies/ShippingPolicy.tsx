import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck, Package, Clock, MapPin } from "lucide-react";

const ShippingPolicy: React.FC = () => {
  return (
    <div id="shipping-policy" className="shipping-container">
      <div className="shipping-header">
        <Link to="/policies" className="back-link">
          <ArrowLeft className="h-5 w-5" />
          Back to Policies
        </Link>
        <div className="header-content">
          <h1 className="shipping-title">Shipping Policy</h1>
          <p className="shipping-subtitle">
            Reliable delivery across India through trusted courier partners
          </p>
        </div>
      </div>

      <div className="shipping-content">
        <div className="policy-card featured">
          <Truck className="h-12 w-12 text-primary" />
          <h2>Shipping Partners</h2>
          <p>
            Orders shipped through registered domestic courier companies and/or
            Speed Post only.
          </p>
        </div>

        <div className="policy-grid">
          <div className="policy-card">
            <Package className="h-8 w-8 text-primary mb-4" />
            <h3>Delivery Timeline</h3>
            <ul>
              <li>
                Orders shipped within <strong>7 days</strong> from order/payment
                date
              </li>
              <li>Or as per agreed delivery date at order confirmation</li>
              <li>Subject to courier/post office processing times</li>
            </ul>
          </div>

          <div className="policy-card">
            <MapPin className="h-8 w-8 text-primary mb-4" />
            <h3>Delivery Address</h3>
            <ul>
              <li>Delivered to address provided at purchase</li>
              <li>Delivery confirmation sent to registered email</li>
              <li>Ensure address accuracy at checkout</li>
            </ul>
          </div>

          <div className="policy-card">
            <Clock className="h-8 w-8 text-primary mb-4" />
            <h3>Delivery Responsibility</h3>
            <ul>
              <li>Platform not liable for courier/postal delays</li>
              <li>Shipping costs (if applicable) are non-refundable</li>
              <li>Contact courier for tracking updates</li>
            </ul>
          </div>
        </div>

        <div className="important-notice">
          <h3>Important Notice</h3>
          <p>
            Shipping times may vary due to location, courier availability, and
            external factors. Track your order using the provided tracking
            number at{" "}
            <Link to="/track-order" className="text-primary hover:underline">
              Track Order
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="shipping-footer">
        <p>
          Last updated: December 2025 |{" "}
          <Link to="/policies" className="text-primary hover:underline">
            View All Policies
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
