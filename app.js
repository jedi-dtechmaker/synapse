/* =====================================================
   Synapse · app.js
   Real-time analytics dashboard & 3D telemetry explorer for a2a.family
   Quest: #dashboard | api.a2a.family/feed + /stats + /agents
   ===================================================== */

const API = 'https://api.a2a.family';
const POLL_INTERVAL = 15_000; // 15 seconds

const AGENT_ICONS = {
  oracle:   '🔮', scout:    '🧭', sentinel: '🛡️',
  vision:   '👁️', quill:    '✍️', ledger:   '📒',
  atlas:    '🗺️', broker:   '🤝', courier:  '📦',
  default:  '🤖'
};

const ASSET_COLORS = {
  USDG:  'linear-gradient(90deg, #98FB59, #5bf5cc)',
  ETH:   'linear-gradient(90deg, #818cf8, #a78bfa)',
  A2A:   'linear-gradient(90deg, #a78bfa, #ec4899)',
  PONS:  'linear-gradient(90deg, #f59e0b, #ef4444)',
  ORBIO: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
};

// ─── State ──────────────────────────────────────────
let state = {
  agents: [],
  feed:   [],
  stats:  {},
  sortBy: 'earned'
};

// ─── Fetch helpers ──────────────────────────────────
async function fetchJSON(path) {
  const res = await fetch(API + path);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${path}`);
  return res.json();
}

async function loadAll() {
  const [stats, agents, feed] = await Promise.all([
    fetchJSON('/stats'),
    fetchJSON('/agents'),
    fetchJSON('/feed'),
  ]);
  return { stats, agents: agents.agents || [], feed: feed.rows || [] };
}

// ─── Renderers ──────────────────────────────────────
function renderKPIs(stats) {
  animateCount('val-agents',  stats.agents   || 0, 0);
  animateCount('val-calls',   stats.callsAll || 0, 0);
  animateFloat('val-settled', stats.settledAll || 0, 2, '$');
  animateCount('val-latency', stats.p50ms    || 0, 0, '', 'ms');

  document.getElementById('sub-agents').textContent
    = `${stats.live || 0} online`;
  document.getElementById('sub-calls').textContent
    = `${stats.calls24h || 0} today`;
  document.getElementById('sub-settled').textContent
    = `${(stats.settled24h || 0).toFixed(2)} USDG today`;
  document.getElementById('sub-latency').textContent = 'p50 response time';
}

function renderAgents(agents, sortBy) {
  const sorted = [...agents].sort((a, b) => {
    if (sortBy === 'earned') return parseFloat(b.earned) - parseFloat(a.earned);
    return (b.calls || 0) - (a.calls || 0);
  });

  const list = document.getElementById('agentList');
  list.innerHTML = sorted.map((ag, i) => {
    const rank      = i + 1;
    const rankClass = rank <= 3 ? `top-${rank}` : '';
    const earned    = parseFloat(ag.earned || 0).toFixed(2);
    const icon      = getAgentIcon(ag.id);
    const payTag    = getPayTag(ag.pay, ag.accepts);
    const calls     = ag.calls || 0;
    const docs      = ag.docs  || 0;

    return `
      <div class="agent-row" onclick="window.flyToAgent?.('${ag.id}')" title="Click to inspect in 3D Galaxy" style="cursor:pointer">
        <span class="agent-rank ${rankClass}">#${rank}</span>
        <div class="agent-info">
          <div class="agent-name">${icon} ${ag.name}</div>
          <div class="agent-meta">
            ${payTag}
            <span>${docs} docs · ${ag.skills ? ag.skills.slice(0,2).join(', ') : ''}</span>
          </div>
        </div>
        <div class="agent-stats">
          <div class="agent-earned">${earned === '0.00' ? 'Free' : '$' + earned}</div>
          <div class="agent-calls">${calls.toLocaleString()} calls</div>
        </div>
      </div>`;
  }).join('');
}

function renderFeed(rows) {
  const list = document.getElementById('feedList');
  document.getElementById('feedCount').textContent = `${rows.length} txs loaded`;

  list.innerHTML = rows.map(row => {
    const amount = row.amount ? `$${parseFloat(row.amount).toFixed(2)}` : 'free';
    const asset  = row.asset  || '';
    const icon   = getAgentIcon(row.agentName?.toLowerCase() || '');
    const time   = row.at ? timeAgo(new Date(row.at)) : '—';
    const txShort = row.tx ? row.tx.slice(0, 8) + '…' + row.tx.slice(-6) : '—';
    const explorerUrl = row.explorer || `https://robinhoodchain.blockscout.com/tx/${row.tx}`;
    const agentLabel = row.agentName || row.agent || 'Unknown';
    const skill  = row.skill ? ` · ${row.skill}` : '';

    return `
      <div class="feed-item" onclick="window.flyToAgent?.('${agentLabel}')" title="Click to inspect in 3D Galaxy" style="cursor:pointer">
        <div class="feed-icon">${icon}</div>
        <div class="feed-body">
          <div class="feed-agent">${agentLabel}${skill}</div>
          <div class="feed-tx">
            ${row.tx
              ? `<a href="${explorerUrl}" target="_blank" rel="noopener">${txShort} ↗</a>`
              : '—'
            }
          </div>
        </div>
        <div class="feed-right">
          <div class="feed-amount">${amount} ${asset}</div>
          <div class="feed-time">${time}</div>
        </div>
      </div>`;
  }).join('');
}

