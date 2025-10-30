import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Login from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import CompareServices from "./pages/CompareServices";
import Signup from "./pages/SignUp";
import BookingPage from "@/pages/BookingPage";
import ProviderProfile from "./pages/ProviderProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="//provider/:name" element={<ProviderProfile />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/priceCompare" element={<CompareServices />} />
          <Route path="/map" element={<MapPage />} /> {/* NEW MAP PAGE */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
