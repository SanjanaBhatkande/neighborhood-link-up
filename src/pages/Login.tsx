import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase, Mail, Phone, CreditCard, Award } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"customer" | "provider">("customer");

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Frontend validation
    const email = (form.elements.namedItem('customer-email') as HTMLInputElement).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "Logged in as Customer",
    });
    navigate("/dashboard");
  };

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Frontend validation
    const email = (form.elements.namedItem('provider-email') as HTMLInputElement).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "Logged in as Service Provider",
    });
    navigate("/provider-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-glow/20 via-background to-secondary-glow/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-heading font-bold text-foreground mb-2">LocalLink</h1>
          <p className="text-muted-foreground text-sm">
            Connecting you with trusted neighborhood services
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-muted p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab("customer")}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "customer"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setActiveTab("provider")}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "provider"
                  ? "bg-secondary text-secondary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Service Provider
            </button>
          </div>
        </div>

        {/* Login Forms */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Customer Login */}
          <Card 
            className={`transition-all duration-300 ${
              activeTab === "customer" 
                ? "shadow-lg scale-105 border-primary/30" 
                : "opacity-50 scale-95 md:opacity-100 md:scale-100"
            }`}
          >
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Customer Login</CardTitle>
              </div>
              <CardDescription>
                Find and book trusted local services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Name
                  </Label>
                  <Input 
                    id="customer-name" 
                    placeholder="John Doe" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-age">Age</Label>
                  <Input 
                    id="customer-age" 
                    type="number" 
                    placeholder="25" 
                    required 
                    min="18"
                    max="120"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email ID
                  </Label>
                  <Input 
                    id="customer-email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Contact Number
                  </Label>
                  <Input 
                    id="customer-phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    required 
                    pattern="[+]?[0-9\s-()]+"
                    className="rounded-lg"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
                >
                  Login as Customer
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Service Provider Login */}
          <Card 
            className={`transition-all duration-300 ${
              activeTab === "provider" 
                ? "shadow-lg scale-105 border-secondary/30" 
                : "opacity-50 scale-95 md:opacity-100 md:scale-100"
            }`}
          >
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-xl">Service Provider Login</CardTitle>
              </div>
              <CardDescription>
                Join as an electrician, plumber, or laundry service 👷
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProviderSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Name
                  </Label>
                  <Input 
                    id="provider-name" 
                    placeholder="John Smith" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider-age">Age</Label>
                  <Input 
                    id="provider-age" 
                    type="number" 
                    placeholder="30" 
                    required 
                    min="18"
                    max="120"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email ID
                  </Label>
                  <Input 
                    id="provider-email" 
                    type="email" 
                    placeholder="john@provider.com" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider-phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Contact Number
                  </Label>
                  <Input 
                    id="provider-phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    required 
                    pattern="[+]?[0-9\s-()]+"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider-aadhaar" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    Aadhaar Card Number
                  </Label>
                  <Input 
                    id="provider-aadhaar" 
                    placeholder="1234-5678-9012" 
                    required 
                    pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider-experience" className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    Years of Experience
                  </Label>
                  <Input 
                    id="provider-experience" 
                    type="number" 
                    placeholder="5" 
                    required 
                    min="0"
                    max="50"
                    className="rounded-lg"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg transition-all"
                >
                  Login as Provider
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          This is a frontend demo — no actual authentication is performed
        </p>
      </div>
    </div>
  );
};

export default Login;
