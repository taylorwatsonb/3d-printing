
// Generate realistic production data

// Machine Status Types
export type MachineStatus = 'operational' | 'maintenance' | 'offline' | 'warning';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  uptime: number; // percentage
  throughput: number; // units per hour
  efficiency: number; // percentage
  lastMaintenance: string; // ISO date string
  nextMaintenance: string; // ISO date string
}

export interface ProductionMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number; // percentage change
  data: { time: string; value: number }[]; // historical data
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startDate: string;
  endDate: string;
  progress: number; // percentage
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  machine?: string;
  order?: string;
  acknowledged: boolean;
}

// Generate mock machines data
export const getMachines = (): Machine[] => {
  return [
    {
      id: '001',
      name: 'Assembly Line A',
      status: 'operational',
      uptime: 98.5,
      throughput: 120,
      efficiency: 94.2,
      lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '002',
      name: 'Packaging Unit B',
      status: 'warning',
      uptime: 87.3,
      throughput: 90,
      efficiency: 82.1,
      lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '003',
      name: 'Inspection Station C',
      status: 'maintenance',
      uptime: 0,
      throughput: 0,
      efficiency: 0,
      lastMaintenance: new Date().toISOString(),
      nextMaintenance: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '004',
      name: 'Robotic Arm D',
      status: 'operational',
      uptime: 99.2,
      throughput: 150,
      efficiency: 97.8,
      lastMaintenance: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '005',
      name: 'Conveyor System E',
      status: 'operational',
      uptime: 95.7,
      throughput: 200,
      efficiency: 91.3,
      lastMaintenance: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '006',
      name: 'Quality Control F',
      status: 'offline',
      uptime: 0,
      throughput: 0,
      efficiency: 0,
      lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      nextMaintenance: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

// Generate historical time series data
const generateTimeSeriesData = (
  days: number,
  minValue: number,
  maxValue: number,
  trend: 'up' | 'down' | 'stable' = 'stable'
) => {
  const data = [];
  const now = new Date();
  let value = (minValue + maxValue) / 2;
  const trendFactor = trend === 'up' ? 1 : trend === 'down' ? -1 : 0;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Add small random fluctuation + slight trend
    const randomChange = Math.random() * (maxValue - minValue) * 0.08;
    const trendChange = (maxValue - minValue) * 0.01 * trendFactor;
    
    value = Math.max(minValue, Math.min(maxValue, value + randomChange + trendChange));
    
    data.push({
      time: date.toISOString(),
      value: Number(value.toFixed(1)),
    });
  }
  
  return data;
};

// Generate production metrics
export const getProductionMetrics = (): ProductionMetric[] => {
  return [
    {
      id: 'metric001',
      name: 'Daily Production',
      value: 1250,
      unit: 'units',
      change: 5.2,
      data: generateTimeSeriesData(30, 900, 1400, 'up'),
    },
    {
      id: 'metric002',
      name: 'Average Throughput',
      value: 52,
      unit: 'units/hour',
      change: 2.8,
      data: generateTimeSeriesData(30, 40, 60, 'up'),
    },
    {
      id: 'metric003',
      name: 'Defect Rate',
      value: 1.3,
      unit: '%',
      change: -0.5,
      data: generateTimeSeriesData(30, 0.8, 2.5, 'down'),
    },
    {
      id: 'metric004',
      name: 'Overall Equipment Effectiveness',
      value: 87.5,
      unit: '%',
      change: 1.2,
      data: generateTimeSeriesData(30, 80, 95, 'up'),
    },
    {
      id: 'metric005',
      name: 'Energy Consumption',
      value: 345,
      unit: 'kWh',
      change: -2.1,
      data: generateTimeSeriesData(30, 300, 400, 'down'),
    },
    {
      id: 'metric006',
      name: 'Labor Hours',
      value: 120,
      unit: 'hours',
      change: 0,
      data: generateTimeSeriesData(30, 110, 130, 'stable'),
    },
  ];
};

// Generate orders
export const getOrders = (): Order[] => {
  return [
    {
      id: 'ORD-1001',
      customer: 'Acme Corp',
      product: 'Smart Device X1',
      quantity: 500,
      status: 'in-progress',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 62,
    },
    {
      id: 'ORD-1002',
      customer: 'TechGiant Inc',
      product: 'Circuit Board A-3',
      quantity: 1200,
      status: 'pending',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 0,
    },
    {
      id: 'ORD-1003',
      customer: 'Quantum Systems',
      product: 'Sensor Array B2',
      quantity: 300,
      status: 'completed',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
    },
    {
      id: 'ORD-1004',
      customer: 'Nexus Enterprises',
      product: 'Control Panel CP-5',
      quantity: 150,
      status: 'delayed',
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 45,
    },
    {
      id: 'ORD-1005',
      customer: 'Future Industries',
      product: 'Power Module PM-X',
      quantity: 800,
      status: 'in-progress',
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 28,
    },
  ];
};

// Generate alerts
export const getAlerts = (): Alert[] => {
  return [
    {
      id: 'alert001',
      type: 'error',
      message: 'Assembly Line A: Temperature exceeding threshold',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      machine: 'Assembly Line A',
      acknowledged: false,
    },
    {
      id: 'alert002',
      type: 'warning',
      message: 'Order ORD-1004 is behind schedule',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      order: 'ORD-1004',
      acknowledged: true,
    },
    {
      id: 'alert003',
      type: 'info',
      message: 'Maintenance scheduled for Inspection Station C',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      machine: 'Inspection Station C',
      acknowledged: true,
    },
    {
      id: 'alert004',
      type: 'warning',
      message: 'Packaging Unit B: Efficiency below target',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      machine: 'Packaging Unit B',
      acknowledged: false,
    },
    {
      id: 'alert005',
      type: 'success',
      message: 'Order ORD-1003 completed successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      order: 'ORD-1003',
      acknowledged: true,
    },
  ];
};

// Function to simulate real-time data updates
export const simulateRealTimeUpdates = (
  callback: (data: {
    machines: Machine[];
    metrics: ProductionMetric[];
    orders: Order[];
    alerts: Alert[];
  }) => void,
  interval = 5000
) => {
  let machines = getMachines();
  let metrics = getProductionMetrics();
  let orders = getOrders();
  let alerts = getAlerts();
  
  // Initial data
  callback({ machines, metrics, orders, alerts });
  
  // Update data periodically
  const intervalId = setInterval(() => {
    // Update machine statuses (small chance of status change)
    machines = machines.map(machine => {
      if (Math.random() < 0.05) {
        const statuses: MachineStatus[] = ['operational', 'maintenance', 'offline', 'warning'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return { ...machine, status: newStatus };
      }
      
      // Small fluctuations in metrics
      return {
        ...machine,
        uptime: machine.status === 'operational' ? Math.min(100, machine.uptime + (Math.random() * 2 - 1)) : machine.uptime,
        throughput: machine.status === 'operational' ? Math.max(0, machine.throughput + (Math.random() * 10 - 5)) : 0,
        efficiency: machine.status === 'operational' ? Math.min(100, Math.max(0, machine.efficiency + (Math.random() * 2 - 1))) : 0,
      };
    });
    
    // Update production metrics
    metrics = metrics.map(metric => {
      const lastValue = metric.data[metric.data.length - 1].value;
      const newValue = Math.max(0, lastValue + (Math.random() * 10 - 5));
      const change = ((newValue - lastValue) / lastValue) * 100;
      
      // Add new data point
      const newData = [...metric.data];
      if (newData.length > 30) newData.shift();
      newData.push({
        time: new Date().toISOString(),
        value: Number(newValue.toFixed(1)),
      });
      
      return {
        ...metric,
        value: Number(newValue.toFixed(1)),
        change: Number(change.toFixed(1)),
        data: newData,
      };
    });
    
    // Update order progress
    orders = orders.map(order => {
      if (order.status === 'in-progress') {
        const newProgress = Math.min(100, order.progress + Math.random() * 2);
        const newStatus = newProgress >= 100 ? 'completed' : order.status;
        return { ...order, progress: newProgress, status: newStatus };
      }
      return order;
    });
    
    // Small chance of new alert
    if (Math.random() < 0.1) {
      const alertTypes = ['error', 'warning', 'info', 'success'] as const;
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const randomMachine = machines[Math.floor(Math.random() * machines.length)];
      
      const newAlert: Alert = {
        id: `alert${Date.now()}`,
        type: alertType,
        message: `${randomMachine.name}: ${alertType === 'error' ? 'Critical error detected' : 
          alertType === 'warning' ? 'Performance issue detected' : 
          alertType === 'info' ? 'Status update' : 
          'Performing optimally'}`,
        timestamp: new Date().toISOString(),
        machine: randomMachine.name,
        acknowledged: false,
      };
      
      alerts = [newAlert, ...alerts].slice(0, 10); // Keep only the 10 most recent alerts
    }
    
    // Send updated data
    callback({ machines, metrics, orders, alerts });
  }, interval);
  
  // Return function to clear interval
  return () => clearInterval(intervalId);
};
