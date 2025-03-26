
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductionMetric } from "@/utils/mockData";
import { BarChart } from "@/components/BarChart";
import { LineChart } from "@/components/LineChart";
import { ArrowUp, ArrowDown, Box, Cylinder, Activity, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  metric: ProductionMetric;
  chartType?: "line" | "bar";
  className?: string;
}

const MetricsCard = ({ metric, chartType = "line", className }: MetricsCardProps) => {
  // Get icon based on metric name
  const getMetricIcon = () => {
    if (metric.name.includes("Render") || metric.name.includes("GPU")) {
      return <Cylinder className="h-4 w-4 text-muted-foreground" />;
    }
    if (metric.name.includes("Model") || metric.name.includes("Asset")) {
      return <Box className="h-4 w-4 text-muted-foreground" />;
    }
    if (metric.name.includes("Animation") || metric.name.includes("Rig")) {
      return <RotateCcw className="h-4 w-4 text-muted-foreground" />;
    }
    // Default icon
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  // Format the metric value for display
  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value}${unit}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k ${unit}`;
    } else {
      return `${value} ${unit}`;
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-500 h-full hover:shadow-md", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5">
            {getMetricIcon()}
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.name}
            </CardTitle>
          </div>
          <div
            className={cn(
              "px-1.5 py-0.5 rounded-sm text-xs font-medium flex items-center",
              metric.change > 0
                ? "bg-success/20 text-success"
                : metric.change < 0
                ? "bg-destructive/20 text-destructive"
                : "bg-muted text-muted-foreground"
            )}
          >
            {metric.change > 0 ? (
              <ArrowUp size={12} className="mr-0.5" />
            ) : metric.change < 0 ? (
              <ArrowDown size={12} className="mr-0.5" />
            ) : null}
            {Math.abs(metric.change)}%
          </div>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">
            {formatValue(metric.value, metric.unit)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-1">
        <div className="h-[100px] w-full">
          {chartType === "line" ? (
            <LineChart 
              data={metric.data.map((item) => ({
                x: new Date(item.time).getTime(),
                y: item.value,
              }))}
              color={metric.change >= 0 ? "#10b981" : "#ef4444"}
            />
          ) : (
            <BarChart
              data={metric.data.map((item) => ({
                x: new Date(item.time).getTime(),
                y: item.value,
              }))}
              color={metric.change >= 0 ? "#10b981" : "#ef4444"}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
