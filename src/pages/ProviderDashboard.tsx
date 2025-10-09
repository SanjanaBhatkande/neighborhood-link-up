import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle, XCircle, Edit, Trash2, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockProfile = {
  name: "John Smith",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  service: "Licensed Electrician",
  pricing: "$45/hr",
  availability: "Mon-Sat, 9AM-6PM",
  experience: 8,
  rating: 4.9,
  aadhaar: "XXXX-XXXX-1234"
};

const mockBookingRequests = [
  { id: 1, customer: "Sarah Johnson", service: "Electrical Repair", date: "2024-03-15", time: "2:00 PM", status: "pending" },
  { id: 2, customer: "Mike Davis", service: "Wiring Installation", date: "2024-03-16", time: "10:00 AM", status: "pending" },
];

const mockReviews = [
  { id: 1, customer: "Emily Chen", rating: 5, comment: "Excellent work! Very professional and quick.", date: "2024-03-10" },
  { id: 2, customer: "David Brown", rating: 4, comment: "Good service, arrived on time.", date: "2024-03-08" },
  { id: 3, customer: "Lisa Wilson", rating: 5, comment: "Highly recommend! Fixed the issue perfectly.", date: "2024-03-05" },
];

const ProviderDashboard = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [requests, setRequests] = useState(mockBookingRequests);
  const { toast } = useToast();

  const handleAccept = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Booking Accepted",
      description: "The customer has been notified.",
    });
  };

  const handleReject = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Booking Rejected",
      description: "The customer has been notified.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-heading font-bold text-foreground mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your services and bookings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <img 
                    src={profile.photo} 
                    alt={profile.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.service}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-tertiary text-tertiary" />
                    <span className="font-semibold">{profile.rating}</span>
                    <span className="text-sm text-muted-foreground">({mockReviews.length} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="pricing">Pricing</Label>
                    <Input id="pricing" defaultValue={profile.pricing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" defaultValue={profile.availability} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input id="experience" type="number" defaultValue={profile.experience} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar (verified)</Label>
                    <Input id="aadhaar" defaultValue={profile.aadhaar} disabled />
                  </div>

                  <Button className="w-full mt-4" variant="hero">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{request.customer}</h4>
                          <p className="text-sm text-muted-foreground">{request.service}</p>
                          <p className="text-sm text-muted-foreground">{request.date} at {request.time}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleAccept(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(request.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.customer}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-tertiary text-tertiary" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
