
import { useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
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

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
  gradientOpacity?: number;
}

export const LineChart = ({
  data,
  color = "#3b82f6",
  className,
  showGrid = false,
  showTooltip = false,
  showAxis = false,
  gradientOpacity = 0.3,
}: LineChartProps) => {
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
      hour: "2-digit",
      minute: "2-digit",
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

  // Unique ID for gradient
  const gradientId = `gradient-${color.replace('#', '')}`;

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={gradientOpacity} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
