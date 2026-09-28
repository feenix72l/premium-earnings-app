export async function fetchWorkers() {
  try {
    const res = await fetch('http://localhost:4000/api/workers');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch workers:', error);
    return [];
  }
}

export async function fetchWorker(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/workers/${id}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch worker:', error);
    return null;
  }
}

export async function startSession(workerId: string) {
  try {
    const res = await fetch('http://localhost:4000/api/sessions/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Failed to start session:', error);
    return null;
  }
}

export async function stopSession(workerId: string) {
  try {
    const res = await fetch('http://localhost:4000/api/sessions/stop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Failed to stop session:', error);
    return null;
  }
}

export async function getSession(workerId: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/sessions/${workerId}`);
    if (!res.ok) throw new Error('No active session');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch session:', error);
    return null;
  }
}

export async function fetchDashboard() {
  try {
    const res = await fetch('http://localhost:4000/api/dashboard');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch dashboard:', error);
    return null;
  }
}

export async function fetchBtcPrice() {
  try {
    const res = await fetch('http://localhost:4000/api/btc/price');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch BTC price:', error);
    return { usd: 64800 };
  }
}

export async function loginWorker(email: string, password: string) {
  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error('Failed to login:', error);
    return null;
  }
}
