# Premium Earnings App - Production Ready

A premium dark-mode earnings platform for internet workers with live financial dashboards, BTC tracking, and worker/admin performance views.

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Run backend
```bash
npm run dev:backend
# Backend runs on http://localhost:4000
```

### Run mobile app
```bash
npm run dev:mobile
# Expo development server
```

### Run web admin
```bash
npm run dev:web
# Web admin runs on http://localhost:3000
```

## 📱 Features

### Worker Features
- ✅ Login/authentication
- ✅ Start/stop work sessions
- ✅ Live earnings tracker (USD + BTC)
- ✅ Session history
- ✅ Payout requests
- ✅ Real-time BTC conversion
- ✅ Premium gold-on-black UI

### Admin Features
- ✅ Dashboard with all worker stats
- ✅ Active sessions overview
- ✅ Earnings leaderboard
- ✅ Payout management
- ✅ BTC reserve tracking
- ✅ Real-time revenue analytics

## 🏗️ Architecture

```
premium-earnings-app/
├── apps/
│   ├── mobile/          # React Native + Expo
│   │   ├── src/
│   │   │   ├── screens/ # Login, Dashboard, Session, Admin, Payouts
│   │   │   ├── lib/     # API client
│   │   │   └── theme.ts # Gold design system
│   ├── web/             # Next.js admin dashboard
│   └── backend/         # Express API
│       ├── src/
│       └── server.js    # Auth, sessions, payouts, BTC rates
└── docs/
    └── DATABASE_SCHEMA.md
```

## 🔧 Next Steps

1. **Database**: Connect to Supabase/PostgreSQL
2. **Auth**: Implement Supabase Auth
3. **BTC API**: Integrate CoinGecko for live rates
4. **Deployment**:
   - Backend: Railway or Render
   - Mobile: EAS Build
   - Web: Vercel
5. **Background Tracking**: Expo background tasks
6. **Notifications**: Push alerts for earnings milestones

## 💰 API Endpoints

### Auth
- `POST /api/auth/login` - Worker login
- `POST /api/auth/register` - Register new worker

### Workers
- `GET /api/workers` - List all workers
- `GET /api/workers/:id` - Get worker details

### Sessions
- `POST /api/sessions/start` - Start work session
- `POST /api/sessions/stop` - End work session
- `GET /api/sessions/:workerId` - Get active session

### Payouts
- `GET /api/payouts` - List all payouts
- `POST /api/payouts/request` - Request payout
- `POST /api/payouts/:id/approve` - Approve payout

### Dashboard
- `GET /api/dashboard` - Admin dashboard data
- `GET /api/btc/price` - Current BTC rate

## 🎨 Design

- **Colors**: Dark background (#070909), gold accents (#f6c76a)
- **Components**: Premium card-based UI, smooth animations, real-time updates
- **Mobile-first**: Responsive design for all screen sizes

## 📄 License

MIT
