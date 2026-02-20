import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button
        className="mb-8 px-4 py-2 bg-sage-600 text-white rounded hover:bg-sage-700 transition-colors"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-3xl font-serif font-bold text-sage-800 mb-6">Support & Policies</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sage-700 mb-2">Help Center</h2>
        <p className="text-sage-600 mb-4">Find answers to common questions, troubleshooting tips, and guides to help you get the most out of FoodFog. If you need further assistance, our support team is here to help.</p>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sage-700 mb-2">Privacy Policy</h2>
        <p className="text-sage-600 mb-4">Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it. Read our full privacy policy to learn more about your rights and our practices.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-sage-700 mb-2">Terms of Service</h2>
        <p className="text-sage-600 mb-4">By using FoodFog, you agree to our terms of service. Please review these terms to understand your rights, responsibilities, and the rules for using our platform.</p>
      </section>
    </div>
  );
};

export default Support;
