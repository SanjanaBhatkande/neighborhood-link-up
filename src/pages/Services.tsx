import Header from "@/components/Header";
import ProviderCard from "@/components/ProviderCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin } from "lucide-react";

// Mock provider data
const providers = [
  {
    name: "John Smith",
    service: "Licensed Electrician • 8 years experience",
    rating: 4.9,
    reviews: 127,
    location: "2.1 km away",
    price: "$45/hr",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    availability: "Available today"
  },
  {
    name: "Maria Rodriguez", 
    service: "Professional Plumber • 12 years experience",
    rating: 4.8,
    reviews: 89,
    location: "1.8 km away", 
    price: "$55/hr",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    availability: "Available now"
  },
  {
    name: "David Chen",
    service: "Premium Laundry Service • Same day pickup",
    rating: 4.7,
    reviews: 203,
    location: "0.9 km away",
    price: "$25/load", 
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    availability: "Available tomorrow"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8">
          <h1 className="text-heading font-bold text-foreground mb-6">Find Service Providers</h1>
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search services or providers..." 
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Service Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="laundry">Laundry</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 km</SelectItem>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Found {providers.length} service providers near you
            </p>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {providers.map((provider, index) => (
              <ProviderCard key={index} {...provider} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;