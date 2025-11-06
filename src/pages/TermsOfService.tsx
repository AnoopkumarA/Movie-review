import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-14 py-12 max-w-[1640px]">
        <Card className="p-8 max-w-4xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-6">Last updated: November 6, 2025</p>
            
            <p className="text-foreground mb-8">
              Welcome to MovieVault. By accessing and using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground mb-4">
              By accessing or using MovieVault ("the Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Use of Service</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Eligibility</h3>
            <p className="text-foreground mb-4">
              You must be at least 13 years old to use MovieVault. By using the Service, you represent and warrant that you meet this age requirement.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Account Registration</h3>
            <p className="text-foreground mb-4">
              To access certain features, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-foreground">Provide accurate and complete information</li>
              <li className="text-foreground">Maintain the security of your account credentials</li>
              <li className="text-foreground">Accept responsibility for all activities under your account</li>
              <li className="text-foreground">Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.3 Acceptable Use</h3>
            <p className="text-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-foreground">Violate any laws or regulations</li>
              <li className="text-foreground">Infringe on intellectual property rights</li>
              <li className="text-foreground">Post offensive, hateful, or discriminatory content</li>
              <li className="text-foreground">Spam or harass other users</li>
              <li className="text-foreground">Attempt to hack or compromise the Service</li>
              <li className="text-foreground">Use automated systems to access the Service without permission</li>
              <li className="text-foreground">Impersonate others or provide false information</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. User Content</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Your Reviews and Ratings</h3>
            <p className="text-foreground mb-4">
              When you submit reviews, ratings, or other content to MovieVault, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display that content in connection with the Service.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.2 Content Standards</h3>
            <p className="text-foreground mb-4">
              All user-submitted content must:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-foreground">Be your original work or properly attributed</li>
              <li className="text-foreground">Not contain copyrighted material without permission</li>
              <li className="text-foreground">Be relevant to the movie being reviewed</li>
              <li className="text-foreground">Comply with our community guidelines</li>
              <li className="text-foreground">Not contain malicious code or links</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.3 Content Moderation</h3>
            <p className="text-foreground mb-4">
              We reserve the right to remove any content that violates these Terms or our community standards, without prior notice.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Our Content</h3>
            <p className="text-foreground mb-4">
              All content on MovieVault, including text, graphics, logos, and software, is the property of MovieVault or its licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.2 Third-Party Content</h3>
            <p className="text-foreground mb-4">
              Movie data, images, and certain reviews are provided by third-party services including The Movie Database (TMDB). This content remains the property of its respective owners.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Privacy</h2>
            <p className="text-foreground mb-4">
              Your use of MovieVault is also governed by our Privacy Policy. Please review our Privacy Policy to understand our data practices.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">6.1 Service "As Is"</h3>
            <p className="text-foreground mb-4">
              MovieVault is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely secure.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">6.2 Content Accuracy</h3>
            <p className="text-foreground mb-4">
              While we strive for accuracy, we do not guarantee the accuracy, completeness, or reliability of any content on the Service, including movie information, reviews, or ratings.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-foreground mb-4">
              To the fullest extent permitted by law, MovieVault and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Indemnification</h2>
            <p className="text-foreground mb-4">
              You agree to indemnify and hold harmless MovieVault, its operators, and affiliates from any claims, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Changes to Service</h2>
            <p className="text-foreground mb-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice. We may also update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Termination</h2>
            <p className="text-foreground mb-4">
              We may terminate or suspend your account and access to the Service at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Third-Party Links</h2>
            <p className="text-foreground mb-4">
              MovieVault may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third-party sites.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">12. Governing Law</h2>
            <p className="text-foreground mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Kerala, India, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">13. Dispute Resolution</h2>
            <p className="text-foreground mb-4">
              Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in Kerala, India.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">14. Severability</h2>
            <p className="text-foreground mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">15. Contact Information</h2>
            <p className="text-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-foreground">Email: <a href="mailto:apadraja@gmail.com" className="text-primary hover:underline">apadraja@gmail.com</a></li>
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                By using MovieVault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;