function renderAssetBars(rows) {
  const totals = {};
  let grand = 0;
  for (const row of rows) {
    if (!row.amount || !row.asset) continue;
    const v = parseFloat(row.amount);
    totals[row.asset] = (totals[row.asset] || 0) + v;
    grand += v;
  }

  if (!grand) {
    document.getElementById('assetBars').innerHTML =
      '<div style="color:var(--muted);font-size:13px;padding:8px 0;">No settlement data yet.</div>';
    document.getElementById('assetTotal').textContent = '';
    return;
  }

  document.getElementById('assetTotal').textContent =
    `$${grand.toFixed(2)} USDG equivalent settled`;

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  document.getElementById('assetBars').innerHTML = sorted.map(([asset, val]) => {
    const pct = ((val / grand) * 100).toFixed(1);
    const color = ASSET_COLORS[asset] || 'linear-gradient(90deg, var(--muted), var(--muted))';
    return `
      <div class="asset-bar-row">
        <div class="asset-bar-label">
          <span class="asset-bar-name">${asset}</span>
          <span class="asset-bar-val">$${val.toFixed(2)} · ${pct}%</span>
        </div>
        <div class="asset-bar-track">
          <div class="asset-bar-fill" style="width:${pct}%;background:${color};"></div>
        </div>
      </div>`;
  }).join('');
}

// ─── Sort wiring ────────────────────────────────────
document.getElementById('sortEarned').addEventListener('click', () => {
  state.sortBy = 'earned';
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sortEarned').classList.add('active');
  renderAgents(state.agents, 'earned');
});
document.getElementById('sortCalls').addEventListener('click', () => {
  state.sortBy = 'calls';
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sortCalls').classList.add('active');
  renderAgents(state.agents, 'calls');
});

// ─── Main refresh loop ───────────────────────────────
async function refresh() {
  try {
    const { stats, agents, feed } = await loadAll();
    state = { ...state, stats, agents, feed };
    window.state = state;

    renderKPIs(stats);
    renderAgents(agents, state.sortBy);
    renderFeed(feed);
    renderAssetBars(feed);

    if (window.A2AGalaxy && typeof window.A2AGalaxy.rebuild === 'function') {
      window.A2AGalaxy.rebuild();
    }

    const now = new Date();
    document.getElementById('lastUpdated').textContent =
      `Updated ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}`;
  } catch (err) {
    console.warn('Refresh error:', err);
    document.getElementById('lastUpdated').textContent = 'Update failed – retrying…';
  }
}

// ─── Utilities ───────────────────────────────────────
function animateCount(id, target, decimals = 0, prefix = '', suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const start    = 0;
  const duration = 900;
  const startTs  = performance.now();

  function step(now) {
    const progress = Math.min((now - startTs) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const val      = start + (target - start) * ease;
    el.textContent = prefix + val.toFixed(decimals).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function animateFloat(id, target, decimals = 2, prefix = '', suffix = '') {
  animateCount(id, target, decimals, prefix, suffix);
}

function getAgentIcon(nameOrId) {
  const key = (nameOrId || '').toLowerCase();
  for (const [k, v] of Object.entries(AGENT_ICONS)) {
    if (key.includes(k)) return v;
  }
  return AGENT_ICONS.default;
}

function getPayTag(pay, accepts) {
  if (!pay || pay === 'free') return `<span class="agent-pay-tag pay-free">FREE</span>`;
  const a = (accepts || []).join(',').toUpperCase();
  if (a.includes('USDG') && a.includes('ETH')) return `<span class="agent-pay-tag pay-multi">MULTI</span>`;
  if (a.includes('USDG'))  return `<span class="agent-pay-tag pay-usdg">USDG</span>`;
  if (a.includes('ETH'))   return `<span class="agent-pay-tag pay-eth">ETH</span>`;
  if (a.includes('A2A'))   return `<span class="agent-pay-tag pay-a2a">$A2A</span>`;
  return `<span class="agent-pay-tag pay-usdg">${pay.toUpperCase()}</span>`;
}

function timeAgo(date) {
  const secs = Math.floor((Date.now() - date) / 1000);
  if (secs < 60)   return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400)return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

// ─── Init ────────────────────────────────────────────
refresh();
setInterval(refresh, POLL_INTERVAL);
