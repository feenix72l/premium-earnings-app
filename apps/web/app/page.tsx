const workerData = [
  { name: 'Ava Stone', earnings: 1280, btc: 0.0126, active: true, target: 76 },
  { name: 'Jules Martin', earnings: 1525, btc: 0.0149, active: true, target: 82 },
  { name: 'Nia Brooks', earnings: 910, btc: 0.0091, active: false, target: 61 },
  { name: 'Theo Craig', earnings: 1180, btc: 0.0114, active: true, target: 73 },
];

export default function Page() {
  const totalEarnings = workerData.reduce((sum, worker) => sum + worker.earnings, 0);
  const activeWorkers = workerData.filter((worker) => worker.active).length;

  return (
    <main className="page-shell">
      <div className="topbar">
        <div>
          <p className="eyebrow">GoldMine Admin</p>
          <h1>Operations Dashboard</h1>
        </div>
        <button className="primaryButton">Export report</button>
      </div>

      <section className="statsGrid">
        <div className="statCard gold">
          <span>Gross revenue</span>
          <strong>${totalEarnings.toLocaleString()}</strong>
        </div>
        <div className="statCard">
          <span>Active workers</span>
          <strong>{activeWorkers}</strong>
        </div>
        <div className="statCard">
          <span>BTC tracked</span>
          <strong>0.156 BTC</strong>
        </div>
        <div className="statCard">
          <span>Pending payouts</span>
          <strong>$3,240</strong>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h2>Worker leaderboard</h2>
          <span>Live</span>
        </div>

        <div className="table">
          <div className="tableRow header">
            <span>Worker</span>
            <span>Earnings</span>
            <span>BTC</span>
            <span>Progress</span>
          </div>

          {workerData.map((worker) => (
            <div className="tableRow" key={worker.name}>
              <span>{worker.name}</span>
              <span>${worker.earnings}</span>
              <span>{worker.btc} BTC</span>
              <span>
                <div className="miniBar">
                  <i style={{ width: `${worker.target}%` }} />
                </div>
                {worker.target}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
