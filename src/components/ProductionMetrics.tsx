
import { useState, useMemo } from "react";
import { ProductionMetric } from "@/utils/mockData";
import MetricsCard from "@/components/MetricsCard";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductionMetricsProps {
  metrics: ProductionMetric[];
  className?: string;
}

const ProductionMetrics = ({ metrics, className }: ProductionMetricsProps) => {
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("week");

  // Filter metrics based on timeframe (this would typically fetch different data)
  const filteredMetrics = useMemo(() => {
    // In a real app, this would filter the data based on the timeframe
    // For this demo, we'll just return all metrics
    return metrics;
  }, [metrics, timeframe]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Production Metrics</h2>
        <Tabs defaultValue="week" value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
          <TabsList className="grid w-[200px] grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((metric) => (
          <MetricsCard 
            key={metric.id} 
            metric={metric} 
            chartType={metric.name.includes("Rate") ? "bar" : "line"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductionMetrics;
