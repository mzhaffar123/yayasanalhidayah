// src/components/CountUp.tsx
import { useEffect, useMemo, useRef, useState } from 'react';

interface CountUpProps {
  /** Display value, e.g. "200±", "137+", "11". Leading digits are animated. */
  value: string;
  duration?: number;
}

/**
 * Animates the leading number of a label when it scrolls into view, keeping any
 * trailing suffix ("±", "+", "%") intact.
 */
export default function CountUp({ value, duration = 1400 }: CountUpProps) {
  const parsed = useMemo(() => {
    const match = value.match(/^(\d+)(.*)$/);
    return match
      ? { target: parseInt(match[1], 10), suffix: match[2] }
      : { target: null, suffix: value };
  }, [value]);

  // Reduced-motion users (and environments without IntersectionObserver) get the
  // final number straight away, so the effect never needs to set state for them.
  const skipAnimation =
    parsed.target === null ||
    (typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    typeof IntersectionObserver === 'undefined';

  const [current, setCurrent] = useState(() =>
    skipAnimation ? (parsed.target ?? 0) : 0
  );
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(skipAnimation);

  useEffect(() => {
    const node = ref.current;
    if (!node || skipAnimation || parsed.target === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStarted.current) return;
          hasStarted.current = true;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCurrent(Math.round((parsed.target as number) * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed, duration, skipAnimation]);

  if (parsed.target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref} className="fade-in-scale">
      {current}
      {parsed.suffix}
    </span>
  );
}
