import { useCallback, useRef, useEffect, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, 
  ArrowLeft, 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Building2,
  ShoppingCart,
  Award,
  MapPin,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Types for the graph
interface GraphNode {
  id: string;
  name: string;
  type: "supplier" | "buyer" | "product" | "certification" | "region";
  val: number;
  color: string;
  trustScore?: number;
  category?: string;
  location?: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: "supplies" | "requested_by" | "certified_by" | "located_in" | "produces";
  value: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Mock data for the knowledge graph
const generateMockData = (): GraphData => {
  const suppliers: GraphNode[] = [
    { id: "s1", name: "Precision Auto Parts", type: "supplier", val: 25, color: "#22c55e", trustScore: 92, category: "Engine Components", location: "Pune" },
    { id: "s2", name: "MetalWorks India", type: "supplier", val: 20, color: "#22c55e", trustScore: 85, category: "Chassis Parts", location: "Chennai" },
    { id: "s3", name: "TechDrive Systems", type: "supplier", val: 22, color: "#22c55e", trustScore: 78, category: "Electronics", location: "Bangalore" },
    { id: "s4", name: "AutoSeal Industries", type: "supplier", val: 18, color: "#22c55e", trustScore: 88, category: "Sealing Systems", location: "Mumbai" },
    { id: "s5", name: "GearBox Pro", type: "supplier", val: 24, color: "#22c55e", trustScore: 95, category: "Transmission", location: "Delhi" },
    { id: "s6", name: "BrakeMaster Corp", type: "supplier", val: 21, color: "#22c55e", trustScore: 82, category: "Braking Systems", location: "Ahmedabad" },
    { id: "s7", name: "ElectroAuto Ltd", type: "supplier", val: 19, color: "#22c55e", trustScore: 76, category: "Electronics", location: "Hyderabad" },
    { id: "s8", name: "Steel Dynamics", type: "supplier", val: 23, color: "#22c55e", trustScore: 90, category: "Raw Materials", location: "Jamshedpur" },
  ];

  const buyers: GraphNode[] = [
    { id: "b1", name: "Tata Motors", type: "buyer", val: 35, color: "#3b82f6", category: "OEM" },
    { id: "b2", name: "Mahindra Auto", type: "buyer", val: 32, color: "#3b82f6", category: "OEM" },
    { id: "b3", name: "Maruti Suzuki", type: "buyer", val: 38, color: "#3b82f6", category: "OEM" },
    { id: "b4", name: "Ashok Leyland", type: "buyer", val: 28, color: "#3b82f6", category: "OEM" },
  ];

  const certifications: GraphNode[] = [
    { id: "c1", name: "ISO 9001", type: "certification", val: 12, color: "#a855f7" },
    { id: "c2", name: "IATF 16949", type: "certification", val: 12, color: "#a855f7" },
    { id: "c3", name: "ISO 14001", type: "certification", val: 10, color: "#a855f7" },
  ];

  const regions: GraphNode[] = [
    { id: "r1", name: "Maharashtra", type: "region", val: 15, color: "#f59e0b" },
    { id: "r2", name: "Tamil Nadu", type: "region", val: 14, color: "#f59e0b" },
    { id: "r3", name: "Karnataka", type: "region", val: 13, color: "#f59e0b" },
    { id: "r4", name: "Gujarat", type: "region", val: 12, color: "#f59e0b" },
  ];

  const products: GraphNode[] = [
    { id: "p1", name: "Pistons", type: "product", val: 10, color: "#14b8a6" },
    { id: "p2", name: "Brake Pads", type: "product", val: 10, color: "#14b8a6" },
    { id: "p3", name: "ECU Modules", type: "product", val: 10, color: "#14b8a6" },
    { id: "p4", name: "Gaskets", type: "product", val: 10, color: "#14b8a6" },
  ];

  const links: GraphLink[] = [
    // Supplier to Buyer relationships
    { source: "s1", target: "b1", type: "supplies", value: 5 },
    { source: "s1", target: "b3", type: "supplies", value: 4 },
    { source: "s2", target: "b2", type: "supplies", value: 5 },
    { source: "s2", target: "b4", type: "supplies", value: 3 },
    { source: "s3", target: "b1", type: "supplies", value: 4 },
    { source: "s3", target: "b2", type: "supplies", value: 4 },
    { source: "s4", target: "b3", type: "supplies", value: 5 },
    { source: "s5", target: "b1", type: "supplies", value: 5 },
    { source: "s5", target: "b2", type: "supplies", value: 4 },
    { source: "s5", target: "b3", type: "supplies", value: 5 },
    { source: "s6", target: "b4", type: "supplies", value: 4 },
    { source: "s7", target: "b2", type: "supplies", value: 3 },
    { source: "s8", target: "s1", type: "supplies", value: 4 },
    { source: "s8", target: "s2", type: "supplies", value: 4 },
    
    // Certifications
    { source: "s1", target: "c1", type: "certified_by", value: 2 },
    { source: "s1", target: "c2", type: "certified_by", value: 2 },
    { source: "s2", target: "c1", type: "certified_by", value: 2 },
    { source: "s3", target: "c2", type: "certified_by", value: 2 },
    { source: "s4", target: "c1", type: "certified_by", value: 2 },
    { source: "s4", target: "c3", type: "certified_by", value: 2 },
    { source: "s5", target: "c1", type: "certified_by", value: 2 },
    { source: "s5", target: "c2", type: "certified_by", value: 2 },
    { source: "s6", target: "c1", type: "certified_by", value: 2 },
    
    // Regions
    { source: "s1", target: "r1", type: "located_in", value: 1 },
    { source: "s4", target: "r1", type: "located_in", value: 1 },
    { source: "s2", target: "r2", type: "located_in", value: 1 },
    { source: "s3", target: "r3", type: "located_in", value: 1 },
    { source: "s6", target: "r4", type: "located_in", value: 1 },
    
    // Products
    { source: "s1", target: "p1", type: "produces", value: 2 },
    { source: "s6", target: "p2", type: "produces", value: 2 },
    { source: "s3", target: "p3", type: "produces", value: 2 },
    { source: "s4", target: "p4", type: "produces", value: 2 },
  ];

  return {
    nodes: [...suppliers, ...buyers, ...certifications, ...regions, ...products],
    links,
  };
};

export default function KnowledgeGraph() {
  const graphRef = useRef<ForceGraphMethods>();
  const [graphData] = useState<GraphData>(generateMockData);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("graph-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const filteredData = {
    nodes: graphData.nodes.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || node.type === filterType;
      return matchesSearch && matchesType;
    }),
    links: graphData.links.filter((link) => {
      const sourceId = typeof link.source === "string" ? link.source : (link.source as GraphNode).id;
      const targetId = typeof link.target === "string" ? link.target : (link.target as GraphNode).id;
      const sourceNode = graphData.nodes.find((n) => n.id === sourceId);
      const targetNode = graphData.nodes.find((n) => n.id === targetId);
      
      if (!sourceNode || !targetNode) return false;
      
      const matchesSearch = 
        sourceNode.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        targetNode.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = 
        filterType === "all" || 
        sourceNode.type === filterType || 
        targetNode.type === filterType;
      
      return matchesSearch && matchesType;
    }),
  };

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  }, []);

  const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 300);
  const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() / 1.5, 300);
  const handleReset = () => {
    graphRef.current?.zoomToFit(400);
    setSelectedNode(null);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "supplier": return Building2;
      case "buyer": return ShoppingCart;
      case "certification": return Award;
      case "region": return MapPin;
      default: return Building2;
    }
  };

  const nodeCanvasObject = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Inter, sans-serif`;
    
    const nodeR = node.val / 2;
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, nodeR, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    
    // Add glow effect for selected node
    if (selectedNode?.id === node.id) {
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    // Draw label
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    
    if (globalScale > 0.8) {
      ctx.fillText(label, node.x!, node.y! + nodeR + fontSize + 2);
    }
  }, [selectedNode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/"><ArrowLeft className="h-5 w-5" /></Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold">Knowledge Graph</span>
                <p className="text-xs text-muted-foreground">Supplier Intelligence Network</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nodes..."
                className="pl-9 w-64 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-secondary/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="supplier">Suppliers</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
                <SelectItem value="certification">Certifications</SelectItem>
                <SelectItem value="region">Regions</SelectItem>
                <SelectItem value="product">Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 h-screen flex">
        {/* Graph Container */}
        <div id="graph-container" className="flex-1 relative bg-background">
          <ForceGraph2D
            ref={graphRef}
            graphData={filteredData}
            width={dimensions.width}
            height={dimensions.height - 80}
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, node.val! / 2, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }}
            linkColor={() => "rgba(255,255,255,0.15)"}
            linkWidth={(link) => link.value}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.005}
            onNodeClick={handleNodeClick}
            backgroundColor="transparent"
            cooldownTicks={100}
            onEngineStop={() => graphRef.current?.zoomToFit(400)}
          />

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleReset}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
            {[
              { type: "supplier", color: "#22c55e", label: "Supplier" },
              { type: "buyer", color: "#3b82f6", label: "Buyer" },
              { type: "certification", color: "#a855f7", label: "Certification" },
              { type: "region", color: "#f59e0b", label: "Region" },
              { type: "product", color: "#14b8a6", label: "Product" },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2 text-xs">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 border-l border-border bg-card p-6 overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedNode.color}20` }}
                  >
                    {(() => {
                      const Icon = getNodeIcon(selectedNode.type);
                      return <Icon className="h-6 w-6" style={{ color: selectedNode.color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedNode.name}</h3>
                    <Badge variant="secondary" className="capitalize text-xs mt-1">
                      {selectedNode.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {selectedNode.type === "supplier" && (
                <div className="space-y-4">
                  {selectedNode.trustScore && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Trust Score</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-success"
                            style={{ width: `${selectedNode.trustScore}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-success">{selectedNode.trustScore}%</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedNode.category && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-medium">{selectedNode.category}</p>
                    </div>
                  )}
                  
                  {selectedNode.location && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {selectedNode.location}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Connections</p>
                    <div className="space-y-2">
                      {graphData.links
                        .filter((l) => {
                          const sourceId = typeof l.source === "string" ? l.source : (l.source as GraphNode).id;
                          const targetId = typeof l.target === "string" ? l.target : (l.target as GraphNode).id;
                          return sourceId === selectedNode.id || targetId === selectedNode.id;
                        })
                        .slice(0, 5)
                        .map((link, i) => {
                          const sourceId = typeof link.source === "string" ? link.source : (link.source as GraphNode).id;
                          const targetId = typeof link.target === "string" ? link.target : (link.target as GraphNode).id;
                          const connectedId = sourceId === selectedNode.id ? targetId : sourceId;
                          const connectedNode = graphData.nodes.find((n) => n.id === connectedId);
                          
                          return connectedNode ? (
                            <div 
                              key={i}
                              className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                            >
                              <span className="text-sm">{connectedNode.name}</span>
                              <Badge variant="outline" className="text-xs capitalize">
                                {link.type.replace("_", " ")}
                              </Badge>
                            </div>
                          ) : null;
                        })}
                    </div>
                  </div>

                  <Button variant="hero" className="w-full mt-4">
                    View Full Profile
                  </Button>
                </div>
              )}

              {selectedNode.type === "buyer" && (
                <div className="space-y-4">
                  {selectedNode.category && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <p className="font-medium">{selectedNode.category}</p>
                    </div>
                  )}
                  <Button variant="hero" className="w-full">
                    View Buyer Profile
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
