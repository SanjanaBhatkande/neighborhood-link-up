import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginMode, setLoginMode] = useState<"login" | "signup">("login");

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: loginMode === "login" ? "Logged in as Customer" : "Customer account created",
    });
    navigate("/dashboard");
  };

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: loginMode === "login" ? "Logged in as Provider" : "Provider account created",
    });
    navigate("/provider-dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-heading font-bold text-foreground mb-2">
              {loginMode === "login" ? "Welcome Back" : "Join LocalLink"}
            </h1>
            <p className="text-muted-foreground">
              {loginMode === "login" 
                ? "Sign in to access your account" 
                : "Create an account to get started"}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border bg-muted p-1">
              <Button
                variant={loginMode === "login" ? "default" : "ghost"}
                onClick={() => setLoginMode("login")}
                className="rounded-md"
              >
                Login
              </Button>
              <Button
                variant={loginMode === "signup" ? "default" : "ghost"}
                onClick={() => setLoginMode("signup")}
                className="rounded-md"
              >
                Sign Up
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Panel */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary">Customer</CardTitle>
                <CardDescription>
                  {loginMode === "login" 
                    ? "Access your bookings and reviews" 
                    : "Find trusted local services"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Name</Label>
                    <Input id="customer-name" placeholder="John Doe" required />
                  </div>
                  
                  {loginMode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="customer-age">Age</Label>
                      <Input id="customer-age" type="number" placeholder="25" required />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input id="customer-email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input id="customer-phone" type="tel" placeholder="+1 234 567 8900" required />
                  </div>
                  
                  <Button type="submit" className="w-full" variant="hero">
                    {loginMode === "login" ? "Login as Customer" : "Sign Up as Customer"}
                  </Button>
                  
                  <Button type="button" variant="outline" className="w-full">
                    Login with OTP
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Provider Panel */}
            <Card className="shadow-lg border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary">Local Pro</CardTitle>
                <CardDescription>
                  {loginMode === "login" 
                    ? "Manage your services and bookings" 
                    : "Join as an electrician, plumber, or laundry service"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProviderSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-name">Name</Label>
                    <Input id="provider-name" placeholder="John Smith" required />
                  </div>
                  
                  {loginMode === "signup" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="provider-age">Age</Label>
                        <Input id="provider-age" type="number" placeholder="30" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="provider-service">Service Type</Label>
                        <select 
                          id="provider-service" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                        >
                          <option value="">Select service</option>
                          <option value="electrician">Electrician</option>
                          <option value="plumber">Plumber</option>
                          <option value="laundry">Laundry Service</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="provider-email">Email</Label>
                    <Input id="provider-email" type="email" placeholder="john@provider.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="provider-phone">Phone Number</Label>
                    <Input id="provider-phone" type="tel" placeholder="+1 234 567 8900" required />
                  </div>
                  
                  {loginMode === "signup" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="provider-aadhaar">Aadhaar Card Number</Label>
                        <Input id="provider-aadhaar" placeholder="XXXX-XXXX-XXXX" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="provider-experience">Years of Experience</Label>
                        <Input id="provider-experience" type="number" placeholder="5" required />
                      </div>
                    </>
                  )}
                  
                  <Button type="submit" className="w-full" variant="hero">
                    {loginMode === "login" ? "Login as Local Pro" : "Sign Up as Local Pro"}
                  </Button>
                  
                  <Button type="button" variant="outline" className="w-full">
                    Login with OTP
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
