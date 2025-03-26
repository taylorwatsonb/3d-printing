
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import Navbar from "@/components/Navbar";
import ProductionMetrics from "@/components/ProductionMetrics";
import MachineStatus from "@/components/MachineStatus";
import OrderStatus from "@/components/OrderStatus";
import AlertPanel from "@/components/AlertPanel";
import { initGA, trackPageView } from "@/utils/analytics";
import { Machine, ProductionMetric, Order, Alert } from "@/utils/types";
import { 
  fetchMachines, 
  fetchProductionMetrics, 
  fetchOrders, 
  fetchAlerts,
  subscribeToUpdates 
} from "@/utils/supabaseClient";

const Index = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [metrics, setMetrics] = useState<ProductionMetric[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize Google Analytics
    initGA('G-MEASUREMENT_ID'); // Replace with your actual GA ID in production
    trackPageView('/');
    
    // Initial data load
    const loadData = async () => {
      try {
        const [machinesData, metricsData, ordersData, alertsData] = await Promise.all([
          fetchMachines(),
          fetchProductionMetrics(),
          fetchOrders(),
          fetchAlerts()
        ]);
        
        setMachines(machinesData);
        setMetrics(metricsData);
        setOrders(ordersData);
        setAlerts(alertsData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading initial data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please refresh the page.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadData();
    
    // Subscribe to realtime updates
    const unsubscribe = subscribeToUpdates(({ machines, metrics, orders, alerts }) => {
      if (machines) setMachines(machines);
      if (metrics) setMetrics(metrics);
      if (orders) setOrders(orders);
      if (alerts) setAlerts(alerts);
    });
    
    // Clean up on unmount
    return () => {
      unsubscribe();
    };
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <DashboardHeader />
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MachineStatus machines={machines} className="md:col-span-1" />
              <AlertPanel alerts={alerts} className="md:col-span-1" />
              <OrderStatus orders={orders} className="md:col-span-1" />
            </div>
            
            <ProductionMetrics metrics={metrics} />
          </>
        )}
      </main>
      
      <footer className="border-t border-border/40 py-6 px-4 mt-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 3D Printing Production Dashboard
            </div>
            <div className="text-sm text-muted-foreground mt-2 md:mt-0">
              Real-time production monitoring and analytics
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
