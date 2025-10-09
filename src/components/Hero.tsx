import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import MapPicker from "./MapPicker";

const Hero = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setSelectedLocation(address);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-hero font-bold text-foreground mb-6 leading-tight">
            Find trusted neighborhood services{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              in one place
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified local service providers for all your home needs. 
            From repairs to maintenance, we've got your community covered.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-3 p-3 bg-card/90 backdrop-blur-sm rounded-xl border shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="What service do you need?" 
                  className="pl-10 border-0 bg-transparent focus:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter location or use map" 
                  className="pl-10 border-0 bg-transparent focus:ring-0"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="md:w-auto"
                onClick={() => setShowMap(true)}
              >
                <MapPin className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Map View</span>
              </Button>
              <Button variant="hero" size="lg" className="md:px-8">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Button */}
          <Button variant="cta" size="lg" className="shadow-glow">
            Book a Service Now
          </Button>
        </div>
      </div>

      {showMap && (
        <MapPicker
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowMap(false)}
        />
      )}
    </section>
  );
};

export default Hero;