import express from "express";

const router = express.Router();

router.get("/about", (req, res) => {
  const aboutUs = `
 <div style="display: flex; align-items: center; padding: 10px; gap: 20px;">
        <img src="https://i.ibb.co/tq452Qk/Whats-App-Image-2024-12-26-at-22-41-30-74d117bd.jpg" alt="Placeholder Image" style="width: 150px; height: 150px; border-radius: 10px;">
        <div style="flex: 1;">
            <h2 style="margin: 0; font-size: 1.5rem;">Flexbox with Image and Text</h2>
            <p style="margin: 5px 0 0; font-size: 1rem; color: #555;">
                This is an example of a layout using Flexbox with an image and text displayed inline.
            </p>
        </div>
</div>`;

  const refundPolicy = `
    <div>
    <h1>About Me </h1>
    <p>Dr Pranav Kumar Shastri international astrologer, remedy expert ,PhD in vedic astrology,and gold medalist,lifetime achiever, vastu expert, numerologist reki grandmaster,tarot cards,, the visionary CEO and founder of AstroHelpme, has redefined the way people interact with astrology in today's fast-paced digital world. With a Ph.D. in Vedic Astrology and over two decades of experience, Dr. Shastri combines his deep-rooted knowledge of traditional astrological practices with cutting-edge technology to create a seamless user experience. Under his leadership, *AstroHelpme * has become more than just an astrology app; it is a platform that empowers users to navigate life’s uncertainties with confidence. The app offers personalized daily horoscopes, compatibility analyses, and in-depth birth chart readings, all tailored to individual needs. What sets * AstroHelpme * apart is Dr. Shastri's commitment to authenticity and accuracy. Each astrological insight is crafted using scientifically validated techniques, ensuring that users receive guidance they can trust. </p>
<br/>
    <p>
Dr. Shastri's journey to create * AstroHelpme * began with a simple yet profound vision: to make astrology accessible and relevant in the digital age. He observed that while astrology remained a trusted tool for millions, the lack of reliable platforms often led to misinformation and confusion. Recognizing this gap, he envisioned a solution that would blend traditional wisdom with AI-powered algorithms. Today, * AstroHelpme * stands as a testament to his dedication, boasting millions of downloads and a global user base. The app’s intuitive interface allows users to access real-time astrological insights, consult expert astrologers, and even receive personalized remedies, all at their fingertips. </p>
  <br/>

    <p>Dr. Shastri also believes in astrology’s potential to foster self-awareness and growth. Through * AstroHelpme *, he aims to demystify astrological concepts, presenting them as tools for introspection rather than mere predictions. This holistic approach has resonated deeply with users, particularly millennials and Gen Z, who seek meaningful connections between ancient wisdom and modern challenges. Moreover, Dr. Shastri’s emphasis on ethical practices ensures that the app upholds the highest standards of integrity, setting a benchmark in the industry..</p>
<br/>
    <p>As a thought leader, Dr. Shastri actively engages with his audience through webinars, podcasts, and live sessions, sharing his insights on astrology’s relevance in contemporary life. His passion for education extends to the app’s learning section, where users can explore the basics of astrology and its practical applications. Under his stewardship, * AstroHelpme * continues to evolve, incorporating user feedback and staying ahead of technological advancements. Whether it's integrating AI-driven astrological predictions or launching multilingual support, Dr. Shastri ensures that * AstroHelpme * remains at the forefront of innovation.  
</p>
<br/>
<p>In a world where uncertainty is a constant, Dr Pranav Kumar Shastri international astrologer, remedy expert ,PhD in vedic astrology,and gold medalist,lifetime achiever, vastu expert, numerologist 
reki grandmaster,tarot cards, AstroHelpme * serves as a guiding light, bridging the gap between tradition and technology. His unwavering dedication to empowering individuals through astrology has not only transformed lives but also set a new standard for the industry. As he looks to the future, Dr. Shastri envisions * AstroHelpme becoming a global hub for astrological wisdom, inspiring people to embrace the cosmic rhythms that shape their journey.</p>
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
