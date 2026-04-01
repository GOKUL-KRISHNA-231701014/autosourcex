import { NotificationBell } from "@/components/NotificationBell";
import { MetricCard } from "@/components/ui/metric-card";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Building2, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Bell,
  Settings,
  LogOut,
  Network,
  TrendingUp,
  XCircle,
  Zap,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const userGrowth = [
  { month: "Jul", suppliers: 180, buyers: 45 },
  { month: "Aug", suppliers: 210, buyers: 52 },
  { month: "Sep", suppliers: 245, buyers: 58 },
  { month: "Oct", suppliers: 290, buyers: 68 },
  { month: "Nov", suppliers: 340, buyers: 78 },
  { month: "Dec", suppliers: 395, buyers: 92 },
];

const verificationQueue = [
  { id: "1", name: "TechParts Industries", type: "supplier", location: "Mumbai, MH", submitted: "2 hours ago", documents: 5 },
  { id: "2", name: "AutoComp Solutions", type: "supplier", location: "Pune, MH", submitted: "4 hours ago", documents: 4 },
  { id: "3", name: "MechDrive Systems", type: "supplier", location: "Chennai, TN", submitted: "6 hours ago", documents: 6 },
  { id: "4", name: "PrecisionWorks Ltd", type: "supplier", location: "Bangalore, KA", submitted: "8 hours ago", documents: 5 },
];

const platformHealth = [
  { name: "Healthy", value: 2350, color: "#22c55e" },
  { name: "Warning", value: 120, color: "#f59e0b" },
  { name: "Critical", value: 25, color: "#ef4444" },
];

const recentActivities = [
  { id: "1", type: "verification" as const, title: "Supplier Verified", description: "Precision Auto Parts approved", timestamp: new Date(Date.now() - 1800000), status: "success" as const },
  { id: "2", type: "certification" as const, title: "Certification Flagged", description: "Expired ISO cert for MetalWorks", timestamp: new Date(Date.now() - 3600000), status: "warning" as const },
  { id: "3", type: "review" as const, title: "Fraud Alert", description: "Suspicious activity detected", timestamp: new Date(Date.now() - 7200000), status: "warning" as const },
  { id: "4", type: "connection" as const, title: "New OEM Partner", description: "Ashok Leyland joined platform", timestamp: new Date(Date.now() - 14400000), status: "success" as const },
];

export default function AdminDashboard() {
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
            <Badge variant="admin" className="ml-2 text-[10px]">Admin</Badge>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: Shield, label: "Dashboard", href: "/admin", active: true },
            { icon: CheckCircle2, label: "Verifications", href: "/verifications", badge: "12" },
            { icon: Users, label: "User Management", href: "/users" },
            { icon: Building2, label: "Suppliers", href: "/manage-suppliers" },
            { icon: AlertTriangle, label: "Fraud Signals", href: "/fraud", badge: "3" },
            { icon: Network, label: "Knowledge Graph", href: "/knowledge-graph" },
            { icon: TrendingUp, label: "Analytics", href: "/platform-analytics" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.badge && (
                <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
                  {item.badge}
                </Badge>
              )}
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview & management</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users, suppliers..." className="pl-9 w-64 bg-secondary/50" />
            </div>
            <NotificationBell />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Suppliers"
            value="2,495"
            icon={Building2}
            change={{ value: 12, trend: "up" }}
            description="vs last month"
          />
          <MetricCard
            title="Active Buyers"
            value="152"
            icon={Users}
            change={{ value: 8, trend: "up" }}
            description="OEM partners"
          />
          <MetricCard
            title="Pending Verifications"
            value="12"
            icon={Clock}
            change={{ value: 5, trend: "down" }}
            description="awaiting review"
          />
          <MetricCard
            title="Fraud Alerts"
            value="3"
            icon={AlertTriangle}
            change={{ value: 2, trend: "down" }}
            description="this week"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card variant="default" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userGrowth}>
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
                  <Bar dataKey="suppliers" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Suppliers" />
                  <Bar dataKey="buyers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Buyers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-lg">Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={platformHealth}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformHealth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {platformHealth.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Queue & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Verification Queue</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Card variant="default">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {verificationQueue.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.location} • {item.documents} documents</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{item.submitted}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="success" size="icon" className="h-8 w-8">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
