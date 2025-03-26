
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  x: number; // timestamp
  y: number; // value
}

interface BarChartProps {
  data: DataPoint[];
  color?: string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
  barSize?: number;
}

export const BarChart = ({
  data,
  color = "#3b82f6",
  className,
  showGrid = false,
  showTooltip = false,
  showAxis = false,
  barSize = 4,
}: BarChartProps) => {
  const chartData = data.map((point) => ({
    time: point.x,
    value: point.y,
  }));

  // Format time for tooltip
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate min and max values with padding
  const values = data.map((d) => d.y);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) * 0.1; // 10% padding
  
  const yDomain = [
    Math.max(0, min - padding), // Don't go below 0 for most metrics
    max + padding,
  ];

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          barCategoryGap={1}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          {showAxis && (
            <>
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                minTickGap={30}
              />
              <YAxis
                domain={yDomain}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                width={30}
              />
            </>
          )}
          {showTooltip && (
            <Tooltip
              formatter={(value: number) => [value.toFixed(1)]}
              labelFormatter={formatTime}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
            />
          )}
          <Bar
            dataKey="value"
            fill={color}
            radius={[2, 2, 0, 0]}
            barSize={barSize}
            animationDuration={500}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
