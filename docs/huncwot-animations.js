// ===== HUNCWOT ANIMATION SYSTEM REFERENCE =====
// Extracted patterns and parameters from https://huncwot.com

// Animation Configuration Object (reconstructed from extracted parameters)
const animationConfig = {
  // Graphics modes available
  modes: {
    'gfx-0-plain': 'Clean geometric patterns',
    'gfx-1-dots': 'Particle dot system', 
    'gfx-2-squares': 'Square grid patterns',
    'gfx-3-plain': 'Alternative clean mode',
    'gfx-4-waves': 'Wave/sine pattern effects'
  },
  
  // Core animation parameters
  params: {
    // Visual properties
    size: 50,
    thickness: 2,
    density: 75, // percentage
    grid: true,
    strokeWidth: 1,
    
    // Movement properties  
    diagonalFactor: 1.0,
    diagonalShift: 0,
    speed: 1.0,
    friction: 0.95,
    ease: 'cubic-bezier(0.5, 0, 0.2, 1)',
    strength: 1.0,
    
    // Rotation system
    rotation: 0,
    loopRotation: 0.01,
    scrollRotation: 0.1,
    
    // Mouse interaction
    mouseRadius: 100,
    mouseX: 0,
    mouseY: 0,
    mouseSpeed: 0,
    mouseFactor: 1.0,
    
    // Scroll effects
    scrollVelocity: 0,
    time: 0,
    
    // Distortion effects
    distortions: {
      amount: 0.1,
      maxSpeed: 10,
      maxSize: 100,
      maxX: 50,
      maxY: 50,
      debug: false
    },
    
    // Wave-specific (for gfx-4-waves)
    sinusFactor: 1.0,
    sinusOffset: 0
  }
};

// Canvas Animation Class (reconstructed pattern)
class HuncwotAnimationSystem {
  constructor(canvas, config = animationConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.mode = 'gfx-1-dots'; // default mode
    this.isAnimating = false;
    this.mouse = { x: 0, y: 0, speed: 0 };
    this.scroll = { velocity: 0, position: 0 };
    this.time = 0;
    
    this.setupCanvas();
    this.bindEvents();
  }
  
  setupCanvas() {
    // Set canvas dimensions
    this.canvas.width = 2470;
    this.canvas.height = 2470;
    this.canvas.style.width = '2470px';
    this.canvas.style.height = '2470px';
    this.canvas.style.margin = '-300px';
  }
  
  bindEvents() {
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const prevX = this.mouse.x;
      const prevY = this.mouse.y;
      
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      
      // Calculate mouse speed
      const deltaX = this.mouse.x - prevX;
      const deltaY = this.mouse.y - prevY;
      this.mouse.speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    });
    
    // Scroll tracking
    window.addEventListener('scroll', () => {
      const prevPosition = this.scroll.position;
      this.scroll.position = window.pageYOffset;
      this.scroll.velocity = this.scroll.position - prevPosition;
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
      this.setupCanvas();
    });
  }
  
  // Animation mode implementations
  renderPlain() {
    // gfx-0-plain and gfx-3-plain implementation
    const { size, thickness, density, rotation, scrollRotation } = this.config.params;
    
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = thickness;
    
    const gridSize = size;
    const cols = Math.floor(this.canvas.width / gridSize);
    const rows = Math.floor(this.canvas.height / gridSize);
    
    for (let i = 0; i < cols * (density / 100); i++) {
      for (let j = 0; j < rows * (density / 100); j++) {
        this.ctx.save();
        this.ctx.translate(i * gridSize, j * gridSize);
        this.ctx.rotate(rotation + this.scroll.position * scrollRotation * 0.01);
        
        this.ctx.beginPath();
        this.ctx.rect(-size/2, -size/2, size, size);
        this.ctx.stroke();
        
        this.ctx.restore();
      }
    }
  }
  
  renderDots() {
    // gfx-1-dots implementation
    const { size, density, mouseRadius, mouseFactor, speed } = this.config.params;
    
    this.ctx.fillStyle = '#ffffff';
    
    const gridSize = size * 2;
    const cols = Math.floor(this.canvas.width / gridSize);
    const rows = Math.floor(this.canvas.height / gridSize);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > density / 100) continue;
        
        const x = i * gridSize;
        const y = j * gridSize;
        
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(x - this.mouse.x, 2) + Math.pow(y - this.mouse.y, 2)
        );
        
        let dotSize = size;
        if (mouseDistance < mouseRadius) {
          const influence = 1 - (mouseDistance / mouseRadius);
          dotSize *= (1 + influence * mouseFactor);
        }
        
        // Animation offset
        const animationOffset = Math.sin(this.time * speed + i * 0.1 + j * 0.1) * 10;
        
        this.ctx.beginPath();
        this.ctx.arc(x + animationOffset, y, dotSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }
  
  renderSquares() {
    // gfx-2-squares implementation
    const { size, thickness, density, diagonalFactor, diagonalShift } = this.config.params;
    
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = thickness;
    
    const gridSize = size * 1.5;
    const cols = Math.floor(this.canvas.width / gridSize);
    const rows = Math.floor(this.canvas.height / gridSize);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > density / 100) continue;
        
        const x = i * gridSize + (j % 2) * (gridSize * diagonalFactor) + diagonalShift;
        const y = j * gridSize;
        
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.stroke();
      }
    }
  }
  
  renderWaves() {
    // gfx-4-waves implementation
    const { thickness, sinusFactor, sinusOffset, speed } = this.config.params;
    
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = thickness;
    
    const waveCount = 5;
    const amplitude = 50;
    
    for (let w = 0; w < waveCount; w++) {
      this.ctx.beginPath();
      
      for (let x = 0; x < this.canvas.width; x += 5) {
        const y = this.canvas.height / 2 + 
                  Math.sin((x * 0.01 + this.time * speed + w) * sinusFactor + sinusOffset) * amplitude +
                  w * 20;
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
    }
  }
  
  // Main render method
  render() {
    if (!this.isAnimating) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update time
    this.time += 0.016; // ~60fps
    
    // Apply distortions if enabled
    if (this.config.params.distortions.amount > 0) {
      this.applyDistortions();
    }
    
    // Render based on current mode
    switch (this.mode) {
      case 'gfx-0-plain':
      case 'gfx-3-plain':
        this.renderPlain();
        break;
      case 'gfx-1-dots':
        this.renderDots();
        break;
      case 'gfx-2-squares':
        this.renderSquares();
        break;
      case 'gfx-4-waves':
        this.renderWaves();
        break;
    }
    
    // Continue animation loop
    requestAnimationFrame(() => this.render());
  }
  
  applyDistortions() {
    const { amount, maxSpeed, maxSize } = this.config.params.distortions;
    
    // Apply canvas transformations based on mouse and scroll
    const mouseInfluence = Math.min(this.mouse.speed / maxSpeed, 1) * amount;
    const scrollInfluence = Math.min(Math.abs(this.scroll.velocity) / 10, 1) * amount;
    
    this.ctx.save();
    this.ctx.scale(1 + mouseInfluence * 0.1, 1 + scrollInfluence * 0.1);
  }
  
  // Control methods
  start() {
    this.isAnimating = true;
    this.render();
  }
  
  stop() {
    this.isAnimating = false;
  }
  
  setMode(mode) {
    if (this.config.modes[mode]) {
      this.mode = mode;
    }
  }
  
  updateParam(param, value) {
    if (this.config.params.hasOwnProperty(param)) {
      this.config.params[param] = value;
    }
  }
}

