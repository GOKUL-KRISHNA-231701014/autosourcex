import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft, Clock, MapPin, Tag, Send, IndianRupee, Zap, LayoutDashboard,
  FileText, BarChart3, ShieldCheck, Package, Settings, LogOut
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const rfqDetail = {
  id: "RFQ-2847",
  title: "Brake Pads – Nexon EV",
  buyer: "Tata Motors",
  category: "Brakes",
  deadline: "2026-04-15",
  deliveryLocation: "Pune, Maharashtra",
  description: "High-quality brake pads for electric vehicle platform. Must meet EV-specific requirements with low dust and noise characteristics.",
  items: [
    { partName: "Front Brake Pad Set", quantity: 5000, unit: "sets", specifications: "Ceramic compound, low dust" },
    { partName: "Rear Brake Pad Set", quantity: 5000, unit: "sets", specifications: "Semi-metallic, EV rated" },
    { partName: "Brake Pad Wear Sensor", quantity: 10000, unit: "units", specifications: "Electronic, OBD compatible" },
  ],
};

export default function SupplierQuote() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [prices, setPrices] = useState<Record<number, string>>({});
  const [leadTime, setLeadTime] = useState("");
  const [warranty, setWarranty] = useState("");
  const [notes, setNotes] = useState("");

  const updatePrice = (index: number, value: string) => {
    setPrices({ ...prices, [index]: value });
  };

  const totalPrice = rfqDetail.items.reduce((sum, item, i) => {
    return sum + item.quantity * (parseFloat(prices[i] || "0") || 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Submitted",
      description: `Your quote for ${rfqDetail.title} has been sent to ${rfqDetail.buyer}.`,
    });
    navigate("/supplier");
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-sidebar p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold">AutoSourceX</span>
            <Badge variant="supplier" className="ml-2 text-[10px]">Supplier</Badge>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/supplier" },
            { icon: FileText, label: "RFQ Inbox", href: "/supplier/rfqs", active: true },
            { icon: Package, label: "My Quotes", href: "/supplier/quotes" },
            { icon: BarChart3, label: "Analytics", href: "/supplier/analytics" },
            { icon: ShieldCheck, label: "Certifications", href: "/supplier/certs" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-border space-y-1">
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/supplier")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Submit Quote</h1>
              <Badge variant="buyer">{rfqDetail.buyer}</Badge>
            </div>
            <p className="text-muted-foreground font-mono text-sm">{id || rfqDetail.id}</p>
          </div>
        </div>

        {/* RFQ Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{rfqDetail.title}</CardTitle>
            <CardDescription>{rfqDetail.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Tag className="h-4 w-4" />{rfqDetail.category}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />Deadline: {rfqDetail.deadline}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{rfqDetail.deliveryLocation}</span>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pricing per item */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Pricing</CardTitle>
              <CardDescription>Enter unit price for each line item</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead>Unit Price (₹)</TableHead>
                    <TableHead className="text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rfqDetail.items.map((item, i) => {
                    const lineTotal = item.quantity * (parseFloat(prices[i] || "0") || 0);
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{item.partName}</TableCell>
                        <TableCell>{item.quantity.toLocaleString()} {item.unit}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.specifications}</TableCell>
                        <TableCell>
                          <div className="relative w-32">
                            <IndianRupee className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-7"
                              value={prices[i] || ""}
                              onChange={(e) => updatePrice(i, e.target.value)}
                              required
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{lineTotal.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-secondary/30">
                    <TableCell colSpan={4} className="font-semibold text-right">Total Quote Value</TableCell>
                    <TableCell className="text-right font-bold text-lg">₹{totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lead Time</Label>
                  <Input placeholder="e.g. 15 days" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Warranty Period</Label>
                  <Input placeholder="e.g. 12 months" value={warranty} onChange={(e) => setWarranty(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Payment terms, delivery conditions, volume discounts..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/supplier")}>Cancel</Button>
            <Button type="submit" variant="hero">
              <Send className="h-4 w-4 mr-2" />
              Submit Quote
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
