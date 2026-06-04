document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snowCanvas");
  const ctx = canvas.getContext("2d");
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Snowflake properties
  const numFlakes = 150;
  const flakes = [];

  // Create snowflake objects
  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: Math.random() * 0.8 - 0.1,
      speedY: Math.random() * 1.8 + 0.2,
    });
  }

  // Pre-set fill style (avoid setting every frame)
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

  // Draw snowflakes (optimized)
  function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    // Draw each flake individually - faster than one path
    for (let i = 0; i < flakes.length; i++) {
      const flake = flakes[i];
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, 6.283185307179586); // Math.PI * 2 precomputed
      ctx.fill();
    }
  }

  // Update snowflake positions (optimized)
  function updateFlakes() {
    const w = canvas.width;
    const h = canvas.height;
    
    for (let i = 0; i < flakes.length; i++) {
      const flake = flakes[i];
      flake.x += flake.speedX;
      flake.y += flake.speedY;

      // Reset snowflake when it goes off-screen
      if (flake.x > w || flake.x < 0 || flake.y > h) {
        flake.x = Math.random() * w;
        flake.y = -10;
      }
    }
  }

  // Animation loop
  function animateSnow() {
    updateFlakes();
    drawFlakes();
    requestAnimationFrame(animateSnow);
  }

  animateSnow();

  // Adjust canvas size on window resize (with debouncing)
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 100);
  });
});