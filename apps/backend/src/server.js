import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessions = new Map();
const workers = new Map();

const mockWorkers = [
  { id: 'w1', name: 'Ava Stone', email: 'ava@goldmine.io', ratePerHour: 28, totalEarnings: 1280, btcValue: 0.0126 },
  { id: 'w2', name: 'Jules Martin', email: 'jules@goldmine.io', ratePerHour: 32, totalEarnings: 1525, btcValue: 0.0149 },
  { id: 'w3', name: 'Nia Brooks', email: 'nia@goldmine.io', ratePerHour: 24, totalEarnings: 910, btcValue: 0.0091 },
  { id: 'w4', name: 'Theo Craig', email: 'theo@goldmine.io', ratePerHour: 27, totalEarnings: 1180, btcValue: 0.0114 },
];

mockWorkers.forEach((w) => workers.set(w.id, w));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'premium-earnings-backend', timestamp: new Date().toISOString() });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
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

app.get('/api/workers', (_req, res) => {
  const workerList = Array.from(workers.values()).map((w) => ({
    id: w.id,
    name: w.name,
    ratePerHour: w.ratePerHour,
    totalEarnings: w.totalEarnings,
    btcValue: w.btcValue,
    active: sessions.has(w.id),
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
  });
});

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
  const btcEarnings = (earnings / 64800).toFixed(4);

  worker.totalEarnings += earnings;
  worker.btcValue = parseFloat(btcEarnings);

  sessions.delete(workerId);

  res.json({
    success: true,
    session: {
      ...session,
      endedAt: endedAt.toISOString(),
      durationHours: durationHours.toFixed(2),
      earnings: earnings.toFixed(2),
      btcEarnings,
    },
  });
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
  const btcEquivalent = (Number(currentEarnings) / 64800).toFixed(4);

  res.json({
    ...session,
    elapsedMs,
    elapsedHours: elapsedHours.toFixed(2),
    currentEarnings,
    btcEquivalent,
  });
});

app.get('/api/dashboard', (_req, res) => {
  const allWorkers = Array.from(workers.values());
  const totalEarnings = allWorkers.reduce((sum, w) => sum + w.totalEarnings, 0);
  const totalBtc = allWorkers.reduce((sum, w) => sum + w.btcValue, 0);
  const activeWorkers = Array.from(sessions.keys()).length;

  res.json({
    totalEarnings: totalEarnings.toFixed(2),
    totalBtc: totalBtc.toFixed(4),
    activeWorkers,
    totalWorkers: allWorkers.length,
    workers: allWorkers.map((w) => ({
      id: w.id,
      name: w.name,
      earnings: w.totalEarnings.toFixed(2),
      btc: w.btcValue.toFixed(4),
      active: sessions.has(w.id),
    })),
  });
});

app.get('/api/btc/price', (_req, res) => {
  res.json({ usd: 64800, timestamp: new Date().toISOString(), source: 'mock' });
});

app.listen(port, () => {
  console.log(`🚀 Premium earnings backend running on http://localhost:${port}`);
});
