import React from "react";

const TermsConditions: React.FC = () => {
  return (
    <div id="terms" className="policy-section">
      <h2>Terms & Conditions</h2>
      <p className="intro-text">
        This document is an electronic record under the Information Technology
        Act, 2000. By using <strong>aarohiselections.com</strong> Platform, you
        agree to these binding terms.
      </p>

      <div className="policy-grid">
        <section className="policy-card">
          <h3>1. Platform Usage</h3>
          <ul>
            <li>Provide accurate information during registration</li>
            <li>Use services at your own risk and discretion</li>
            <li>Comply with all applicable Indian laws</li>
          </ul>
        </section>

        <section className="policy-card">
          <h3>2. Intellectual Property</h3>
          <p>
            Platform contents are proprietary to Aarohi Enterprises.
            Unauthorized use may lead to legal action.
          </p>
        </section>

        <section className="policy-card">
          <h3>3. Payments & Transactions</h3>
          <p>
            You agree to pay charges associated with services. Transactions
            create legally binding contracts.
          </p>
        </section>

        <section className="policy-card">
          <h3>4. Indemnity</h3>
          <p>
            You indemnify Aarohi Enterprises against claims arising from your
            breach of these terms.
          </p>
        </section>

        <section className="policy-card">
          <h3>5. Governing Law</h3>
          <p>
            Disputes governed by Indian laws, exclusive jurisdiction of
            Vishakhapatnam courts.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
