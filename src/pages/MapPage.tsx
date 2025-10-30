import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Colored marker generator
const createColoredIcon = (color: string) =>
  L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const providers = [
  {
    name: "Ravi Electric Works",
    service: "Wiring & Repairs",
    category: "electrician",
    location: "Mumbai",
    rating: 4.7,
    reviews: 132,
    price: "₹500/hr",
  },
  {
    name: "BlueWave Plumbing",
    service: "Leak Fixing & Installation",
    category: "plumber",
    location: "Pune",
    rating: 4.5,
    reviews: 98,
    price: "₹400/hr",
  },
  {
    name: "Quick Laundry Hub",
    service: "Wash & Iron Services",
    category: "laundry",
    location: "Nagpur",
    rating: 4.8,
    reviews: 75,
    price: "₹250/bag",
  },
];

const iconColors: Record<string, string> = {
  electrician: "orange",
  plumber: "blue",
  laundry: "violet",
};

const cityCoords: Record<string, [number, number]> = {
  Mumbai: [19.076, 72.8777],
  Pune: [18.5204, 73.8567],
  Nagpur: [21.1458, 79.0882],
};

const center = { lat: 20.5937, lng: 78.9629 };

const MapPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Card className="w-full max-w-6xl mx-auto h-[600px] flex flex-col shadow-2xl mt-8">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Service Providers Map</h3>
          </div>
        </div>

        <div className="flex-1 relative">
          <MapContainer
            center={center}
            zoom={5}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />

            {providers.map((p, index) => {
              const [lat, lng] = cityCoords[p.location] || [20.5937, 78.9629];
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  icon={createColoredIcon(iconColors[p.category])}
                  eventHandlers={{ click: () => setSelected(index) }}
                >
                  {selected === index && (
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-semibold">{p.name}</h3>
                        <p>{p.service}</p>
                        <p>📍 {p.location}</p>
                        <p>⭐ {p.rating} ({p.reviews} reviews)</p>
                        <p>💰 {p.price}</p>
                      </div>
                    </Popup>
                  )}
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </Card>
    </div>
  );
};

export default MapPage;
