import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory storage (replace with Supabase)
const workers = new Map();
const sessions = new Map();
const payouts = new Map();

let btcRate = 64800;

// Mock data
const mockWorkers = [
  { id: 'w1', name: 'Ava Stone', email: 'ava@goldmine.io', ratePerHour: 28, totalEarnings: 1280, btcValue: 0.0126, createdAt: new Date() },
  { id: 'w2', name: 'Jules Martin', email: 'jules@goldmine.io', ratePerHour: 32, totalEarnings: 1525, btcValue: 0.0149, createdAt: new Date() },
  { id: 'w3', name: 'Nia Brooks', email: 'nia@goldmine.io', ratePerHour: 24, totalEarnings: 910, btcValue: 0.0091, createdAt: new Date() },
  { id: 'w4', name: 'Theo Craig', email: 'theo@goldmine.io', ratePerHour: 27, totalEarnings: 1180, btcValue: 0.0114, createdAt: new Date() },
];

mockWorkers.forEach((w) => workers.set(w.id, w));

// ============ HEALTH CHECK ============
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'premium-earnings-backend', timestamp: new Date().toISOString() });
});

// ============ BTC PRICE ============
app.get('/api/btc/price', (_req, res) => {
  res.json({ usd: btcRate, timestamp: new Date().toISOString(), source: 'mock' });
});

app.post('/api/btc/update-rate', (req, res) => {
  const { rate } = req.body;
  if (rate && typeof rate === 'number') {
    btcRate = rate;
    res.json({ success: true, rate });
  } else {
    res.status(400).json({ error: 'Invalid rate' });
  }
});

// ============ AUTH ============
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const worker = Array.from(workers.values()).find((w) => w.email === email);

  if (!worker) {
    return res.status(401).json({ error: 'Worker not found' });
  }

  res.json({
    success: true,
    worker: {
      id: worker.id,
      name: worker.name,
      email: worker.email,
      ratePerHour: worker.ratePerHour,
    },
    token: `token_${worker.id}_${Date.now()}`,
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, ratePerHour } = req.body;
  const newWorker = {
    id: `w${Date.now()}`,
    name,
    email,
    ratePerHour: ratePerHour || 25,
    totalEarnings: 0,
    btcValue: 0,
    createdAt: new Date(),
  };
  workers.set(newWorker.id, newWorker);
  res.json({ success: true, worker: newWorker });
});

// ============ WORKERS ============
app.get('/api/workers', (_req, res) => {
  const workerList = Array.from(workers.values()).map((w) => ({
    id: w.id,
    name: w.name,
    email: w.email,
    ratePerHour: w.ratePerHour,
    totalEarnings: w.totalEarnings,
    btcValue: w.btcValue,
    active: sessions.has(w.id),
    createdAt: w.createdAt,
  }));
  res.json(workerList);
});

app.get('/api/workers/:id', (req, res) => {
  const worker = workers.get(req.params.id);
  if (!worker) {
    return res.status(404).json({ error: 'Worker not found' });
  }

  const session = sessions.get(worker.id);
  res.json({
    id: worker.id,
    name: worker.name,
    email: worker.email,
    ratePerHour: worker.ratePerHour,
    totalEarnings: worker.totalEarnings,
    btcValue: worker.btcValue,
    sessionActive: !!session,
    session: session || null,
    createdAt: worker.createdAt,
  });
});

// ============ SESSIONS ============
app.post('/api/sessions/start', (req, res) => {
  const { workerId } = req.body;
  const worker = workers.get(workerId);

  if (!worker) {
    return res.status(404).json({ error: 'Worker not found' });
  }

  const session = {
    id: `session_${workerId}_${Date.now()}`,
    workerId,
    startedAt: new Date().toISOString(),
    status: 'running',
  };

  sessions.set(workerId, session);
  res.json({ success: true, session });
});

