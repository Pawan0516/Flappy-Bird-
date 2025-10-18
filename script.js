const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// === Game variables ===
let bird = { x: 80, y: 200, radius: 15, gravity: 0.5, lift: -8, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;
let paused = false;

// === Keyboard controls ===
document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") bird.velocity = bird.lift;
  if (e.key === "s" || e.key === "ArrowDown") bird.velocity += 3;
  if (e.key === "p" || e.key === "P") paused = !paused;
  if (e.key === "r" || e.key === "R") restartGame();
});

// === On-screen button controls ===
document.getElementById("upBtn").addEventListener("click", () => bird.velocity = bird.lift);
document.getElementById("downBtn").addEventListener("click", () => bird.velocity += 3);
document.getElementById("pauseBtn").addEventListener("click", () => paused = !paused);
document.getElementById("restartBtn").addEventListener("click", restartGame);

// === Pipe spawn ===
function spawnPipe() {
  const gap = 120;
  const top = Math.random() * (canvas.height - gap - 50) + 20;
  pipes.push({ x: canvas.width, top: top, bottom: top + gap, width: 50, passed: false });
}

// === Restart game ===
function restartGame() {
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  frame = 0;
  score = 0;
  gameOver = false;
}

// === Collision check ===
function checkCollision(pipe) {
  if (
    bird.x + bird.radius > pipe.x &&
    bird.x - bird.radius < pipe.x + pipe.width &&
    (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)
  ) return true;
  return false;
}

// === Game update ===
function update() {
  if (paused || gameOver) return;
  frame++;

  // Gravity
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Spawn pipes every 90 frames
  if (frame % 90 === 0) spawnPipe();

  // Move pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    const p = pipes[i];
    p.x -= 3;

    if (checkCollision(p)) gameOver = true;

    if (!p.passed && p.x + p.width < bird.x) {
      score++;
      p.passed = true;
    }

    if (p.x + p.width < 0) pipes.splice(i, 1);
  }

  // Ground/ceiling collision
  if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) gameOver = true;
}

// === Draw game ===
function draw() {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient sky already in CSS

  // Draw bird
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Draw pipes
  pipes.forEach((p) => {
    // Pipe color with gradient
    const gradient = ctx.createLinearGradient(p.x, 0, p.x + p.width, canvas.height);
    gradient.addColorStop(0, "#0f0");
    gradient.addColorStop(1, "#006400");
    ctx.fillStyle = gradient;

    ctx.fillRect(p.x, 0, p.width, p.top);
    ctx.fillRect(p.x, p.bottom, p.width, canvas.height - p.bottom);
  });

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  // Paused / game over text
  if (paused) {
    ctx.font = "30px Arial";
    ctx.fillText("PAUSED", canvas.width / 2 - 60, canvas.height / 2);
  }
  if (gameOver) {
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2);
    ctx.font = "18px Arial";
    ctx.fillText("Press R to Restart", canvas.width / 2 - 85, canvas.height / 2 + 30);
  }
}

// === Main loop ===
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
