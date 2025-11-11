import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  onClose: () => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0 0 8px 8px",
};

const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi

const MapPicker = ({ onLocationSelect, onClose }: MapPickerProps) => {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState("");

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string, // ✅ Add your key in .env
  });

  const handleClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelected({ lat, lng });

      // Reverse geocoding to get address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        }
      });
    }
  }, []);

  const handleConfirm = () => {
    if (selected) {
      onLocationSelect(selected.lat, selected.lng, address);
      onClose();
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Select Your Location</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 relative">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selected || defaultCenter}
            zoom={13}
            onClick={handleClick}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div>

        <div className="p-4 border-t flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground truncate">
            {selected ? `Selected: ${address}` : "Click on the map to select your location"}
          </p>
          <Button variant="hero" onClick={handleConfirm} disabled={!selected}>
            Confirm Location
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MapPicker;
