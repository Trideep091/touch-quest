import { renderNavbar } from './Navbar.js';
import { renderHero } from './Hero.js';
import { renderHowItWorks } from './HowItWorks.js';
import { renderLevelCards } from './LevelCards.js';
import { renderAntiScreen } from './AntiScreenSection.js';
import { renderOpenAI } from './OpenAISection.js';
import { renderNextQuestPreview } from './NextQuestPreview.js';
import { renderBadgeCollection } from './BadgeCollection.js';
import { renderPlayerProfile } from './PlayerProfile.js';
import { QuestManager } from './QuestManager.js';

class TouchQuestApp {
  constructor() {
    this.navContainer = document.getElementById('navbar-mount');
    this.mainContainer = document.getElementById('main-content');
    this.footerContainer = document.getElementById('footer-mount');
    this.currentView = 'home';
    this.questManager = null;
  }

  init() {
    this.renderNavigation();
    this.renderFooter();

    // Check URL hash for initial route
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigate(hash);

    // Listen to hash changes
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '') || 'home';
      this.navigate(newHash);
    });
  }

  renderNavigation() {
    renderNavbar(
      this.navContainer,
      (target) => this.navigate(target),
      () => this.startQuest()
    );
  }

  renderFooter() {
    this.footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <h3><span>🌿</span> TouchQuest</h3>
              <p>
                AI gives you the challenge. The real world gives you the answer.
                An outdoor photography game built to get you off the screen and into the living world.
              </p>
            </div>

            <div class="footer-col">
              <h4>Expedition</h4>
              <ul>
                <li><a href="#quest" data-nav="quest">Start Quest</a></li>
                <li><a href="#how-it-works" data-nav="how-it-works">How It Works</a></li>
                <li><a href="#levels" data-nav="levels">The 3 Levels</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Scout Center</h4>
              <ul>
                <li><a href="#badges" data-nav="badges">Badge Collection</a></li>
                <li><a href="#profile" data-nav="profile">Field Journal</a></li>
                <li><a href="#open-ai" data-nav="open-ai">Open AI Specs</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Principles</h4>
              <ul>
                <li><a href="#home">Anti-Screen Loop</a></li>
                <li><a href="#open-ai">Open-Weight Freedom</a></li>
                <li><a href="#home">Safety Guidelines</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              &copy; 2026 TouchQuest • Built with Open-Weight AI Architecture & Vanilla Web Standards.
            </div>
            <div>
              “The screen is only the beginning.”
            </div>
          </div>
        </div>
      </footer>
    `;

    // Footer link routing
    this.footerContainer.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        this.navigate(target);
      });
    });
  }

  navigate(viewName) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active state in navbar
    const navLinks = this.navContainer.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-nav') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (viewName === 'quest') {
      this.startQuest();
      return;
    }

    if (viewName === 'badges') {
      renderBadgeCollection(this.mainContainer);
      return;
    }

    if (viewName === 'profile') {
      renderPlayerProfile(this.mainContainer, () => this.startQuest());
      return;
    }

    if (viewName === 'how-it-works' || viewName === 'levels' || viewName === 'open-ai') {
      this.renderHomeLanding();
      const el = document.getElementById(viewName);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
      return;
    }

    // Default: Home Landing Page
    this.renderHomeLanding();
  }

  renderHomeLanding() {
    this.mainContainer.innerHTML = `
      <div id="hero-mount"></div>
      <div id="how-it-works-mount"></div>
      <div id="levels-mount"></div>
      <div id="anti-screen-mount"></div>
      <div id="next-quest-mount"></div>
      <div id="open-ai-mount"></div>
    `;

    renderHero(
      document.getElementById('hero-mount'),
      () => this.startQuest(),
      () => this.navigate('how-it-works')
    );

    renderHowItWorks(document.getElementById('how-it-works-mount'));
    renderLevelCards(document.getElementById('levels-mount'));
    renderAntiScreen(document.getElementById('anti-screen-mount'));
    renderNextQuestPreview(document.getElementById('next-quest-mount'));
    renderOpenAI(document.getElementById('open-ai-mount'));
  }

  startQuest() {
    this.currentView = 'quest';
    window.location.hash = '#quest';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.questManager = new QuestManager(this.mainContainer, {
      onNavigate: (view) => this.navigate(view),
      onRefreshNavbar: () => this.renderNavigation()
    });
    this.questManager.init();
  }
}

// Bootstrap application on DOM load in browser environment
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new TouchQuestApp();
    app.init();
  });
}

export { TouchQuestApp };
