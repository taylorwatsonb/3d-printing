
import { supabase } from "@/integrations/supabase/client";
import { 
  Machine, 
  ProductionMetric, 
  Order, 
  Alert,
  MachineStatus
} from "@/utils/types";

// Fetch machines from Supabase
export const fetchMachines = async (): Promise<Machine[]> => {
  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching machines:', error);
    return [];
  }
  
  return data.map(machine => ({
    id: machine.id,
    name: machine.name,
    status: machine.status as MachineStatus, // Cast to the correct type
    uptime: machine.uptime,
    throughput: machine.throughput,
    efficiency: machine.efficiency,
    printerType: machine.printer_type,
    material: machine.material,
    nozzleSize: machine.nozzle_size,
    lastMaintenance: machine.last_maintenance,
    nextMaintenance: machine.next_maintenance
  }));
};

// Fetch a single machine by ID
export const fetchMachineById = async (id: string): Promise<Machine | null> => {
  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching machine with id ${id}:`, error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    status: data.status as MachineStatus,
    uptime: data.uptime,
    throughput: data.throughput,
    efficiency: data.efficiency,
    printerType: data.printer_type,
    material: data.material,
    nozzleSize: data.nozzle_size,
    lastMaintenance: data.last_maintenance,
    nextMaintenance: data.next_maintenance
  };
};

// Fetch production metrics from Supabase
export const fetchProductionMetrics = async (): Promise<ProductionMetric[]> => {
  const { data, error } = await supabase
    .from('production_metrics')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching production metrics:', error);
    return [];
  }
  
  // For each metric, fetch its history data
  const metricsWithHistory = await Promise.all(
    data.map(async (metric) => {
      const { data: historyData, error: historyError } = await supabase
        .from('metric_history')
        .select('*')
        .eq('metric_id', metric.id)
        .order('recorded_at');
      
      if (historyError) {
        console.error(`Error fetching history for metric ${metric.id}:`, historyError);
        return {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          unit: metric.unit,
          change: metric.change,
          category: metric.category as "rendering" | "modeling" | "animation" | "general",
          data: []
        };
      }
      
      return {
        id: metric.id,
        name: metric.name,
        value: metric.value,
        unit: metric.unit,
        change: metric.change,
        category: metric.category as "rendering" | "modeling" | "animation" | "general",
        data: historyData.map(item => ({
          time: item.recorded_at,
          value: item.value
        }))
      };
    })
  );
  
  return metricsWithHistory;
};

// Fetch orders from Supabase
export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data.map(order => ({
    id: order.id,
    customer: order.customer,
    product: order.product,
    quantity: order.quantity,
    status: order.status as "pending" | "in-progress" | "completed" | "delayed",
    startDate: order.start_date,
    endDate: order.end_date,
    progress: order.progress,
    orderNumber: order.order_number
  }));
};

// Fetch alerts from Supabase
export const fetchAlerts = async (): Promise<Alert[]> => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*, machines(name), orders(order_number)')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
  
  return data.map(alert => ({
    id: alert.id,
    type: alert.type as "error" | "warning" | "info" | "success",
    message: alert.message,
    timestamp: alert.created_at,
    machine: alert.machines?.name,
    order: alert.orders?.order_number,
    acknowledged: alert.acknowledged
  }));
};

// Subscribe to realtime updates
export const subscribeToUpdates = (
  callback: (data: {
    machines?: Machine[],
    metrics?: ProductionMetric[],
    orders?: Order[],
    alerts?: Alert[]
  }) => void
) => {
  // Create channels for each table
  const machinesChannel = supabase
    .channel('machines-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'machines' },
      async () => {
        const machines = await fetchMachines();
        callback({ machines });
      }
    )
    .subscribe();
  
  const metricsChannel = supabase
    .channel('metrics-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'production_metrics' },
      async () => {
        const metrics = await fetchProductionMetrics();
        callback({ metrics });
      }
    )
    .subscribe();
  
  const ordersChannel = supabase
    .channel('orders-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      async () => {
        const orders = await fetchOrders();
        callback({ orders });
      }
    )
    .subscribe();
  
  const alertsChannel = supabase
    .channel('alerts-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'alerts' },
      async () => {
        const alerts = await fetchAlerts();
        callback({ alerts });
      }
    )
    .subscribe();
  
  // Return cleanup function
  return () => {
    supabase.removeChannel(machinesChannel);
    supabase.removeChannel(metricsChannel);
    supabase.removeChannel(ordersChannel);
    supabase.removeChannel(alertsChannel);
  };
};
