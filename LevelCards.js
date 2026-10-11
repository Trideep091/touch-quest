export function renderLevelCards(container) {
  container.innerHTML = `
    <section class="section-padding" id="levels" style="background: var(--color-bg-alt);">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">The Quest Curve</div>
          <h2 class="section-title">The Three Levels</h2>
          <p class="section-subtitle">
            Difficulty does not mean remote mountains or rare wildlife. It means training your eyes to see ordinary spaces in extraordinary ways.
          </p>
        </div>

        <!-- Visual progression rule indicator (Requirement #6) -->
        <div class="level-progression-bar">
          <div class="progression-stat">
            <span>📉</span> Photos Required: <strong>4 → 3 → 2 (Photos ↓)</strong>
          </div>
          <span style="opacity: 0.3;">|</span>
          <div class="progression-stat">
            <span>📈</span> Creative Challenge: <strong>Easy → Med → Hard (Difficulty ↑)</strong>
          </div>
        </div>

        <div class="three-levels-grid">
          <!-- Level 1 -->
          <div class="level-card level-1">
            <div class="level-card-header">
              <span class="level-badge">🟢 LEVEL 1</span>
              <span style="font-weight: 700; color: var(--level-1-accent);">Easy</span>
            </div>
            <h3 class="level-name">Explorer</h3>
            <p class="level-quote">“Start noticing what is already around you.”</p>
            
            <div class="level-specs">
              <div class="spec-item">
                <span class="spec-value">4</span>
                <span class="spec-label">Photos Required</span>
              </div>
              <div class="spec-item">
                <span class="spec-value">40m</span>
                <span class="spec-label">Fixed Time</span>
              </div>
            </div>

            <div class="level-card-footer">
              <span>Goal: Broad Awareness</span>
              <span>+80 XP Total</span>
            </div>
          </div>

          <!-- Level 2 -->
          <div class="level-card level-2">
            <div class="level-card-header">
              <span class="level-badge">🟡 LEVEL 2</span>
              <span style="font-weight: 700; color: var(--level-2-accent);">Medium</span>
            </div>
            <h3 class="level-name">Observer</h3>
            <p class="level-quote">“Look closer. The obvious answers aren't enough.”</p>
            
            <div class="level-specs">
              <div class="spec-item">
                <span class="spec-value">3</span>
                <span class="spec-label">Photos Required</span>
              </div>
              <div class="spec-item">
                <span class="spec-value">30m</span>
                <span class="spec-label">Fixed Time</span>
              </div>
            </div>

            <div class="level-card-footer">
              <span>Goal: Visual Relationships</span>
              <span>+105 XP Total</span>
            </div>
          </div>

          <!-- Level 3 -->
          <div class="level-card level-3">
            <div class="level-card-header">
              <span class="level-badge">🔴 LEVEL 3</span>
              <span style="font-weight: 700; color: var(--level-3-accent);">Hard</span>
            </div>
            <h3 class="level-name">Creative Explorer</h3>
            <p class="level-quote">“Two photos. Make them count.”</p>

            <div class="level-specs">
              <div class="spec-item">
                <span class="spec-value">2</span>
                <span class="spec-label">Photos Required</span>
              </div>
              <div class="spec-item">
                <span class="spec-value">15m</span>
                <span class="spec-label">Fixed Time</span>
              </div>
            </div>

            <div class="level-extension-tag">
              <span>⏱️</span> Includes one optional +3 min emergency extension
            </div>

            <div class="level-card-footer">
              <span>Goal: Compositional Twists</span>
              <span>+100 XP + Bonus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