app.post('/api/sessions/stop', (req, res) => {
  const { workerId } = req.body;
  const session = sessions.get(workerId);

  if (!session) {
    return res.status(404).json({ error: 'No active session' });
  }

  const endedAt = new Date();
  const startTime = new Date(session.startedAt);
  const durationMs = endedAt.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);

  const worker = workers.get(workerId);
  const earnings = durationHours * worker.ratePerHour;
  const btcEarnings = (earnings / btcRate).toFixed(8);

  worker.totalEarnings += earnings;
  worker.btcValue = (parseFloat(worker.btcValue) + parseFloat(btcEarnings)).toFixed(8);

  const completedSession = {
    ...session,
    endedAt: endedAt.toISOString(),
    durationHours: durationHours.toFixed(4),
    earnings: earnings.toFixed(2),
    btcEarnings,
  };

  sessions.delete(workerId);

  res.json({ success: true, session: completedSession });
});

app.get('/api/sessions/:workerId', (req, res) => {
  const session = sessions.get(req.params.workerId);
  if (!session) {
    return res.status(404).json({ error: 'No active session' });
  }

  const now = new Date();
  const startTime = new Date(session.startedAt);
  const elapsedMs = now.getTime() - startTime.getTime();
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  const worker = workers.get(req.params.workerId);
  const currentEarnings = (elapsedHours * worker.ratePerHour).toFixed(2);
  const btcEquivalent = (Number(currentEarnings) / btcRate).toFixed(8);

  res.json({
    ...session,
    elapsedMs,
    elapsedHours: elapsedHours.toFixed(4),
    currentEarnings,
    btcEquivalent,
  });
});

// ============ PAYOUTS ============
app.get('/api/payouts', (_req, res) => {
  const payoutList = Array.from(payouts.values());
  res.json(payoutList);
});

app.get('/api/payouts/:workerId', (req, res) => {
  const workerPayouts = Array.from(payouts.values()).filter((p) => p.workerId === req.params.workerId);
  res.json(workerPayouts);
});

app.post('/api/payouts/request', (req, res) => {
  const { workerId, amount, btcAmount, walletAddress } = req.body;
  const worker = workers.get(workerId);

  if (!worker) {
    return res.status(404).json({ error: 'Worker not found' });
  }

  const payout = {
    id: `payout_${workerId}_${Date.now()}`,
    workerId,
    amount,
    btcAmount,
    walletAddress,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  payouts.set(payout.id, payout);
  res.json({ success: true, payout });
});

app.post('/api/payouts/:id/approve', (req, res) => {
  const payout = payouts.get(req.params.id);
  if (!payout) {
    return res.status(404).json({ error: 'Payout not found' });
  }

  payout.status = 'processed';
  payout.processedAt = new Date().toISOString();

  res.json({ success: true, payout });
});

// ============ DASHBOARD ============
app.get('/api/dashboard', (_req, res) => {
  const allWorkers = Array.from(workers.values());
  const totalEarnings = allWorkers.reduce((sum, w) => sum + w.totalEarnings, 0);
  const totalBtc = allWorkers.reduce((sum, w) => sum + parseFloat(w.btcValue || 0), 0);
  const activeWorkers = Array.from(sessions.keys()).length;
  const pendingPayouts = Array.from(payouts.values())
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  res.json({
    totalEarnings: totalEarnings.toFixed(2),
    totalBtc: totalBtc.toFixed(8),
    activeWorkers,
    totalWorkers: allWorkers.length,
    pendingPayouts: pendingPayouts.toFixed(2),
    btcRate,
    workers: allWorkers.map((w) => ({
      id: w.id,
      name: w.name,
      email: w.email,
      earnings: w.totalEarnings.toFixed(2),
      btc: parseFloat(w.btcValue).toFixed(8),
      active: sessions.has(w.id),
    })),
  });
});

app.listen(port, () => {
  console.log(`\n🚀 Premium earnings backend v2 running on http://localhost:${port}`);
  console.log(`📊 Dashboard: GET /api/dashboard`);
  console.log(`💳 BTC Price: GET /api/btc/price`);
  console.log(`👥 Workers: GET /api/workers`);
  console.log(`⚙️  Sessions: POST /api/sessions/start\n`);
});
