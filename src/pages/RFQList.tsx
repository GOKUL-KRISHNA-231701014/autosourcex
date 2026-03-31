import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Plus, FileText, Eye, Clock, CheckCircle2, XCircle, AlertCircle,
  Zap, ShoppingCart, Package, Network, Star, Settings, LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface RFQ {
  id: string;
  title: string;
  category: string;
  items: number;
  deadline: string;
  status: "open" | "quoted" | "awarded" | "closed" | "expired";
  quotesReceived: number;
  createdAt: string;
}

const sampleRFQs: RFQ[] = [
  { id: "RFQ-2847", title: "Brake Pads – Nexon EV", category: "Brakes", items: 3, deadline: "2026-04-15", status: "open", quotesReceived: 4, createdAt: "2026-03-28" },
  { id: "RFQ-2846", title: "Cylinder Head Assembly", category: "Engine Components", items: 1, deadline: "2026-04-10", status: "quoted", quotesReceived: 6, createdAt: "2026-03-25" },
  { id: "RFQ-2840", title: "Transmission Shaft Set", category: "Transmission", items: 5, deadline: "2026-04-05", status: "awarded", quotesReceived: 3, createdAt: "2026-03-20" },
  { id: "RFQ-2835", title: "Dashboard Wire Harness", category: "Electrical", items: 2, deadline: "2026-03-30", status: "closed", quotesReceived: 8, createdAt: "2026-03-15" },
  { id: "RFQ-2830", title: "Rear Axle Housing", category: "Chassis Parts", items: 1, deadline: "2026-03-20", status: "expired", quotesReceived: 2, createdAt: "2026-03-05" },
];

const statusConfig: Record<RFQ["status"], { icon: typeof Clock; label: string; variant: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "buyer" | "supplier" | "admin" }> = {: Record<RFQ["status"], { icon: typeof Clock; label: string; variant: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "buyer" | "supplier" | "admin" }> = { = {
  open: { icon: Clock, label: "Open", variant: "warning" },
  quoted: { icon: AlertCircle, label: "Quotes In", variant: "buyer" },
  awarded: { icon: CheckCircle2, label: "Awarded", variant: "success" },
  closed: { icon: CheckCircle2, label: "Closed", variant: "secondary" },
  expired: { icon: XCircle, label: "Expired", variant: "destructive" },
};

export default function RFQList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = sampleRFQs.filter((rfq) => {
    const matchesSearch = rfq.title.toLowerCase().includes(search.toLowerCase()) || rfq.id.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchesSearch;
    return matchesSearch && rfq.status === tab;
  });

  return (
    <div className="min-h-screen bg-background">
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
            { icon: Search, label: "Discover Suppliers", href: "/suppliers" },
            { icon: FileText, label: "My RFQs", href: "/rfq", active: true },
            { icon: Package, label: "Orders", href: "/orders" },
            { icon: Network, label: "Knowledge Graph", href: "/knowledge-graph" },
            { icon: Star, label: "Saved Suppliers", href: "/saved" },
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My RFQs</h1>
            <p className="text-muted-foreground">Manage your requests for quotation</p>
          </div>
          <Button variant="hero" onClick={() => navigate("/rfq/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create RFQ
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search RFQs..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({sampleRFQs.length})</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="quoted">Quoted</TabsTrigger>
            <TabsTrigger value="awarded">Awarded</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RFQ ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Quotes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((rfq) => {
                      const sc = statusConfig[rfq.status];
                      return (
                        <TableRow key={rfq.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => navigate(`/rfq/${rfq.id}`)}>
                          <TableCell className="font-mono text-sm">{rfq.id}</TableCell>
                          <TableCell className="font-medium">{rfq.title}</TableCell>
                          <TableCell>{rfq.category}</TableCell>
                          <TableCell>{rfq.items}</TableCell>
                          <TableCell>{rfq.deadline}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{rfq.quotesReceived} quotes</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={sc.variant}>
                              <sc.icon className="h-3 w-3 mr-1" />
                              {sc.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          No RFQs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
