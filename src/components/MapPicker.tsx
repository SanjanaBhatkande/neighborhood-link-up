import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

// Fix default icon issue in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  onClose: () => void;
}

const MapPicker = ({ onLocationSelect, onClose }: MapPickerProps) => {
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const center: [number, number] = [28.6139, 77.209]; // Delhi

  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelected([lat, lng]);
      },
    });
    return null;
  }

  const handleConfirm = () => {
    if (selected) {
      const [lat, lng] = selected;
      const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      onLocationSelect(lat, lng, address);
      onClose();
    }
  };

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
          <MapContainer
            center={center}
            zoom={13}
            style={{ width: "100%", height: "100%", borderRadius: "0 0 8px 8px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
            {selected && (
              <Marker position={selected}>
                <Popup>Selected Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="p-4 border-t flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {selected
              ? `Selected: ${selected[0].toFixed(4)}, ${selected[1].toFixed(4)}`
              : "Click on the map to select your location"}
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
