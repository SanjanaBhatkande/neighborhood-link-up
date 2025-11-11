import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { providers } from "@/components/Providers";


const CompareServices = () => {
  const [category, setCategory] = useState("electrician");
  const [sortBy, setSortBy] = useState("");

  const filteredProviders = useMemo(() => {
    let result = providers.filter((p) => p.category === category);

    if (sortBy === "price") {
      const getPrice = (p: any) => parseInt(p.price.replace(/[^0-9]/g, ""));
      result.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-heading font-bold text-foreground mb-6">
          Compare Prices Across Services
        </h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electrician">Electrician</SelectItem>
              <SelectItem value="plumber">Plumber</SelectItem>
              <SelectItem value="laundry">Laundry</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted text-foreground text-left">
                <tr>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((p, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-muted/40 transition-colors"
                  >
                    <td className="p-3 flex items-center space-x-2">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="p-3">{p.service}</td>
                    <td className="p-3 flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span>{p.rating}</span>
                      <span className="text-muted-foreground text-xs">
                        ({p.reviews})
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-primary">{p.price}</td>
                    <td className="p-3 text-muted-foreground">{p.location}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CompareServices;
