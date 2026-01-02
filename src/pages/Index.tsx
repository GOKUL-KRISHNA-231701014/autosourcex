import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavCard } from "@/components/ui/nav-card";
import { motion } from "framer-motion";
import { 
  Factory, 
  ShoppingCart, 
  Shield, 
  Network, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AutoSourceX</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/knowledge-graph" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Knowledge Graph</Link>
            <Link to="/suppliers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Suppliers</Link>
            <Link to="/rfq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">RFQs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-6">
              <span className="mr-2">🚀</span> B2B Supplier Intelligence Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connect. Source.{" "}
              <span className="text-gradient">Grow.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              AutoSourceX bridges MSMEs and OEMs with AI-powered supplier discovery, 
              trust scoring, and intelligent knowledge graphs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth">
                  Start Sourcing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/knowledge-graph">
                  <Network className="mr-2 h-5 w-5" /> Explore Graph
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: "2,500+", label: "Verified Suppliers" },
              { value: "150+", label: "OEM Partners" },
              { value: "₹50Cr+", label: "Transaction Volume" },
              { value: "98%", label: "Match Accuracy" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-border bg-card/50">
                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground">Access tailored dashboards based on your role</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <NavCard
              title="Supplier Dashboard"
              description="Manage your profile, certifications, and respond to RFQs"
              icon={Factory}
              href="/supplier"
              gradient="from-role-supplier/20 to-accent/10"
            />
            <NavCard
              title="Buyer Dashboard"
              description="Discover suppliers, create RFQs, and manage orders"
              icon={ShoppingCart}
              href="/buyer"
              gradient="from-role-buyer/20 to-primary/10"
            />
            <NavCard
              title="Admin Panel"
              description="Verify suppliers, manage platform, and monitor analytics"
              icon={Shield}
              href="/admin"
              gradient="from-role-admin/20 to-chart-4/10"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Network, title: "Knowledge Graph", desc: "AI-powered supplier network visualization" },
              { icon: TrendingUp, title: "Trust Scoring", desc: "Real-time performance and reliability metrics" },
              { icon: CheckCircle2, title: "Verification", desc: "Digital supplier passport with audit history" },
              { icon: Globe, title: "MSME Ecosystem", desc: "Connect with 2,500+ verified suppliers" },
              { icon: Zap, title: "Smart Matching", desc: "AI-driven RFQ to supplier recommendations" },
              { icon: Award, title: "Certifications", desc: "Track ISO, IATF, and industry standards" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 AutoSourceX. B2B Supplier Intelligence Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
