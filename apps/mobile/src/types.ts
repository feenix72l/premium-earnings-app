export type WorkerStatus = 'active' | 'idle' | 'paused';

export type Worker = {
  id: string;
  name: string;
  role: string;
  ratePerHour: number;
  currentEarnings: number;
  btcValue: number;
  progress: number;
  target: number;
  status: WorkerStatus;
  sessionsToday: number;
  avatar: string;
};

export type RevenueSummary = {
  totalMonthly: number;
  totalBTC: number;
  activeWorkers: number;
  pendingPayouts: number;
};

export type StatTile = {
  label: string;
  value: string;
  accent: string;
};
