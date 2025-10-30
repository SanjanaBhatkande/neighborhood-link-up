import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import ProviderCard from "@/components/ProviderCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";
import { providers } from "@/components/Providers";

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [sortBy, setSortBy] = useState("");

  const locationHook = useLocation();

  // Read Hero search query params (service & location)
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const serviceParam = params.get("service");
    const locationParam = params.get("location");

    if (serviceParam) {
      setCategory(serviceParam.toLowerCase());
      setSearch(serviceParam);
    }
    if (locationParam) {
      setCity(locationParam);
    }
  }, [locationHook.search]);

  // 🔍 Filter + Sort logic
  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Match search terms (by name or service text)
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.service.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // Filter by category (electrician, plumber, laundry)
    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by city (Nashik, Nagpur, Mumbai, Pune)
    if (city) {
      result = result.filter(
        (p) => p.location.toLowerCase() === city.toLowerCase()
      );
    }

    // Distance filter
    if (distance) {
      result = result.filter((p) => p.distance <= parseFloat(distance));
    }

    // Sort
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "distance") result.sort((a, b) => a.distance - b.distance);
    else if (sortBy === "price") {
      const getPrice = (p: any) => parseInt(p.price.replace(/[^0-9]/g, ""));
      result.sort((a, b) => getPrice(a) - getPrice(b));
    }

    return result;
  }, [search, category, city, distance, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-heading font-bold text-foreground mb-6">
            Find Service Providers
          </h1>

          {/* Search bar + filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search service type or provider..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="laundry">Laundry</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setCity} value={city}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nashik">Nashik</SelectItem>
                  <SelectItem value="Nagpur">Nagpur</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDistance} value={distance}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 km</SelectItem>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setCity("");
                  setDistance("");
                  setSortBy("");
                }}
              >
                <Filter className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Reset</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Provider list */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Found {filteredProviders.length} service providers near you
            </p>
            <Select onValueChange={setSortBy} value={sortBy}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProviders.map((provider, index) => (
              <ProviderCard availability={""} key={index} {...provider} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
