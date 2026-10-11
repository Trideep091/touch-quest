import { ChallengeGeneratorService } from './challengeGenerator.js';
import { PhotoVerificationService } from './photoVerification.js';
import { ChallengeHistoryService } from './challengeHistory.js';
import { PlayerProgressService } from './playerProgress.js';
import { StorageService } from './storage.js';
import { AudioService } from './audioFeedback.js';
import { fireConfetti } from './Confetti.js';

export class QuestManager {
  constructor(container, options = {}) {
    this.container = container;
    this.onNavigate = options.onNavigate || (() => {});
    this.onRefreshNavbar = options.onRefreshNavbar || (() => {});
    
    this.currentQuest = null;
    this.currentLevel = 1;
    this.timeRemaining = 40 * 60;
    this.timerInterval = null;
    this.level3ExtensionUsed = false;
    this.isTimerExpired = false;
    this.activeCameraStream = null;
    this.activeChallengeIndex = null;
    this.questStartTime = null;
    this.retriesThisQuest = 0;
  }

  init() {
    this.renderReadyScreen();
  }

  /**
   * Screen 1: Ready to Touch Grass? (Requirement #7)
   */
  renderReadyScreen() {
    this.stopTimer();

    this.container.innerHTML = `
      <div class="quest-wrapper">
        <div class="container container-narrow">
          <div class="quest-start-card">
            <div class="ready-badge">
              <span>🌿</span> Outdoor Photography Expedition
            </div>

            <h1 class="quest-start-title">Ready to Touch Grass?</h1>
            <p class="quest-start-subtitle">
              Three levels. Nine discoveries. One outdoor adventure.
            </p>

            <div class="quest-structure-diagram">
              <div class="structure-level-row">
                <div class="structure-level-name">
                  <span>🟢</span> LEVEL 1 — Explorer
                </div>
                <div class="structure-level-specs">
                  <span>4 Photos</span>
                  <span>40 Minutes</span>
                </div>
              </div>

              <div class="structure-arrow">↓</div>

              <div class="structure-level-row">
                <div class="structure-level-name">
                  <span>🟡</span> LEVEL 2 — Observer
                </div>
                <div class="structure-level-specs">
                  <span>3 Photos</span>
                  <span>30 Minutes</span>
                </div>
              </div>

              <div class="structure-arrow">↓</div>

              <div class="structure-level-row">
                <div class="structure-level-name">
                  <span>🔴</span> LEVEL 3 — Creative Explorer
                </div>
                <div class="structure-level-specs">
                  <span>2 Photos</span>
                  <span>15 Min (+3m ext)</span>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" id="btn-begin-level-1" style="width: 100%; max-width: 380px;">
              Begin Level 1 →
            </button>
            <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-top: 1rem;">
              The game determines all rules automatically. No time configuration needed.
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.querySelector('#btn-begin-level-1')?.addEventListener('click', () => {
      this.startAIQuestGeneration();
    });
  }

  /**
   * Screen 2: AI Quest Generation State (Requirement #8)
   */
  async startAIQuestGeneration() {
    this.container.innerHTML = `
      <div class="quest-wrapper">
        <div class="container container-narrow">
          <div class="ai-loading-screen">
            <div class="aperture-spinner">🌿</div>
            <h2 class="ai-loading-title">Your AI guide is preparing your adventure…</h2>
            <p class="ai-loading-status" id="ai-loading-step-text">
              Scanning past challenge history & balancing category variety...
            </p>

            <div class="ai-category-chips">
              <span class="ai-category-chip">🎨 Color Balance</span>
              <span class="ai-category-chip">⭕ Everyday Geometry</span>
              <span class="ai-category-chip">🌿 Nature Flora</span>
              <span class="ai-category-chip">🌓 Sunlight & Shadow</span>
              <span class="ai-category-chip">👁️ Pareidolia Twists</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Realistic multi-step AI formulation feedback
    const statusText = this.container.querySelector('#ai-loading-step-text');
    await new Promise(r => setTimeout(r, 600));
    if (statusText) statusText.textContent = "Verifying safety parameters (ground-level, public spaces)...";
    await new Promise(r => setTimeout(r, 700));
    if (statusText) statusText.textContent = "Checking concept uniqueness & preventing repetition...";
    await new Promise(r => setTimeout(r, 600));

    // Generate fresh quest using Open-Weight Challenge Generator
    this.currentQuest = await ChallengeGeneratorService.generateFullQuest();
    this.currentLevel = 1;
    this.level3ExtensionUsed = false;
    this.questStartTime = Date.now();
    this.retriesThisQuest = 0;

    // Start Level 1
    this.startLevel(1);
  }

