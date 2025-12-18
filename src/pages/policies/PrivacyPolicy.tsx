import React from "react";

interface PrivacySectionProps {
  title: string;
  children: React.ReactNode;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ title, children }) => (
  <section className="policy-card">
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <div id="privacy" className="policy-section">
      <h2>Privacy Policy</h2>
      <p className="intro-text">
        Aarohi Enterprises respects your privacy. This policy explains how we
        collect, use, and protect your personal data.
      </p>

      <div className="policy-grid">
        <PrivacySection title="Information We Collect">
          <ul>
            <li>Name, email, phone, address during registration</li>
            <li>Transaction and payment information</li>
            <li>Usage behavior and preferences</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="How We Use Your Data">
          <ul>
            <li>Provide and improve our services</li>
            <li>Process orders and payments</li>
            <li>Marketing (with opt-out option)</li>
            <li>Fraud prevention and legal compliance</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="Data Sharing">
          <ul>
            <li>Group companies and affiliates</li>
            <li>Payment processors and logistics partners</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="Your Rights">
          <ul>
            <li>Access, update, or delete your data</li>
            <li>Withdraw consent anytime</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="Data Security">
          <p>
            We use reasonable security practices to protect your data, though
            internet transmission is never 100% secure.
          </p>
        </PrivacySection>

        <PrivacySection title="Contact">
          <p>
            Grievance Officer: [Contact Details] | Phone: Mon-Fri 9:00-18:00
          </p>
        </PrivacySection>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
