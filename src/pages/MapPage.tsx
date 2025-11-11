import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { providers } from "@/components/Providers";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0 0 8px 8px",
};

// Default center (India)
const defaultCenter = { lat: 20.5937, lng: 78.9629 };

// Different colored markers by category
const categoryIcons: Record<string, string> = {
  plumber: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  electrician: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  laundry: "http://maps.google.com/mapfiles/ms/icons/violet-dot.png",
};

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  // 🧭 Get device location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  }, []);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Card className="w-full max-w-6xl mx-auto h-[600px] flex flex-col shadow-2xl mt-8">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Nearby Service Providers</h3>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || defaultCenter}
          zoom={userLocation ? 13 : 6}
          onLoad={handleLoad}
        >
          {/* 🧍 User Marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
              title="You are here"
            />
          )}

          {/* 🔧 Provider Markers */}
          {providers.map((provider) => (
            <Marker
              key={provider.name}
              position={{ lat: provider.lat, lng: provider.lng }}
              icon={{
                url:
                  categoryIcons[provider.category] ||
                  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={() => setSelectedProvider(provider)}
              title={provider.name}
            />
          ))}

          {/* 🪟 Info Window */}
          {selectedProvider && (
            <InfoWindow
              position={{ lat: selectedProvider.lat, lng: selectedProvider.lng }}
              onCloseClick={() => setSelectedProvider(null)}
            >
              <div style={{ width: "220px", fontFamily: "Arial" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={selectedProvider.avatar}
                    alt={selectedProvider.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{selectedProvider.name}</h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                      {selectedProvider.service}
                    </p>
                  </div>
                </div>
                <p style={{ margin: "6px 0", fontSize: "13px" }}>
                  ⭐ {selectedProvider.rating} ({selectedProvider.reviews} reviews)
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px" }}>
                  📍 {selectedProvider.location}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px" }}>
                  💰 {selectedProvider.price}
                </p>
                <button
                  onClick={() =>
                    navigate(`/provider/${encodeURIComponent(selectedProvider.name)}`, {
                      state: selectedProvider,
                    })
                  }
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "6px",
                  }}
                >
                  View Profile
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Card>
    </div>
  );
};

export default MapPage;
