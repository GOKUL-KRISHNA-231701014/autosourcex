import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import SupplierDashboard from "./pages/SupplierDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RFQList from "./pages/RFQList";
import RFQCreate from "./pages/RFQCreate";
import RFQDetail from "./pages/RFQDetail";
import SupplierQuote from "./pages/SupplierQuote";
import SupplierDiscovery from "./pages/SupplierDiscovery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/rfq" element={<RFQList />} />
          <Route path="/rfq/create" element={<RFQCreate />} />
          <Route path="/rfq/:id" element={<RFQDetail />} />
          <Route path="/supplier/quote/:id" element={<SupplierQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
