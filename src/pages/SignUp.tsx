import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"customer" | "provider">("customer");

  // ✅ Customer Signup Handler
  const handleCustomerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      role: "customer",
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        toast({ title: "Success!", description: "Signed up successfully!" });
        navigate("/login");
      } else {
        toast({ title: "Error!", description: json.message });
      }
    } catch (err) {
      toast({ title: "Error!", description: "Network error. Please try again." });
    }
  };

  // ✅ Provider Signup Handler
  const handleProviderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      aadhaar: formData.get("aadhaar"),
      experience: formData.get("experience"),
      password: formData.get("password"),
      role: "provider",
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        toast({ title: "Success!", description: "Signed up as Service Provider!" });
        navigate("/provider-dashboard");
      } else {
        toast({ title: "Error!", description: json.message });
      }
    } catch (err) {
      toast({ title: "Error!", description: "Network error. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-glow/20 via-background to-secondary-glow/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-heading font-bold text-foreground mb-2">LocalLink</h1>
          <p className="text-muted-foreground text-sm">
            Create your account to access trusted services
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

        {/* Signup Forms */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
          {/* Customer Signup */}
          <Card
            className={`${
              activeTab === "customer"
                ? "shadow-lg border-primary/30"
                : "opacity-50 pointer-events-none"
            }`}
          >
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Customer Signup</CardTitle>
              </div>
              <CardDescription>Create your customer account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" placeholder="25" required min={18} max={120} />
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter password" required />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up as Customer
                </Button>
              </form>
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">Already have an account? </span>
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Provider Signup */}
          <Card
            className={`${
              activeTab === "provider"
                ? "shadow-lg border-secondary/30"
                : "opacity-50 pointer-events-none"
            }`}
          >
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-xl">Service Provider Signup</CardTitle>
              </div>
              <CardDescription>Create your provider account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProviderSubmit} className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Smith" required />
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" placeholder="30" required min={18} max={120} />
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@provider.com" required />
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input id="aadhaar" name="aadhaar" placeholder="1234-5678-9012" required pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" />
                <Label htmlFor="experience">Experience (years)</Label>
                <Input id="experience" name="experience" type="number" placeholder="5" required min={0} max={50} />
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter password" required />
                <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Sign Up as Provider
                </Button>
              </form>
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">Already have an account? </span>
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-secondary hover:underline"
                >
                  Login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
