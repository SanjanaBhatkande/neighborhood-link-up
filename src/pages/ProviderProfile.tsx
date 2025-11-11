import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { providers } from "@/components/Providers";

const ProviderProfile = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const decodedName = decodeURIComponent(name || "");

  const provider = providers.find(
    (p) => p.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!provider) {
    return (
      <div className="text-center mt-20 text-lg text-muted-foreground">
        Provider not found 😕
      </div>
    );
  }

  const handleBookNow = () => {
    navigate("/booking", { state: { provider } });
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-primary/30"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {provider.name}
            </h2>
            <p className="text-muted-foreground mb-3">{provider.service}</p>
            <p className="text-sm text-gray-600">📍 {provider.location}</p>
            <p className="text-sm text-gray-600">
              ⭐ {provider.rating} ({provider.reviews} reviews)
            </p>
            <p className="text-sm text-gray-600">💰 {provider.price}</p>
           

            {/* ✅ Book Now Button */}
            <div className="mt-6">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">
            About {provider.name}
          </h3>
          <p className="text-muted-foreground">
            {provider.name} is a professional {provider.category} based in{" "}
            {provider.location}. With years of hands-on experience and
            excellent client feedback, they offer top-quality service with
            reliability and care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProviderProfile;
