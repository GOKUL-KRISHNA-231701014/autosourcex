import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Send, FileText, Zap, ShoppingCart, Search, Package, Network, Star, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RFQItem {
  partName: string;
  quantity: number;
  unit: string;
  specifications: string;
}

export default function RFQCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [items, setItems] = useState<RFQItem[]>([
    { partName: "", quantity: 0, unit: "units", specifications: "" },
  ]);

  const addItem = () => {
    setItems([...items, { partName: "", quantity: 0, unit: "units", specifications: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof RFQItem, value: string | number) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "RFQ Submitted Successfully",
      description: `RFQ "${title}" has been sent to matching suppliers.`,
    });
    navigate("/rfq");
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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/rfq")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New RFQ</h1>
            <p className="text-muted-foreground">Fill in details to request quotes from suppliers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Provide general details about this request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">RFQ Title</Label>
                  <Input id="title" placeholder="e.g. Brake Pads for Nexon" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Engine Components</SelectItem>
                      <SelectItem value="transmission">Transmission</SelectItem>
                      <SelectItem value="chassis">Chassis Parts</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="body">Body Parts</SelectItem>
                      <SelectItem value="brakes">Brakes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Response Deadline</Label>
                  <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Delivery Location</Label>
                  <Input id="location" placeholder="e.g. Pune, Maharashtra" value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Provide additional details, quality requirements, or special instructions..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Line Items</CardTitle>
              <CardDescription>Specify parts and quantities you need</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-secondary/30">
                  <div className="flex-1 grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Part Name</Label>
                      <Input placeholder="e.g. Brake Pad" value={item.partName} onChange={(e) => updateItem(index, "partName", e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Quantity</Label>
                      <Input type="number" min={1} placeholder="0" value={item.quantity || ""} onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)} required />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Unit</Label>
                      <Select value={item.unit} onValueChange={(v) => updateItem(index, "unit", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="units">Units</SelectItem>
                          <SelectItem value="kg">Kg</SelectItem>
                          <SelectItem value="sets">Sets</SelectItem>
                          <SelectItem value="pairs">Pairs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Specs</Label>
                      <Input placeholder="e.g. OEM grade" value={item.specifications} onChange={(e) => updateItem(index, "specifications", e.target.value)} />
                    </div>
                  </div>
                  {items.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="mt-5" onClick={() => removeItem(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/rfq")}>Cancel</Button>
            <Button type="submit" variant="hero">
              <Send className="h-4 w-4 mr-2" />
              Submit RFQ
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