  /**
   * Starts a specific level
   */
  startLevel(levelNumber) {
    this.currentLevel = levelNumber;
    const levelData = this.currentQuest.levels[levelNumber];

    // Set initial timer
    this.timeRemaining = levelData.timeLimitSeconds;
    this.isTimerExpired = false;

    // Play tactile sound
    AudioService.playShutter();

    // Render interface
    this.renderActiveLevel();

    // Start countdown timer
    this.startTimer();
  }

  /**
   * Timer mechanics (Requirements #9, #13, #19)
   */
  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;

      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.handleTimerExpired();
      }

      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerBox = this.container.querySelector('#quest-timer-box');
    const timerDigits = this.container.querySelector('#quest-timer-digits');
    if (!timerDigits || !timerBox) return;

    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    timerDigits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Timer states: > 50% normal, 25-50% warning, < 25% urgent
    const totalLevelSeconds = this.currentQuest.levels[this.currentLevel].timeLimitSeconds;
    const ratio = this.timeRemaining / totalLevelSeconds;

    timerBox.classList.remove('timer-normal', 'timer-warning', 'timer-urgent');
    if (ratio > 0.5) {
      timerBox.classList.add('timer-normal');
    } else if (ratio > 0.25) {
      timerBox.classList.add('timer-warning');
    } else {
      timerBox.classList.add('timer-urgent');
    }
  }

  handleTimerExpired() {
    this.stopTimer();
    this.isTimerExpired = true;

    const levelData = this.currentQuest.levels[this.currentLevel];
    const completedCount = levelData.challenges.filter(c => c.status === 'completed').length;
    const totalRequired = levelData.requiredPhotos;

    if (completedCount === totalRequired) {
      // Completed just in time
      this.handleLevelCompleted();
      return;
    }

    // Level 3 Special Extension handling (Requirement #19)
    if (this.currentLevel === 3 && !this.level3ExtensionUsed) {
      this.showLevel3ExtensionModal();
      return;
    }

    // Otherwise show Time's Up modal
    this.showTimesUpModal(completedCount, totalRequired);
  }

  /**
   * Level 3 +3 min Extension Modal (Requirement #19)
   */
  showLevel3ExtensionModal() {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="celebration-modal">
          <div class="celebration-icon">⏱️</div>
          <h2 class="celebration-title">TIME'S UP!</h2>
          <p class="celebration-subtitle">
            “You're close. Need a little more time?”
          </p>

          <div class="extension-alert-box">
            <h3>+3 MINUTE EXTENSION</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-muted);">
              Creative discoveries take patience. Use your one-time extension for Level 3.
            </p>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-terracotta btn-lg" id="btn-activate-extension">
              Activate +3 Minutes Extension →
            </button>
            <button class="btn btn-secondary" id="btn-give-up">
              End Quest
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    modalBackdrop.querySelector('#btn-activate-extension')?.addEventListener('click', () => {
      modalBackdrop.remove();
      this.level3ExtensionUsed = true;
      this.timeRemaining = 3 * 60; // 3 minutes
      this.isTimerExpired = false;
      this.renderActiveLevel();
      this.startTimer();
      AudioService.playSuccess();
    });

    modalBackdrop.querySelector('#btn-give-up')?.addEventListener('click', () => {
      modalBackdrop.remove();
      const levelData = this.currentQuest.levels[3];
      const completedCount = levelData.challenges.filter(c => c.status === 'completed').length;
      this.showTimesUpModal(completedCount, 2);
    });
  }

  showTimesUpModal(completedCount, totalRequired) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="celebration-modal">
          <div class="celebration-icon">⏳</div>
          <h2 class="celebration-title">Time's Up</h2>
          <p class="celebration-subtitle">
            You completed <strong>${completedCount} / ${totalRequired}</strong> discoveries for Level ${this.currentLevel}.
          </p>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 2rem;">
            Full quest completion badges require finishing all levels within the clock. Every discovery captured has still been saved to your archive!
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-primary" id="btn-try-quest-again">
              Try Quest Again →
            </button>
            <button class="btn btn-secondary" id="btn-return-home">
              Return Home
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);
    modalBackdrop.querySelector('#btn-try-quest-again')?.addEventListener('click', () => {
      modalBackdrop.remove();
      this.startAIQuestGeneration();
    });
    modalBackdrop.querySelector('#btn-return-home')?.addEventListener('click', () => {
      modalBackdrop.remove();
      this.onNavigate('home');
    });
  }

  /**
   * Screen 3: Active Level Interface
   */
  renderActiveLevel() {
    const levelData = this.currentQuest.levels[this.currentLevel];
    const completedCount = levelData.challenges.filter(c => c.status === 'completed').length;
    const totalRequired = levelData.requiredPhotos;
    const isLevelFinished = completedCount === totalRequired;

    const levelBadgeColor = this.currentLevel === 1 ? '🟢' : (this.currentLevel === 2 ? '🟡' : '🔴');

    this.container.innerHTML = `
      <div class="quest-wrapper">
        <div class="container">
          <!-- Active Quest Header -->
          <div class="active-quest-header">
            <div class="quest-header-top">
              <div class="quest-level-info">
                <h2>
                  <span>${levelBadgeColor}</span> LEVEL ${this.currentLevel} — ${levelData.name}
                </h2>
                <div class="quest-level-quote">“${levelData.subtitle}”</div>
              </div>

              <!-- Countdown Timer (Requirement #9, #13) -->
              <div class="timer-widget">
                <div class="timer-box timer-normal" id="quest-timer-box">
                  <span>⏱️</span>
                  <div class="timer-digits" id="quest-timer-digits">00:00</div>
                </div>
                <div class="timer-label">
                  ${this.level3ExtensionUsed ? 'One-time extension activated' : `Level ${this.currentLevel} Time Remaining`}
                </div>
              </div>
            </div>

            <!-- Progress Summary with Done Button -->
            <div class="quest-progress-summary">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="progress-counter-text">
                  ${completedCount} / ${totalRequired} completed
                </div>
                <div class="progress-dots">
                  ${levelData.challenges.map(c => `
                    <div class="progress-dot ${c.status === 'completed' ? 'completed' : ''}"></div>
                  `).join('')}
                </div>
              </div>

              <!-- DONE BUTTON (User request: press Done if completed before stipulated time) -->
              <button class="btn ${isLevelFinished ? 'btn-primary btn-done-pulse' : 'btn-secondary'}" 
                      id="btn-level-done-header" 
                      ${isLevelFinished ? '' : 'disabled'}
                      style="${isLevelFinished ? 'font-weight: 700; padding: 0.65rem 1.5rem;' : 'opacity: 0.55; cursor: not-allowed;'}"
                      title="${isLevelFinished ? 'All photos verified! Click Done to advance to the next round.' : `Capture and verify all ${totalRequired} photos to unlock Done button.`}">
                ${isLevelFinished 
                  ? (this.currentLevel === 3 ? '✓ Done — Finish Quest 🏆' : `✓ Done — Next Round (Level ${this.currentLevel + 1}) →`) 
                  : `Done (${completedCount}/${totalRequired})`}
              </button>
            </div>
          </div>

          <!-- Celebration Banner if All Photos Completed Ahead of Time -->
          ${isLevelFinished ? `
            <div class="level-done-banner">
              <div class="level-done-banner-content">
                <div class="level-done-banner-icon">🎯</div>
                <div>
                  <h3 class="level-done-banner-title">
                    All ${totalRequired} Discoveries Verified Ahead of Time!
                  </h3>
                  <p class="level-done-banner-subtitle">
                    You beat the clock for Level ${this.currentLevel}! Review your photos below or click <strong>Done</strong> to move on with the next round.
                  </p>
                </div>
              </div>
              <button class="btn btn-primary btn-lg btn-done-pulse" id="btn-level-done-banner">
                Done — ${this.currentLevel === 3 ? 'Complete Quest & Claim Badge 🏆' : `Move to Level ${this.currentLevel + 1} →`}
              </button>
            </div>
          ` : ''}

          <!-- Challenge Cards Grid (Requirement #10) -->
          <div class="challenges-grid" id="active-challenges-grid">
            ${levelData.challenges.map((challenge, idx) => this.renderChallengeCardHTML(challenge, idx)).join('')}
          </div>

          <!-- Bottom Footer Bar when Level is Completed -->
          ${isLevelFinished ? `
            <div class="level-done-footer-bar">
              <button class="btn btn-primary btn-lg btn-done-pulse" id="btn-level-done-footer">
                ✓ Done — ${this.currentLevel === 3 ? 'Finish Quest & Claim Badge 🏆' : `Move to Next Round (Level ${this.currentLevel + 1}) →`}
              </button>
              <div style="font-size: 0.88rem; color: var(--color-text-muted);">
                Finished before the stipulated time. Click Done to bank your time and advance.
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.updateTimerDisplay();
    this.attachChallengeEventListeners();
  }

  renderChallengeCardHTML(challenge, idx) {
    const isCompleted = challenge.status === 'completed';

    return `
      <div class="challenge-card ${isCompleted ? 'completed' : ''}" data-index="${idx}">
        <div class="challenge-card-top">
          <div class="challenge-number-tag">
            <span>📸</span> Challenge ${challenge.numberFormatted}
          </div>
          <div class="challenge-category-badge">
            ${challenge.category} • Diff ${challenge.difficulty}
          </div>
        </div>

        <h3 class="challenge-title">${challenge.title}</h3>
        <p class="challenge-prompt-text">${challenge.description}</p>
        
        <div class="challenge-hint">
          <span>💡</span> <span>Tip: ${challenge.hint}</span>
        </div>

        <!-- Dynamic Photo / Verification State Area -->
        <div class="capture-box" id="capture-box-${idx}">
          ${this.renderCardStateHTML(challenge, idx)}
        </div>
      </div>
    `;
  }

  renderCardStateHTML(challenge, idx) {
    if (challenge.status === 'completed') {
      return `
        <div class="photo-preview-wrap">
          <img src="${challenge.photoData}" alt="Captured discovery">
        </div>
        <div class="verification-result-box pass">
          <div class="verification-status-heading">
            <span>✓</span> Challenge Complete
          </div>
          <div class="verification-reason">
            ${challenge.verificationResult?.reason || 'Verified by open-weight vision model.'}
          </div>
          ${challenge.verificationResult?.diagnostics && challenge.verificationResult.diagnostics.length > 0 ? `
            <div class="verification-diagnostics-pills">
              ${challenge.verificationResult.diagnostics.map(d => `<span class="diag-pill ${d.type}">${d.label}</span>`).join('')}
            </div>
          ` : ''}
          <div style="font-size: 0.78rem; font-weight: 700; color: #1B5E20; display: flex; justify-content: space-between; margin-top: 0.4rem;">
            <span>Confidence: ${challenge.verificationResult?.confidence || '94%'}</span>
            <span>+${this.currentLevel === 1 ? 20 : (this.currentLevel === 2 ? 35 : 50)} XP</span>
          </div>
        </div>
      `;
    }

    if (challenge.status === 'verifying') {
      return `
        <div class="photo-preview-wrap">
          <img src="${challenge.photoData}" alt="Uploaded photo">
          <div class="scanner-laser"></div>
          <div class="scanner-text-overlay">
            <span>Checking discovery with AI vision…</span>
            <span>⏳</span>
          </div>
        </div>
      `;
    }

    if (challenge.status === 'selected' || challenge.status === 'failed') {
      return `
        <div class="photo-preview-wrap">
          <img src="${challenge.photoData}" alt="Uploaded photo preview">
        </div>

        ${challenge.status === 'failed' ? `
          <div class="verification-result-box fail">
            <div class="verification-status-heading">
              <span>✕</span> Not Quite
            </div>
            <div class="verification-reason">
              ${challenge.verificationResult?.reason || "This object doesn't appear to satisfy the challenge requirements."}
            </div>
            ${challenge.verificationResult?.diagnostics && challenge.verificationResult.diagnostics.length > 0 ? `
              <div class="verification-diagnostics-pills">
                ${challenge.verificationResult.diagnostics.map(d => `<span class="diag-pill ${d.type}">${d.label}</span>`).join('')}
              </div>
            ` : ''}
            ${challenge.verificationResult?.retryAdvice ? `
              <div class="retry-advice-text">
                Hint: ${challenge.verificationResult.retryAdvice}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="capture-actions-row">
          <button class="btn btn-primary btn-verify" data-index="${idx}">
            Verify Photo →
          </button>
          <button class="btn btn-secondary btn-replace" data-index="${idx}">
            Replace
          </button>
        </div>
      `;
    }

    // State 1: Not Started
    return `
      <div class="capture-actions-row">
        <button class="btn btn-primary btn-take-photo" data-index="${idx}">
          📷 Take Photo
        </button>
        <label class="btn btn-secondary" style="cursor: pointer;">
          📁 Upload
          <input type="file" accept="image/*" class="file-input-hidden" data-index="${idx}" style="display: none;">
        </label>
      </div>

      ${challenge.sampleImage ? `
        <a class="test-sample-link btn-use-sample" data-index="${idx}">
          Quick Test: Use Outdoor Sample Discovery
        </a>
      ` : ''}
    `;
  }

  attachChallengeEventListeners() {
    const grid = this.container.querySelector('#active-challenges-grid');
    if (!grid) return;

    // Take photo button (Live camera modal)
    grid.querySelectorAll('.btn-take-photo').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        this.openLiveCameraModal(idx);
      });
    });

    // Hidden file inputs
    grid.querySelectorAll('.file-input-hidden').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(input.getAttribute('data-index'));
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            this.handlePhotoSelected(idx, re.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    });

    // Quick test sample button
    grid.querySelectorAll('.btn-use-sample').forEach(link => {
      link.addEventListener('click', () => {
        const idx = parseInt(link.getAttribute('data-index'));
        const challenge = this.currentQuest.levels[this.currentLevel].challenges[idx];
        if (challenge.sampleImage) {
          this.handlePhotoSelected(idx, challenge.sampleImage);
        }
      });
    });

    // Replace photo button
    grid.querySelectorAll('.btn-replace').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        const challenge = this.currentQuest.levels[this.currentLevel].challenges[idx];
        challenge.status = 'not_started';
        challenge.photoData = null;
        challenge.verificationResult = null;
        this.renderActiveLevel();
      });
    });

    // Verify photo button
    grid.querySelectorAll('.btn-verify').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        this.triggerVerification(idx);
      });
    });

    // Done Buttons across Header, Banner, and Footer (User Request)
    const onDoneClick = () => {
      const levelData = this.currentQuest.levels[this.currentLevel];
      const allDone = levelData.challenges.every(c => c.status === 'completed');
      if (allDone) {
        this.handleLevelCompleted();
      }
    };

    this.container.querySelector('#btn-level-done-header')?.addEventListener('click', onDoneClick);
    this.container.querySelector('#btn-level-done-banner')?.addEventListener('click', onDoneClick);
    this.container.querySelector('#btn-level-done-footer')?.addEventListener('click', onDoneClick);
  }

  handlePhotoSelected(idx, dataUrl) {
    const challenge = this.currentQuest.levels[this.currentLevel].challenges[idx];
    challenge.photoData = dataUrl;
    challenge.status = 'selected';
    AudioService.playShutter();
    this.renderActiveLevel();
  }

  /**
   * Live Camera Viewfinder Modal with WebRTC (Requirement #11)
   */
  async openLiveCameraModal(idx) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog" style="max-width: 600px;">
        <button class="modal-close-btn" id="btn-close-camera">✕</button>
        <div class="camera-container">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-forest); margin-bottom: 0.5rem;">
            📸 Real World Viewfinder
          </h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
            Align your discovery within the natural light.
          </p>

          <div class="camera-viewport">
            <video class="camera-video" id="live-camera-feed" autoplay playsinline></video>
            <div class="viewfinder-reticle">
              <div class="reticle-corner reticle-tl"></div>
              <div class="reticle-corner reticle-tr"></div>
              <div class="reticle-corner reticle-bl"></div>
              <div class="reticle-corner reticle-br"></div>
              <div class="reticle-center"></div>
            </div>
          </div>

          <div class="camera-controls">
            <button class="shutter-btn" id="btn-camera-shutter" title="Capture Discovery"></button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    const video = modalBackdrop.querySelector('#live-camera-feed');
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } }
      });
      video.srcObject = stream;
      this.activeCameraStream = stream;
    } catch (err) {
      console.warn('Camera access not granted or unavailable:', err);
      // Fallback message inside viewport
      const viewport = modalBackdrop.querySelector('.camera-viewport');
      viewport.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:#FFF; padding:2rem; text-align:center;">
          <div style="font-size:2.5rem; margin-bottom:1rem;">📷</div>
          <p style="font-size:0.95rem; margin-bottom:1rem;">Live webcam permission unavailable in this browser session.</p>
          <label class="btn btn-primary" style="cursor:pointer;">
            Select Photo File Instead
            <input type="file" accept="image/*" id="camera-modal-file-fallback" style="display:none;">
          </label>
        </div>
      `;

      viewport.querySelector('#camera-modal-file-fallback')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            modalBackdrop.remove();
            this.handlePhotoSelected(idx, re.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const closeCamera = () => {
      if (this.activeCameraStream) {
        this.activeCameraStream.getTracks().forEach(t => t.stop());
        this.activeCameraStream = null;
      }
      modalBackdrop.remove();
    };

    modalBackdrop.querySelector('#btn-close-camera')?.addEventListener('click', closeCamera);

    modalBackdrop.querySelector('#btn-camera-shutter')?.addEventListener('click', () => {
      if (!video || !video.videoWidth) return;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      closeCamera();
      this.handlePhotoSelected(idx, dataUrl);
    });
  }

  /**
   * AI Photo Verification Execution (Requirements #12, #16)
   */
  async triggerVerification(idx) {
    const challenge = this.currentQuest.levels[this.currentLevel].challenges[idx];
    challenge.status = 'verifying';
    this.renderActiveLevel();

    // Call open-weight vision model service
    const outcome = await PhotoVerificationService.verifyPhoto(challenge.photoData, challenge);
    challenge.verificationResult = outcome;

    if (outcome.status === 'PASS') {
      challenge.status = 'completed';
      AudioService.playSuccess();

      // Record to history and award XP
      ChallengeHistoryService.recordCompletedChallenge(challenge, {
        previewUrl: challenge.photoData,
        reason: outcome.reason
      });
      PlayerProgressService.awardChallengeXP(this.currentLevel);
      this.onRefreshNavbar();

      this.renderActiveLevel();

      // Check if current level is complete!
      const levelData = this.currentQuest.levels[this.currentLevel];
      const allDone = levelData.challenges.every(c => c.status === 'completed');
      if (allDone) {
        // Play celebratory chime and particles, keeping user on screen with active Done button
        AudioService.playSuccess();
        fireConfetti(2500);
      }
    } else {
      challenge.status = 'failed';
      challenge.attempts = (challenge.attempts || 0) + 1;
      this.retriesThisQuest++;
      PlayerProgressService.recordRetry();
      AudioService.playFailure();
      this.renderActiveLevel();
    }
  }

  /**
   * Level Completed Transitions (Requirements #14, #17, #20)
   */
  handleLevelCompleted() {
    this.stopTimer();

    if (this.currentLevel === 1) {
      this.showLevel1CompletedModal();
    } else if (this.currentLevel === 2) {
      this.showLevel2CompletedModal();
    } else if (this.currentLevel === 3) {
      this.showQuestCompletedCelebration();
    }
  }

  showLevel1CompletedModal() {
    AudioService.playSuccess();
    const minsLeft = Math.floor(this.timeRemaining / 60);
    const secsLeft = this.timeRemaining % 60;
    const timeSavedStr = (minsLeft > 0 || secsLeft > 0) ? `with ${minsLeft}m ${secsLeft}s to spare!` : '';

    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="celebration-modal">
          <div class="celebration-icon">🟢</div>
          <h2 class="celebration-title">LEVEL 1 COMPLETE ✓</h2>
          <p class="celebration-subtitle">
            “You stopped looking at the obvious. Now look closer.”
          </p>

          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.75rem;">
            4 / 4 discoveries captured ${timeSavedStr}
          </div>

          <div style="margin-bottom: 2rem;">
            <span class="ready-badge" style="background: var(--color-primary-soft); color: var(--color-primary);">
              ⚡ Beat the Clock Speed Bonus Awarded
            </span>
          </div>

          <button class="btn btn-primary btn-lg" id="btn-continue-level-2">
            Done! Continue to Round 2 (Observer) →
          </button>
          <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 1rem;">
            Take a breather. The Level 2 timer will only start when you click Continue.
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);
    modalBackdrop.querySelector('#btn-continue-level-2')?.addEventListener('click', () => {
      modalBackdrop.remove();
      this.startLevel(2);
    });
  }

  showLevel2CompletedModal() {
    AudioService.playSuccess();
    const minsLeft = Math.floor(this.timeRemaining / 60);
    const secsLeft = this.timeRemaining % 60;
    const timeSavedStr = (minsLeft > 0 || secsLeft > 0) ? `with ${minsLeft}m ${secsLeft}s to spare!` : '';

    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="celebration-modal">
          <div class="celebration-icon">🟡</div>
          <h2 class="celebration-title">LEVEL 2 COMPLETE ✓</h2>
          <p class="celebration-subtitle">
            “Your eyes are getting sharper. One final level.”
          </p>

          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-sun-gold); margin-bottom: 0.75rem;">
            3 / 3 discoveries captured ${timeSavedStr}
          </div>

          <div style="margin-bottom: 2rem;">
            <span class="ready-badge" style="background: #FFF8E1; color: var(--color-sun-gold);">
              ⚡ Observer Speed Bonus Awarded
            </span>
          </div>

          <button class="btn btn-terracotta btn-lg" id="btn-continue-level-3">
            Done! Enter Round 3 (Creative Explorer) →
          </button>
          <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 1rem;">
            Level 3 contains 2 creative twists with a 15-minute countdown.
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);
    modalBackdrop.querySelector('#btn-continue-level-3')?.addEventListener('click', () => {
      modalBackdrop.remove();
      this.startLevel(3);
    });
  }

  /**
   * Final Quest Complete Celebration (Requirements #20, #21)
   */
  showQuestCompletedCelebration() {
    AudioService.playFanfare();
    fireConfetti(5000);

    const elapsedSeconds = this.questStartTime ? Math.round((Date.now() - this.questStartTime) / 1000) : 3600;
    const minsTaken = Math.floor(elapsedSeconds / 60);

    // Award full quest completion + check badges
    const progressResult = PlayerProgressService.awardFullQuestCompletion({
      durationSeconds: elapsedSeconds,
      retries: this.retriesThisQuest
    });

    this.onRefreshNavbar();

    // Collect all 9 captured photos from this quest
    const allPhotos = [
      ...this.currentQuest.levels[1].challenges,
      ...this.currentQuest.levels[2].challenges,
      ...this.currentQuest.levels[3].challenges
    ];

    this.container.innerHTML = `
      <div class="quest-wrapper">
        <div class="container container-narrow">
          <div class="quest-start-card" style="text-align: center;">
            <div class="celebration-icon" style="font-size: 4rem;">🏆</div>
            <h1 class="quest-start-title" style="font-size: 2.8rem; color: var(--color-forest);">
              QUEST COMPLETE!
            </h1>
            <p class="quest-start-subtitle" style="font-size: 1.25rem;">
              “You went looking. You found something.”
            </p>

            <div style="display: inline-block; background: var(--color-primary-soft); color: var(--color-primary); font-weight: 800; padding: 0.5rem 1.5rem; border-radius: var(--radius-full); margin-bottom: 2rem; font-size: 1.1rem;">
              9 / 9 discoveries captured
            </div>

            <!-- Quest Stats Grid (Requirement #20) -->
            <div class="quest-stats-row">
              <div class="quest-stat-entry">
                <span class="quest-stat-value">3 / 3</span>
                <span class="quest-stat-label">Levels Done</span>
              </div>
              <div class="quest-stat-entry">
                <span class="quest-stat-value">9</span>
                <span class="quest-stat-label">Photos Captured</span>
              </div>
              <div class="quest-stat-entry">
                <span class="quest-stat-value">+385</span>
                <span class="quest-stat-label">XP Earned</span>
              </div>
              <div class="quest-stat-entry">
                <span class="quest-stat-value">${minsTaken}m</span>
                <span class="quest-stat-label">Total Time</span>
              </div>
            </div>

            <!-- Badge Unlocked Showcase (Requirement #21) -->
            <div class="unlocked-badge-showcase">
              <div class="unlocked-badge-art">
                <img src="badge_first_explorer.jpg" alt="First Explorer Badge">
              </div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 800; color: #B7791F; text-transform: uppercase;">
                  🎉 Badge Unlocked!
                </div>
                <h3 style="font-size: 1.3rem; font-weight: 850; color: var(--color-forest); margin: 0.2rem 0;">
                  🏅 First Explorer
                </h3>
                <p style="font-size: 0.88rem; color: var(--color-text-muted);">
                  Completed your first three-level TouchQuest outdoor expedition.
                </p>
              </div>
            </div>

            <!-- Action Buttons (Requirements #21, #36) -->
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
              <button class="btn btn-primary btn-lg" id="btn-quest-play-again">
                Play Again →
              </button>
              <button class="btn btn-secondary" id="btn-view-badges">
                View My Badges
              </button>
              <button class="btn btn-secondary" id="btn-view-profile">
                View Profile
              </button>
              <button class="btn btn-secondary" id="btn-share-achievement">
                Share Achievement 📤
              </button>
            </div>

            <!-- 9 Photos Gallery for this Quest -->
            <div style="text-align: left; margin-top: 3rem; border-top: var(--border-light); padding-top: 2rem;">
              <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-forest); margin-bottom: 0.5rem;">
                Your Quest Album (9 Discoveries)
              </h3>
              <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
                The real world answers you brought back today.
              </p>

              <div class="photo-gallery-grid">
                ${allPhotos.map(c => `
                  <div class="gallery-photo-card">
                    <img src="${c.photoData}" alt="${c.title}">
                    <div class="gallery-photo-info">
                      <div class="gallery-photo-title">${c.title}</div>
                      <div class="gallery-photo-level">Level ${c.level} • ${c.category}</div>
                      <div style="font-size: 0.72rem; color: var(--color-primary); margin-top: 0.2rem;">
                        ✓ Verified
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    this.container.querySelector('#btn-quest-play-again')?.addEventListener('click', () => {
      this.startAIQuestGeneration();
    });

    this.container.querySelector('#btn-view-badges')?.addEventListener('click', () => {
      this.onNavigate('badges');
    });

    this.container.querySelector('#btn-view-profile')?.addEventListener('click', () => {
      this.onNavigate('profile');
    });

    this.container.querySelector('#btn-share-achievement')?.addEventListener('click', () => {
      const shareText = `I completed TouchQuest! 🌿 9 real-world outdoor photo challenges verified by open-weight AI in 3 levels. Stop scrolling, start exploring! #TouchGrass #TouchQuest`;
      if (navigator.share) {
        navigator.share({ title: 'TouchQuest Complete', text: shareText, url: window.location.href }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Achievement copied to clipboard! Share it with friends.');
      }
    });
  }
}
