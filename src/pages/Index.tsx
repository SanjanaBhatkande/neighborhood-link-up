import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import electricianIcon from "@/assets/electrician-icon.png";
import plumberIcon from "@/assets/plumber-icon.png";
import laundryIcon from "@/assets/laundry-icon.png";
import RolePopup from "../components/RolePopup";
import { Link, useNavigate } from "react-router-dom";

const services = [
  {
    title: "Electricians",
    description:
      "Licensed electrical professionals for repairs, installations, and maintenance. Available 24/7 for emergencies.",
    icon: electricianIcon,
    color: "primary" as const,
  },
  {
    title: "Plumbers",
    description:
      "Certified plumbing experts for all your water, drainage, and pipe needs. Quick response guaranteed.",
    icon: plumberIcon,
    color: "secondary" as const,
  },
  {
    title: "Laundry Services",
    description:
      "Professional laundry and dry cleaning with pickup and delivery. Same day service available.",
    icon: laundryIcon,
    color: "tertiary" as const,
  },
];

const Index = () => {
  const navigate = useNavigate(); // ✅ Move navigate here

  return (
    <div className="min-h-screen bg-background">
      {/* Popup appears immediately on page visit */}
      <RolePopup />

      <Header />
      <Hero />

      {/* Featured Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-title font-bold text-foreground mb-4">
              Popular Services in Your Area
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with trusted local professionals for all your home and personal needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-title font-bold text-white mb-4">
              Ready to find your perfect service provider?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join our community of satisfied customers and discover reliable local services today.
            </p>

            {/* ✅ FIXED BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:text-green-500 hover:bg-white/90"
                onClick={() => navigate("/booking")} // ✅ Works now
              >
                Book a Service
              </Button>

              <Link to="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-primary hover:text-green-500 hover:bg-white"
                >
                  Browse Providers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
                  <span className="text-lg font-bold text-white">L</span>
                </div>
                <span className="text-xl font-bold text-foreground">LocalLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting neighbors with trusted local service providers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Electricians</li>
                <li>Plumbers</li>
                <li>Laundry</li>
                <li>View All</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Safety Guidelines</li>
                <li>Report Issue</li>
                <li>Community</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 LocalLink. All rights reserved. Built with care for our community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
