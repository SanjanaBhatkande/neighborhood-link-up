import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, Users, AlertCircle, MessageSquare } from "lucide-react";
import ComplaintForm from "@/components/ComplaintForm";
import ReviewForm from "@/components/ReviewForm";
import { useState } from "react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<"bookings" | "reviews" | "complaints">("bookings");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-heading font-bold text-foreground mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Manage your bookings and find new services</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  variant={activeSection === "bookings" ? "default" : "ghost"}
                  onClick={() => setActiveSection("bookings")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Button>
                <Button 
                  variant={activeSection === "reviews" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("reviews")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  My Reviews
                </Button>
                <Button 
                  variant={activeSection === "complaints" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("complaints")}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Complaints
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Favorite Providers
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Bookings</p>
                    <p className="text-2xl font-bold text-foreground">3</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-tertiary/10 rounded-lg">
                    <Star className="h-6 w-6 text-tertiary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating Given</p>
                    <p className="text-2xl font-bold text-foreground">4.8</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dynamic Content Section */}
            {activeSection === "bookings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent bookings</p>
                    <Button variant="hero" className="mt-4">Book a Service</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "reviews" && (
              <ReviewForm providerName="John Smith (Electrician)" />
            )}

            {activeSection === "complaints" && (
              <ComplaintForm providerName="Maria Rodriguez (Plumber)" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;