export default class ParticlesCanvas {
  constructor(canvas, numParticles = 100) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Provided canvas is not a valid <canvas> element.");
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.numParticles = numParticles;
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 100 };

    this.init();
    this.bindEvents();
    this.animate = this.animate.bind(this); // bind for RAF
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // this.canvas.style.overflow = hidden;
    this.particles = [];

    for (let i = 0; i < this.numParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(x, y, this.canvas));
    }
  }

  bindEvents() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener("resize", () => {
      this.init();
    });
  }

  handleParticles() {
    this.particles.forEach((particle) => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const directionX = Math.cos(angle) * force * 5;
        const directionY = Math.sin(angle) * force * 5;
        particle.x -= directionX;
        particle.y -= directionY;
      }
      particle.update();
      particle.draw(this.ctx);
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleParticles();
    requestAnimationFrame(this.animate);
  }

  start() {
    this.animate();
  }
}

// Inner class (not exported)
class Particle {
  constructor(x, y, canvas) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
    this.color = `rgba(255,255,255,${Math.random()})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
