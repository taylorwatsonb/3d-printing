
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle2, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface AlertPanelProps {
  alerts: Alert[];
  className?: string;
}

const AlertPanel = ({ alerts, className }: AlertPanelProps) => {
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);
  
  // Toggle alert expansion
  const toggleAlertExpansion = (alertId: string) => {
    if (expandedAlerts.includes(alertId)) {
      setExpandedAlerts(expandedAlerts.filter(id => id !== alertId));
    } else {
      setExpandedAlerts([...expandedAlerts, alertId]);
      
      // Track alert viewed
      trackEvent('alerts', 'view_details', alertId);
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };
  
  // Get icon based on alert type
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return <AlertCircle size={18} className="text-destructive" />;
      case "warning":
        return <AlertTriangle size={18} className="text-warning" />;
      case "info":
        return <Info size={18} className="text-info" />;
      case "success":
        return <CheckCircle2 size={18} className="text-success" />;
      default:
        return <Bell size={18} />;
    }
  };
  
  // Get background color based on alert type
  const getAlertBackground = (type: Alert["type"], acknowledged: boolean) => {
    if (acknowledged) return "bg-background hover:bg-accent/50";
    
    switch (type) {
      case "error":
        return "bg-destructive/5 hover:bg-destructive/10";
      case "warning":
        return "bg-warning/5 hover:bg-warning/10";
      case "info":
        return "bg-info/5 hover:bg-info/10";
      case "success":
        return "bg-success/5 hover:bg-success/10";
      default:
        return "bg-background hover:bg-accent/50";
    }
  };
  
  // Acknowledge alert
  const acknowledgeAlert = (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    // This would typically make an API call to acknowledge the alert
    trackEvent('alerts', 'acknowledge', alertId);
  };
  
  // Filter alerts by type for count
  const errorCount = alerts.filter(alert => alert.type === "error" && !alert.acknowledged).length;
  const warningCount = alerts.filter(alert => alert.type === "warning" && !alert.acknowledged).length;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Alerts & Notifications
          </CardTitle>
          <div className="flex gap-3 text-xs">
            {errorCount > 0 && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-destructive mr-1.5"></div>
                <span>{errorCount} error{errorCount !== 1 ? 's' : ''}</span>
              </div>
            )}
            {warningCount > 0 && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-warning mr-1.5"></div>
                <span>{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Bell size={24} className="mb-2" />
              <p>No alerts or notifications</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-3 rounded-md transition-all cursor-pointer",
                  getAlertBackground(alert.type, alert.acknowledged),
                  expandedAlerts.includes(alert.id) ? "shadow-sm" : ""
                )}
                onClick={() => toggleAlertExpansion(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">
                        {alert.message}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    
                    {expandedAlerts.includes(alert.id) && (
                      <div className="mt-2 space-y-2 text-sm animate-slide-down">
                        {alert.machine && (
                          <div className="text-muted-foreground">
                            Machine: <span className="font-medium">{alert.machine}</span>
                          </div>
                        )}
                        {alert.order && (
                          <div className="text-muted-foreground">
                            Order: <span className="font-medium">{alert.order}</span>
                          </div>
                        )}
                        <div className="text-muted-foreground">
                          Time: <span className="font-medium">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {!alert.acknowledged && (
                          <button
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                            onClick={(e) => acknowledgeAlert(e, alert.id)}
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertPanel;
