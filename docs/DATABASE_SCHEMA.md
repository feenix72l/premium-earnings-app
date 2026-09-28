# Create database tables

## Workers table
```sql
CREATE TABLE workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  rate_per_hour DECIMAL(10, 2) NOT NULL DEFAULT 25,
  total_earnings DECIMAL(15, 2) NOT NULL DEFAULT 0,
  btc_value DECIMAL(20, 8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Sessions table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMP,
  duration_hours DECIMAL(10, 4),
  earnings DECIMAL(15, 2),
  btc_earned DECIMAL(20, 8),
  status TEXT DEFAULT 'running',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Payouts table
```sql
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  btc_amount DECIMAL(20, 8),
  status TEXT DEFAULT 'pending',
  wallet_address TEXT,
  transaction_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP
);
```

## BTC rates table (for tracking conversion rates)
```sql
CREATE TABLE btc_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_usd DECIMAL(20, 2) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## Admin users table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```
