import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SupplierCard, Supplier } from "@/components/ui/supplier-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search, SlidersHorizontal, X, Zap, ShoppingCart, FileText, Package,
  Network, Star, Settings, LogOut, MapPin, CheckCircle2, Building2,
  Phone, Mail, Globe, Award, TrendingUp, Clock, ShieldCheck, GitCompare
} from "lucide-react";
import { Link } from "react-router-dom";

const allSuppliers: Supplier[] = [
  { id: "1", name: "Precision Auto Parts", category: "Engine Components", location: "Pune, MH", trustScore: 92, certifications: ["ISO 9001", "IATF 16949"], specializations: ["Pistons", "Cylinder Heads", "Valves", "Camshafts"], isVerified: true, rating: 4.8, totalOrders: 156 },
  { id: "2", name: "GearBox Pro", category: "Transmission", location: "Delhi, DL", trustScore: 95, certifications: ["ISO 9001", "IATF 16949", "ISO 14001"], specializations: ["Gearboxes", "Clutches", "Shafts"], isVerified: true, rating: 4.9, totalOrders: 203 },
  { id: "3", name: "MetalWorks India", category: "Chassis Parts", location: "Chennai, TN", trustScore: 85, certifications: ["ISO 9001"], specializations: ["Frames", "Axles", "Suspensions"], isVerified: true, rating: 4.5, totalOrders: 98 },
  { id: "4", name: "AutoForge Systems", category: "Engine Components", location: "Bangalore, KA", trustScore: 88, certifications: ["ISO 9001", "IATF 16949"], specializations: ["Crankshafts", "Connecting Rods"], isVerified: true, rating: 4.6, totalOrders: 134 },
  { id: "5", name: "BrakeMax Industries", category: "Brakes", location: "Pune, MH", trustScore: 78, certifications: ["ISO 9001"], specializations: ["Brake Pads", "Disc Rotors", "Calipers", "Brake Lines"], isVerified: true, rating: 4.3, totalOrders: 87 },
  { id: "6", name: "TechDrive Systems", category: "Electrical", location: "Hyderabad, TS", trustScore: 90, certifications: ["ISO 9001", "ISO 14001"], specializations: ["Wire Harnesses", "ECUs", "Sensors"], isVerified: true, rating: 4.7, totalOrders: 176 },
  { id: "7", name: "SteelCraft Motors", category: "Body Parts", location: "Jamshedpur, JH", trustScore: 72, certifications: ["ISO 9001"], specializations: ["Panels", "Doors", "Hoods"], isVerified: false, rating: 4.1, totalOrders: 64 },
  { id: "8", name: "VelocityParts Co", category: "Transmission", location: "Gurugram, HR", trustScore: 82, certifications: ["ISO 9001", "IATF 16949"], specializations: ["Torque Converters", "Differentials"], isVerified: true, rating: 4.4, totalOrders: 112 },
  { id: "9", name: "EcoMat Composites", category: "Body Parts", location: "Chennai, TN", trustScore: 68, certifications: ["ISO 9001"], specializations: ["Bumpers", "Fenders", "Interior Trim"], isVerified: false, rating: 4.0, totalOrders: 45 },
  { id: "10", name: "PowerTrain Solutions", category: "Engine Components", location: "Nashik, MH", trustScore: 91, certifications: ["ISO 9001", "IATF 16949", "ISO 14001"], specializations: ["Turbochargers", "Exhaust Manifolds", "Intake Systems"], isVerified: true, rating: 4.8, totalOrders: 189 },
  { id: "11", name: "SafeStop Braking", category: "Brakes", location: "Faridabad, HR", trustScore: 84, certifications: ["ISO 9001", "IATF 16949"], specializations: ["ABS Modules", "Brake Drums", "Master Cylinders"], isVerified: true, rating: 4.5, totalOrders: 95 },
  { id: "12", name: "ChassisWorks Ltd", category: "Chassis Parts", location: "Coimbatore, TN", trustScore: 76, certifications: ["ISO 9001"], specializations: ["Leaf Springs", "Shock Absorbers", "Control Arms"], isVerified: true, rating: 4.2, totalOrders: 73 },
];

