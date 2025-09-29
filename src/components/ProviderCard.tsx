import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";

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
  availability
}: ProviderCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={avatar} 
              alt={name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            {verified && (
              <div className="absolute -top-1 -right-1 bg-success text-success-foreground rounded-full p-1">
                <CheckCircle className="h-3 w-3" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
              <span className="text-lg font-bold text-primary">{price}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{service}</p>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
              </div>
            </div>

            {/* Location and Availability */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-success" />
                <span className="text-xs text-success">{availability}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                Book Now
              </Button>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;