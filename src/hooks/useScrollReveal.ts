// src/hooks/useScrollReveal.ts
import { useEffect } from 'react';

/**
 * Global scroll-reveal controller.
 *
 * Any element carrying a `data-reveal` attribute fades/slides into view once it
 * enters the viewport. A MutationObserver keeps watching the DOM, so content
 * rendered later (page switches, detail views, filtered grids) is picked up
 * automatically without the pages having to opt in.
 *
 * Optional `data-reveal-delay="120"` (milliseconds) staggers siblings.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only hide [data-reveal] elements once the controller is actually running,
    // so content never stays invisible if this hook fails to execute.
    if (!prefersReducedMotion) {
      document.documentElement.classList.add('reveal-ready');
    }

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => el.classList.add('is-revealed'));
    };

    // No IntersectionObserver (or the user asked for less motion): show everything.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay || 0);
          if (delay > 0) el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-revealed');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    const register = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => observer.observe(el));
    };

    register();

    const mutationObserver = new MutationObserver(register);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
}
