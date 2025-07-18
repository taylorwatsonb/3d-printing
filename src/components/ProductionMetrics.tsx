
import { useState, useMemo } from "react";
import { ProductionMetric } from "@/utils/types";
import MetricsCard from "@/components/MetricsCard";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Cylinder, RotateCcw, Activity, Printer } from "lucide-react";

interface ProductionMetricsProps {
  metrics: ProductionMetric[];
  className?: string;
}

const ProductionMetrics = ({ metrics, className }: ProductionMetricsProps) => {
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("week");
  const [viewType, setViewType] = useState<"all" | "rendering" | "modeling" | "general">("all");

  // Filter metrics based on timeframe and 3D production category
  const filteredMetrics = useMemo(() => {
    // In a real app, this would filter based on both timeframe and viewType
    if (viewType === "all") {
      return metrics;
    }
    
    // Filter metrics based on category
    return metrics.filter(metric => metric.category === viewType);
  }, [metrics, timeframe, viewType]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Printer className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">3D Printing Metrics</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Tabs 
            defaultValue="all" 
            value={viewType} 
            onValueChange={(value) => setViewType(value as any)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full sm:w-[300px] grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Box className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="rendering" className="flex items-center gap-1">
                <Cylinder className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Slicing</span>
              </TabsTrigger>
              <TabsTrigger value="modeling" className="flex items-center gap-1">
                <Activity className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Modeling</span>
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-1">
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs 
            defaultValue="week" 
            value={timeframe} 
            onValueChange={(value) => setTimeframe(value as any)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full sm:w-[200px] grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {filteredMetrics.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
          <Box className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
          <p className="text-muted-foreground">No metrics available for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMetrics.map((metric) => (
            <MetricsCard 
              key={metric.id} 
              metric={metric} 
              chartType={metric.name.includes("Rate") ? "bar" : "line"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionMetrics;
