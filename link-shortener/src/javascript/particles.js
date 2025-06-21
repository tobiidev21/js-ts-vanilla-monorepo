let canvas, ctx, particlesArray = []

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 195, 0, 0.7)';
    ctx.fill();
  }
}

function initParticles() {
  canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    console.error('Canvas no encontrado');
    return;
  }
  
  ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Ajustar al redimensionar
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  const maxDistance = 100;
  for (let a = 0; a < particlesArray.length; a++) { // este ciclo itera desde la primera a la última partícula
    for (let b = a + 1; b < particlesArray.length; b++) { // este ciclo itera todas las partículas a excepción de la seleccionada (a, b + 1) para evitar comparar la misma partícula
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy); // se obtiene la distancia euclidiana entre ambos puntos o partículas  
      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,195,0,${1 - distance / maxDistance})`; // se distribuye la distancia a la inversa (1 - distance) entre la máxima distancia (maxDistance) para obtener un valor que tiende a uno, si la distancia es mayor, y un valor que tiende a 0 si la distancia es menor. 
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
  // ISSUE: esta función traza una linea entre todos y cada uno de los pares de partículas independientemente de su distancia. Es decir que si la distancia entre dos partículas es relativamente alta, la línea existirá de igual manera pero no será visible debido a la naturaleza del algoritmo: Conforme la distancia aumente, la opacidad tenderá a 0 o se acercará al valor 0. Por ende, la línea existe pero no es visible ya que su opacidad es casi nula. Esto afecta el rendimiento. TO-DO: colocar un límite de distancia a partir del cuál la línea comenzará a trazarse. 
}

function animate() {
  if (!ctx) return; // defensa preventiva
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

initParticles()
animate()
