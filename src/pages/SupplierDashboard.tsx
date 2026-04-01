import { NotificationBell } from "@/components/NotificationBell";
import { MetricCard } from "@/components/ui/metric-card";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Factory, 
  FileText, 
  TrendingUp, 
  Package, 
  Award,
  Bell,
  Settings,
  LogOut,
  Network,
  CheckCircle2,
  Clock,
  Zap,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const performanceData = [
  { month: "Jul", score: 85 },
  { month: "Aug", score: 87 },
  { month: "Sep", score: 84 },
  { month: "Oct", score: 89 },
  { month: "Nov", score: 91 },
  { month: "Dec", score: 92 },
];

const orderDistribution = [
  { name: "Completed", value: 156, color: "#22c55e" },
  { name: "In Progress", value: 24, color: "#3b82f6" },
  { name: "Pending", value: 8, color: "#f59e0b" },
];

const certifications = [
  { name: "ISO 9001:2015", status: "active", expiry: "Dec 2026" },
  { name: "IATF 16949:2016", status: "active", expiry: "Mar 2025" },
  { name: "ISO 14001:2015", status: "pending", expiry: "Pending Audit" },
];

const recentRFQs = [
  { id: "RFQ-2847", buyer: "Tata Motors", product: "Pistons (5000 units)", deadline: "Jan 15, 2026", status: "new" },
  { id: "RFQ-2845", buyer: "Mahindra Auto", product: "Cylinder Heads (2000 units)", deadline: "Jan 18, 2026", status: "quoted" },
  { id: "RFQ-2842", buyer: "Maruti Suzuki", product: "Valves (10000 units)", deadline: "Jan 20, 2026", status: "negotiating" },
];

const recentActivities = [
  { id: "1", type: "rfq" as const, title: "New RFQ Received", description: "Pistons - 5000 units from Tata Motors", timestamp: new Date(Date.now() - 3600000), status: "pending" as const },
  { id: "2", type: "order" as const, title: "Order Completed", description: "Cylinder Heads delivered to Mahindra", timestamp: new Date(Date.now() - 7200000), status: "success" as const },
  { id: "3", type: "verification" as const, title: "Profile Verified", description: "Your profile has been verified", timestamp: new Date(Date.now() - 14400000), status: "success" as const },
  { id: "4", type: "certification" as const, title: "Certification Expiring", description: "IATF 16949 expires in 3 months", timestamp: new Date(Date.now() - 28800000), status: "warning" as const },
];

export default function SupplierDashboard() {
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
            <Badge variant="supplier" className="ml-2 text-[10px]">Supplier</Badge>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: Factory, label: "Dashboard", href: "/supplier", active: true },
            { icon: FileText, label: "RFQ Inbox", href: "/rfq-inbox" },
            { icon: Package, label: "Orders", href: "/orders" },
            { icon: Award, label: "Certifications", href: "/certifications" },
            { icon: Network, label: "Knowledge Graph", href: "/knowledge-graph" },
            { icon: TrendingUp, label: "Analytics", href: "/analytics" },
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
            <h1 className="text-2xl font-bold">Supplier Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Precision Auto Parts</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="trustHigh" className="py-1.5 px-3">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Verified Supplier
            </Badge>
            <NotificationBell />
            <Button variant="hero">
              <Upload className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </div>

        {/* Trust Score Banner */}
        <Card variant="gradient" className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Trust Score</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-gradient">92</span>
                <span className="text-success text-sm font-medium">↑ 3% from last month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Top 5% of suppliers in your category</p>
            </div>
            <div className="w-48">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
              <div className="h-3 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-success to-accent" />
              </div>
            </div>
          </div>
        </Card>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active RFQs"
            value="8"
            icon={FileText}
            change={{ value: 25, trend: "up" }}
            description="new this week"
          />
          <MetricCard
            title="Pending Orders"
            value="12"
            icon={Package}
            change={{ value: 10, trend: "up" }}
            description="in production"
          />
          <MetricCard
            title="Monthly Revenue"
            value="₹24.5L"
            icon={TrendingUp}
            change={{ value: 18, trend: "up" }}
            description="vs last month"
          />
          <MetricCard
            title="On-Time Delivery"
            value="98%"
            icon={Clock}
            change={{ value: 2, trend: "up" }}
            description="this quarter"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card variant="default" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Performance Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {orderDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent RFQs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent RFQs</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/rfq-inbox">View All</Link>
              </Button>
            </div>
            <Card variant="default">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentRFQs.map((rfq) => (
                    <div key={rfq.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-sm text-primary">{rfq.id}</span>
                          <Badge variant={
                            rfq.status === "new" ? "active" :
                            rfq.status === "quoted" ? "pending" : "secondary"
                          } className="text-xs capitalize">
                            {rfq.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{rfq.product}</p>
                        <p className="text-xs text-muted-foreground">From {rfq.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="text-sm font-medium">{rfq.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications & Activity */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Certifications</h2>
              <Card variant="default">
                <CardContent className="p-4 space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className={`h-4 w-4 ${cert.status === "active" ? "text-success" : "text-warning"}`} />
                        <span className="text-sm">{cert.name}</span>
                      </div>
                      <Badge variant={cert.status === "active" ? "active" : "pending"} className="text-xs">
                        {cert.expiry}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <Card variant="default">
                <CardContent className="p-4">
                  <ActivityFeed activities={recentActivities} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
