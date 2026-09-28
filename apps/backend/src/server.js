import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'premium-earnings-backend' });
});

app.get('/api/dashboard', (_req, res) => {
  res.json({
    totalRevenue: 15480,
    btcHeld: 0.156,
    activeWorkers: 18,
    pendingPayouts: 3240,
    workers: [
      { name: 'Ava Stone', earnings: 1280, btc: 0.0126, active: true, target: 76 },
      { name: 'Jules Martin', earnings: 1525, btc: 0.0149, active: true, target: 82 },
      { name: 'Nia Brooks', earnings: 910, btc: 0.0091, active: false, target: 61 },
      { name: 'Theo Craig', earnings: 1180, btc: 0.0114, active: true, target: 73 }
    ]
  });
});

app.get('/api/workers/:id', (req, res) => {
  const { id } = req.params;

  const worker = {
    id,
    name: 'Ava Stone',
    ratePerHour: 28,
    currentBalance: 4260.62,
    btcValue: 0.081,
    targetProgress: 86,
    status: 'active',
    session: {
      running: true,
      startedAt: new Date().toISOString(),
      elapsedMinutes: 84,
      currentEarnings: 1260
    }
  };

  res.json(worker);
});

app.listen(port, () => {
  console.log(`Premium earnings backend running on http://localhost:${port}`);
});
