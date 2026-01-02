import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Factory, ShoppingCart, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "supplier" | "buyer" | "admin";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("supplier");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth - in production this would connect to Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!");
      navigate(`/${role}`);
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Please check your email.");
      navigate(`/${role}`);
    }, 1000);
  };

  const getRoleIcon = (r: UserRole) => {
    switch (r) {
      case "supplier": return Factory;
      case "buyer": return ShoppingCart;
      case "admin": return Shield;
    }
  };

  const RoleIcon = getRoleIcon(role);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AutoSourceX</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              B2B Supplier Intelligence Platform
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect MSMEs with OEMs through AI-powered supplier discovery, 
              trust scoring, and intelligent knowledge graphs.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>2,500+ Suppliers</span>
            <span>•</span>
            <span>150+ OEMs</span>
            <span>•</span>
            <span>98% Match Accuracy</span>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md" variant="elevated">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <RoleIcon className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to AutoSourceX</CardTitle>
            <CardDescription>Sign in or create an account to continue</CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Role Selector */}
            <div className="mb-6">
              <Label className="text-sm text-muted-foreground mb-2 block">I am a</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["supplier", "buyer", "admin"] as UserRole[]).map((r) => {
                  const Icon = getRoleIcon(r);
                  return (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                        role === r 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${role === r ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-xs capitalize ${role === r ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {r}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your Company Ltd." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
