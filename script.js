const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// === Game variables ===
let bird = { x: 80, y: 200, width: 30, height: 30, gravity: 0.5, lift: -8, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;
let paused = false;

// === Controls ===
document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") bird.velocity = bird.lift;
  if (e.key === "s" || e.key === "ArrowDown") bird.velocity += 3;
  if (e.key === "p" || e.key === "P") paused = !paused;
  if (e.key === "r" || e.key === "R") restartGame();
});

// === Pipe spawn function ===
function spawnPipe() {
  const gap = 120;
  const top = Math.random() * (canvas.height - gap - 50) + 20;
  pipes.push({ x: canvas.width, top: top, bottom: top + gap, width: 50 });
}

// === Restart the game ===
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
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
  ) {
    return true;
  }
  return false;
}

// === Game loop ===
function update() {
  if (paused || gameOver) return;

  frame++;

  // gravity
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // spawn pipes every 90 frames
  if (frame % 90 === 0) spawnPipe();

  // move pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    const p = pipes[i];
    p.x -= 3;

    // collision
    if (checkCollision(p)) gameOver = true;

    // score
    if (p.x + p.width === bird.x) score++;

    // remove off-screen pipes
    if (p.x + p.width < 0) pipes.splice(i, 1);
  }

  // ground or ceiling hit
  if (bird.y + bird.height > canvas.height || bird.y < 0) gameOver = true;
}

// === Draw function ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // draw pipes
  ctx.fillStyle = "green";
  pipes.forEach((p) => {
    ctx.fillRect(p.x, 0, p.width, p.top);
    ctx.fillRect(p.x, p.bottom, p.width, canvas.height - p.bottom);
  });

  // draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  if (paused) {
    ctx.font = "30px Arial";
    ctx.fillText("PAUSED", 130, 250);
  }

  if (gameOver) {
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", 110, 250);
    ctx.font = "18px Arial";
    ctx.fillText("Press R to Restart", 120, 280);
  }
}

// === Main loop ===
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
