
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Machine } from "@/utils/mockData";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MachineStatusProps {
  machines: Machine[];
  className?: string;
}

const MachineStatus = ({ machines, className }: MachineStatusProps) => {
  const { toast } = useToast();
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  
  // Show details for a machine
  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
  };
  
  // Get status color based on machine status
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
  
  // Show details modal when a machine is selected
  useEffect(() => {
    if (selectedMachine) {
      toast({
        title: selectedMachine.name,
        description: (
          <div className="mt-2 space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">{formatStatus(selectedMachine.status)}</span>
              
              <span className="text-muted-foreground">Uptime:</span>
              <span className="font-medium">{selectedMachine.uptime.toFixed(1)}%</span>
              
              <span className="text-muted-foreground">Throughput:</span>
              <span className="font-medium">{selectedMachine.throughput} units/hr</span>
              
              <span className="text-muted-foreground">Efficiency:</span>
              <span className="font-medium">{selectedMachine.efficiency.toFixed(1)}%</span>
              
              <span className="text-muted-foreground">Last Maintenance:</span>
              <span className="font-medium">{formatDate(selectedMachine.lastMaintenance)}</span>
              
              <span className="text-muted-foreground">Next Maintenance:</span>
              <span className="font-medium">{formatDate(selectedMachine.nextMaintenance)}</span>
            </div>
          </div>
        ),
      });
    }
  }, [selectedMachine, toast]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Machine Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {machines.map((machine) => (
            <div
              key={machine.id}
              className="flex flex-col space-y-1.5 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors"
              onClick={() => handleMachineClick(machine)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2.5 w-2.5 rounded-full", getStatusColor(machine.status))}></div>
                  <span className="font-medium">{machine.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {machine.throughput} units/hr
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Uptime</span>
                    <span>{machine.uptime.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={machine.uptime} 
                    className={cn(
                      "h-1.5", 
                      machine.uptime > 90 
                        ? "bg-muted [&>div]:bg-success" 
                        : machine.uptime > 70 
                          ? "bg-muted [&>div]:bg-warning" 
                          : "bg-muted [&>div]:bg-destructive"
                    )} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineStatus;
