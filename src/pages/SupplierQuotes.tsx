import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Zap, LayoutDashboard, FileText, BarChart3, ShieldCheck, Package, Settings, LogOut,
  Eye, Clock, CheckCircle2, XCircle, IndianRupee
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const quotes = [
  { id: "Q-1001", rfqId: "RFQ-2847", rfqTitle: "Brake Pads – Nexon EV", buyer: "Tata Motors", totalValue: 1250000, status: "pending", submittedAt: "2026-03-28" },
  { id: "Q-1002", rfqId: "RFQ-2843", rfqTitle: "Wiring Harness – XUV700", buyer: "Mahindra Auto", totalValue: 890000, status: "accepted", submittedAt: "2026-03-20" },
  { id: "Q-1003", rfqId: "RFQ-2839", rfqTitle: "LED Headlamp Assembly", buyer: "Hyundai India", totalValue: 2100000, status: "rejected", submittedAt: "2026-03-15" },
  { id: "Q-1004", rfqId: "RFQ-2850", rfqTitle: "Suspension Springs – Thar", buyer: "Mahindra Auto", totalValue: 560000, status: "pending", submittedAt: "2026-03-30" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive"; icon: typeof Clock }> = {
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  accepted: { label: "Accepted", variant: "default", icon: CheckCircle2 },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
};

export default function SupplierQuotes() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? quotes : quotes.filter(q => q.status === filter);

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
            { icon: FileText, label: "RFQ Inbox", href: "/supplier/rfqs" },
            { icon: Package, label: "My Quotes", href: "/supplier/quotes", active: true },
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Quotes</h1>
            <p className="text-muted-foreground text-sm">Track all submitted quotes and their status</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Quotes", value: quotes.length, color: "text-foreground" },
            { label: "Accepted", value: quotes.filter(q => q.status === "accepted").length, color: "text-primary" },
            { label: "Pending", value: quotes.filter(q => q.status === "pending").length, color: "text-warning" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {["all", "pending", "accepted", "rejected"].map(f => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>RFQ</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(q => {
                  const sc = statusConfig[q.status];
                  const Icon = sc.icon;
                  return (
                    <TableRow key={q.id}>
                      <TableCell className="font-mono text-sm">{q.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{q.rfqTitle}</p>
                          <p className="text-xs text-muted-foreground">{q.rfqId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{q.buyer}</TableCell>
                      <TableCell className="font-medium">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {q.totalValue.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{q.submittedAt}</TableCell>
                      <TableCell>
                        <Badge variant={sc.variant} className="gap-1">
                          <Icon className="h-3 w-3" />
                          {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/rfq/${q.rfqId.replace("RFQ-", "")}`)}>
                          <Eye className="h-4 w-4 mr-1" /> View
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
