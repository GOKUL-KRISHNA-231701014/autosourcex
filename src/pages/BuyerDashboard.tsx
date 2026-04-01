import { NotificationBell } from "@/components/NotificationBell";
import { MetricCard } from "@/components/ui/metric-card";
import { SupplierCard, Supplier } from "@/components/ui/supplier-card";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Network, 
  FileText, 
  TrendingUp, 
  Package, 
  Star,
  Plus,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Jul", rfqs: 45, orders: 32 },
  { month: "Aug", rfqs: 52, orders: 38 },
  { month: "Sep", rfqs: 48, orders: 35 },
  { month: "Oct", rfqs: 61, orders: 45 },
  { month: "Nov", rfqs: 55, orders: 42 },
  { month: "Dec", rfqs: 67, orders: 51 },
];

const spendData = [
  { month: "Jul", spend: 12.5 },
  { month: "Aug", spend: 14.2 },
  { month: "Sep", spend: 13.8 },
  { month: "Oct", spend: 16.4 },
  { month: "Nov", spend: 15.9 },
  { month: "Dec", spend: 18.2 },
];

const topSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Precision Auto Parts",
    category: "Engine Components",
    location: "Pune, MH",
    trustScore: 92,
    certifications: ["ISO 9001", "IATF 16949"],
    specializations: ["Pistons", "Cylinder Heads", "Valves"],
    isVerified: true,
    rating: 4.8,
    totalOrders: 156,
  },
  {
    id: "2",
    name: "GearBox Pro",
    category: "Transmission",
    location: "Delhi, DL",
    trustScore: 95,
    certifications: ["ISO 9001", "IATF 16949", "ISO 14001"],
    specializations: ["Gearboxes", "Clutches", "Shafts"],
    isVerified: true,
    rating: 4.9,
    totalOrders: 203,
  },
  {
    id: "3",
    name: "MetalWorks India",
    category: "Chassis Parts",
    location: "Chennai, TN",
    trustScore: 85,
    certifications: ["ISO 9001"],
    specializations: ["Frames", "Axles", "Suspensions"],
    isVerified: true,
    rating: 4.5,
    totalOrders: 98,
  },
];

const recentActivities = [
  { id: "1", type: "rfq" as const, title: "RFQ #2847 Submitted", description: "Brake Pads - 5000 units", timestamp: new Date(Date.now() - 3600000), status: "pending" as const },
  { id: "2", type: "order" as const, title: "Order Placed", description: "Pistons from Precision Auto Parts", timestamp: new Date(Date.now() - 7200000), status: "success" as const },
  { id: "3", type: "connection" as const, title: "New Supplier Match", description: "TechDrive Systems matched your RFQ", timestamp: new Date(Date.now() - 14400000) },
  { id: "4", type: "review" as const, title: "Review Submitted", description: "5-star review for GearBox Pro", timestamp: new Date(Date.now() - 28800000), status: "success" as const },
];

export default function BuyerDashboard() {
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
            { icon: ShoppingCart, label: "Dashboard", href: "/buyer", active: true },
            { icon: Search, label: "Discover Suppliers", href: "/suppliers" },
            { icon: FileText, label: "My RFQs", href: "/rfq" },
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

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Tata Motors</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Create RFQ
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active RFQs"
            value="12"
            icon={FileText}
            change={{ value: 15, trend: "up" }}
            description="vs last month"
          />
          <MetricCard
            title="Pending Orders"
            value="8"
            icon={Package}
            change={{ value: 5, trend: "up" }}
            description="awaiting delivery"
          />
          <MetricCard
            title="Monthly Spend"
            value="₹18.2L"
            icon={TrendingUp}
            change={{ value: 12, trend: "up" }}
            description="vs last month"
          />
          <MetricCard
            title="Saved Suppliers"
            value="24"
            icon={Star}
            change={{ value: 3, trend: "up" }}
            description="new this week"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-lg">RFQ & Order Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="rfqs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Spend (₹ Lakhs)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={spendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spend" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Matched Suppliers</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/suppliers">View All</Link>
              </Button>
            </div>
            <div className="grid gap-4">
              {topSuppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Card variant="default">
              <CardContent className="p-4">
                <ActivityFeed activities={recentActivities} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
