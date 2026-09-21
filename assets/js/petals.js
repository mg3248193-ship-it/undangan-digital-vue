// Falling Sakura / Golden Petals Canvas Animation
export function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL_PETALS = 28;
  const colors = [
    'rgba(244, 215, 160, 0.45)', // gold shimmer
    'rgba(255, 235, 235, 0.5)',  // soft white rose
    'rgba(248, 200, 220, 0.4)',  // blush pink
    'rgba(218, 185, 120, 0.35)'  // antique champagne
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = 8 + Math.random() * 9;
      this.speedY = 0.6 + Math.random() * 0.9;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.oscillationSpeed = 0.015 + Math.random() * 0.02;
      this.oscillationDistance = 20 + Math.random() * 30;
      this.step = Math.random() * 100;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.step += this.oscillationSpeed;
      this.x += Math.sin(this.step) * 0.7 + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let petal of petals) {
      petal.update();
      petal.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}
