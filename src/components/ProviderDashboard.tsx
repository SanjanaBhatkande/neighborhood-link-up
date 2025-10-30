import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Star, User, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProviderSection = "appointments" | "earnings" | "reviews" | "profile";

const ProviderDashboard = () => {
  const [activeSection, setActiveSection] = useState<ProviderSection>("appointments");
  const [provider, setProvider] = useState<{ name: string; service: string } | null>(null);

  useEffect(() => {
    // optional: load provider info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setProvider({
          name: parsed.name || "John Smith",
          service: parsed.service || "Electrician",
        });
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-heading font-bold text-foreground mb-2">Service Provider Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your jobs, earnings, and reviews</p>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="md:col-span-1 h-fit shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { key: "appointments", label: "My Appointments", icon: <ClipboardList className="mr-2 h-4 w-4" /> },
                  { key: "earnings", label: "Earnings", icon: <DollarSign className="mr-2 h-4 w-4" /> },
                  { key: "reviews", label: "Reviews", icon: <Star className="mr-2 h-4 w-4" /> },
                  { key: "profile", label: "Profile", icon: <User className="mr-2 h-4 w-4" /> },
                ].map((btn) => (
                  <Button
                    key={btn.key}
                    variant={activeSection === btn.key ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(btn.key as ProviderSection)}
                  >
                    {btn.icon} {btn.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              {activeSection === "appointments" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Upcoming Jobs</CardTitle>
                    <CardDescription>Manage your assigned tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[{ client: "Amit Sharma", service: "Plumbing", date: "Tomorrow, 9:30 AM", status: "Confirmed" },
                      { client: "Riya Patel", service: "Electric Repair", date: "Nov 2, 1:00 PM", status: "Pending" },
                    ].map((job, idx) => (
                      <div key={idx} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors flex justify-between">
                        <div>
                          <h4 className="font-medium">{job.service}</h4>
                          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {job.date}
                          </p>
                        </div>
                        <Badge variant={job.status === "Confirmed" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeSection === "earnings" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your total income summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success mb-2">₹14,500</div>
                    <p className="text-muted-foreground">This month’s earnings</p>
                    <Button variant="hero" className="mt-4">Withdraw Funds</Button>
                  </CardContent>
                </Card>
              )}

              {activeSection === "reviews" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>See what your clients say</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">⭐ 5 - Excellent Work!</p>
                      <p className="text-sm text-muted-foreground">"Great plumber, fixed everything fast!"</p>
                      <p className="text-xs text-muted-foreground mt-1">- Amit Sharma</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">⭐ 4 - Satisfied</p>
                      <p className="text-sm text-muted-foreground">"Good service, slightly late but polite."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Riya Patel</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === "profile" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Update your service information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                        {provider?.name?.[0] || "P"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{provider?.name || "John Smith"}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider?.service || "Electrician"} - Delhi NCR
                        </p>
                        <Badge className="mt-1">Service Provider</Badge>
                      </div>
                    </div>
                    <Button variant="hero" className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
