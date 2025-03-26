
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAnalyticsData } from "@/utils/analytics";
import { Activity, Clock } from "lucide-react";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [analyticsSummary, setAnalyticsSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Update time every second
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsData();
        setAnalyticsSummary(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast({
          title: "Analytics Error",
          description: "Could not load analytics data. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchAnalytics();
    
    return () => {
      clearInterval(timerID);
    };
  }, [toast]);
  
  // Format date and time
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime);
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }).format(currentTime);
  
  return (
    <div className="w-full mb-6 px-1 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Live Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Production Overview</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <Clock size={16} className="mr-1.5" />
            <span className="text-sm">{formattedDate} | {formattedTime}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {loading ? (
            <div className="flex space-x-4 animate-pulse">
              <div className="h-16 w-32 rounded-md bg-secondary"></div>
              <div className="h-16 w-32 rounded-md bg-secondary"></div>
            </div>
          ) : (
            <>
              <div className="card-glass p-3 flex flex-col justify-center min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-primary" />
                  <span className="text-sm font-medium">Today's Visitors</span>
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-xl font-bold">{analyticsSummary?.visitors?.today || 0}</span>
                  <span className={`text-xs ${analyticsSummary?.visitors?.change > 0 ? 'metric-up' : 'metric-down'}`}>
                    {analyticsSummary?.visitors?.change > 0 ? '+' : ''}{analyticsSummary?.visitors?.change || 0}%
                  </span>
                </div>
              </div>
              
              <div className="card-glass p-3 flex flex-col justify-center min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-primary" />
                  <span className="text-sm font-medium">Active Sessions</span>
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-xl font-bold">{analyticsSummary?.sessions?.today || 0}</span>
                  <span className={`text-xs ${analyticsSummary?.sessions?.change > 0 ? 'metric-up' : 'metric-down'}`}>
                    {analyticsSummary?.sessions?.change > 0 ? '+' : ''}{analyticsSummary?.sessions?.change || 0}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
