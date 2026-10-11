export function renderHowItWorks(container) {
  container.innerHTML = `
    <section class="section-padding" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">The Experience</div>
          <h2 class="section-title">How TouchQuest Works</h2>
          <p class="section-subtitle">
            An outdoor photography game where the screen is the shortest part of your day.
          </p>
        </div>

        <div class="how-it-works-grid">
          <!-- Step 01 -->
          <div class="step-card">
            <div class="step-number">
              <span>STEP 01</span>
              <span>⚡</span>
            </div>
            <div class="step-icon-wrap">🧭</div>
            <h3 class="step-title">Start</h3>
            <p class="step-desc">
              Start a new quest. No complicated settings or time picking. The adventure sets the rules.
            </p>
          </div>

          <!-- Step 02 -->
          <div class="step-card">
            <div class="step-number">
              <span>STEP 02</span>
              <span>🤖</span>
            </div>
            <div class="step-icon-wrap">✨</div>
            <h3 class="step-title">Get Your Mission</h3>
            <p class="step-desc">
              Open-weight AI generates unique photography challenges tailored to everyday outdoor environments.
            </p>
          </div>

          <!-- Step 03 -->
          <div class="step-card">
            <div class="step-number">
              <span>STEP 03</span>
              <span>🌿</span>
            </div>
            <div class="step-icon-wrap">👟</div>
            <h3 class="step-title">Touch Grass</h3>
            <p class="step-desc">
              Put your phone down, step outdoors, and observe the patterns, shadows, and living wonders around you.
            </p>
          </div>

          <!-- Step 04 -->
          <div class="step-card">
            <div class="step-number">
              <span>STEP 04</span>
              <span>🏆</span>
            </div>
            <div class="step-icon-wrap">📸</div>
            <h3 class="step-title">Capture & Complete</h3>
            <p class="step-desc">
              Take the required photos and let our open-weight vision model verify your real world discoveries.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
