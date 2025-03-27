
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChartBarIcon,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertTriangle,
  Clock,
  Download,
  Share2,
  Printer,
  Zap,
  DollarSign,
  Hourglass
} from "lucide-react";
import { ResponsiveContainer, PieChart as PieChartRecharts, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Mock data for analytics
const materialUsageData = [
  { name: 'PLA', value: 45 },
  { name: 'PETG', value: 25 },
  { name: 'ABS', value: 15 },
  { name: 'TPU', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const printTimeData = [
  { month: 'Jan', hours: 120 },
  { month: 'Feb', hours: 145 },
  { month: 'Mar', hours: 135 },
  { month: 'Apr', hours: 160 },
  { month: 'May', hours: 180 },
  { month: 'Jun', hours: 210 },
  { month: 'Jul', hours: 195 },
];

const failureRateData = [
  { month: 'Jan', rate: 8 },
  { month: 'Feb', rate: 7 },
  { month: 'Mar', rate: 6 },
  { month: 'Apr', rate: 5 },
  { month: 'May', rate: 4 },
  { month: 'Jun', rate: 4 },
  { month: 'Jul', rate: 3 },
];

const costData = [
  { category: 'Materials', cost: 1250 },
  { category: 'Electricity', cost: 320 },
  { category: 'Maintenance', cost: 450 },
  { category: 'Equipment', cost: 800 },
  { category: 'Labor', cost: 1600 },
];

// Mock prediction data
const nextMonthPredictions = {
  materialUsage: 12.8, // kg
  printHours: 210,
  failureRate: 2.8,
  maintenance: [
    { machine: 'Printer 1', date: '2023-08-15', type: 'Regular' },
    { machine: 'Printer 3', date: '2023-08-22', type: 'Deep cleaning' },
  ],
  alerts: [
    { severity: 'Medium', message: 'Printer 2 efficiency dropping, maintenance recommended' },
    { severity: 'Low', message: 'PLA inventory running low, estimated to last 2 weeks' },
  ]
};

const Analytics = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "quarter" | "year">("month");
  
  const handleExport = () => {
    toast({
      title: "Report exported",
      description: "Analytics report has been exported to CSV format.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Report shared",
      description: "Analytics report has been shared with your team.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Production Analytics</h1>
              <p className="text-muted-foreground">
                Advanced metrics and predictive insights for your 3D printing operation
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Tabs 
                value={timeframe} 
                onValueChange={(value) => setTimeframe(value as any)}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full sm:w-[400px] grid-cols-5">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Total Print Hours</span>
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">1,245</span>
                    <span className="text-sm text-success">+12%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Material Used</span>
                    <Printer className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">58.6 kg</span>
                    <span className="text-sm text-success">+8%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Energy Consumption</span>
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">420 kWh</span>
                    <span className="text-sm text-destructive">+15%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Failure Rate</span>
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">3.2%</span>
                    <span className="text-sm text-success">-2.1%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <Card className="md:col-span-8">
              <CardHeader>
                <CardTitle>Print Time by Month</CardTitle>
                <CardDescription>
                  Total hours spent printing each month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={printTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" fill="#3b82f6" name="Print Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Material Distribution</CardTitle>
                <CardDescription>
                  Types of material used by percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartRecharts>
                      <Pie
                        data={materialUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {materialUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChartRecharts>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-6">
              <CardHeader>
                <CardTitle>Failure Rate Trend</CardTitle>
                <CardDescription>
                  Percentage of failed prints over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={failureRateData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        name="Failure Rate (%)"
                        stroke="#ef4444"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-6">
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>
                  Breakdown of operational costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cost" fill="#8b5cf6" name="Cost ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-12">
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>
                  AI-powered predictions for optimizing your printing operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Printer className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Predicted Material Usage</h4>
                    </div>
                    <div className="text-2xl font-bold">{nextMonthPredictions.materialUsage} kg</div>
                    <p className="text-sm text-muted-foreground">
                      Forecasted for next month based on current trends
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Hourglass className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Estimated Print Hours</h4>
                    </div>
                    <div className="text-2xl font-bold">{nextMonthPredictions.printHours}</div>
                    <p className="text-sm text-muted-foreground">
                      Expected utilization for upcoming period
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Projected Failure Rate</h4>
                    </div>
                    <div className="text-2xl font-bold">{nextMonthPredictions.failureRate}%</div>
                    <p className="text-sm text-muted-foreground">
                      Expected improvement with suggested calibrations
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Projected Cost Savings</h4>
                    </div>
                    <div className="text-2xl font-bold">$320</div>
                    <p className="text-sm text-muted-foreground">
                      Potential savings with efficiency improvements
                    </p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Upcoming Maintenance</h4>
                    <div className="space-y-2">
                      {nextMonthPredictions.maintenance.map((item, i) => (
                        <div key={i} className="flex justify-between p-2 border rounded-md">
                          <div>
                            <span className="font-medium">{item.machine}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-sm">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Predictive Alerts</h4>
                    <div className="space-y-2">
                      {nextMonthPredictions.alerts.map((alert, i) => (
                        <div key={i} className="p-2 border rounded-md">
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className={`h-2 w-2 rounded-full ${
                                alert.severity === 'High' ? 'bg-destructive' : 
                                alert.severity === 'Medium' ? 'bg-warning' : 'bg-info'
                              }`} 
                            />
                            <span className="text-sm font-medium">{alert.severity} priority</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Detailed Prediction Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
