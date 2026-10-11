export function renderNextQuestPreview(container) {
  container.innerHTML = `
    <section class="section-padding" style="background: var(--color-bg);">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Anti-Repetition Engine</div>
          <h2 class="section-title">Every Quest Is A Fresh Adventure</h2>
          <p class="section-subtitle">
            TouchQuest remembers every concept you've ever found. When you play again, you won't get recycled missions or slight re-wordings.
          </p>
        </div>

        <div class="quest-variation-comparison">
          <div class="comparison-grid">
            <!-- First Quest Column -->
            <div class="comparison-col">
              <h4>
                <span>🏕️ Quest #1 (First Journey)</span>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">Baseline</span>
              </h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">
                Immediate observation of prominent surroundings:
              </p>
              <ul>
                <li>📸 <strong>Find something green</strong> (Broad color observation)</li>
                <li>📸 <strong>Find something perfectly round</strong> (Simple geometry)</li>
                <li>📸 <strong>Find a flower or garden plant</strong> (Flora recognition)</li>
                <li>📸 <strong>Find something that looks old</strong> (Texture & patina)</li>
              </ul>
            </div>

            <!-- Second Quest Column -->
            <div class="comparison-col second-quest">
              <h4>
                <span>🌲 Quest #2 (Immediate Replay)</span>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary);">AI Concept Shift ✓</span>
              </h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">
                Zero concept repetition. Rotates to new categories and observation filters:
              </p>
              <ul>
                <li>📸 <strong>Find something with an interesting texture</strong> (Tactile category)</li>
                <li>📸 <strong>Find two objects with similar colors</strong> (Relational comparison)</li>
                <li>📸 <strong>Find something partially hidden</strong> (Depth & layering)</li>
                <li>📸 <strong>Find a repeating natural pattern</strong> (Rhythm & structure)</li>
              </ul>
            </div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: var(--border-light); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.88rem; color: var(--color-text-muted);">
            <div>
              💡 <strong>Smart Variation:</strong> Broad concepts aren't banned forever, but when they return, the AI introduces a twist constraint (e.g. <em>“Find two different shades of green in one frame”</em>).
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
