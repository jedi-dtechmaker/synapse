/* =====================================================
   SYNAPSE · 3D Autonomous Agent & Settlement Explorer
   Smooth 3D/2.5D Canvas, Scroll/Zoom/Pan, Active Profiles,
   Dynamic Constellations, Timeline Scrubber & Inspector Panel
   ===================================================== */

(function () {
  'use strict';

  // ─── Ecosystem Projects Definition ───────────────────
  const ECOSYSTEM_PROJECTS = [
    {
      id: 'proj-robinhood',
      name: 'Robinhood Chain L2',
      type: 'project',
      category: 'protocol',
      badge: 'Project of the month',
      badgeType: 'month',
      hasHalo: true,
      haloColor: '#f59e0b',
      color: '#f59e0b',
      icon: '⚡',
      status: 'Core Settlement',
      calls: 114,
      earned: 91.73,
      stats: { calls: '114 settlements', volume: '$91.73 USDG', latency: '12ms' },
      description: 'Autonomous L2 EVM execution layer (Chain ID: 4663) powering micro-settlements for a2a.family agents.',
      skills: ['EVM', 'Settlement', 'Robinhood L2', 'ERC-4337'],
      repo: 'github.com/robinhood/chain-node',
      explorer: 'https://robinhoodchain.blockscout.com',
      x: 120, y: 50, z: -20
    },
    {
      id: 'proj-a2a-swarm',
      name: 'A2A Family Swarm',
      type: 'project',
      category: 'network',
      badge: 'Project of the week',
      badgeType: 'week',
      hasHalo: true,
      haloColor: '#ffd700',
      color: '#ffd700',
      icon: '🌐',
      status: 'Agent Registry',
      calls: 19,
      earned: 0,
      stats: { calls: '19 live agents', volume: 'Active Registry', latency: '45ms' },
      description: 'Decentralized registry, discovery engine, and communication protocol for autonomous AI agents.',
      skills: ['A2A Protocol', 'Agent Cards', 'Discovery', 'Registry'],
      repo: 'github.com/a2a-family/a2a-network',
      explorer: 'https://a2a.family',
      x: -160, y: -70, z: -10
    },
    {
      id: 'proj-wraith',
      name: 'wraith-protocol',
      type: 'project',
      category: 'security',
      badge: 'on-chain',
      badgeType: 'cyan',
      hasHalo: false,
      color: '#38bdf8',
      icon: '🛡️',
      status: 'ZK Settlement',
      calls: 42,
      earned: 12.5,
      stats: { calls: '42 proofs', volume: 'ZK Privacy', latency: '190ms' },
      description: 'Zero-knowledge privacy preservation and confidential settlement rails for agent-to-agent negotiations.',
      skills: ['ZK-SNARKs', 'Privacy', 'Confidential Tx'],
      repo: 'github.com/wraith-protocol/settle-zk',
      explorer: 'https://robinhoodchain.blockscout.com',
      x: -280, y: -50, z: 30
    },
    {
      id: 'proj-pons-dex',
      name: 'Pons Token Dex',
      type: 'project',
      category: 'dex',
      badge: 'on-chain',
      badgeType: 'cyan',
      hasHalo: false,
      color: '#00f0ff',
      icon: '🪙',
      status: 'Liquidity Pool',
      calls: 28,
      earned: 34.2,
      stats: { calls: '28 swaps', volume: '$34.20 USDG', latency: '85ms' },
      description: 'Automated market maker and liquidity pools for agent tokens and ecosystem gas assets on Robinhood Chain.',
      skills: ['AMM', 'Liquidity', 'Swap', '$A2A'],
      repo: 'github.com/pons-protocol/core-dex',
      explorer: 'https://robinhoodchain.blockscout.com',
      x: -100, y: 170, z: 20
    },
    {
      id: 'proj-cellscript',
      name: 'CellScript-Labs',
      type: 'project',
      category: 'research',
      badge: 'New',
      badgeType: 'pink',
      hasHalo: false,
      color: '#ec4899',
      icon: '🔬',
      status: 'Smart Contracts',
      calls: 15,
      earned: 0,
      stats: { calls: '15 contracts', volume: 'DevRel Tooling', latency: '110ms' },
      description: 'Next-generation smart contract scripting and formal verification tooling for autonomous on-chain actors.',
      skills: ['Scripting', 'Verification', 'DevRel'],
      repo: 'github.com/cellscript-labs/core',
      explorer: 'https://cellscript.network',
      x: 30, y: 220, z: 10
    },
    {
      id: 'proj-tactus',
      name: 'Tactus-Labs',
      type: 'project',
      category: 'compute',
      badge: 'on-chain',
      badgeType: 'cyan',
      hasHalo: false,
      color: '#a78bfa',
      icon: '🧠',
      status: 'Swarm Compute',
      calls: 32,
      earned: 8.4,
      stats: { calls: '32 clusters', volume: 'P2P Compute', latency: '65ms' },
      description: 'Distributed p2p agent execution environment and decentralized inference cluster.',
      skills: ['P2P', 'Inference', 'Swarm'],
      repo: 'github.com/tactus-labs/swarm',
      explorer: 'https://tactus.io',
      x: -40, y: -200, z: -30
    },
    {
      id: 'proj-peersyst',
      name: 'Peersyst Bridge',
      type: 'project',
      category: 'bridge',
      badge: 'on-chain',
      badgeType: 'cyan',
      hasHalo: false,
      color: '#5bf5cc',
      icon: '🌉',
      status: 'Cross-chain',
      calls: 86,
      earned: 18.9,
      stats: { calls: '86 routes', volume: '$18.90 bridge', latency: '140ms' },
      description: 'Cross-chain message passing and liquidity relayer connecting Robinhood Chain with mainnet networks.',
      skills: ['Bridge', 'Relayer', 'Telemetry'],
      repo: 'github.com/peersyst/a2a-bridge',
      explorer: 'https://peersyst.com',
      x: -330, y: 110, z: 40
    },
    {
      id: 'proj-bounty-board',
      name: 'Bounty Board Hub',
      type: 'project',
      category: 'bounty',
      badge: 'Active Escrow',
      badgeType: 'green',
      hasHalo: true,
      haloColor: '#98FB59',
      color: '#98FB59',
      icon: '🎁',
      status: 'Live Quests',
      calls: 14,
      earned: 25.0,
      stats: { calls: '14 quests', volume: '$12.5k pool', latency: '50ms' },
      description: 'On-chain bounty board escrow and automated verification system where agents claim quests and settle rewards.',
      skills: ['Bounties', 'Quests', 'Escrow', 'Proof'],
      repo: 'github.com/a2a-family/bounty-board',
      explorer: 'https://a2a.family/bounties',
      x: 270, y: -110, z: 10
    }
  ];

  // ─── Agent Icon Lookup ───────────────────────────────
  const AGENT_ICON_MAP = {
    oracle: '🔮', scout: '🧭', sentinel: '🛡️',
    vision: '👁️', quill: '✍️', ledger: '📒',
    atlas: '🗺️', broker: '🤝', courier: '📦',
    judge: '⚖️', homer: '⚡', signal: '📡',
    fossil: '🦖', intel: '🧠', plot: '🎭',
    ghost: '👻', probe: '🛰️', default: '🤖'
  };

  function getIcon(nameOrId) {
    const k = (nameOrId || '').toLowerCase();
    for (const [key, icon] of Object.entries(AGENT_ICON_MAP)) {
      if (k.includes(key)) return icon;
    }
    return AGENT_ICON_MAP.default;
  }

  // ─── Galaxy State ─────────────────────────────────────
  let canvas, ctx;
  let animFrameId = null;
  let nodes = [];
  let links = [];
  let particles = [];
  let stars = [];
  let hoveredNode = null;
  let selectedNode = null;
  let activeFilter = 'all';
  let searchQuery = '';
  let livePulseEnabled = true;

  // Camera & Interaction
  const camera = {
    x: 0,
    y: 0,
    zoom: 1.0,
    targetX: 0,
    targetY: 0,
    targetZoom: 1.0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    camStartX: 0,
    camStartY: 0,
    hasMoved: false
  };

  // Timeline State
  const timeline = {
    mode: '7d', // 'live', '24h', '7d'
    isPlaying: true,
    scrubPercent: 0.88,
    tickerIndex: 0
  };

  // ─── Initialize Galaxy ────────────────────────────────
  function initGalaxy() {
    canvas = document.getElementById('galaxyCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    initStars();
    setupCanvasEvents();
    setupUIControls();
    buildConstellation();

    // Default select Robinhood Chain or A2A Swarm
    const defaultNode = nodes.find(n => n.id === 'proj-robinhood') || nodes[0];
    if (defaultNode) {
      updateSidebar(defaultNode);
    }

    // Start render loop
    lastTime = performance.now();
    renderLoop(lastTime);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ─── Stars Background ────────────────────────────────
  function initStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2600,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 800 - 400,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  // ─── Build Node Graph from Projects & Live Agents ────
  function buildConstellation() {
    nodes = [];
    links = [];
    particles = [];

    // 1. Add Ecosystem Projects
    ECOSYSTEM_PROJECTS.forEach(p => {
      nodes.push({
        ...p,
        baseX: p.x,
        baseY: p.y,
        baseZ: p.z,
        curX: p.x,
        curY: p.y,
        curZ: p.z,
        screenX: 0,
        screenY: 0,
        screenR: 0,
        screenScale: 1,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.0015 + Math.random() * 0.001
      });
    });

    // 2. Add Live Agents
    const liveAgents = (window.state && window.state.agents && window.state.agents.length > 0)
      ? window.state.agents
      : getFallbackAgents();

    const totalAgents = liveAgents.length;
    liveAgents.forEach((ag, idx) => {
      // Distribute in a wider orbital shell
      const angle = (idx / totalAgents) * Math.PI * 2 + 0.2;
      const radius = 260 + (idx % 3) * 90;
      const earnedNum = parseFloat(ag.earned || 0);
      const isTopEarner = earnedNum > 20;
      const isHighVolume = (ag.calls || 0) > 20;

      let badge = null;
      let badgeType = 'cyan';
      let hasHalo = false;
      let haloColor = '#98FB59';

      if (isTopEarner) {
        badge = 'Top Earner';
        badgeType = 'gold';
        hasHalo = true;
        haloColor = '#ffd700';
      } else if (isHighVolume) {
        badge = 'Active';
        badgeType = 'green';
        hasHalo = true;
        haloColor = '#5bf5cc';
      } else if (ag.pay === 'free') {
        badge = 'Free';
        badgeType = 'muted';
      } else if (ag.status === 'live') {
        badge = 'on-chain';
        badgeType = 'cyan';
      }

      const x = Math.cos(angle) * radius + (Math.sin(idx * 3) * 40);
      const y = Math.sin(angle) * (radius * 0.8) + (Math.cos(idx * 2) * 35);
      const z = ((idx % 5) - 2) * 35;

      const nodeObj = {
        id: ag.id || `agent-${idx}`,
        name: ag.name || ag.id,
        type: 'agent',
        category: 'agent',
        badge: badge,
        badgeType: badgeType,
        hasHalo: hasHalo,
        haloColor: haloColor,
        color: isTopEarner ? '#ffd700' : (isHighVolume ? '#98FB59' : '#5bf5cc'),
        icon: getIcon(ag.name || ag.id),
        status: ag.status || 'live',
        calls: ag.calls || 0,
        earned: earnedNum,
        raw: ag,
        stats: {
          calls: `${ag.calls || 0} calls`,
          volume: earnedNum > 0 ? `$${earnedNum.toFixed(2)} USDG` : 'Free Utility',
          latency: ag.lastMs ? `${ag.lastMs}ms` : '42ms'
        },
        description: ag.description || 'Autonomous decentralized intelligence on Robinhood Chain.',
        skills: ag.skills || ['A2A', 'Agent'],
        repo: ag.cardUrl ? 'Agent Card' : 'api.a2a.family',
        explorer: ag.payTo ? `https://robinhoodchain.blockscout.com/address/${ag.payTo}` : null,
        baseX: x,
        baseY: y,
        baseZ: z,
        curX: x,
        curY: y,
        curZ: z,
        screenX: 0,
        screenY: 0,
        screenR: 0,
        screenScale: 1,
        orbitAngle: angle,
        orbitSpeed: 0.0012 + (idx % 3) * 0.0008
      };

      nodes.push(nodeObj);
    });

    // 3. Dynamic Links (constellation lines)
    nodes.forEach(n1 => {
      if (n1.type === 'agent') {
        let linkedProj = null;
        const lower = (n1.name + ' ' + (n1.skills || []).join(' ')).toLowerCase();

        if (lower.includes('broker') || lower.includes('holdings') || lower.includes('buy')) {
          linkedProj = nodes.find(p => p.id === 'proj-pons-dex');
        } else if (lower.includes('sentinel') || lower.includes('safety') || lower.includes('scan')) {
          linkedProj = nodes.find(p => p.id === 'proj-cellscript');
        } else if (lower.includes('judge') || lower.includes('bounty')) {
          linkedProj = nodes.find(p => p.id === 'proj-bounty-board');
        } else if (lower.includes('oracle') || lower.includes('price')) {
          linkedProj = nodes.find(p => p.id === 'proj-robinhood');
        } else if (lower.includes('scout') || lower.includes('grade')) {
          linkedProj = nodes.find(p => p.id === 'proj-robinhood');
        } else if (lower.includes('courier') || lower.includes('payout')) {
          linkedProj = nodes.find(p => p.id === 'proj-peersyst');
        } else {
          linkedProj = nodes.find(p => p.id === 'proj-a2a-swarm');
        }

        if (linkedProj) {
          links.push({ source: n1, target: linkedProj, color: n1.color, active: true });
        }
      }
    });

    // Inter-project core links
    const rL2 = nodes.find(p => p.id === 'proj-robinhood');
    const aSwarm = nodes.find(p => p.id === 'proj-a2a-swarm');
    const pDex = nodes.find(p => p.id === 'proj-pons-dex');
    const bHub = nodes.find(p => p.id === 'proj-bounty-board');
    if (rL2 && aSwarm) links.push({ source: rL2, target: aSwarm, color: '#ffd700', active: true });
    if (rL2 && pDex) links.push({ source: rL2, target: pDex, color: '#00f0ff', active: true });
    if (rL2 && bHub) links.push({ source: rL2, target: bHub, color: '#98FB59', active: true });

    // 4. Data Packets
    particles = [];
    links.forEach(l => {
      particles.push({
        link: l,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        size: 2.2,
        color: l.color || '#98FB59'
      });
    });

    updateStatCounts();
  }

  function getFallbackAgents() {
    return [
      { id: 'homer', name: 'Homer', earned: '75.01', calls: 2, status: 'live', skills: ['ask', 'compute'] },
      { id: 'scout-crmfz3', name: 'Scout', earned: '15.37', calls: 4, status: 'live', skills: ['grade_launches'] },
      { id: 'sentinel', name: 'Sentinel', earned: '0.62', calls: 31, status: 'live', skills: ['safety', 'scan_contract'] },
      { id: 'broker', name: 'Broker', earned: '0', calls: 3, status: 'live', skills: ['holdings', 'buy', 'sell'], pay: 'free' },
      { id: 'oracle', name: 'Oracle', earned: '0', calls: 22, status: 'live', skills: ['price'], pay: 'free' },
      { id: 'ledger', name: 'Ledger', earned: '0', calls: 11, status: 'live', skills: ['balance', 'receipt'], pay: 'free' },
      { id: 'courier', name: 'Courier', earned: '0', calls: 4, status: 'live', skills: ['split_payout'], pay: 'free' },
      { id: 'the-judge', name: 'The Judge', earned: '0.10', calls: 5, status: 'live', skills: ['ask', 'audit'] },
      { id: 'atlasai', name: 'AtlasAI', earned: '0.25', calls: 1, status: 'live', skills: ['research'] },
      { id: 'a2a-intel', name: 'A2A Intel', earned: '0.21', calls: 1, status: 'live', skills: ['ask', 'intel'] },
      { id: 'vision', name: 'Vision', earned: '0', calls: 0, status: 'live', skills: ['token_art'], pay: 'free' },
      { id: 'quill', name: 'Quill', earned: '0', calls: 0, status: 'live', skills: ['write_thread'], pay: 'free' }
    ];
  }

  // ─── 3D Perspective Projection ───────────────────────
  function project(x, y, z, width, height) {
    const fov = 850;
    const relX = x - camera.x;
    const relY = y - camera.y;
    const relZ = z + fov;

    if (relZ <= 10) return null;
    const scale = (fov / relZ) * camera.zoom;

    return {
      x: width / 2 + relX * scale,
      y: height / 2 + relY * scale,
      scale: scale,
      z: z
    };
  }

  // ─── Main Render Loop ────────────────────────────────
  let lastTime = 0;
  function renderLoop(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    // Smooth camera interpolation
    camera.x += (camera.targetX - camera.x) * 0.08;
    camera.y += (camera.targetY - camera.y) * 0.08;
    camera.zoom += (camera.targetZoom - camera.zoom) * 0.08;

    drawGalaxy(time);
    animFrameId = requestAnimationFrame(renderLoop);
  }

  function drawGalaxy(time) {
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Deep cosmic background
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 60, w / 2, h / 2, Math.max(w, h));
    bgGrad.addColorStop(0, '#090c12');
    bgGrad.addColorStop(0.5, '#05070a');
    bgGrad.addColorStop(1, '#020305');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 1. Perspective Grid (Subtle cosmic grid)
    drawPerspectiveGrid(w, h);

    // 2. Starfield
    drawStarfield(w, h, time);

    // 3. Update Node Physics / Floating Drift
    nodes.forEach(n => {
      n.orbitAngle += n.orbitSpeed;
      const floatX = Math.sin(time * 0.001 + n.orbitAngle) * 5;
      const floatY = Math.cos(time * 0.0012 + n.orbitAngle) * 4;

      n.curX = n.baseX + floatX;
      n.curY = n.baseY + floatY;

      const proj = project(n.curX, n.curY, n.curZ, w, h);
      if (proj) {
        n.screenX = proj.x;
        n.screenY = proj.y;
        n.screenScale = proj.scale;
        n.screenR = (n.type === 'project' ? 20 : 14) * proj.scale;
      }
    });

    // 4. Draw Links
    drawLinks(w, h);

    // 5. Draw Traveling Packets
    if (livePulseEnabled) {
      drawParticles(w, h);
    }

    // 6. Sort Nodes by Depth
    const sortedNodes = [...nodes].sort((a, b) => a.curZ - b.curZ);

    // 7. Render All Nodes
    sortedNodes.forEach(node => {
      drawNode(node, w, h, time);
    });
  }

  // ─── Subtle Perspective Grid ──────────────────────────
  function drawPerspectiveGrid(w, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
    ctx.lineWidth = 1;

    const centerY = h * 0.58;
    for (let r = 120; r <= 600; r += 120) {
      const radiusX = r * 1.6 * camera.zoom;
      const radiusY = r * 0.45 * camera.zoom;
      ctx.beginPath();
      ctx.ellipse(w / 2 - camera.x * 0.15, centerY - camera.y * 0.15, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ─── Starfield ────────────────────────────────────────
  function drawStarfield(w, h, time) {
    ctx.save();
    stars.forEach(s => {
      const proj = project(s.x, s.y, s.z, w, h);
      if (proj && proj.x >= 0 && proj.x <= w && proj.y >= 0 && proj.y <= h) {
        const twinkle = Math.sin(time * s.twinkleSpeed) * 0.2;
        const alpha = Math.max(0.1, Math.min(0.8, s.alpha + twinkle));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, s.r * Math.max(0.5, proj.scale), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  // ─── Constellation Links ──────────────────────────────
  function drawLinks(w, h) {
    ctx.save();
    links.forEach(l => {
      const p1 = project(l.source.curX, l.source.curY, l.source.curZ, w, h);
      const p2 = project(l.target.curX, l.target.curY, l.target.curZ, w, h);
      if (!p1 || !p2) return;

      const isConnectedToHovered = hoveredNode && (l.source === hoveredNode || l.target === hoveredNode);
      const isConnectedToSelected = selectedNode && (l.source === selectedNode || l.target === selectedNode);

      let alpha = 0.08;
      let width = 1.0;

      if (isConnectedToSelected) {
        alpha = 0.6;
        width = 2.0;
      } else if (isConnectedToHovered) {
        alpha = 0.45;
        width = 1.8;
      }

      ctx.strokeStyle = l.color ? hexToRgba(l.color, alpha) : `rgba(152, 251, 89, ${alpha})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
    ctx.restore();
  }

  // ─── Traveling Packets ────────────────────────────────
  function drawParticles(w, h) {
    ctx.save();
    particles.forEach(pt => {
      pt.progress += pt.speed;
      if (pt.progress > 1) pt.progress = 0;

      const s = pt.link.source;
      const t = pt.link.target;
      const curX = s.curX + (t.curX - s.curX) * pt.progress;
      const curY = s.curY + (t.curY - s.curY) * pt.progress;
      const curZ = s.curZ + (t.curZ - s.curZ) * pt.progress;

      const proj = project(curX, curY, curZ, w, h);
      if (proj) {
        ctx.fillStyle = pt.color || '#98FB59';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(1.2, pt.size * proj.scale), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  // ─── Draw Node ────────────────────────────────────────
  function drawNode(node, w, h, time) {
    const p = project(node.curX, node.curY, node.curZ, w, h);
    if (!p) return;

    const isHovered = hoveredNode === node;
    const isSelected = selectedNode === node;
    const isFiltered = passesFilter(node);

    const scale = p.scale * (isHovered ? 1.2 : 1.0);
    const radius = (node.type === 'project' ? 20 : 14) * scale;
    node.screenR = radius;

    ctx.save();
    if (!isFiltered) ctx.globalAlpha = 0.2;

    // 1. Halo Ring for Featured / Selected Nodes (Clean orbit halo like reference image)
    if (node.hasHalo || isSelected) {
      const haloColor = node.haloColor || '#ffd700';
      const haloRadiusX = radius * 2.2;
      const haloRadiusY = radius * 0.9;
      const tilt = Math.PI / 8;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(tilt);
      ctx.strokeStyle = hexToRgba(haloColor, isSelected ? 0.85 : 0.55);
      ctx.lineWidth = isSelected ? 2.0 : 1.5;

      ctx.beginPath();
      ctx.ellipse(0, 0, haloRadiusX, haloRadiusY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Small orbital satellite on halo
      const orbAngle = (time * 0.002) % (Math.PI * 2);
      const satX = Math.cos(orbAngle) * haloRadiusX;
      const satY = Math.sin(orbAngle) * haloRadiusY;
      ctx.fillStyle = haloColor;
      ctx.beginPath();
      ctx.arc(satX, satY, 2.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Outer Glow
    const glowGrad = ctx.createRadialGradient(p.x, p.y, radius * 0.3, p.x, p.y, radius * 2.0);
    glowGrad.addColorStop(0, hexToRgba(node.color || '#98FB59', isSelected ? 0.6 : 0.35));
    glowGrad.addColorStop(0.6, hexToRgba(node.color || '#98FB59', 0.1));
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius * 2.0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Core Orb
    const coreGrad = ctx.createRadialGradient(
      p.x - radius * 0.3,
      p.y - radius * 0.3,
      radius * 0.1,
      p.x,
      p.y,
      radius
    );
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.35, node.color || '#98FB59');
    coreGrad.addColorStop(1, '#0c1017');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = isSelected ? '#ffffff' : hexToRgba(node.color || '#98FB59', 0.85);
    ctx.lineWidth = isSelected ? 2 : 1.2;
    ctx.stroke();

    // 4. Center Icon
    ctx.font = `${Math.round(radius * 1.05)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.icon || '🤖', p.x, p.y + 1);

    // 5. Floating Badge Ribbon (e.g. "Project of the week", "Project of the month", "on-chain")
    if (node.badge) {
      drawNodeBadge(p.x, p.y - radius - 12 * scale, node.badge, node.badgeType, scale);
    }

    // 6. Floating Name Label Pill (e.g. "Tactus-Labs · 1", "wraith-protocol · 1", "Homer · $75.01")
    drawNodeLabel(p.x, p.y + radius + 11 * scale, node, scale, isSelected, isHovered);

    ctx.restore();
  }

  // ─── Badge Pill ──────────────────────────────────────
  function drawNodeBadge(x, y, text, type, scale) {
    ctx.save();
    let bg = 'rgba(12, 14, 18, 0.9)';
    let border = 'rgba(255, 255, 255, 0.2)';
    let textCol = '#ffffff';

    if (type === 'week' || type === 'gold') {
      bg = 'rgba(255, 215, 0, 0.25)';
      border = '#ffd700';
      textCol = '#ffd700';
    } else if (type === 'month') {
      bg = 'rgba(245, 158, 11, 0.25)';
      border = '#f59e0b';
      textCol = '#f59e0b';
    } else if (type === 'cyan') {
      bg = 'rgba(0, 240, 255, 0.2)';
      border = '#00f0ff';
      textCol = '#00f0ff';
    } else if (type === 'pink') {
      bg = 'rgba(236, 72, 153, 0.22)';
      border = '#ec4899';
      textCol = '#ec4899';
    } else if (type === 'green') {
      bg = 'rgba(152, 251, 89, 0.22)';
      border = '#98FB59';
      textCol = '#98FB59';
    }

    const fontSize = Math.max(9, Math.round(9.5 * scale));
    ctx.font = `600 ${fontSize}px "Space Grotesk", sans-serif`;
    const textWidth = ctx.measureText(text).width;
    const padX = 7 * scale;
    const padY = 2.5 * scale;
    const w = textWidth + padX * 2;
    const h = fontSize + padY * 2;

    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    drawSafeRoundedRect(ctx, x - w / 2, y - h / 2, w, h, h / 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = textCol;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  // ─── Name Label Pill ─────────────────────────────────
  function drawNodeLabel(x, y, node, scale, isSelected, isHovered) {
    ctx.save();
    const countLabel = node.type === 'project'
      ? `${node.calls || 1}`
      : (node.earned > 0 ? `$${node.earned.toFixed(2)}` : `${node.calls || 0}`);
    const fullText = `${node.name} · ${countLabel}`;

    const fontSize = Math.max(10, Math.round(11 * scale));
    ctx.font = `500 ${fontSize}px "Space Grotesk", sans-serif`;
    const textWidth = ctx.measureText(fullText).width;
    const padX = 7 * scale;
    const padY = 3 * scale;
    const w = textWidth + padX * 2;
    const h = fontSize + padY * 2;

    ctx.fillStyle = isSelected
      ? 'rgba(20, 26, 36, 0.95)'
      : (isHovered ? 'rgba(18, 22, 29, 0.92)' : 'rgba(8, 10, 14, 0.8)');
    ctx.strokeStyle = isSelected
      ? (node.color || '#98FB59')
      : (isHovered ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.12)');
    ctx.lineWidth = isSelected ? 1.5 : 1;

    drawSafeRoundedRect(ctx, x - w / 2, y - h / 2, w, h, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isSelected ? '#ffffff' : (isHovered ? '#ffffff' : '#c8d1dc');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fullText, x, y);
    ctx.restore();
  }

  // ─── Safe Rounded Rectangle (No Inverted Loops!) ─────
  function drawSafeRoundedRect(c, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + width - r, y);
    c.arcTo(x + width, y, x + width, y + r, r);
    c.lineTo(x + width, y + height - r);
    c.arcTo(x + width, y + height, x + width - r, y + height, r);
    c.lineTo(x + r, y + height);
    c.arcTo(x, y + height, x, y + height - r, r);
    c.lineTo(x, y + r);
    c.arcTo(x, y, x + r, y, r);
    c.closePath();
  }

  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  // ─── Filter Logic ────────────────────────────────────
  function passesFilter(node) {
    if (activeFilter === 'agents' && node.type !== 'agent') return false;
    if (activeFilter === 'projects' && node.type !== 'project') return false;
    if (activeFilter === 'highlights' && !node.badge && !node.hasHalo) return false;
    if (activeFilter === 'paid' && !(node.earned > 0)) return false;
    if (activeFilter === 'free' && !(node.pay === 'free' || node.earned === 0)) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inName = node.name.toLowerCase().includes(q);
      const inSkills = (node.skills || []).some(s => s.toLowerCase().includes(q));
      const inDesc = (node.description || '').toLowerCase().includes(q);
      if (!inName && !inSkills && !inDesc) return false;
    }
    return true;
  }

  // ─── Canvas Interaction Events ───────────────────────
  function setupCanvasEvents() {
    if (!canvas) return;

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (camera.isDragging) {
        const dx = e.clientX - camera.dragStartX;
        const dy = e.clientY - camera.dragStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) camera.hasMoved = true;
        camera.targetX = camera.camStartX - dx / camera.zoom;
        camera.targetY = camera.camStartY - dy / camera.zoom;
        canvas.style.cursor = 'grabbing';
        return;
      }

      // Hit testing
      let found = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (!passesFilter(n)) continue;
        const dist = Math.hypot(n.screenX - mx, n.screenY - my);
        if (dist <= Math.max(22, n.screenR + 8)) {
          found = n;
          break;
        }
      }

      hoveredNode = found;
      canvas.style.cursor = found ? 'pointer' : 'grab';
    });

    canvas.addEventListener('mousedown', e => {
      camera.isDragging = true;
      camera.hasMoved = false;
      camera.dragStartX = e.clientX;
      camera.dragStartY = e.clientY;
      camera.camStartX = camera.targetX;
      camera.camStartY = camera.targetY;
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      if (!camera.isDragging) return;
      camera.isDragging = false;
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';

      if (!camera.hasMoved && hoveredNode) {
        selectNode(hoveredNode);
      }
    });

    // Zoom Through with Mouse Wheel
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const zoomFactor = -e.deltaY * 0.0015;
      const prevZoom = camera.targetZoom;
      camera.targetZoom = Math.max(0.4, Math.min(3.2, camera.targetZoom * (1 + zoomFactor)));

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;

      const zoomRatio = camera.targetZoom / prevZoom;
      camera.targetX += (mx / prevZoom) * (1 - 1 / zoomRatio);
      camera.targetY += (my / prevZoom) * (1 - 1 / zoomRatio);
    }, { passive: false });

    // Touch Support
    let touchDist = 0;
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        camera.isDragging = true;
        camera.hasMoved = false;
        camera.dragStartX = e.touches[0].clientX;
        camera.dragStartY = e.touches[0].clientY;
        camera.camStartX = camera.targetX;
        camera.camStartY = camera.targetY;
      } else if (e.touches.length === 2) {
        camera.isDragging = false;
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && camera.isDragging) {
        const dx = e.touches[0].clientX - camera.dragStartX;
        const dy = e.touches[0].clientY - camera.dragStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) camera.hasMoved = true;
        camera.targetX = camera.camStartX - dx / camera.zoom;
        camera.targetY = camera.camStartY - dy / camera.zoom;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        camera.targetZoom = Math.max(0.4, Math.min(3.2, camera.targetZoom + (dist - touchDist) * 0.005));
        touchDist = dist;
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      camera.isDragging = false;
      if (!camera.hasMoved && hoveredNode) {
        selectNode(hoveredNode);
      }
    });
  }

  // ─── Select Node & Update Sidebar ────────────────────
  function selectNode(node) {
    selectedNode = node;
    camera.targetX = node.curX;
    camera.targetY = node.curY;
    camera.targetZoom = Math.max(1.3, camera.zoom);
    updateSidebar(node);
  }

  function updateSidebar(node) {
    const elTitle = document.getElementById('sidebarTitle');
    const elType = document.getElementById('sidebarType');
    const elIcon = document.getElementById('sidebarIcon');
    const elDesc = document.getElementById('sidebarDesc');
    const elBadge = document.getElementById('sidebarBadge');
    const elCalls = document.getElementById('sidebarCalls');
    const elVol = document.getElementById('sidebarVolume');
    const elLat = document.getElementById('sidebarLatency');
    const elTags = document.getElementById('sidebarTags');
    const elAction = document.getElementById('sidebarActionBtn');

    if (elTitle) elTitle.textContent = node.name;
    if (elType) elType.textContent = node.type === 'project' ? 'Ecosystem Project' : 'Autonomous Agent';
    if (elIcon) elIcon.textContent = node.icon || '🤖';
    if (elDesc) elDesc.textContent = node.description;

    if (elBadge) {
      if (node.badge) {
        elBadge.textContent = node.badge;
        elBadge.style.display = 'inline-block';
      } else {
        elBadge.style.display = 'none';
      }
    }

    if (elCalls) elCalls.textContent = node.stats.calls;
    if (elVol) elVol.textContent = node.stats.volume;
    if (elLat) elLat.textContent = node.stats.latency;

    if (elTags) {
      elTags.innerHTML = (node.skills || []).map(s => `<span class="drawer-chip">${s}</span>`).join('');
    }

    if (elAction) {
      elAction.href = node.explorer || 'https://robinhoodchain.blockscout.com';
    }

    renderSidebarActivity(node);
  }

  function renderSidebarActivity(node) {
    const list = document.getElementById('sidebarActivityList');
    if (!list) return;

    const feedRows = (window.state && window.state.feed) ? window.state.feed : [];
    const filtered = feedRows.filter(r => {
      const name = (r.agentName || r.agent || '').toLowerCase();
      return name.includes(node.name.toLowerCase()) || name.includes(node.id.toLowerCase());
    });

    if (filtered.length > 0) {
      list.innerHTML = filtered.slice(0, 3).map(f => `
        <div class="drawer-act-item">
          <span class="drawer-act-dot"></span>
          <div class="drawer-act-body">
            <div class="drawer-act-title">Settled $${parseFloat(f.amount || 0).toFixed(2)} ${f.asset || 'USDG'}</div>
            <div class="drawer-act-tx">${f.tx ? f.tx.slice(0, 8) + '…' + f.tx.slice(-6) : 'Robinhood Chain'}</div>
          </div>
        </div>
      `).join('');
    } else {
      list.innerHTML = `<div class="drawer-act-empty">Live on Robinhood Chain · Active & responsive</div>`;
    }
  }

  // ─── Setup UI Controls ───────────────────────────────
  function setupUIControls() {
    // 1. Search Bar
    const searchInput = document.getElementById('galaxySearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim();
        if (searchQuery.length >= 2) {
          const match = nodes.find(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
          if (match) {
            camera.targetX = match.curX;
            camera.targetY = match.curY;
            camera.targetZoom = 1.35;
            updateSidebar(match);
          }
        }
      });
    }

    // 2. Reset Zoom Button
    const resetBtn = document.getElementById('btnResetZoom');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        camera.targetX = 0;
        camera.targetY = 0;
        camera.targetZoom = 1.0;
        selectedNode = null;
      });
    }

    // On-canvas Zoom buttons
    const zoomInBtn = document.getElementById('canvasZoomIn');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        camera.targetZoom = Math.min(3.2, camera.targetZoom * 1.3);
      });
    }
    const zoomOutBtn = document.getElementById('canvasZoomOut');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        camera.targetZoom = Math.max(0.4, camera.targetZoom / 1.3);
      });
    }

    // 3. Fullscreen / Maximize Toggle
    const fsBtn = document.getElementById('btnFullscreen');
    const galaxyCard = document.getElementById('galaxyCard');
    if (fsBtn && galaxyCard) {
      fsBtn.addEventListener('click', () => {
        galaxyCard.classList.toggle('is-fullscreen');
        setTimeout(resizeCanvas, 200);
      });
    }

    // 4. Help Guide Modal
    const helpBtn = document.getElementById('btnHelp');
    const helpModal = document.getElementById('galaxyHelpModal');
    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', () => {
        helpModal.classList.toggle('active');
      });
      helpModal.addEventListener('click', e => {
        if (e.target === helpModal || e.target.classList.contains('help-close')) {
          helpModal.classList.remove('active');
        }
      });
    }

    // 5. Category Filter Pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.getAttribute('data-filter');
      });
    });

    // 6. Live Pulse Stream Toggle
    const pulseToggle = document.getElementById('pulseToggle');
    if (pulseToggle) {
      pulseToggle.addEventListener('change', e => {
        livePulseEnabled = e.target.checked;
      });
    }

    // 7. Timeline Range Tabs (Live, 24h, 7d)
    const timeBtns = document.querySelectorAll('.time-mode-btn');
    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timeline.mode = btn.getAttribute('data-mode');
        updateTimelineMarquee();
      });
    });

    // 8. Timeline Scrubber Dragging
    const scrubTrack = document.getElementById('timelineScrubTrack');
    const scrubHandle = document.getElementById('timelineScrubHandle');
    if (scrubTrack && scrubHandle) {
      let isScrubbing = false;

      const handleScrub = clientX => {
        const rect = scrubTrack.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        timeline.scrubPercent = pct;
        scrubHandle.style.left = `${pct * 100}%`;

        const times = ['Sun 04:00', 'Mon 13:22', 'Tue 09:15', 'Wed 18:40', 'Thu 11:05', 'Fri 22:30', 'Sat 15:10', 'Now'];
        const idx = Math.min(times.length - 1, Math.floor(pct * times.length));
        document.getElementById('scrubTimestamp').textContent = times[idx];

        if (nodes.length > 0) {
          const targetNode = nodes[Math.floor(pct * (nodes.length - 1))];
          camera.targetX = targetNode.curX;
          camera.targetY = targetNode.curY;
          updateSidebar(targetNode);
        }
      };

      scrubTrack.addEventListener('mousedown', e => {
        isScrubbing = true;
        handleScrub(e.clientX);
      });

      window.addEventListener('mousemove', e => {
        if (isScrubbing) handleScrub(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        isScrubbing = false;
      });
    }

    // 9. Play / Pause Timeline
    const playPauseBtn = document.getElementById('timelinePlayPause');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        timeline.isPlaying = !timeline.isPlaying;
        playPauseBtn.innerHTML = timeline.isPlaying
          ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
          : '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      });
    }

    // 10. Follow Button
    const followBtn = document.getElementById('sidebarFollowBtn');
    if (followBtn) {
      followBtn.addEventListener('click', () => {
        const isFollowed = followBtn.classList.toggle('following');
        followBtn.textContent = isFollowed ? '★ Following' : '☆ Follow';
      });
    }

    // 11. Suggest Form
    const suggestBtn = document.getElementById('btnSuggest');
    const suggestInput = document.getElementById('suggestInput');
    if (suggestBtn && suggestInput) {
      suggestBtn.addEventListener('click', () => {
        const val = suggestInput.value.trim();
        if (!val) return;
        showToast(`✓ Received "${val}". Syncing agent card on Robinhood Chain...`);
        suggestInput.value = '';
      });
    }

    // 12. Auto-cycling Marquee
    startMarqueeCycle();
  }

  // ─── Ticker Marquee ───────────────────────────────────
  const MARQUEE_ITEMS = [
    'Mon 17:44 · Scout-crmfz3 settled $9.61 USDG via Robinhood Chain [0x3223c981...]',
    'Mon 17:42 · Scout-crmfz3 settled $1.92 USDG via Robinhood Chain [0x3203882b...]',
    'Mon 17:40 · Homer executed autonomous task settlement: $75.01 USDG earned',
    'Mon 16:15 · Sentinel verified safety scan for CellScript smart contract',
    'Mon 14:02 · Broker settled AMM liquidity swap on Pons Token Dex',
    'Mon 12:20 · A2A Family Swarm registered 2 new autonomous agent cards'
  ];

  function startMarqueeCycle() {
    const tickerText = document.getElementById('tickerText');
    if (!tickerText) return;

    setInterval(() => {
      if (!timeline.isPlaying) return;
      timeline.tickerIndex = (timeline.tickerIndex + 1) % MARQUEE_ITEMS.length;
      tickerText.style.opacity = '0';
      tickerText.style.transform = 'translateY(5px)';

      setTimeout(() => {
        tickerText.textContent = MARQUEE_ITEMS[timeline.tickerIndex];
        tickerText.style.opacity = '1';
        tickerText.style.transform = 'translateY(0)';
      }, 200);
    }, 4200);
  }

  function updateTimelineMarquee() {
    const tickerText = document.getElementById('tickerText');
    if (!tickerText) return;
    tickerText.textContent = `Activity for ${timeline.mode.toUpperCase()}: ${MARQUEE_ITEMS[timeline.tickerIndex]}`;
  }

  function updateStatCounts() {
    const elUpdates = document.getElementById('countUpdates');
    const elPeople = document.getElementById('countPeople');
    const elProjects = document.getElementById('countProjects');

    if (elUpdates) elUpdates.textContent = `${window.state?.stats?.callsAll || 114} updates`;
    if (elPeople) elPeople.textContent = `${window.state?.stats?.agents || 19} agents`;
    if (elProjects) elProjects.textContent = `${ECOSYSTEM_PROJECTS.length} projects`;
  }

  function showToast(msg) {
    let toast = document.getElementById('galaxyToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'galaxyToast';
      toast.className = 'galaxy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // ─── Global FlyTo Helper ─────────────────────────────
  window.flyToAgent = function (idOrName) {
    if (!idOrName) return;
    const q = idOrName.toLowerCase();
    const match = nodes.find(n => n.id.toLowerCase() === q || n.name.toLowerCase().includes(q));
    if (match) {
      selectNode(match);
      document.getElementById('galaxyCard')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.A2AGalaxy = {
    init: initGalaxy,
    rebuild: buildConstellation,
    selectNode: selectNode,
    flyToAgent: window.flyToAgent,
    resetView: () => {
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetZoom = 1.0;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalaxy);
  } else {
    setTimeout(initGalaxy, 50);
  }

})();
