import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface ReviewFormProps {
  providerName?: string;
}

const ReviewForm = ({ providerName }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    setRating(0);
    setReview("");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">Write a Review</CardTitle>
        <CardDescription>
          {providerName 
            ? `Share your experience with ${providerName}` 
            : "Help others by sharing your experience"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-tertiary text-tertiary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating} star{rating !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              placeholder="Share details of your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" variant="hero">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
