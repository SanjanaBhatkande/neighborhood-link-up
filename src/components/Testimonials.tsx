import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Riya Patel",
    location: "Mumbai",
    rating: 5,
    text: "Found an amazing plumber through LocalLink! Quick response and fair pricing. Highly recommend!",
    service: "Plumbing Service"
  },
  {
    name: "Aayush Kadam", 
    location: "Pune",
    rating: 5,
    text: "The electrician was professional and solved our issue in no time. Great platform for finding local services!",
    service: "Electrical Work"
  },
  {
    name: "Siddhi Sutar",
    location: "Nashik", 
    rating: 5,
    text: "Excellent laundry service! They picked up and delivered on time. LocalLink makes it so convenient.",
    service: "Laundry Service"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-title font-bold text-foreground mb-4">
            What our community says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied residents who found their perfect service providers through LocalLink
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{testimonial.service}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;