const categories = ["All", "Engine Components", "Transmission", "Chassis Parts", "Brakes", "Electrical", "Body Parts"];
const locations = ["All", "Pune, MH", "Delhi, DL", "Chennai, TN", "Bangalore, KA", "Hyderabad, TS", "Gurugram, HR", "Nashik, MH", "Jamshedpur, JH", "Faridabad, HR", "Coimbatore, TN"];

interface SupplierProfile {
  supplier: Supplier;
  about: string;
  phone: string;
  email: string;
  website: string;
  established: string;
  employees: string;
  onTimeDelivery: number;
  qualityRate: number;
  responseTime: string;
}

const profileData: Record<string, Omit<SupplierProfile, "supplier">> = {
  "1": { about: "Leading manufacturer of precision engine components serving major OEMs since 2005.", phone: "+91 20 1234 5678", email: "sales@precisionauto.in", website: "precisionautoparts.in", established: "2005", employees: "250+", onTimeDelivery: 96, qualityRate: 99.2, responseTime: "< 4 hrs" },
  "2": { about: "India's trusted transmission specialist with state-of-the-art CNC machining facilities.", phone: "+91 11 9876 5432", email: "contact@gearboxpro.in", website: "gearboxpro.in", established: "2001", employees: "400+", onTimeDelivery: 98, qualityRate: 99.5, responseTime: "< 2 hrs" },
  "3": { about: "Full-service chassis parts manufacturer with integrated testing labs.", phone: "+91 44 5555 1234", email: "info@metalworksindia.in", website: "metalworksindia.in", established: "2010", employees: "150+", onTimeDelivery: 92, qualityRate: 98.1, responseTime: "< 6 hrs" },
};

