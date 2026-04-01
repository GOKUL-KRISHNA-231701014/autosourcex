import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  ArrowLeft, Clock, MapPin, Tag, CheckCircle2, Star, IndianRupee, Truck, Award
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Quote {
  id: string;
  supplierName: string;
  location: string;
  trustScore: number;
  unitPrice: number;
  totalPrice: number;
  leadTime: string;
  warranty: string;
  submittedAt: string;
  rating: number;
}

const rfqDetail = {
  id: "RFQ-2846",
  title: "Cylinder Head Assembly",
  category: "Engine Components",
  status: "quoted" as const,
  deadline: "2026-04-10",
  createdAt: "2026-03-25",
  deliveryLocation: "Pune, Maharashtra",
  description: "High-performance cylinder head assembly for passenger vehicles. Must meet OEM standards with ISO 9001 certification.",
  items: [
    { partName: "Cylinder Head", quantity: 500, unit: "units", specifications: "Aluminium alloy, OEM grade" },
    { partName: "Head Gasket Set", quantity: 500, unit: "sets", specifications: "Multi-layer steel" },
  ],
};

const sampleQuotes: Quote[] = [
  { id: "Q1", supplierName: "Precision Auto Parts", location: "Pune, MH", trustScore: 92, unitPrice: 4200, totalPrice: 2100000, leadTime: "15 days", warranty: "12 months", submittedAt: "2026-03-27", rating: 4.8 },
  { id: "Q2", supplierName: "GearBox Pro", location: "Delhi, DL", trustScore: 95, unitPrice: 4450, totalPrice: 2225000, leadTime: "12 days", warranty: "18 months", submittedAt: "2026-03-27", rating: 4.9 },
  { id: "Q3", supplierName: "MetalWorks India", location: "Chennai, TN", trustScore: 85, unitPrice: 3950, totalPrice: 1975000, leadTime: "20 days", warranty: "12 months", submittedAt: "2026-03-28", rating: 4.5 },
  { id: "Q4", supplierName: "AutoForge Systems", location: "Bangalore, KA", trustScore: 88, unitPrice: 4100, totalPrice: 2050000, leadTime: "18 days", warranty: "15 months", submittedAt: "2026-03-29", rating: 4.6 },
];

export default function RFQDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [awardDialog, setAwardDialog] = useState<Quote | null>(null);
  const [awarded, setAwarded] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const handleAward = (quote: Quote) => {
    setAwarded(quote.id);
    setAwardDialog(null);
    addNotification({
      type: "rfq_awarded",
      title: "RFQ Awarded",
      message: `You awarded ${rfqDetail.title} (${rfqDetail.id}) to ${quote.supplierName}. The supplier has been notified.`,
      link: `/rfq/${rfqDetail.id}`,
      rfqId: rfqDetail.id,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/rfq")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{rfqDetail.title}</h1>
              <Badge variant="buyer">{rfqDetail.status}</Badge>
              {awarded && <Badge variant="success"><Award className="h-3 w-3 mr-1" />Awarded</Badge>}
            </div>
            <p className="text-muted-foreground font-mono text-sm">{id || rfqDetail.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm"><Tag className="h-4 w-4 text-muted-foreground" /><span>{rfqDetail.category}</span></div>
              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>Deadline: {rfqDetail.deadline}</span></div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{rfqDetail.deliveryLocation}</span></div>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">Description</p>
              <p className="text-sm">{rfqDetail.description}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="quotes">
          <TabsList className="mb-6">
            <TabsTrigger value="items">Line Items ({rfqDetail.items.length})</TabsTrigger>
            <TabsTrigger value="quotes">Quotes Received ({sampleQuotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Specifications</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rfqDetail.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{item.partName}</TableCell>
                        <TableCell>{item.quantity.toLocaleString()}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-muted-foreground">{item.specifications}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <div className="space-y-4">
              {sampleQuotes.map((quote) => (
                <Card key={quote.id} className={`transition-all ${awarded === quote.id ? "ring-2 ring-success" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{quote.supplierName}</h3>
                          <Badge variant="trustHigh">Trust: {quote.trustScore}</Badge>
                          {awarded === quote.id && <Badge variant="success"><CheckCircle2 className="h-3 w-3 mr-1" />Awarded</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{quote.location}</span>
                          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" />{quote.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">₹{(quote.totalPrice / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-muted-foreground">₹{quote.unitPrice.toLocaleString()}/unit</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border text-sm">
                      <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-muted-foreground" />Lead: {quote.leadTime}</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-muted-foreground" />Warranty: {quote.warranty}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground" />Submitted: {quote.submittedAt}</span>
                      <div className="flex-1" />
                      {!awarded && (
                        <Button variant="hero" size="sm" onClick={() => setAwardDialog(quote)}>
                          <Award className="h-4 w-4 mr-1" />
                          Award
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!awardDialog} onOpenChange={() => setAwardDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Award Quote to {awardDialog?.supplierName}?</DialogTitle>
            <DialogDescription>
              This will notify the supplier and close this RFQ. Total value: ₹{awardDialog ? (awardDialog.totalPrice / 100000).toFixed(1) : 0}L
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAwardDialog(null)}>Cancel</Button>
            <Button variant="hero" onClick={() => awardDialog && handleAward(awardDialog)}>
              <Award className="h-4 w-4 mr-2" />
              Confirm Award
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
