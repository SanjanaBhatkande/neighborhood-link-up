import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Calendar, DollarSign, Clock, User, Briefcase, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProviderSection = "overview" | "profile" | "services" | "bookings" | "reviews";

const ProviderDashboard = () => {
  const [activeSection, setActiveSection] = useState<ProviderSection>("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-heading font-bold text-foreground mb-2">Local Pro Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your services and bookings</p>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="md:col-span-1 h-fit shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={activeSection === "overview" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("overview")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Overview
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
                  variant={activeSection === "services" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("services")}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Services
                </Button>
                <Button 
                  variant={activeSection === "bookings" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("bookings")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Bookings
                </Button>
                <Button 
                  variant={activeSection === "reviews" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("reviews")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </Button>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              {activeSection === "overview" && (
                <>
                  {/* Stats */}
                  <div className="grid sm:grid-cols-4 gap-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Pending
                        </CardDescription>
                        <CardTitle className="text-3xl text-warning">5</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Earnings
                        </CardDescription>
                        <CardTitle className="text-3xl text-success">₹45k</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Rating
                        </CardDescription>
                        <CardTitle className="text-3xl text-tertiary">4.8</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Jobs
                        </CardDescription>
                        <CardTitle className="text-3xl text-primary">234</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Profile Summary */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Profile Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-gradient-accent flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                          JS
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">John Smith</h3>
                          <p className="text-sm text-muted-foreground">Professional Electrician</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <Badge>Verified</Badge>
                            <Badge variant="outline">5 Years Experience</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-tertiary text-tertiary" />
                              <span className="font-medium">4.8</span>
                              <span className="text-sm text-muted-foreground">(124 reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeSection === "profile" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your professional information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" defaultValue="32" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.smith@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Type</Label>
                        <select 
                          id="service" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="electrician">Electrician</option>
                          <option value="plumber">Plumber</option>
                          <option value="laundry">Laundry Service</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input id="experience" type="number" defaultValue="5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input id="aadhaar" defaultValue="XXXX-XXXX-1234" disabled />
                      <p className="text-xs text-muted-foreground">Aadhaar number cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricing">Hourly Rate (₹)</Label>
                      <Input id="pricing" type="number" defaultValue="500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4}
                        defaultValue="Certified electrician with 5 years of experience in residential and commercial projects. Available 24/7 for emergencies."
                      />
                    </div>

                    <Button variant="hero" className="w-full">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeSection === "services" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>My Services</CardTitle>
                    <CardDescription>Manage your service offerings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Electrical Wiring", price: "₹500/hr", status: "Active" },
                      { name: "Circuit Repairs", price: "₹600/hr", status: "Active" },
                      { name: "Emergency Services", price: "₹1000/hr", status: "Active" },
                    ].map((service, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.price}</p>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Badge>{service.status}</Badge>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="hero" className="w-full">
                      Add New Service
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeSection === "bookings" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Booking Requests</CardTitle>
                    <CardDescription>Manage your service requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { customer: "Alice Johnson", service: "Electrical Wiring", date: "Tomorrow, 2:00 PM", status: "Pending" },
                      { customer: "Bob Williams", service: "Circuit Repairs", date: "Dec 24, 10:00 AM", status: "Pending" },
                      { customer: "Carol Davis", service: "Emergency Services", date: "Dec 23, 8:00 PM", status: "Accepted" },
                    ].map((booking, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-start justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.customer}</h4>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {booking.date}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center w-full sm:w-auto">
                          <Badge variant={booking.status === "Accepted" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                          {booking.status === "Pending" && (
                            <>
                              <Button variant="default" size="sm" className="flex-1 sm:flex-none">
                                Accept
                              </Button>
                              <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeSection === "reviews" && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-tertiary text-tertiary" />
                          <span className="font-semibold text-lg text-foreground">4.8</span>
                        </div>
                        <span className="text-muted-foreground">Average rating from 124 reviews</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { customer: "Alice Johnson", rating: 5, comment: "Excellent work! Very professional and fixed the issue quickly.", date: "2 days ago" },
                      { customer: "Bob Williams", rating: 4, comment: "Good service, arrived on time and did a thorough job.", date: "1 week ago" },
                      { customer: "Carol Davis", rating: 5, comment: "Best electrician I've worked with. Highly recommend!", date: "2 weeks ago" },
                      { customer: "David Brown", rating: 5, comment: "Quick response for emergency service. Very satisfied.", date: "3 weeks ago" },
                    ].map((review, idx) => (
                      <div key={idx} className="p-4 border rounded-lg space-y-2 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{review.customer}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-tertiary text-tertiary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
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
