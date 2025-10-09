import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

interface ComplaintFormProps {
  providerName?: string;
}

const ComplaintForm = ({ providerName }: ComplaintFormProps) => {
  const [complaint, setComplaint] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "We'll review your complaint and get back to you soon.",
    });
    setComplaint("");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          File a Complaint
        </CardTitle>
        <CardDescription>
          {providerName 
            ? `Report an issue with ${providerName}` 
            : "Let us know if you experienced any issues"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="complaint">Describe your issue</Label>
            <Textarea
              id="complaint"
              placeholder="Please describe the issue you faced..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows={5}
              required
            />
          </div>
          <Button type="submit" variant="destructive" className="w-full">
            Submit Complaint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
