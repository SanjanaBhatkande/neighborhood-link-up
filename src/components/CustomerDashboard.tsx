import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star, User, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { providers } from "@/components/Providers";
import ReviewForm from "@/components/ReviewForm";
import ComplaintForm from "@/components/ComplaintForm";

type Section = "bookings" | "reviews" | "complaints" | "profile";

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const now = new Date();

    const getEndTime = (dateStr: string, slot: string) => {
      const [_, end] = slot.split(" - ");
      const [time, meridiem] = end.split(" ");
      let [hour, minute] = time.split(":").map(Number);
      if (meridiem === "PM" && hour !== 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;
      const date = new Date(dateStr);
      date.setHours(hour, minute, 0, 0);
      return date;
    };

    const upcoming = storedBookings.filter((b: any) => getEndTime(b.date, b.slot) >= now);
    localStorage.setItem("bookings", JSON.stringify(upcoming));
    setBookings(upcoming);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-heading font-bold mb-2">Customer Dashboard</h1>
        <p className="text-muted-foreground mb-6">Manage your bookings and services</p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="md:col-span-1 h-fit shadow-md">
            <CardHeader><CardTitle className="text-base">Menu</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {["bookings", "profile", "reviews", "complaints"].map((sec) => (
                <Button
                  key={sec}
                  variant={activeSection === sec ? "default" : "outline"}
                  className="w-full justify-start capitalize"
                  onClick={() => setActiveSection(sec as Section)}
                >
                  {sec === "bookings" && <Calendar className="mr-2 h-4 w-4" />}
                  {sec === "profile" && <User className="mr-2 h-4 w-4" />}
                  {sec === "reviews" && <Star className="mr-2 h-4 w-4" />}
                  {sec === "complaints" && <AlertCircle className="mr-2 h-4 w-4" />}
                  {sec}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {activeSection === "bookings" && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>All your confirmed appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((b, i) => (
                      <div key={i} className="p-4 border rounded-lg flex justify-between hover:bg-muted/20 transition">
                        <div>
                          <h4 className="font-semibold">{b.service}</h4>
                          <p className="text-sm text-muted-foreground">{b.provider}</p>
                          <p className="text-xs text-muted-foreground">{b.date} ({b.slot})</p>
                        </div>
                        <Badge variant="default">{b.status}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No upcoming bookings.</p>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "profile" && (
              <Card className="shadow-md">
                <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
                <CardContent>
                  <p><strong>Name:</strong> {user?.name || "Guest"}</p>
                  <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                </CardContent>
              </Card>
            )}

            {activeSection === "reviews" && (
              <Card className="shadow-md">
                <CardHeader><CardTitle>Write a Review</CardTitle></CardHeader>
                <CardContent>
                  <Select onValueChange={setSelectedProvider}>
                    <SelectTrigger><SelectValue placeholder="Select Provider" /></SelectTrigger>
                    <SelectContent>
                      {providers.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.name} — {p.service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProvider && <ReviewForm providerName={selectedProvider} />}
                </CardContent>
              </Card>
            )}

            {activeSection === "complaints" && (
              <Card className="shadow-md">
                <CardHeader><CardTitle>Submit a Complaint</CardTitle></CardHeader>
                <CardContent>
                  <Select onValueChange={setSelectedProvider}>
                    <SelectTrigger><SelectValue placeholder="Select Provider" /></SelectTrigger>
                    <SelectContent>
                      {providers.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.name} — {p.service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProvider && <ComplaintForm providerName={selectedProvider} />}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
