import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Star, MapPin, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  category: string;
  location: string;
  trustScore: number;
  certifications: string[];
  specializations: string[];
  isVerified: boolean;
  rating: number;
  totalOrders: number;
}

interface SupplierCardProps {
  supplier: Supplier;
  onClick?: () => void;
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function SupplierCard({ supplier, onClick, className, selectable, selected, onSelect }: SupplierCardProps) {
  const getTrustVariant = (score: number) => {
    if (score >= 80) return "trustHigh";
    if (score >= 50) return "trustMedium";
    return "trustLow";
  };

  const getTrustLabel = (score: number) => {
    if (score >= 80) return "High Trust";
    if (score >= 50) return "Medium Trust";
    return "Low Trust";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        selected ? "border-primary ring-2 ring-primary/20" : "border-border",
        className
      )}
    >
      {/* Selection checkbox */}
      {selectable && (
        <button
          onClick={(e) => { e.stopPropagation(); onSelect?.(supplier.id); }}
          className={cn(
            "absolute top-3 right-3 z-10 h-5 w-5 rounded border-2 flex items-center justify-center transition-all",
            selected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40 hover:border-primary"
          )}
        >
          {selected && <CheckCircle2 className="h-3.5 w-3.5" />}
        </button>
      )}
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
            {supplier.logo ? (
              <img src={supplier.logo} alt={supplier.name} className="h-10 w-10 rounded-lg object-contain" />
            ) : (
              <Building2 className="h-7 w-7 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{supplier.name}</h3>
              {supplier.isVerified && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{supplier.category}</p>
          </div>
        </div>

        {/* Location and Rating */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{supplier.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium">{supplier.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({supplier.totalOrders} orders)</span>
          </div>
        </div>

        {/* Trust Score */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Trust Score</span>
            <Badge variant={getTrustVariant(supplier.trustScore)} className="text-xs">
              {getTrustLabel(supplier.trustScore)}
            </Badge>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${supplier.trustScore}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full",
                supplier.trustScore >= 80 ? "bg-success" :
                supplier.trustScore >= 50 ? "bg-warning" : "bg-destructive"
              )}
            />
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {supplier.specializations.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
          {supplier.specializations.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{supplier.specializations.length - 3}
            </Badge>
          )}
        </div>

        {/* Certifications */}
        {supplier.certifications.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Certified:</span>
            <div className="flex gap-1">
              {supplier.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs px-2 py-0">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
