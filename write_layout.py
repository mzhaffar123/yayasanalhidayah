layout_css = """\
/* src/assets/styles/layout.css */

/* === CONTAINER === */
.container { width: 100%; max-width: 1200px; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; }

.section-padding { padding-top: 5.5rem; padding-bottom: 5.5rem; }
@media (max-width: 768px) { .section-padding { padding-top: 3.5rem; padding-bottom: 3.5rem; } }

/* === FLEX & GRID === */
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }

.grid-responsive { display: grid; grid-template-columns: 1fr; gap: 1.75rem; }
@media (min-width: 640px) { .grid-responsive-2 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid-responsive-3 { grid-template-columns: repeat(3, 1fr); } .grid-responsive-4 { grid-template-columns: repeat(4, 1fr); } }

/* === CARDS — Premium with hover lift === */
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  cursor: pointer;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(13,92,58,0.12);
}

.card-img-wrapper { position: relative; width: 100%; height: 210px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow); }
.card:hover .card-img { transform: scale(1.07); }

.card-content { padding: 1.5rem; }

.card-badge {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  background: var(--grad-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-family: var(--font-heading);
}

/* === HERO SECTION === */
.hero-slider {
  position: relative;
  background-color: var(--color-primary-dark);
  color: white;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-gradient-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(6,60,37,0.97) 0%, rgba(13,92,58,0.85) 50%, rgba(22,122,80,0.65) 100%);
  z-index: 1;
}

.hero-bg-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; z-index: 0; }

.hero-content {
  position: relative; z-index: 2;
  max-width: 740px;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-family: var(--font-heading);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255,255,255,0.8);
  margin-bottom: 2.25rem;
  line-height: 1.7;
}

.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }

/* === HERO GEOMETRIC DECORATION === */
.hero-slider::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(197,168,92,0.08) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}
.hero-slider::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 30%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22,122,80,0.15) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}

/* === STAT BOXES GRID === */
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
@media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }

/* === PROGRESS BAR COMPONENT (donation cards) === */
.progress-container { margin-top: 1rem; margin-bottom: 1rem; }
.progress-labels { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 0.5rem; }
.progress-bar-bg { width: 100%; height: 9px; background: var(--color-bg-secondary); border-radius: var(--radius-full); overflow: hidden; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-lighter) 100%); border-radius: var(--radius-full); transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }

/* === DONATION CARD EXTRAS === */
.donation-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; font-size: 0.8rem; color: var(--color-text-muted); }
.donation-amount-raised { font-size: 1.15rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading); }
.donation-target { font-size: 0.78rem; color: var(--color-text-muted); }

/* === FORMS (global) === */
.form-group { margin-bottom: 1.35rem; }
.form-label { display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--color-text); }

/* === DONATION FAST PRESETS === */
.donation-grid-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; margin-bottom: 1.25rem; }
@media (max-width: 480px) { .donation-grid-presets { grid-template-columns: repeat(2, 1fr); } }
.preset-btn { background: white; border: 1.5px solid var(--color-border); padding: 0.7rem 0.5rem; text-align: center; border-radius: var(--radius-md); font-weight: 700; font-family: var(--font-heading); font-size: 0.85rem; cursor: pointer; transition: all var(--transition-fast); color: var(--color-text); }
.preset-btn:hover { border-color: var(--color-primary); background: var(--color-primary-soft); color: var(--color-primary); transform: translateY(-1px); }
.preset-btn.active { background: var(--color-primary-soft); border-color: var(--color-primary); color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-glow); }

/* === PAYMENT METHODS === */
.payment-methods-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-bottom: 1.5rem; }
.payment-method-card { border: 2px solid var(--color-border); border-radius: var(--radius-md); padding: 0.9rem 1rem; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; background: white; transition: all var(--transition-fast); }
.payment-method-card:hover { border-color: var(--color-primary-light); background: var(--color-primary-soft); }
.payment-method-card.active { border-color: var(--color-primary); background: var(--color-primary-soft); box-shadow: 0 0 0 3px var(--color-primary-glow); }
.payment-logo { font-weight: 900; font-size: 1.1rem; color: var(--color-primary-dark); font-family: var(--font-heading); }

/* === DETAIL LAYOUT === */
.detail-layout { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 1024px) { .detail-layout { grid-template-columns: 2fr 1fr; align-items: start; } }

.detail-sidebar {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 100px;
}

/* === TESTIMONIAL CARD === */
.testimonial-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 2rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: all var(--transition-normal);
}
.testimonial-card::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1.5rem;
  font-size: 5rem;
  color: var(--color-primary-soft);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}
.testimonial-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

/* === FLOATING BADGE (HERO) === */
.hero-floating-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(197,168,92,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(197,168,92,0.4);
  color: var(--color-secondary-light);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: 1.25rem;
}

/* === SECTION ALT BG === */
.section-alt { background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%); }
.section-dark { background: var(--grad-primary); color: white; }

/* === FOOTER SECTION DIVIDER === */
.section-wave {
  position: relative;
  overflow: hidden;
}
.section-wave::before {
  content: '';
  position: absolute;
  top: -2px; left: 0; right: 0;
  height: 50px;
  background: var(--color-bg);
  clip-path: ellipse(60% 100% at 50% 0%);
}

/* === CALLOUT / HIGHLIGHT BOX === */
.callout-box {
  background: var(--color-primary-soft);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
}
.callout-box.gold {
  background: var(--color-secondary-soft);
  border-color: var(--color-secondary);
}
"""

with open("src/assets/styles/layout.css", "w", encoding="utf-8") as f:
    f.write(layout_css)

print("Done! Written", len(layout_css), "bytes to layout.css")
