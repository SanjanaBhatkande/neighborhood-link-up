import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
}

const ServiceCard = ({ title, description, icon, color }: ServiceCardProps) => {
  const colorVariants = {
    primary: "border-primary/20 hover:border-primary/40 hover:shadow-primary/20",
    secondary: "border-secondary/20 hover:border-secondary/40 hover:shadow-secondary/20", 
    tertiary: "border-tertiary/20 hover:border-tertiary/40 hover:shadow-tertiary/20"
  };

  const iconBgVariants = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    tertiary: "bg-tertiary/10"
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-md ${colorVariants[color]}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className={`w-20 h-20 rounded-xl ${iconBgVariants[color]} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <img 
              src={icon} 
              alt={title}
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action */}
          <Button 
            variant="ghost" 
            size="sm"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;