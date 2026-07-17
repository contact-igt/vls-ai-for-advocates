"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResponsePage() {
  const params = useParams();
  const path = params?.response;
  const isSuccess = path === "thank-you";

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedData = localStorage.getItem("PaymentDetails");
      if (storedData) {
        setUserDetails(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Invalid PaymentDetails in localStorage", error);
      localStorage.removeItem("PaymentDetails");
    }
  }, []);

  return (
    <main className="response-layout">
      {/* Simpler header for response page */}
      <header className="site-header scrolled">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="VLS Law Academy home">
            <img src="/vls-logo.png" alt="VLS Law Academy" />
          </a>
        </div>
      </header>

      <section className="response-section">
        <div className="container">
          <div className="response-card">
            {isSuccess ? (
              // Success UI
              <div className="success-content">
                <div className="response-icon-circle success-circle">
                  <svg viewBox="0 0 24 24" className="response-svg" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h1 className="response-title success-text">Payment Successful</h1>
                <p className="response-description">
                  Thank you for enrolling in the <strong>AI for Advocates</strong> masterclass. Your registration details and event calendar links are being dispatched.
                </p>

                {userDetails && (
                  <div className="summary-box">
                    <h3>Registration Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-row">
                        <span>Name</span>
                        <strong>{userDetails.name || "Advocate"}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Email</span>
                        <strong>{userDetails.email}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Mobile</span>
                        <strong>{userDetails.mobile}</strong>
                      </div>
                      {userDetails.yearsOfPractice !== undefined && userDetails.yearsOfPractice !== "" && (
                        <div className="summary-row">
                          <span>Years of Practice</span>
                          <strong>{userDetails.yearsOfPractice}</strong>
                        </div>
                      )}
                      <div className="summary-row">
                        <span>Amount Paid</span>
                        <strong>Rs. {userDetails.amount}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Transaction ID</span>
                        <strong className="transaction-id">{userDetails.razorpay_payment_id}</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="response-actions">
                  <a href="/" className="primary-button interactive-button">
                    Back to Home
                  </a>
                </div>
              </div>
            ) : (
              // Error UI
              <div className="error-content">
                <div className="response-icon-circle error-circle">
                  <svg viewBox="0 0 24 24" className="response-svg" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h1 className="response-title error-text">Payment Failed</h1>
                <p className="response-description">
                  We could not process your transaction. If money was debited from your account, it will be refunded automatically by your bank within 3-5 business days.
                </p>

                <div className="response-actions error-actions">
                  <a href="/" className="primary-button interactive-button">
                    Try Again
                  </a>
                  <a href="tel:+919500207811" className="secondary-button support-button">
                    <span>📞</span> Call Support
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-bottom">
          <span>© 2026 VLS Law Academy. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
