import { StorageService } from './storage.js';

export function renderOpenAI(container) {
  const settings = StorageService.getSettings();

  container.innerHTML = `
    <section class="section-padding" id="open-ai">
      <div class="container">
        <div class="open-ai-section">
          <div class="section-header" style="margin-bottom: 2rem;">
            <div class="section-eyebrow">Architecture & Philosophy</div>
            <h2 class="section-title">Why Open AI?</h2>
            <p class="section-subtitle">
              TouchQuest is designed around open-weight AI because the AI should belong to the experience — not lock the experience to one closed provider.
            </p>
          </div>

          <div style="background: rgba(45, 106, 79, 0.08); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.5rem;">⚙️</span>
              <div>
                <strong>Active AI Backend:</strong> 
                <span id="current-ai-mode-text" style="color: var(--color-primary); font-weight: 700;">
                  Open-Weight Simulator + In-Browser Canvas Vision Engine
                </span>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">
                  Prototype Mode: Swappable architecture ready for PaliGemma, Qwen2-VL, and Llama 3.
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" id="btn-toggle-ai-inspector">
              Open Model Inspector 🔬
            </button>
          </div>

          <div class="open-ai-features-grid">
            <div class="open-ai-feat-card">
              <h4><span>🔀</span> Swappable Providers</h4>
              <p>
                Seamlessly swap between open-weight weights (Qwen-2.5, Gemma 2, Llama 3.1) and vision-language models (PaliGemma, Moondream2) with zero frontend rewrites.
              </p>
            </div>

            <div class="open-ai-feat-card">
              <h4><span>🔒</span> Privacy & Local Control</h4>
              <p>
                Open vision models allow photo verification to run directly on-device or on a private self-hosted server (vLLM, Ollama), keeping your private photos off big-tech cloud servers.
              </p>
            </div>

            <div class="open-ai-feat-card">
              <h4><span>🌱</span> No Vendor Lock-In</h4>
              <p>
                Open-weight foundations mean TouchQuest can be customized, fine-tuned on local botany, and run indefinitely without subscription fees or API deprecation risk.
              </p>
            </div>
          </div>

          <!-- Model Inspector Drawer (Collapsible) -->
          <div id="ai-inspector-drawer" style="display: none; margin-top: 2rem; background: #FFFFFF; border-radius: var(--radius-md); border: var(--border-light); padding: 1.75rem;">
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-forest); margin-bottom: 1rem;">
              Open-Weight AI Pipeline Inspector
            </h4>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem;">
                  AI Generation Engine
                </label>
                <select id="ai-generator-select" style="width: 100%; padding: 0.65rem; border-radius: var(--radius-sm); border: var(--border-light);">
                  <option value="qwen25">Qwen-2.5-7B-Instruct (Recommended)</option>
                  <option value="llama31">Llama-3.1-8B-Instruct</option>
                  <option value="gemma2">Gemma-2-9B-IT</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem;">
                  Vision Verification Model
                </label>
                <select id="ai-vision-select" style="width: 100%; padding: 0.65rem; border-radius: var(--radius-sm); border: var(--border-light);">
                  <option value="paligemma">PaliGemma-3B-Vision (Browser/Edge Hybrid)</option>
                  <option value="qwen_vl">Qwen-2.5-VL-7B</option>
                  <option value="moondream">Moondream2 (Compact Vision)</option>
                </select>
              </div>
            </div>

            <div style="background: #172B21; color: #74C69D; padding: 1rem; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.82rem; overflow-x: auto; line-height: 1.5;">
              <div>// Sample structured JSON returned by open-weight challenge generator:</div>
              <div>{</div>
              <div>&nbsp;&nbsp;"level": 3,</div>
              <div>&nbsp;&nbsp;"time_limit_sec": 900,</div>
              <div>&nbsp;&nbsp;"challenges": [</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;{ "title": "Everyday Pareidolia", "category": "visual_illusion", "concept": "pareidolia_face" },</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;{ "title": "Living Balance", "category": "human_vs_nature", "concept": "symbiotic_frame" }</div>
              <div>&nbsp;&nbsp;]</div>
              <div>}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const btnToggle = container.querySelector('#btn-toggle-ai-inspector');
  const drawer = container.querySelector('#ai-inspector-drawer');
  btnToggle?.addEventListener('click', () => {
    const isHidden = drawer.style.display === 'none';
    drawer.style.display = isHidden ? 'block' : 'none';
    btnToggle.textContent = isHidden ? 'Close Model Inspector ▲' : 'Open Model Inspector 🔬';
  });
}
