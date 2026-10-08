css = """\
/* src/index.css */
@import "./assets/styles/layout.css";
@import "./assets/styles/admin.css";

:root {
  --color-primary: #0D5C3A;
  --color-primary-dark: #063c25;
  --color-primary-light: #167a50;
  --color-primary-lighter: #1a9960;
  --color-primary-soft: #e8f4ef;
  --color-primary-glow: rgba(13, 92, 58, 0.15);
  --color-secondary: #C5A85C;
  --color-secondary-dark: #a88d44;
  --color-secondary-light: #d4bc7a;
  --color-secondary-soft: #faf6ec;
  --color-text: #1A2332;
  --color-text-muted: #5a6a7e;
  --color-text-light: #8a9bb0;
  --color-border: #e0e8f0;
  --color-border-light: #eef3f8;
  --color-bg: #f7f9fc;
  --color-bg-secondary: #eef3f8;
  --color-bg-card: #ffffff;
  --font-heading: Outfit, Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  --shadow-xs: 0 1px 3px rgba(10,22,40,0.04);
  --shadow-sm: 0 2px 8px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04);
  --shadow-md: 0 8px 24px rgba(10,22,40,0.08), 0 2px 8px rgba(10,22,40,0.04);
  --shadow-lg: 0 20px 40px rgba(10,22,40,0.12), 0 8px 16px rgba(10,22,40,0.06);
  --shadow-xl: 0 32px 64px rgba(10,22,40,0.16), 0 16px 32px rgba(10,22,40,0.08);
  --shadow-green: 0 8px 24px rgba(13,92,58,0.25);
  --shadow-gold: 0 8px 24px rgba(197,168,92,0.3);
  --shadow-inset: inset 0 1px 3px rgba(10,22,40,0.06);
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  --grad-primary: linear-gradient(135deg, #063c25 0%, #0d5c3a 50%, #167a50 100%);
  --grad-gold: linear-gradient(135deg, #a88d44 0%, #c5a85c 50%, #d4bc7a 100%);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  width: 100%; min-height: 100vh;
  background-color: var(--color-bg); color: var(--color-text);
  font-family: var(--font-body); font-size: 16px; line-height: 1.65;
  -webkit-font-smoothing: antialiased; overflow-x: hidden;
}
#root { display: flex; flex-direction: column; min-height: 100vh; }
h1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); color: var(--color-primary-dark); font-weight: 700; line-height: 1.2; margin-top: 0; margin-bottom: 0.75rem; }
a { color: var(--color-primary); text-decoration: none; transition: color var(--transition-fast); }
a:hover { color: var(--color-primary-light); }

/* === BUTTONS === */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1.75rem; font-size: 0.925rem; font-weight: 700; border-radius: var(--radius-md); border: 2px solid transparent; cursor: pointer; transition: all var(--transition-normal); font-family: var(--font-heading); text-decoration: none; position: relative; overflow: hidden; letter-spacing: 0.01em; white-space: nowrap; }
.btn:active { transform: translateY(1px) scale(0.99); }
.btn-primary { background: var(--grad-primary); color: #fff; box-shadow: var(--shadow-green); }
.btn-primary:hover { box-shadow: 0 12px 32px rgba(13,92,58,0.35); transform: translateY(-2px); color: #fff; }
.btn-secondary { background: var(--grad-gold); color: var(--color-primary-dark); box-shadow: var(--shadow-gold); }
.btn-secondary:hover { box-shadow: 0 12px 32px rgba(197,168,92,0.4); transform: translateY(-2px); color: var(--color-primary-dark); }
.btn-outline { background: transparent; border-color: var(--color-primary); color: var(--color-primary); }
.btn-outline:hover { background: var(--color-primary-soft); border-color: var(--color-primary-light); transform: translateY(-1px); }
.btn-white { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); color: var(--color-primary-dark); border-color: rgba(255,255,255,0.5); box-shadow: var(--shadow-sm); }
.btn-white:hover { background: #fff; box-shadow: var(--shadow-md); transform: translateY(-1px); color: var(--color-primary-dark); }
.btn-ghost { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); color: white; border-color: rgba(255,255,255,0.3); }
.btn-ghost:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); color: white; }
.btn-sm { padding: 0.5rem 1.1rem; font-size: 0.825rem; border-radius: var(--radius-sm); gap: 0.35rem; }
.btn-lg { padding: 1rem 2.25rem; font-size: 1.05rem; border-radius: var(--radius-lg); }
.btn-full { width: 100%; }

/* === TYPOGRAPHY UTILS === */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-muted { color: var(--color-text-muted); }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-primary { color: var(--color-primary); }
.text-primary-dark { color: var(--color-primary-dark); }

/* === SECTION TITLES === */
.section-title-wrapper { max-width: 650px; margin: 0 auto 3.5rem; text-align: center; }
.section-subtitle { color: var(--color-secondary-dark); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.12em; margin-bottom: 0.75rem; display: block; }
.section-title { font-size: clamp(1.85rem, 4vw, 2.75rem); font-weight: 800; color: var(--color-primary-dark); font-family: var(--font-heading); line-height: 1.15; letter-spacing: -0.02em; }
.section-desc { color: var(--color-text-muted); font-size: 1.05rem; margin-top: 0.85rem; line-height: 1.7; }

/* === STICKY DONATE FAB === */
.sticky-donate-btn { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--grad-gold); color: var(--color-primary-dark); font-weight: 800; font-family: var(--font-heading); padding: 0.9rem 1.85rem; border-radius: var(--radius-full); box-shadow: 0 6px 28px rgba(197,168,92,0.5); display: flex; align-items: center; gap: 0.5rem; border: 2px solid rgba(255,255,255,0.6); transition: all var(--transition-normal); text-decoration: none; font-size: 0.9rem; animation: fab-pulse 3s ease-in-out infinite; }
@keyframes fab-pulse { 0%,100% { box-shadow: 0 6px 28px rgba(197,168,92,0.5); } 50% { box-shadow: 0 8px 36px rgba(197,168,92,0.65), 0 4px 12px rgba(197,168,92,0.4); } }
.sticky-donate-btn:hover { transform: scale(1.06) translateY(-3px); box-shadow: 0 12px 40px rgba(197,168,92,0.6); color: var(--color-primary-dark); animation: none; }
@media (max-width: 640px) { .sticky-donate-btn { bottom: 1rem; right: 0.75rem; padding: 0.7rem 1.1rem; font-size: 0.8rem; } }

/* === PAGE BANNER === */
.page-banner { position: relative; background: var(--grad-primary); padding: 5rem 0 4.5rem; overflow: hidden; }
.page-banner::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 60px; background: var(--color-bg); clip-path: ellipse(55% 100% at 50% 100%); }
.banner-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(197,168,92,0.12) 0%, transparent 60%); }
.banner-content { position: relative; z-index: 2; color: white; }
.banner-content h1 { color: white; font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.banner-content p { color: rgba(255,255,255,0.78); font-size: 1.05rem; max-width: 600px; margin: 0 auto; line-height: 1.65; }

/* === FORMS === */
.form-group { margin-bottom: 1.35rem; }
.form-label { display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--color-text); }
.form-control { width: 100%; padding: 0.825rem 1.1rem; border: 1.5px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.95rem; background: #fff; color: var(--color-text); transition: border-color var(--transition-fast), box-shadow var(--transition-fast); }
.form-control:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 4px var(--color-primary-glow); }
.form-control::placeholder { color: var(--color-text-light); }
textarea.form-control { min-height: 120px; resize: vertical; line-height: 1.6; }

/* === TABS === */
.tab-container { display: flex; justify-content: center; gap: 0.4rem; margin-bottom: 3rem; flex-wrap: wrap; background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-full); padding: 0.35rem; width: fit-content; margin-left: auto; margin-right: auto; }
.tab-btn { background: transparent; border: none; color: var(--color-text-muted); padding: 0.6rem 1.35rem; font-weight: 600; font-size: 0.875rem; border-radius: var(--radius-full); cursor: pointer; transition: all var(--transition-normal); font-family: var(--font-heading); white-space: nowrap; }
.tab-btn:hover { color: var(--color-primary); background: rgba(13,92,58,0.07); }
.tab-btn.active { background: var(--grad-primary); color: white; box-shadow: var(--shadow-green); }

/* === STAT BOXES === */
.stat-box { text-align: center; background: white; padding: 2.25rem 1.5rem; border-radius: var(--radius-xl); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); transition: all var(--transition-normal); position: relative; overflow: hidden; }
.stat-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--grad-primary); opacity: 0; transition: opacity var(--transition-normal); }
.stat-box:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.stat-box:hover::before { opacity: 1; }
.stat-number { font-size: 3rem; font-weight: 900; background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.5rem; font-family: var(--font-heading); line-height: 1; }
.stat-label { font-size: 0.875rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }

/* === PROGRESS BAR === */
.progress-container { margin-top: 1rem; margin-bottom: 1rem; }
.progress-labels { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 0.5rem; }
.progress-bar-bg { width: 100%; height: 9px; background: var(--color-bg-secondary); border-radius: var(--radius-full); overflow: hidden; box-shadow: var(--shadow-inset); }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-lighter) 100%); border-radius: var(--radius-full); transition: width 1.2s cubic-bezier(0.4,0,0.2,1); position: relative; }
.progress-bar-fill::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 30px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4)); animation: shimmer 2s ease-in-out infinite; }
@keyframes shimmer { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }

/* === DONATION PRESETS === */
.donation-grid-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; margin-bottom: 1.25rem; }
@media (max-width: 480px) { .donation-grid-presets { grid-template-columns: repeat(2, 1fr); } }
.preset-btn { background: white; border: 1.5px solid var(--color-border); padding: 0.7rem 0.5rem; text-align: center; border-radius: var(--radius-md); font-weight: 700; font-family: var(--font-heading); font-size: 0.85rem; cursor: pointer; transition: all var(--transition-fast); color: var(--color-text); }
.preset-btn:hover { border-color: var(--color-primary); background: var(--color-primary-soft); color: var(--color-primary); transform: translateY(-1px); }
.preset-btn.active { background: var(--color-primary-soft); border-color: var(--color-primary); color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-glow); }
.payment-methods-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-bottom: 1.5rem; }
.payment-method-card { border: 2px solid var(--color-border); border-radius: var(--radius-md); padding: 0.9rem 1rem; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; background: white; transition: all var(--transition-fast); }
.payment-method-card:hover { border-color: var(--color-primary-light); background: var(--color-primary-soft); }
.payment-method-card.active { border-color: var(--color-primary); background: var(--color-primary-soft); box-shadow: 0 0 0 3px var(--color-primary-glow); }
.payment-logo { font-weight: 900; font-size: 1.1rem; color: var(--color-primary-dark); font-family: var(--font-heading); }

/* === DETAIL LAYOUT === */
.detail-layout { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 1024px) { .detail-layout { grid-template-columns: 2fr 1fr; align-items: start; } }
.detail-sidebar { background: white; border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-md); position: sticky; top: 100px; }

/* === UTILS === */
.gap-xs { gap: 0.35rem; }
.gap-sm { gap: 0.75rem; }
.gap-md { gap: 1.25rem; }
.ml-sm { margin-left: 0.75rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.main-content-area { flex: 1; background-color: var(--color-bg); }

/* === NEWS CARD === */
.news-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--color-text-muted); font-weight: 500; margin-bottom: 0.65rem; }
.news-title { font-size: 1rem; font-weight: 700; color: var(--color-primary-dark); line-height: 1.35; margin-bottom: 0.5rem; }
.news-summary { font-size: 0.855rem; color: var(--color-text-muted); line-height: 1.55; margin-bottom: 1.1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* === DETAIL BANNER === */
.detail-banner { background-size: cover; background-position: center; color: white; padding: 4.5rem 0 3.5rem; position: relative; }
.detail-cat-badge { background: rgba(197,168,92,0.25); backdrop-filter: blur(10px); border: 1px solid rgba(197,168,92,0.5); color: var(--color-secondary-light); padding: 0.3rem 0.85rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: var(--radius-full); width: fit-content; display: block; margin-bottom: 1rem; }
.detail-title { color: white; font-size: clamp(1.85rem, 3.5vw, 2.6rem); margin: 0; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; max-width: 750px; }
.detail-hero-img { width: 100%; height: 370px; object-fit: cover; border-radius: var(--radius-xl); margin-bottom: 2rem; box-shadow: var(--shadow-lg); }
.detail-text { font-size: 1.05rem; line-height: 1.75; margin-bottom: 2rem; color: var(--color-text); }
.detail-text-sm { font-size: 0.9rem; line-height: 1.6; color: var(--color-text-muted); margin-bottom: 1.25rem; }
.detail-benefits-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }
.detail-benefits-list li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.95rem; line-height: 1.5; }
.benefit-icon { color: var(--color-primary); margin-top: 0.15rem; flex-shrink: 0; }
.sidebar-title { margin-top: 0; font-size: 1.15rem; color: var(--color-primary-dark); font-family: var(--font-heading); font-weight: 800; margin-bottom: 0.35rem; }
.sidebar-desc { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.55; margin-bottom: 1.5rem; }
.sidebar-actions { display: flex; flex-direction: column; gap: 0.75rem; }
.sidebar-trust-box { display: flex; gap: 0.75rem; align-items: flex-start; margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
.trust-icon { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }
.sidebar-trust-box h5 { margin: 0 0 0.2rem; font-size: 0.875rem; color: var(--color-primary-dark); font-weight: 700; }
.sidebar-trust-box p { margin: 0; font-size: 0.775rem; color: var(--color-text-muted); line-height: 1.45; }

.btn-back { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.85); font-weight: 600; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; margin-bottom: 1.75rem; border-radius: var(--radius-full); transition: all var(--transition-fast); font-family: var(--font-heading); }
.btn-back:hover { background: rgba(255,255,255,0.2); color: white; border-color: rgba(255,255,255,0.4); }

/* === SUCCESS / RECEIPT === */
.success-icon-badge { width: 88px; height: 88px; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.75rem; box-shadow: 0 0 0 8px rgba(13,92,58,0.08); }
.success-receipt-container { max-width: 600px; margin: 0 auto; }
.success-title { font-family: var(--font-heading); color: var(--color-primary-dark); font-weight: 900; font-size: 1.75rem; margin-bottom: 0.5rem; }
.success-desc { font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 2rem; line-height: 1.65; }
.receipt-card { text-align: left; background: white; padding: 2rem; margin-bottom: 2rem; border: 1px solid var(--color-border); border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
.receipt-header { border-bottom: 2px dashed var(--color-border); padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
.receipt-header h3 { margin: 0 0 0.3rem; font-size: 1.05rem; color: var(--color-primary-dark); letter-spacing: 0.04em; font-family: var(--font-heading); }
.receipt-no { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; font-family: monospace; }
.receipt-body { display: flex; flex-direction: column; gap: 0.9rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem; margin-bottom: 1.25rem; }
.receipt-row { display: flex; justify-content: space-between; font-size: 0.875rem; gap: 1.5rem; }
.receipt-footer { text-align: center; font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); }
.receipt-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

/* === ANIMATIONS === */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-up { animation: fadeInUp 0.5s ease-out both; }
.animate-fade-in { animation: fadeIn 0.4s ease-out both; }
"""

with open("src/index.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Done! Written", len(css), "bytes to src/index.css")
