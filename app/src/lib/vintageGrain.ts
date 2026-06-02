interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
}

interface GrainConfig {
  particleCount: number;
  particleSizeMin: number;
  particleSizeMax: number;
  opacityMin: number;
  opacityMax: number;
  driftSpeed: number;
  scrollInfluence: number;
  velocityDecay: number;
  clearAlpha: number;
  burstCount: number;
}

const DEFAULT_CONFIG: GrainConfig = {
  particleCount: 3000,
  particleSizeMin: 1,
  particleSizeMax: 3,
  opacityMin: 0.1,
  opacityMax: 0.5,
  driftSpeed: 0.3,
  scrollInfluence: 0.3,
  velocityDecay: 0.9,
  clearAlpha: 0.15,
  burstCount: 500,
};

const WARM_COLORS = [
  'rgb(44, 24, 16)',
  'rgb(90, 50, 30)',
  'rgb(120, 70, 40)',
  'rgb(200, 128, 58)',
  'rgb(212, 168, 83)',
  'rgb(245, 230, 208)',
  'rgb(184, 98, 58)',
  'rgb(160, 100, 50)',
  'rgb(80, 45, 25)',
];

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomColor(): string {
  return WARM_COLORS[Math.floor(Math.random() * WARM_COLORS.length)];
}

export function init(canvas: HTMLCanvasElement, config?: Partial<GrainConfig>): () => void {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return () => {};

  const isMobile = window.innerWidth < 768;
  const actualParticleCount = isMobile ? Math.floor(cfg.particleCount / 2) : cfg.particleCount;

  let particles: Particle[] = [];
  let burstParticles: Particle[] = [];
  let animFrameId: number;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;
  let isActive = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createParticle(): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      w: randomRange(cfg.particleSizeMin, cfg.particleSizeMax),
      h: randomRange(cfg.particleSizeMin, cfg.particleSizeMax),
      color: randomColor(),
      opacity: randomRange(cfg.opacityMin, cfg.opacityMax),
      vx: randomRange(-cfg.driftSpeed, cfg.driftSpeed),
      vy: randomRange(-cfg.driftSpeed, cfg.driftSpeed),
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < actualParticleCount; i++) {
      particles.push(createParticle());
    }
    burstParticles = [];
    for (let i = 0; i < cfg.burstCount; i++) {
      burstParticles.push(createParticle());
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    initParticles();
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
  }

  function drawParticle(p: Particle, extraOpacity: number = 0) {
    ctx!.fillStyle = p.color;
    ctx!.globalAlpha = Math.min(p.opacity + extraOpacity, 0.7);
    ctx!.fillRect(p.x, p.y, p.w, p.h);
    ctx!.globalAlpha = 1;
  }

  function render() {
    if (!isActive) return;

    if (prefersReducedMotion) {
      // Static grain - render once
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = `rgba(44, 24, 16, ${cfg.clearAlpha})`;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        drawParticle(p);
      }
      return;
    }

    // Semi-transparent clear for trail effect
    ctx!.fillStyle = `rgba(44, 24, 16, ${cfg.clearAlpha})`;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    // Decay scroll velocity
    scrollVelocity *= cfg.velocityDecay;

    // Calculate velocity intensity (0 to 1)
    const velocityIntensity = Math.min(Math.abs(scrollVelocity) / 50, 1);
    const extraOpacity = velocityIntensity * 0.2;

    // Active particle count based on scroll velocity
    const activeBurstCount = Math.floor(velocityIntensity * cfg.burstCount);

    // Draw base particles
    for (const p of particles) {
      p.x += p.vx + scrollVelocity * cfg.scrollInfluence * 0.1;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      drawParticle(p, extraOpacity);
    }

    // Draw burst particles during fast scroll
    if (activeBurstCount > 10) {
      for (let i = 0; i < activeBurstCount; i++) {
        const bp = burstParticles[i];
        bp.x += bp.vx * 2 + scrollVelocity * cfg.scrollInfluence;
        bp.y += bp.vy * 2;

        if (bp.x < 0) bp.x = canvas.width;
        if (bp.x > canvas.width) bp.x = 0;
        if (bp.y < 0) bp.y = canvas.height;
        if (bp.y > canvas.height) bp.y = 0;

        drawParticle(bp, extraOpacity * 1.5);
      }
    }

    animFrameId = requestAnimationFrame(render);
  }

  // Initialize
  resize();

  if (!prefersReducedMotion) {
    animFrameId = requestAnimationFrame(render);
  } else {
    render();
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(canvas.parentElement!);

  // Cleanup function
  return () => {
    isActive = false;
    cancelAnimationFrame(animFrameId);
    window.removeEventListener('scroll', handleScroll);
    resizeObserver.disconnect();
  };
}
