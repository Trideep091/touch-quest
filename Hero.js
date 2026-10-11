export function renderHero(container, onStartQuest, onHowItWorks) {
  container.innerHTML = `
    <section class="hero-section" id="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-pill">
            <span>🌿</span> Touch Grass Photography Game
          </div>

          <h1 class="hero-title">
            Stop scrolling.<br>
            <span class="highlight">Start exploring.</span>
          </h1>

          <p class="hero-subtitle">
            Give your attention to the world around you. TouchQuest gives you a photography mission — then sends you outside to complete it.
          </p>

          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" id="hero-start-cta">
              Start Your Quest →
            </button>
            <button class="btn btn-secondary btn-lg" id="hero-how-cta">
              How It Works
            </button>
          </div>

          <!-- Concept Flow Diagram (Requirement #4) -->
          <div class="concept-flow-card">
            <div class="concept-flow-label">How A Quest Flows</div>
            <div class="concept-flow-steps">
              <div class="flow-step-item">
                <div class="flow-step-icon">🤖</div>
                <div class="flow-step-name">AI Challenge</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step-item">
                <div class="flow-step-icon">🚶</div>
                <div class="flow-step-name">Go Outside</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step-item">
                <div class="flow-step-icon">📸</div>
                <div class="flow-step-name">Take Photos</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step-item">
                <div class="flow-step-icon">👁️</div>
                <div class="flow-step-name">AI Verification</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step-item">
                <div class="flow-step-icon">⚡</div>
                <div class="flow-step-name">Level Up</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step-item">
                <div class="flow-step-icon">🏆</div>
                <div class="flow-step-name">Badge</div>
              </div>
            </div>
          </div>

          <p class="hero-tagline">“The screen is only the beginning.”</p>
        </div>

        <!-- Hero Visual Frame with Camera Viewfinder Reticle -->
        <div class="hero-visual-card">
          <div class="hero-image-wrap">
            <img src="hero.jpg" alt="Explorer photographing wildflowers in nature" width="800" height="600">
            <div class="viewfinder-reticle">
              <div class="reticle-corner reticle-tl"></div>
              <div class="reticle-corner reticle-tr"></div>
              <div class="reticle-corner reticle-bl"></div>
              <div class="reticle-corner reticle-br"></div>
              <div class="reticle-center"></div>
            </div>
          </div>
          <div class="hero-badge-overlay">
            <div>
              <h4><span>🎯</span> 9 Real World Discoveries</h4>
              <p>Achievable right outside your door</p>
            </div>
            <span style="font-size: 1.5rem;">🌿</span>
          </div>
        </div>
      </div>
    </section>
  `;

  container.querySelector('#hero-start-cta')?.addEventListener('click', onStartQuest);
  container.querySelector('#hero-how-cta')?.addEventListener('click', onHowItWorks);
}
