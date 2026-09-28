export type WorkerStat = {
  name: string;
  ratePerHour: number;
  currentEarnings: number;
  btcValue: number;
  progress: number;
  target: number;
  active: boolean;
  sessionsToday: number;
};

export const workerStats: WorkerStat[] = [
  {
    name: 'Ava Stone',
    ratePerHour: 28,
    currentEarnings: 1280,
    btcValue: 0.0126,
    progress: 76,
    target: 1700,
    active: true,
    sessionsToday: 4,
  },
  {
    name: 'Jules Martin',
    ratePerHour: 32,
    currentEarnings: 1525,
    btcValue: 0.0149,
    progress: 82,
    target: 1850,
    active: true,
    sessionsToday: 5,
  },
  {
    name: 'Nia Brooks',
    ratePerHour: 24,
    currentEarnings: 910,
    btcValue: 0.0091,
    progress: 61,
    target: 1500,
    active: false,
    sessionsToday: 2,
  },
];

export const revenueSummary = {
  totalMonthly: 15480,
  totalBTC: 0.156,
  activeWorkers: 18,
  pendingPayouts: 3240,
};

export const quickStats = [
  { label: 'Today', value: '$3,480', accent: '#f6c76a' },
  { label: 'This week', value: '$18,420', accent: '#38d39f' },
  { label: 'Target', value: '86%', accent: '#f3b04d' },
  { label: 'BTC value', value: '0.156 BTC', accent: '#f5f5f5' },
];

export const activityFeed = [
  'Ava started a content task session',
  'Jules completed 3 article revisions',
  'New payout batch approved',
  'Nia reached 61% target today',
  'Bitcoin conversion updated in real time',
];
