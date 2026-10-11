export function renderAntiScreen(container) {
  container.innerHTML = `
    <div class="container">
      <section class="anti-screen-section">
        <div class="anti-screen-grid">
          <div class="anti-screen-content">
            <div class="hero-pill" style="background: rgba(255,255,255,0.15); color: #B7E4C7; border-color: rgba(255,255,255,0.2);">
              <span>🌱</span> Anti-Screen Philosophy
            </div>
            <h2>Your phone isn't the destination.</h2>
            <p>
              TouchQuest uses your screen to give you a mission — then asks you to put it away. 
              No endless feeds, no algorithmic doomscrolling, no dark engagement loops. 
              The screen should be the shortest part of your day.
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: #B7E4C7;">
                ✕ No infinite scrolling
              </span>
              <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: #B7E4C7;">
                ✕ No push spam
              </span>
              <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: #B7E4C7;">
                ✓ Real outdoor air
              </span>
            </div>
          </div>

          <div class="anti-screen-loop-card">
            <h3><span>🔄</span> The TouchQuest Loop</h3>
            <div class="loop-steps-vertical">
              <div class="loop-step-row">
                <div class="loop-step-dot">1</div>
                <span>Start & Read the AI Mission (1 min)</span>
              </div>
              <div class="loop-step-row">
                <div class="loop-step-dot">2</div>
                <span style="color: #74C69D;">Put phone in pocket & Go Outside (30-40 min)</span>
              </div>
              <div class="loop-step-row">
                <div class="loop-step-dot">3</div>
                <span>Observe shadows, textures, and nature</span>
              </div>
              <div class="loop-step-row">
                <div class="loop-step-dot">4</div>
                <span>Snap discovery with your camera</span>
              </div>
              <div class="loop-step-row">
                <div class="loop-step-dot">5</div>
                <span>Return, Verify, Collect Badge, & Leave</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
