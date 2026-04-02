import { Package, Search, FileText, Network, Star, Settings, LogOut, Truck, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MetricCard } from "@/components/ui/metric-card";
import NavLink from "@/components/NavLink";
import { NotificationBell } from "@/components/NotificationBell";
import { useState } from "react";

const orders = [
  { id: "ORD-1001", rfqId: "RFQ-2846", supplier: "Precision Auto Parts", items: "Pistons, Valves", totalValue: 245000, status: "delivered", placedAt: "2024-01-15", deliveredAt: "2024-02-01" },
  { id: "ORD-1002", rfqId: "RFQ-2830", supplier: "GearBox Pro", items: "Gearboxes, Clutches", totalValue: 520000, status: "in_transit", placedAt: "2024-02-10", deliveredAt: null },
  { id: "ORD-1003", rfqId: "RFQ-2815", supplier: "MetalWorks India", items: "Chassis Frames", totalValue: 180000, status: "processing", placedAt: "2024-02-20", deliveredAt: null },
  { id: "ORD-1004", rfqId: "RFQ-2800", supplier: "BrakeMax Industries", items: "Brake Pads, Rotors", totalValue: 95000, status: "delivered", placedAt: "2024-01-05", deliveredAt: "2024-01-20" },
  { id: "ORD-1005", rfqId: "RFQ-2790", supplier: "TechDrive Systems", items: "Wire Harnesses, ECUs", totalValue: 310000, status: "cancelled", placedAt: "2024-01-25", deliveredAt: null },
  { id: "ORD-1006", rfqId: "RFQ-2780", supplier: "PowerTrain Solutions", items: "Turbochargers", totalValue: 420000, status: "in_transit", placedAt: "2024-02-15", deliveredAt: null },
];

const statusConfig: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive"; icon: typeof Clock }> = {
  processing: { label: "Processing", variant: "outline", icon: Clock },
  in_transit: { label: "In Transit", variant: "secondary", icon: Truck },
  delivered: { label: "Delivered", variant: "default", icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

export default function Orders() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const totalOrders = orders.length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const inTransitCount = orders.filter((o) => o.status === "in_transit").length;
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">AutoSourceX</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {[
            { icon: Search, label: "Discover Suppliers", href: "/suppliers" },
            { icon: FileText, label: "My RFQs", href: "/rfq" },
            { icon: Package, label: "Orders", href: "/orders", active: true },
            { icon: Network, label: "Knowledge Graph", href: "/knowledge-graph" },
            { icon: Star, label: "Saved Suppliers", href: "/saved" },
          ].map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-border p-4">
          <nav className="flex flex-col gap-1">
            <NavLink icon={Settings} label="Settings" href="/settings" />
            <NavLink icon={LogOut} label="Sign Out" href="/" />
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Track and manage your purchase orders</p>
          </div>
          <NotificationBell />
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <MetricCard title="Total Orders" value={totalOrders} icon={Package} trend={{ value: 12, isPositive: true }} />
          <MetricCard title="Delivered" value={deliveredCount} icon={CheckCircle} trend={{ value: 8, isPositive: true }} />
          <MetricCard title="In Transit" value={inTransitCount} icon={Truck} />
          <MetricCard title="Total Value" value={`₹${(totalValue / 100000).toFixed(1)}L`} icon={Package} trend={{ value: 15, isPositive: true }} />
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["all", "processing", "in_transit", "delivered", "cancelled"].map((s) => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
              {s === "all" ? "All" : statusConfig[s]?.label || s}
            </Button>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>RFQ</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Placed</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => {
                  const cfg = statusConfig[order.status];
                  const Icon = cfg.icon;
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.rfqId}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.items}</TableCell>
                      <TableCell>₹{order.totalValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={cfg.variant} className="gap-1">
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.placedAt}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/rfq/${order.rfqId.replace("RFQ-", "")}`)}>
                          <Eye className="mr-1 h-4 w-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
