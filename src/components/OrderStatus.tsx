
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Order } from "@/utils/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface OrderStatusProps {
  orders: Order[];
  className?: string;
}

const OrderStatus = ({ orders, className }: OrderStatusProps) => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<"status" | "progress" | "date">("date");

  // Get status color
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-info text-info-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "delayed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate remaining days
  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Show order details
  const handleOrderClick = (order: Order) => {
    toast({
      title: `Order ${order.id}`,
      description: (
        <div className="mt-2 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-medium">{order.customer}</span>
            
            <span className="text-muted-foreground">Product:</span>
            <span className="font-medium">{order.product}</span>
            
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{order.quantity} units</span>
            
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium capitalize">{order.status}</span>
            
            <span className="text-muted-foreground">Start Date:</span>
            <span className="font-medium">{formatDate(order.startDate)}</span>
            
            <span className="text-muted-foreground">End Date:</span>
            <span className="font-medium">{formatDate(order.endDate)}</span>
            
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-medium">{order.progress}%</span>
          </div>
        </div>
      ),
    });
  };

  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "status") {
      // Sort by status priority: in-progress, pending, delayed, completed
      const statusPriority = {
        "in-progress": 0,
        "pending": 1,
        "delayed": 2,
        "completed": 3,
      };
      return statusPriority[a.status] - statusPriority[b.status];
    } else if (sortBy === "progress") {
      // Sort by progress (descending)
      return b.progress - a.progress;
    } else {
      // Sort by end date (ascending)
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
  });

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Order Status</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("date")}
              className={cn(
                "text-xs px-2 py-1 rounded-md",
                sortBy === "date"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Date
            </button>
            <button
              onClick={() => setSortBy("status")}
              className={cn(
                "text-xs px-2 py-1 rounded-md",
                sortBy === "status"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Status
            </button>
            <button
              onClick={() => setSortBy("progress")}
              className={cn(
                "text-xs px-2 py-1 rounded-md",
                sortBy === "progress"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Progress
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col space-y-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <Badge className={getStatusColor(order.status)} variant="outline">
                      {order.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {order.customer} • {order.quantity} units
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {calculateRemainingDays(order.endDate) > 0
                      ? `${calculateRemainingDays(order.endDate)} days left`
                      : "Due today"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(order.startDate)} - {formatDate(order.endDate)}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>{order.product}</span>
                  <span>{order.progress}%</span>
                </div>
                <Progress 
                  value={order.progress} 
                  className={cn(
                    "h-1.5", 
                    order.status === "delayed" 
                      ? "bg-muted [&>div]:bg-destructive" 
                      : "bg-muted [&>div]:bg-info"
                  )} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatus;