// Page State Management (from extracted CSS classes)
class PageStateManager {
  constructor() {
    this.body = document.body;
    this.bindScrollEvents();
    this.bindLoadEvents();
  }
  
  bindScrollEvents() {
    let scrollY = 0;
    let isScrollingDown = false;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;
      
      // Update scroll direction
      if (currentScrollY > scrollY) {
        isScrollingDown = true;
        this.body.classList.add('is-scrolling-down');
      } else {
        isScrollingDown = false;
        this.body.classList.remove('is-scrolling-down');
      }
      
      // Update scroll state
      if (currentScrollY > 10) {
        this.body.classList.add('is-scrolled');
      } else {
        this.body.classList.remove('is-scrolled');
      }
      
      // Update window height state
      if (currentScrollY > window.innerHeight) {
        this.body.classList.add('is-scrolled-window-height');
      } else {
        this.body.classList.remove('is-scrolled-window-height');
      }
      
      scrollY = currentScrollY;
    });
  }
  
  bindLoadEvents() {
    // Handle loading states
    this.body.classList.add('is-loading');
    
    window.addEventListener('load', () => {
      this.body.classList.remove('is-loading', 'is-not-ready');
      this.body.classList.add('is-loaded');
    });
  }
}

// Text Animation System (word-by-word reveals)
class TextAnimationSystem {
  static animateText(element, options = {}) {
    const {
      delay = 100,
      duration = 600,
      easing = 'cubic-bezier(0.5, 0, 0.2, 1)'
    } = options;
    
    const text = element.textContent;
    const words = text.split(' ');
    
    element.innerHTML = words.map((word, index) => 
      `<span class="word" style="animation-delay: ${index * delay}ms">${word}</span>`
    ).join(' ');
    
    element.classList.add('animated-text');
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize page state management
  new PageStateManager();
  
  // Initialize canvas animation if canvas exists
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const animationSystem = new HuncwotAnimationSystem(canvas);
    animationSystem.start();
    
    // Debug controls (if needed)
    if (window.location.hash === '#debug') {
      createDebugControls(animationSystem);
    }
  }
  
  // Animate text elements
  document.querySelectorAll('.hero-title, .project-title').forEach(element => {
    TextAnimationSystem.animateText(element);
  });
});

// Debug Controls (development utility)
function createDebugControls(animationSystem) {
  const controls = document.createElement('div');
  controls.className = 'animation-controls debug-mode';
  
  const params = animationSystem.config.params;
  
  Object.keys(params).forEach(param => {
    if (typeof params[param] === 'number') {
      const group = document.createElement('div');
      group.className = 'control-group';
      
      const label = document.createElement('label');
      label.className = 'control-label';
      label.textContent = param;
      
      const input = document.createElement('input');
      input.className = 'control-input';
      input.type = 'range';
      input.min = param.includes('density') ? 0 : -100;
      input.max = param.includes('density') ? 100 : 100;
      input.step = 0.1;
      input.value = params[param];
      
      input.addEventListener('input', () => {
        animationSystem.updateParam(param, parseFloat(input.value));
      });
      
      group.appendChild(label);
      group.appendChild(input);
      controls.appendChild(group);
    }
  });
  
  document.body.appendChild(controls);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HuncwotAnimationSystem,
    PageStateManager,
    TextAnimationSystem,
    animationConfig
  };
}