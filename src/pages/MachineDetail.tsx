
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { fetchMachineById } from "@/utils/supabaseClient";
import { Machine } from "@/utils/types";
import Navbar from "@/components/Navbar";
import { LineChart } from "@/components/LineChart";
import { 
  ArrowLeft, 
  Thermometer, 
  Timer, 
  AlertTriangle, 
  Clock, 
  Cylinder,
  RotateCcw,
  Wrench as Tool
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Mock temperature data - would be fetched from the server in a real app
  const [temperatureData, setTemperatureData] = useState([
    { time: '00:00', value: 205 },
    { time: '02:00', value: 210 },
    { time: '04:00', value: 208 },
    { time: '06:00', value: 215 },
    { time: '08:00', value: 212 },
    { time: '10:00', value: 210 },
    { time: '12:00', value: 218 },
  ]);
  
  // Mock sensor data - would be fetched from the server in a real app
  const [sensorReadings, setSensorReadings] = useState({
    hotend: 210,
    bed: 60,
    chamber: 42,
    filamentFlow: 95,
    fanSpeed: 80,
    motorTemp: 38
  });
  
  useEffect(() => {
    const loadMachineData = async () => {
      if (!id) return;
      
      try {
        const machineData = await fetchMachineById(id);
        setMachine(machineData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading machine data:", error);
        toast({
          title: "Error",
          description: "Failed to load machine data. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadMachineData();
    
    // Simulate real-time temperature updates
    const tempInterval = setInterval(() => {
      setTemperatureData(prev => {
        const newData = [...prev];
        // Add a new temperature reading
        const lastValue = newData[newData.length - 1].value;
        const newValue = Math.max(180, Math.min(230, lastValue + (Math.random() * 10 - 5)));
        
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        newData.push({ time: timeString, value: Math.round(newValue) });
        
        // Keep only last 8 readings
        if (newData.length > 8) {
          return newData.slice(newData.length - 8);
        }
        
        return newData;
      });
      
      // Update sensor readings
      setSensorReadings(prev => ({
        hotend: Math.max(180, Math.min(230, prev.hotend + (Math.random() * 6 - 3))),
        bed: Math.max(50, Math.min(70, prev.bed + (Math.random() * 4 - 2))),
        chamber: Math.max(35, Math.min(50, prev.chamber + (Math.random() * 3 - 1.5))),
        filamentFlow: Math.max(85, Math.min(100, prev.filamentFlow + (Math.random() * 5 - 2.5))),
        fanSpeed: Math.max(70, Math.min(95, prev.fanSpeed + (Math.random() * 5 - 2.5))),
        motorTemp: Math.max(30, Math.min(45, prev.motorTemp + (Math.random() * 3 - 1.5)))
      }));
      
    }, 5000);
    
    return () => {
      clearInterval(tempInterval);
    };
  }, [id, toast]);
  
  // Format status text
  const formatStatus = (status: Machine["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  // Get status color
  const getStatusColor = (status: Machine["status"]) => {
    switch (status) {
      case "operational":
        return "bg-success";
      case "maintenance":
        return "bg-warning";
      case "offline":
        return "bg-destructive";
      case "warning":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };
  
  const handleMaintenanceClick = () => {
    toast({
      title: "Maintenance scheduled",
      description: `Maintenance for ${machine?.name} has been scheduled.`,
    });
  };
  
  const handleCalibrationClick = () => {
    toast({
      title: "Calibration initiated",
      description: `Calibration sequence for ${machine?.name} has started.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {loading ? "Loading..." : machine?.name}
            </h1>
            {!loading && machine && (
              <div className={`h-3 w-3 rounded-full ${getStatusColor(machine.status)}`} />
            )}
          </div>
          
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          ) : machine ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Machine Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{formatStatus(machine.status)}</span>
                      
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{machine.printerType}</span>
                      
                      <span className="text-muted-foreground">Material:</span>
                      <span className="font-medium">{machine.material}</span>
                      
                      <span className="text-muted-foreground">Nozzle Size:</span>
                      <span className="font-medium">{machine.nozzleSize} mm</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{machine.efficiency.toFixed(1)}%</span>
                      </div>
                      <Progress value={machine.efficiency} className="h-2" />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Maintenance:</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex flex-col p-2 border rounded-md">
                          <span className="text-muted-foreground">Last</span>
                          <span>{formatDate(machine.lastMaintenance)}</span>
                        </div>
                        <div className="flex flex-col p-2 border rounded-md">
                          <span className="text-muted-foreground">Next</span>
                          <span>{formatDate(machine.nextMaintenance)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Real-time Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                          <Label className="text-sm">Hotend</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.hotend)}°C</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-1 text-orange-500" />
                          <Label className="text-sm">Bed</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.bed)}°C</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                          <Label className="text-sm">Chamber</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.chamber)}°C</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Cylinder className="h-4 w-4 mr-1 text-green-500" />
                          <Label className="text-sm">Flow Rate</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.filamentFlow)}%</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <RotateCcw className="h-4 w-4 mr-1 text-cyan-500" />
                          <Label className="text-sm">Fan Speed</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.fanSpeed)}%</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Tool className="h-4 w-4 mr-1 text-purple-500" />
                          <Label className="text-sm">Motor Temp</Label>
                        </div>
                        <span className="text-xl font-bold">{Math.round(sensorReadings.motorTemp)}°C</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Machine Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={handleMaintenanceClick}
                        className="w-full"
                        variant="outline"
                      >
                        <Tool className="h-4 w-4 mr-2" />
                        Schedule Maintenance
                      </Button>
                      
                      <Button 
                        onClick={handleCalibrationClick}
                        className="w-full"
                        variant="outline"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Run Calibration
                      </Button>
                      
                      <Button 
                        onClick={() => toast({
                          title: "Diagnostics initiated",
                          description: `Running diagnostics on ${machine.name}`
                        })}
                        className="w-full"
                        variant="outline"
                      >
                        <Timer className="h-4 w-4 mr-2" />
                        Run Diagnostics
                      </Button>
                      
                      <Button 
                        onClick={() => toast({
                          title: "Firmware check",
                          description: `Checking for firmware updates on ${machine.name}`
                        })}
                        className="w-full"
                        variant="outline"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Check Firmware
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button 
                        onClick={() => toast({
                          title: "Emergency stop activated",
                          description: `Emergency stop triggered for ${machine.name}`,
                          variant: "destructive",
                        })}
                        className="w-full"
                        variant="destructive"
                      >
                        Emergency Stop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="temperature" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="temperature">Temperature History</TabsTrigger>
                  <TabsTrigger value="jobs">Recent Jobs</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance Log</TabsTrigger>
                </TabsList>
                
                <TabsContent value="temperature" className="space-y-4">
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Temperature Readings</CardTitle>
                      <CardDescription>
                        Historical temperature data for hotend over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <LineChart 
                          data={temperatureData}
                          xAxisKey="time"
                          yAxisKey="value"
                          color="#ef4444"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="jobs">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Jobs</CardTitle>
                      <CardDescription>
                        Print jobs processed by this machine
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 p-3 text-sm font-medium border-b bg-muted/40">
                          <div>Job ID</div>
                          <div>Model</div>
                          <div>Material</div>
                          <div>Duration</div>
                          <div>Status</div>
                        </div>
                        <div className="divide-y">
                          <div className="grid grid-cols-5 p-3 text-sm">
                            <div>JOB-1234</div>
                            <div>Gear Assembly</div>
                            <div>PLA</div>
                            <div>2h 15m</div>
                            <div className="text-success">Completed</div>
                          </div>
                          <div className="grid grid-cols-5 p-3 text-sm">
                            <div>JOB-1233</div>
                            <div>Phone Stand</div>
                            <div>PETG</div>
                            <div>1h 30m</div>
                            <div className="text-success">Completed</div>
                          </div>
                          <div className="grid grid-cols-5 p-3 text-sm">
                            <div>JOB-1232</div>
                            <div>Prototype Case</div>
                            <div>ABS</div>
                            <div>4h 45m</div>
                            <div className="text-destructive">Failed</div>
                          </div>
                          <div className="grid grid-cols-5 p-3 text-sm">
                            <div>JOB-1231</div>
                            <div>Custom Knob</div>
                            <div>TPU</div>
                            <div>0h 45m</div>
                            <div className="text-success">Completed</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="maintenance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Maintenance History</CardTitle>
                      <CardDescription>
                        Record of maintenance activities for this machine
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                              <Tool className="h-4 w-4" />
                            </div>
                            <div className="w-px h-full bg-border"></div>
                          </div>
                          <div className="pb-8">
                            <div className="flex items-center mb-1">
                              <h3 className="text-sm font-medium mr-2">Nozzle Replacement</h3>
                              <span className="text-xs text-muted-foreground">2 weeks ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Replaced 0.4mm nozzle due to wear. Calibration performed after replacement.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                              <Tool className="h-4 w-4" />
                            </div>
                            <div className="w-px h-full bg-border"></div>
                          </div>
                          <div className="pb-8">
                            <div className="flex items-center mb-1">
                              <h3 className="text-sm font-medium mr-2">Belt Tensioning</h3>
                              <span className="text-xs text-muted-foreground">1 month ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Adjusted X and Y axis belt tension to manufacturer specifications.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                              <Tool className="h-4 w-4" />
                            </div>
                            <div className="w-px h-full bg-border"></div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="text-sm font-medium mr-2">Firmware Update</h3>
                              <span className="text-xs text-muted-foreground">2 months ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Updated firmware to version 5.2.1 to resolve thermal runaway protection issue.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <p className="text-muted-foreground">Machine not found. Please check the ID and try again.</p>
              <Button asChild className="mt-4">
                <Link to="/">Return to Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MachineDetail;
