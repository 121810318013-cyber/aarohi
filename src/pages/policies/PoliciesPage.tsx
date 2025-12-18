import React, { useState } from "react";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import ShippingPolicyContent from "./ShippingPolicy";
import "./PoliciesPage.css";

const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "shipping">(
    "terms"
  );

  return (
    <div className="policies-container">
      <div className="policies-header">
        <h1>Aarohi Selections Policies</h1>
        <p>Important legal documents governing your use of our platform</p>
      </div>

      <div className="policies-tabs">
        <button
          className={`tab-btn ${activeTab === "terms" ? "active" : ""}`}
          onClick={() => setActiveTab("terms")}
        >
          Terms & Conditions
        </button>
        <button
          className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy Policy
        </button>
        <button
          className={`tab-btn ${activeTab === "shipping" ? "active" : ""}`}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping Policy
        </button>
      </div>

      <div className="policies-content">
        {activeTab === "terms" && <TermsConditions />}
        {activeTab === "privacy" && <PrivacyPolicy />}
        {activeTab === "shipping" && <ShippingPolicyContent />}
      </div>

      <div className="policies-footer">
        <p>
          Last updated: December 2025 | <a href="/contact">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

export default PoliciesPage;
