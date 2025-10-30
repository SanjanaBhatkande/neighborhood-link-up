import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProviderCardProps {
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  verified: boolean;
  avatar: string;
  availability: string;
}

const ProviderCard = ({
  name,
  service,
  rating,
  reviews,
  location,
  price,
  verified,
  avatar,
  availability,
}: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        name,
        service,
        rating,
        reviews,
        location,
        price,
        verified,
        avatar,
        availability,
      },
    });
  };

  const handleViewProfile = () => {
    navigate(`/provider/${encodeURIComponent(name)}`, {
      state: {
        name,
        service,
        rating,
        reviews,
        location,
        price,
        verified,
        avatar,
        availability,
      },
    });
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardContent className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-xl object-cover mx-auto"
          />
          {verified && (
            <div className="absolute -top-1 -right-1 bg-success text-success-foreground rounded-full p-1">
              <CheckCircle className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Name & Price */}
        <div className="flex items-center justify-between w-full mb-1">
          <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>

        {/* Service Info */}
        <p className="text-sm text-muted-foreground w-full mb-3 text-left">
          {service}
        </p>

        {/* Ratings */}
        <div className="flex items-center space-x-1 w-full mb-3 text-left">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        {/* Location & Availability */}
        <div className="flex items-center justify-between w-full mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{availability}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-primary/80"
            onClick={handleBookNow}>
            Book Now
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-primary/80"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
