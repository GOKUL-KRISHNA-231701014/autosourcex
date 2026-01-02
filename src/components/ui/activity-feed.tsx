import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "rfq" | "order" | "review" | "connection" | "verification" | "certification";
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
  status?: "success" | "warning" | "pending";
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getTypeColor = (type: Activity["type"]) => {
    switch (type) {
      case "rfq":
        return "bg-chart-1/20 text-chart-1";
      case "order":
        return "bg-success/20 text-success";
      case "review":
        return "bg-warning/20 text-warning";
      case "connection":
        return "bg-chart-4/20 text-chart-4";
      case "verification":
        return "bg-accent/20 text-accent";
      case "certification":
        return "bg-chart-5/20 text-chart-5";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: Activity["type"]) => {
    switch (type) {
      case "rfq":
        return "RFQ";
      case "order":
        return "Order";
      case "review":
        return "Review";
      case "connection":
        return "Connect";
      case "verification":
        return "Verify";
      case "certification":
        return "Cert";
      default:
        return type;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {activity.user && (
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-secondary text-xs">
                {activity.user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium",
                getTypeColor(activity.type)
              )}>
                {getTypeLabel(activity.type)}
              </span>
              {activity.status && (
                <Badge
                  variant={
                    activity.status === "success" ? "success" :
                    activity.status === "warning" ? "warning" : "pending"
                  }
                  className="text-[10px] px-1.5 py-0"
                >
                  {activity.status}
                </Badge>
              )}
            </div>

            <p className="text-sm font-medium text-foreground truncate">
              {activity.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {activity.description}
            </p>
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  );
}
