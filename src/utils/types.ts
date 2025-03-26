
// Machine status types
export type MachineStatus = 'operational' | 'maintenance' | 'offline' | 'warning';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  uptime: number;
  throughput: number;
  efficiency: number;
  printerType: string;
  material: string;
  nozzleSize?: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface ProductionMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  category: 'rendering' | 'modeling' | 'animation' | 'general';
  data: { time: string; value: number }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  quantity: number;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startDate: string;
  endDate: string;
  progress: number;
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
