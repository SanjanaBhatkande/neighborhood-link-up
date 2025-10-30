import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { providers } from "@/components/Providers";

const BookingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const preselectedProvider = state?.provider || null;

  const [selectedProvider, setSelectedProvider] = useState(preselectedProvider);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const availableSlots = [
    "9:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM",
    "1:00 PM - 2:00 PM",
    "3:00 PM - 4:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const handleConfirm = () => {
    if (!selectedProvider) return alert("Please select a provider.");
    if (!selectedDate || !selectedSlot)
      return alert("Please select both a date and a time slot.");

    const booking = {
      provider: selectedProvider.name,
      service: selectedProvider.service,
      date: selectedDate,
      slot: selectedSlot,
      status: "Confirmed",
    };

    // Store booking in localStorage
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert(`✅ Booking confirmed with ${selectedProvider.name}`);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Card className="border-border/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Book Your Service
            </h2>

            {/* Provider Selection */}
            {!selectedProvider && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Choose Provider
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  onChange={(e) => {
                    const provider = providers.find(
                      (p) => p.name === e.target.value
                    );
                    setSelectedProvider(provider || null);
                  }}
                >
                  <option value="">-- Select --</option>
                  {providers.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name} – {p.service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Provider Info */}
            {selectedProvider && (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 border p-4 rounded-xl bg-card/50">
                <img
                  src={selectedProvider.avatar}
                  alt={selectedProvider.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-between">
                    <h3 className="text-xl font-semibold">
                      {selectedProvider.name}
                    </h3>
                    {selectedProvider.verified && (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {selectedProvider.service}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span>
                      {selectedProvider.rating} ({selectedProvider.reviews}{" "}
                      reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {selectedProvider.location}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    💰 <strong>{selectedProvider.price}</strong> —{" "}
                    <span>{selectedProvider.availability}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Booking Form */}
            {selectedProvider && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`border rounded-md px-3 py-2 text-sm transition-all ${
                          selectedSlot === slot
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-accent"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={handleConfirm}>
                  Confirm Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BookingPage;