export default function SupplierDiscovery() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [minTrust, setMinTrust] = useState([0]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("trustScore");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 4) next.add(id);
      return next;
    });
  };

  const compareSuppliers = useMemo(() =>
    allSuppliers.filter((s) => compareIds.has(s.id)),
    [compareIds]
  );

  const filtered = useMemo(() => {
    let result = allSuppliers.filter((s) => {
      const matchesSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.specializations.some((sp) => sp.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === "All" || s.category === category;
      const matchesLocation = location === "All" || s.location === location;
      const matchesTrust = s.trustScore >= minTrust[0];
      const matchesVerified = !verifiedOnly || s.isVerified;
      return matchesSearch && matchesCategory && matchesLocation && matchesTrust && matchesVerified;
    });

    result.sort((a, b) => {
      if (sortBy === "trustScore") return b.trustScore - a.trustScore;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "orders") return b.totalOrders - a.totalOrders;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [search, category, location, minTrust, verifiedOnly, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setMinTrust([0]);
    setVerifiedOnly(false);
  };

  const hasActiveFilters = category !== "All" || location !== "All" || minTrust[0] > 0 || verifiedOnly;

  const profile = selectedSupplier ? profileData[selectedSupplier.id] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-sidebar p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold">AutoSourceX</span>
            <Badge variant="buyer" className="ml-2 text-[10px]">Buyer</Badge>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { icon: ShoppingCart, label: "Dashboard", href: "/buyer" },
            { icon: Search, label: "Discover Suppliers", href: "/suppliers", active: true },
            { icon: FileText, label: "My RFQs", href: "/rfq" },
            { icon: Package, label: "Orders", href: "/orders" },
            { icon: Network, label: "Knowledge Graph", href: "/knowledge-graph" },
            { icon: Star, label: "Saved Suppliers", href: "/saved" },
          ].map((item) => (
            <Link key={item.label} to={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-border space-y-1">
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Discover Suppliers</h1>
            <p className="text-muted-foreground">Find trusted MSME suppliers for your automotive needs</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={showFilters ? "default" : "outline"} size="sm" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />Filters
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="trustScore">Trust Score</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="orders">Most Orders</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => { setCompareMode(!compareMode); if (compareMode) setCompareIds(new Set()); }}
            >
              <GitCompare className="h-4 w-4 mr-2" />Compare
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search suppliers by name or specialization..." className="pl-12 h-12 text-base" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <Card className="w-64 shrink-0 h-fit sticky top-8">
              <CardContent className="p-5 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Filters</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearFilters}>Clear All</Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Min Trust Score</Label>
                    <span className="text-xs font-medium">{minTrust[0]}</span>
                  </div>
                  <Slider value={minTrust} onValueChange={setMinTrust} max={100} step={5} className="w-full" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="verified" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="rounded border-border" />
                  <Label htmlFor="verified" className="text-sm cursor-pointer flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />Verified Only
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} supplier{filtered.length !== 1 ? "s" : ""} found</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((supplier) => (
                  <SupplierCard key={supplier.id} supplier={supplier} onClick={() => setSelectedSupplier(supplier)} selectable={compareMode} selected={compareIds.has(supplier.id)} onSelect={toggleCompare} />
                ))}
              </div>
            ) : (
              <Card className="py-16 text-center">
                <CardContent>
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-1">No suppliers found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Supplier Profile Dialog */}
      <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedSupplier && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <DialogTitle className="text-xl">{selectedSupplier.name}</DialogTitle>
                      {selectedSupplier.isVerified && <CheckCircle2 className="h-5 w-5 text-success" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.category}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{selectedSupplier.location}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{selectedSupplier.rating}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {profile && (
                <div className="space-y-6 mt-4">
                  <p className="text-sm">{profile.about}</p>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <Card><CardContent className="p-4 text-center">
                      <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
                      <p className="text-2xl font-bold">{profile.onTimeDelivery}%</p>
                      <p className="text-xs text-muted-foreground">On-Time Delivery</p>
                    </CardContent></Card>
                    <Card><CardContent className="p-4 text-center">
                      <ShieldCheck className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold">{profile.qualityRate}%</p>
                      <p className="text-xs text-muted-foreground">Quality Rate</p>
                    </CardContent></Card>
                    <Card><CardContent className="p-4 text-center">
                      <Clock className="h-5 w-5 text-accent mx-auto mb-1" />
                      <p className="text-2xl font-bold">{profile.responseTime}</p>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                    </CardContent></Card>
                  </div>

                  {/* Trust Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Trust Score</span>
                      <Badge variant={selectedSupplier.trustScore >= 80 ? "trustHigh" : selectedSupplier.trustScore >= 50 ? "trustMedium" : "trustLow"}>
                        {selectedSupplier.trustScore}/100
                      </Badge>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${selectedSupplier.trustScore >= 80 ? "bg-success" : selectedSupplier.trustScore >= 50 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${selectedSupplier.trustScore}%` }} />
                    </div>
                  </div>

                  {/* Specializations & Certs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSupplier.specializations.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSupplier.certifications.map((c) => (
                          <Badge key={c} variant="outline" className="text-xs"><Award className="h-3 w-3 mr-1" />{c}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{profile.phone}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{profile.email}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Globe className="h-4 w-4" />{profile.website}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4" />Est. {profile.established} · {profile.employees}</div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="hero" className="flex-1" asChild>
                      <Link to="/rfq/create">Send RFQ</Link>
                    </Button>
                    <Button variant="outline" className="flex-1">Save to Watchlist</Button>
                  </div>
                </div>
              )}

              {!profile && (
                <div className="space-y-6 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Trust Score</span>
                      <Badge variant={selectedSupplier.trustScore >= 80 ? "trustHigh" : "trustMedium"}>{selectedSupplier.trustScore}/100</Badge>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${selectedSupplier.trustScore >= 80 ? "bg-success" : "bg-warning"}`} style={{ width: `${selectedSupplier.trustScore}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-1.5">{selectedSupplier.specializations.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-1.5">{selectedSupplier.certifications.map((c) => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="hero" className="flex-1" asChild><Link to="/rfq/create">Send RFQ</Link></Button>
                    <Button variant="outline" className="flex-1">Save to Watchlist</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Compare Bar */}
      {compareMode && compareIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 ml-32 z-50 flex items-center gap-4 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-6 py-3 shadow-elevated">
          <span className="text-sm font-medium">{compareIds.size} supplier{compareIds.size !== 1 ? "s" : ""} selected</span>
          <Button size="sm" disabled={compareIds.size < 2} onClick={() => setShowCompare(true)}>
            <GitCompare className="h-4 w-4 mr-2" />Compare Now
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCompareIds(new Set())}>Clear</Button>
        </div>
      )}

      {/* Comparison Dialog */}
      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              Supplier Comparison
            </DialogTitle>
          </DialogHeader>

          {compareSuppliers.length >= 2 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium w-40">Metric</th>
                    {compareSuppliers.map((s) => (
                      <th key={s.id} className="text-center py-3 px-4 font-semibold min-w-[180px]">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span>{s.name}</span>
                          {s.isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Category</td>
                    {compareSuppliers.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-center">{s.category}</td>
                    ))}
                  </tr>
                  {/* Location */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Location</td>
                    {compareSuppliers.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-center">
                        <span className="flex items-center justify-center gap-1"><MapPin className="h-3 w-3" />{s.location}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Trust Score */}
                  <tr className="border-b border-border/50 bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground font-medium">Trust Score</td>
                    {compareSuppliers.map((s) => {
                      const best = Math.max(...compareSuppliers.map((x) => x.trustScore));
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className={cn("text-lg font-bold", s.trustScore === best && "text-success")}>{s.trustScore}</span>
                            <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                              <div className={cn("h-full rounded-full", s.trustScore >= 80 ? "bg-success" : s.trustScore >= 50 ? "bg-warning" : "bg-destructive")} style={{ width: `${s.trustScore}%` }} />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Rating */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Rating</td>
                    {compareSuppliers.map((s) => {
                      const best = Math.max(...compareSuppliers.map((x) => x.rating));
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          <span className={cn("flex items-center justify-center gap-1 font-semibold", s.rating === best && "text-warning")}>
                            <Star className="h-3.5 w-3.5 fill-warning text-warning" />{s.rating.toFixed(1)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Total Orders */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Total Orders</td>
                    {compareSuppliers.map((s) => {
                      const best = Math.max(...compareSuppliers.map((x) => x.totalOrders));
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          <span className={cn("font-semibold", s.totalOrders === best && "text-primary")}>{s.totalOrders}</span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* On-Time Delivery */}
                  <tr className="border-b border-border/50 bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground font-medium">On-Time Delivery</td>
                    {compareSuppliers.map((s) => {
                      const p = profileData[s.id];
                      const vals = compareSuppliers.map((x) => profileData[x.id]?.onTimeDelivery ?? 0);
                      const best = Math.max(...vals);
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          {p ? <span className={cn("font-semibold", p.onTimeDelivery === best && "text-success")}>{p.onTimeDelivery}%</span> : <span className="text-muted-foreground">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Quality Rate */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Quality Rate</td>
                    {compareSuppliers.map((s) => {
                      const p = profileData[s.id];
                      const vals = compareSuppliers.map((x) => profileData[x.id]?.qualityRate ?? 0);
                      const best = Math.max(...vals);
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          {p ? <span className={cn("font-semibold", p.qualityRate === best && "text-success")}>{p.qualityRate}%</span> : <span className="text-muted-foreground">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Response Time */}
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Response Time</td>
                    {compareSuppliers.map((s) => {
                      const p = profileData[s.id];
                      return (
                        <td key={s.id} className="py-3 px-4 text-center">
                          {p ? <span className="font-medium">{p.responseTime}</span> : <span className="text-muted-foreground">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Certifications */}
                  <tr className="border-b border-border/50 bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground font-medium">Certifications</td>
                    {compareSuppliers.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {s.certifications.map((c) => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Specializations */}
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Specializations</td>
                    {compareSuppliers.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {s.specializations.map((sp) => <Badge key={sp} variant="secondary" className="text-xs">{sp}</Badge>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowCompare(false)}>Close</Button>
                <Button variant="hero" asChild><Link to="/rfq/create">Send RFQ to Selected</Link></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
