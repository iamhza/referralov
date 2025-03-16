
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewReferral from "./pages/NewReferral";
import MatchedProviders from "./pages/MatchedProviders";
import ReferralTracker from "./pages/ReferralTracker";
import ProviderDashboard from "./pages/ProviderDashboard";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/new-referral" element={<NewReferral />} />
          <Route path="/matched-providers/:referralId" element={<MatchedProviders />} />
          <Route path="/referral-tracker/:referralId" element={<ReferralTracker />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/pending-matches" element={<Index />} />
          <Route path="/urgent-actions" element={<Index />} />
          <Route path="/active-referrals" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
