import express from "express";

const router = express.Router();

router.get("/about", (req, res) => {

 const aboutUs=`
 <div style="display: flex; align-items: center; padding: 10px; gap: 20px;">
        <img src="https://images.pexels.com/photos/29879483/pexels-photo-29879483/free-photo-of-festive-christmas-ornament-on-pine-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="Placeholder Image" style="width: 150px; height: 150px; border-radius: 10px;">
        <div style="flex: 1;">
            <h2 style="margin: 0; font-size: 1.5rem;">Flexbox with Image and Text</h2>
            <p style="margin: 5px 0 0; font-size: 1rem; color: #555;">
                This is an example of a layout using Flexbox with an image and text displayed inline.
            </p>
        </div>
</div>`
  
  const refundPolicy = `
    <div>
    <h1>Refund Policy</h1>
    <p>Thank you for choosing AstroHelpMe. We strive to provide the best possible guidance and services.</p>

    <h2>No Refund Policy</h2>
    <p>Due to the nature of our offerings, all purchases made on AstroHelpMe are final and non-refundable. This policy is in place because:</p>
    <ul>
        <li>The services provided involve personalized consultations, which cannot be undone or resold.</li>
        <li>Digital products, once delivered, cannot be returned.</li>
    </ul>

    <p>We encourage all customers to carefully review the service descriptions and make informed decisions before making a 
    purchase. If you have any questions or concerns, please feel free to contact our support team at [insert contact details].</p>

    <p>Thank you for your understanding and cooperation.</p>
</div>
`;
  return res.json(aboutUs);
});
router.get("/terms", (req, res) => {
  const termsConditions = `
      <div>
    <h1>Terms and Conditions</h1>
    <p>Effective Date: 26-12-2024</p>
    <p>Welcome to AstroHelpMe. By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By using AstroHelpMe, you confirm that you are at least 18 years old or have parental/guardian consent to use our services.</p>
    
    <h2>2. Services</h2>
    <p>AstroHelpMe provides astrology consultations, predictions, and related services for informational purposes. Our services are not a substitute for professional advice (medical, legal, financial, etc.).</p>
    
    <h2>3. User Responsibilities</h2>
    <ul>
        <li>You agree to provide accurate and complete information when using our services.</li>
        <li>You must not use our platform for unlawful, fraudulent, or harmful activities.</li>
        <li>You agree to respect the intellectual property rights of AstroHelpMe and its content.</li>
    </ul>
    
    <h2>4. Payments and Refunds</h2>
    <ul>
        <li>All services must be paid for in advance.</li>
        <li><b>No Refund Policy:</b> All sales are final, and no refunds will be issued.</li>
    </ul>
    
    <h2>5. Privacy</h2>
    <p>Your use of AstroHelpMe is subject to our Privacy Policy. By using our services, you consent to the collection and use of your data as outlined in the Privacy Policy.</p>
    
    <h2>6. Intellectual Property</h2>
    <p>All content on AstroHelpMe, including text, graphics, logos, and software, is the property of AstroHelpMe and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content without our prior consent.</p>
    
    <h2>7. Limitation of Liability</h2>
    <p>AstroHelpMe and its team shall not be liable for any damages arising from:</p>
    <ul>
        <li>The use or inability to use our services.</li>
        <li>Reliance on any information provided during consultations.</li>
        <li>External links or third-party content.</li>
    </ul>
    
    <h2>8. Indemnification</h2>
    <p>You agree to indemnify and hold AstroHelpMe harmless from any claims, damages, or expenses arising from your use of the platform or violation of these terms.</p>
    
    <h2>9. Modification of Terms</h2>
    <p>We reserve the right to update these Terms and Conditions at any time. Changes will be effective upon posting on our website. Continued use of our services constitutes acceptance of the updated terms.</p>
    
    <h2>10. Governing Law</h2>
    <p>These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes will be resolved under the jurisdiction of [Insert Jurisdiction].</p>
</div>

    `;

  return res.json(termsConditions);
});
router.get("/privacy", (req, res) => {
  const privacyPolicy = `
    <div>
    <h1>Privacy Policy</h1>
    <p><strong>Effective Date: 26-12-2024</strong></p>
    <p>At AstroHelpMe, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
    
    <h2>1. Information We Collect</h2>
    <p>We may collect the following types of information:</p>
    <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and other details provided during registration or consultation.</li>
        <li><strong>Payment Information:</strong> Billing address and payment details for transactions.</li>
        <li><strong>Usage Data:</strong> Information about your interactions with our website, including IP address, browser type, and pages viewed.</li>
    </ul>
    
    <h2>2. How We Use Your Information</h2>
    <p>We use the information collected to:</p>
    <ul>
        <li>Provide and personalize our services.</li>
        <li>Respond to inquiries and support requests.</li>
        <li>Process payments securely.</li>
        <li>Improve our website and offerings.</li>
        <li>Send relevant updates, promotions, or notifications (with your consent).</li>
    </ul>
    
    <h2>3. Data Sharing and Disclosure</h2>
    <p>We do not sell or rent your personal information to third parties. However, we may share your data with trusted partners, such as:</p>
    <ul>
        <li>Payment processors to complete transactions.</li>
        <li>Service providers assisting in website functionality and support.</li>
        <li>Authorities if required by law or to protect our rights.</li>
    </ul>
    
    <h2>4. Data Security</h2>
    <p>We implement robust security measures to protect your data. However, no online platform is completely secure, and we cannot guarantee absolute data security.</p>
    
    <h2>5. Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access, update, or delete your personal information.</li>
        <li>Opt out of marketing communications.</li>
        <li>Request details about the data we hold about you.</li>
    </ul>
    
    <h2>6. Cookies and Tracking Technologies</h2>
    <p>We use cookies to enhance your browsing experience. You can modify your browser settings to decline cookies, but this may affect the functionality of our website.</p>
    
    <h2>7. Third-Party Links</h2>
    <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>
    
    <h2>8. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page, and the "Effective Date" will be updated accordingly.</p>
</div>
`;
  return res.json(privacyPolicy);
});
router.get("/feedback", (req, res) => {
  return res.json("<div>Coming Soon</div>");
});

export default router;
