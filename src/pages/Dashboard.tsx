import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star, User, AlertCircle, BookOpen } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";
import ComplaintForm from "@/components/ComplaintForm";
import { Badge } from "@/components/ui/badge";

type DashboardSection = "bookings" | "reviews" | "complaints" | "profile";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("bookings");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-heading font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your bookings and services</p>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="md:col-span-1 h-fit shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={activeSection === "bookings" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("bookings")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Button>
                <Button 
                  variant={activeSection === "profile" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeSection === "reviews" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("reviews")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </Button>
                <Button 
                  variant={activeSection === "complaints" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("complaints")}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Complaints
                </Button>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              {activeSection === "bookings" && (
                <>
                  {/* Stats Cards */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription>Upcoming</CardDescription>
                        <CardTitle className="text-3xl text-primary">3</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription>Completed</CardDescription>
                        <CardTitle className="text-3xl text-success">12</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription>Reviews Pending</CardDescription>
                        <CardTitle className="text-3xl text-tertiary">2</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Recent Bookings */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Your latest service appointments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { service: "Electrician", provider: "John Smith", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
                        { service: "Plumber", provider: "Sarah Johnson", date: "Dec 25, 2:00 PM", status: "Pending" },
                        { service: "Laundry Service", provider: "Mike Wilson", date: "Dec 20, 3:00 PM", status: "Completed" },
                      ].map((booking, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              {booking.service === "Electrician" ? "⚡" : booking.service === "Plumber" ? "🔧" : "👕"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium">{booking.service}</h4>
                              <p className="text-sm text-muted-foreground">{booking.provider}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {booking.date}
                              </p>
                            </div>
                          </div>
                          <Badge variant={
                            booking.status === "Confirmed" ? "default" :
                            booking.status === "Pending" ? "secondary" :
                            "outline"
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}

              {activeSection === "profile" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-20 w-20 rounded-full bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">John Doe</h3>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        <Badge className="mt-1">Customer</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Age</p>
                          <p className="text-base">28</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p className="text-base">+91 98765 43210</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-base">New Delhi, India</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                        <p className="text-base">January 2024</p>
                      </div>
                    </div>

                    <Button variant="hero" className="w-full mt-6">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeSection === "reviews" && <ReviewForm />}
              {activeSection === "complaints" && <ComplaintForm />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
