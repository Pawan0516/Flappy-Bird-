# 🕊️ Flappy Bird Clone — 4 Controls Edition

A minimal, fully playable **Flappy Bird clone** built using **HTML, CSS, and JavaScript**.  
Features **four distinct controls** (Up, Down, Pause, Restart) and a smooth game loop running on an HTML5 canvas.

---

## 🎮 Gameplay Controls

| Key | Action |
|-----|--------|
| **W / Arrow ↑** | Bird flaps upward |
| **S / Arrow ↓** | Bird dives downward |
| **P** | Pause / Resume the game |
| **R** | Restart the game after Game Over |

---

## 🧱 Features
- Real-time gravity and movement physics  
- Randomly spawning pipes with gaps  
- Score increases as the bird passes pipes  
- Pause and restart functionality  
- Collision detection (bird–pipe & top/bottom walls)  
- Smooth 60 FPS animation using `requestAnimationFrame`

---

## 📸 Demo
🎥 **Local Demo Proof (45–90 sec):**  
> Show the gameplay using all 4 controls and score increment.  
> *(Attach or upload your screen recording here — e.g., link to Drive or GitHub release asset.)*

---

## 🗂️ Project Structure
```
flappy-bird/
 ┣ index.html
 ┣ style.css
 ┗ script.js
```

---

## ⚙️ How to Run

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/yourusername/flappy-bird-4controls.git
   cd flappy-bird-4controls
   ```

2. **Run Locally:**  
   Just open `index.html` in your browser (no server required).

3. **Optional (for live preview):**
   - Use VS Code’s *Live Server* extension  
   - Or host on GitHub Pages / Netlify for web demo

---

## 🧠 Tech Stack
- **HTML5 Canvas API** — for drawing bird, pipes, and UI  
- **CSS3** — for styling and background  
- **Vanilla JavaScript (ES6)** — for physics, controls, game loop  

---

## 🎨 Assets Used
- Bird, Pipe, and Background are drawn using Canvas shapes (no external assets).  
- Optional image/sound assets can be added later for polish.  

*(All visuals are CC0 / self-created — safe for reuse.)*

---

## 🧩 Acceptance Checklist
✅ Bird moves with gravity  
✅ Collisions with pipes and borders work  
✅ Pipes spawn randomly  
✅ Score increments correctly  
✅ 4 distinct controls functional  
✅ 45–90s screen recording proof ready  
✅ README includes setup, controls, and tools  

---

## 🧾 License
This project is open for educational and demo use.  
If part of an internship submission, all rights are assigned to the program per their internship guidelines.

---

## 💡 Future Enhancements (optional)
- Add background image & bird sprite  
- Include flap and collision sound effects  
- Make it responsive for mobile (tap = flap)  
- Add leaderboard or localStorage-based high score  
