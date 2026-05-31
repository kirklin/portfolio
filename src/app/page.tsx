"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "~/lib/gsap-register";

/* ═══════════════════════════════════════════════════════════
   Kirk Lin — kirk.hk

   Desktop: Horizontal scroll gallery (Reference-style)
   Mobile:  Vertical card stack with ScrollTrigger reveals
   ═══════════════════════════════════════════════════════════ */

const FRAME_W = 1200;
const FRAME_H = 720;
const GAP = 40;
const FRAME_STEP = FRAME_W + GAP;
const FRAME_COUNT = 8;
const TOTAL_W = FRAME_COUNT * FRAME_W + (FRAME_COUNT - 1) * GAP;

function clamp(value: number, [min, max]: [number, number]) {
  return Math.min(Math.max(value, min), max);
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return mobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHome /> : <DesktopHome />;
}

/* ═══════════════════════════════════════════════════════════
   MOBILE — Vertical card stack
   ═══════════════════════════════════════════════════════════ */
function MobileHome() {
  const framesRef = useRef<HTMLDivElement>(null);

  // Initial hidden states
  useGSAP(() => {
    if (!framesRef.current) {
      return;
    }
    const paths = framesRef.current.querySelectorAll(".draw-stroke");
    if (paths.length) {
      gsap.set(paths, { drawSVG: "0%" });
    }
    const reveals = framesRef.current.querySelectorAll("[data-reveal]");
    gsap.set(reveals, { autoAlpha: 0, y: 20 });
  }, { scope: framesRef });

  // ScrollTrigger reveals
  useGSAP(() => {
    if (!framesRef.current) {
      return;
    }
    const frames = framesRef.current.querySelectorAll(".frame");
    frames.forEach((frameEl) => {
      ScrollTrigger.create({
        trigger: frameEl,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(frameEl.querySelectorAll("[data-reveal]"), {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
          });
          const paths = frameEl.querySelectorAll(".draw-stroke");
          if (paths.length) {
            gsap.to(paths, { drawSVG: "100%", duration: 1.8, stagger: 0.15, ease: "power1.inOut" });
          }
          const scramble = frameEl.querySelector("[data-scramble]") as HTMLElement;
          if (scramble) {
            gsap.to(scramble, {
              duration: 1.5,
              scrambleText: { text: scramble.dataset.scramble!, chars: "▓░█</>{}[]", revealDelay: 0.4, speed: 0.3 },
            });
          }
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: framesRef });

  const p = "24px"; // mobile padding

  return (
    <main className="root">
      <div className="center">
        <div ref={framesRef} className="frames">

          {/* ═══ FRAME 0: Hero ═══ */}
          <div className="frame" style={{ position: "relative" }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 50, mass: 0.2, delay: 0.3 }}
              style={{
                position: "absolute",
                right: "-10%",
                top: "10%",
                width: "70vw",
                height: "70vw",
                borderRadius: "50%",
                background: "var(--color-yellow)",
              }}
            />
            <div style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              minHeight: "100svh",
              padding: `0 ${p}`,
            }}
            >
              <div>
                <ClipReveal>Kirk Lin</ClipReveal>
                <ClipReveal delay={0.1} dim>is a</ClipReveal>
                <ClipReveal delay={0.2}>founder</ClipReveal>
                <ClipReveal delay={0.3} dim>building AI</ClipReveal>
              </div>
            </div>
          </div>

          {/* ═══ FRAME 1: The Spark ═══ */}
          <MobileFrame label="The Spark">
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              minHeight: "100svh",
              gap: 20,
              padding: `60px ${p}`,
            }}
            >
              <svg width="280" height="200" viewBox="0 0 440 320" fill="none" style={{ opacity: 0.9, maxWidth: "80%" }}>
                <rect className="draw-stroke" x="70" y="15" width="300" height="220" rx="14" strokeWidth="1.8" />
                <rect className="draw-stroke" x="90" y="35" width="260" height="180" rx="6" strokeWidth="1.2" />
                <path className="draw-stroke" d="M185 235 L170 275 L270 275 L255 235" strokeWidth="1.2" />
                <path className="draw-stroke" d="M145 275 Q220 285 295 275" strokeWidth="1.2" />
                <circle className="draw-stroke" cx="340" cy="225" r="3" style={{ stroke: "var(--color-orange)" }} strokeWidth="1.5" />
                <path className="draw-stroke" d="M115 160 Q155 70 220 120 Q280 170 320 90 Q340 55 345 100" style={{ stroke: "var(--color-orange)", strokeWidth: 1.4 }} />
                <path className="draw-stroke" d="M110 130 Q160 190 220 145 Q280 100 330 170" style={{ stroke: "var(--color-orange)", strokeWidth: 1.2 }} />
                <path className="draw-stroke" d="M140 170 Q190 110 240 155 Q290 200 320 140" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8, opacity: 0.6 }} />
                <path className="draw-stroke" d="M100 195 L155 110 L195 165 L245 80 L295 145 L340 195" style={{ stroke: "var(--color-orange)", strokeWidth: 1.3 }} />
                <circle className="draw-stroke" cx="300" cy="65" r="16" style={{ stroke: "var(--color-orange)", strokeWidth: 1.2 }} />
                <line className="draw-stroke" x1="300" y1="45" x2="300" y2="38" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="316" y1="54" x2="321" y2="49" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="320" y1="65" x2="327" y2="65" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="316" y1="76" x2="321" y2="81" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="284" y1="54" x2="279" y2="49" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="280" y1="65" x2="273" y2="65" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <circle className="draw-stroke" cx="135" cy="55" r="2.5" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="175" cy="45" r="1.8" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="250" cy="50" r="2" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="120" cy="80" r="1.5" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
              </svg>
              <p data-reveal style={{ textAlign: "center", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, maxWidth: 320 }}>
                A classmate drew something
                <br />
                beautiful on a screen.
              </p>
              <p data-reveal style={{ textAlign: "center", fontSize: 16, color: "var(--color-fg-muted)", lineHeight: 1.7 }}>
                Computer class. Elementary school.
                <br />
                That&apos;s all it took.
              </p>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 2: The Hacker ═══ */}
          <MobileFrame label="The Hacker" bg="#0a0a0a" labelColor="rgba(255,255,255,0.35)">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "100svh",
              padding: `60px ${p}`,
              gap: 6,
              color: "white",
            }}
            >
              <div data-reveal>
                <span style={{ display: "block", fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>HACKED</span>
              </div>
              <div data-reveal style={{ marginLeft: "8%" }}>
                <span style={{ display: "block", fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-orange)" }}>THE SYSTEM</span>
              </div>
              <div data-reveal style={{ marginLeft: "4%", marginTop: 12 }}>
                <span style={{ display: "block", fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "rgba(255,255,255,0.15)" }} data-scramble="THEN BUILT">████████████</span>
              </div>
              <p data-reveal style={{ marginTop: 28, maxWidth: "90%", fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                Wrote viruses. Hacked the grade system.
                <br />
                The thrill faded fast.
                <br />
                Then I built something for people —
                <br />
                and felt something new.
              </p>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 3: The Builder ═══ */}
          <MobileFrame label="The Builder">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "100svh",
              padding: `60px ${p}`,
              gap: 12,
            }}
            >
              <p data-reveal style={{ fontSize: 16, color: "var(--color-fg-muted)", marginBottom: 12 }}>
                My PC exploded one summer.
                <br />
                The market was full of counterfeits.
              </p>
              <div data-reveal>
                <span style={{ display: "block", fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>BUILT</span>
              </div>
              <div data-reveal style={{ marginLeft: "8%" }}>
                <span style={{ display: "block", fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-orange)" }}>MACHINES</span>
              </div>
              <p data-reveal style={{ fontSize: 18, fontWeight: 500, marginTop: 20 }}>
                So I started building —
                <br />
                one by one, from scratch.
              </p>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 4: The Leap ═══ */}
          <MobileFrame label="The Leap" bg="var(--color-orange)" labelColor="rgba(255,255,255,0.5)">
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100svh",
              padding: `60px ${p}`,
              gap: 24,
            }}
            >
              <span data-reveal style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
                Took a stable job. A predictable future.
              </span>
              <span data-reveal style={{ fontSize: 100, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 0.85, color: "white", userSelect: "none" }}>
                QUIT
              </span>
              <p data-reveal style={{ textAlign: "center", fontSize: 16, color: "rgba(255,255,255,0.75)", fontStyle: "italic", lineHeight: 1.7 }}>
                A life without creation
                <br />
                was not a life I could accept.
              </p>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 5: The Creator ═══ */}
          <MobileFrame label="The Creator">
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: `48px ${p}`,
                background: "var(--color-orange)",
                minHeight: "50svh",
              }}
              >
                <p data-reveal style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
                  2024 · Co-founder
                </p>
                <h2 data-reveal style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "white" }}>
                  From Idea
                  <br />
                  to Product
                </h2>
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: `48px ${p}`,
                minHeight: "50svh",
              }}
              >
                <p data-reveal style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-fg-muted)", marginBottom: 20 }}>
                  AI × Hardware
                </p>
                <p data-reveal style={{ fontSize: 18, lineHeight: 1.7, color: "var(--color-fg-muted)" }}>
                  Built an AI hardware startup from scratch.
                  <br />
                  Pre-seed &amp; Seed funded.
                  <br />
                  Ran the full loop —
                  <br />
                  concept to pre-production.
                </p>
              </div>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 6: The Restart ═══ */}
          <MobileFrame label="2026" bg="#0a0a0a" labelColor="rgba(255,255,255,0.35)">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "100svh",
              padding: `60px ${p}`,
              gap: 12,
            }}
            >
              <span data-reveal style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                Turned the page. Started fresh.
              </span>
              <div data-reveal>
                <span style={{ display: "block", fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "white" }}>AI</span>
              </div>
              <div data-reveal style={{ marginLeft: "8%" }}>
                <span style={{ display: "block", fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-orange)" }}>SOFTWARE</span>
              </div>
              <p data-reveal style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.5)", marginTop: 20 }}>
                From hardware to software.
                <br />
                Building from scratch. Again.
              </p>
            </div>
          </MobileFrame>

          {/* ═══ FRAME 7: The Vision ═══ */}
          <MobileFrame bg="var(--color-yellow)">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "100svh",
              padding: `60px ${p}`,
              gap: 32,
            }}
            >
              <div data-reveal>
                <p style={{ fontSize: 22, lineHeight: 1.7, fontWeight: 500 }}>
                  Pour AI&apos;s soul
                  <br />
                  into hardware&apos;s body.
                  <br />
                  <br />
                  Before the age of
                  <br />
                  brain-computer interfaces,
                  <br />
                  build the product that understands
                  <br />
                  human intent the most.
                </p>
              </div>
              <div data-reveal style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <a href="https://github.com/kirklin" target="_blank" rel="noreferrer" style={{ fontSize: 24, fontWeight: 700, color: "inherit", textDecoration: "none" }}>GitHub</a>
                <a href="https://kirklin.cn" target="_blank" rel="noreferrer" style={{ fontSize: 24, fontWeight: 700, color: "inherit", textDecoration: "none" }}>Blog</a>
                <a href="https://x.com/lkirkun" target="_blank" rel="noreferrer" style={{ fontSize: 24, fontWeight: 700, color: "inherit", textDecoration: "none" }}>𝕏</a>
              </div>
              <span data-reveal style={{ fontSize: 14, color: "rgba(0,0,0,0.3)" }}>
                © Kirk Lin ·
                {" "}
                {new Date().getFullYear()}
              </span>
            </div>
          </MobileFrame>
        </div>
      </div>
    </main>
  );
}

/* ── Mobile Frame wrapper ── */
function MobileFrame({ children, label, bg, labelColor }: {
  children: React.ReactNode;
  label?: string;
  bg?: string;
  labelColor?: string;
}) {
  return (
    <div className="frame" style={{ background: bg || "var(--color-sheet)" }}>
      {label && (
        <div className="frame-label" style={{ color: labelColor }}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP — Horizontal scroll gallery (unchanged)
   ═══════════════════════════════════════════════════════════ */
function DesktopHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  const maxScaleRef = useRef(1);

  const scaleSpring = useSpring(1, { stiffness: 500, damping: 50 });
  const posX = useMotionValue(0);
  const { scrollX, scrollY } = useScroll();

  useEffect(() => {
    function calc() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxScale = clamp(Math.min(vw / 1300, vh / 1020), [0.2, 1]);

      if (maxScaleRef.current === 1) {
        scaleSpring.jump(maxScale);
      }
      maxScaleRef.current = maxScale;

      const galleryScale = maxScale < 0.7 ? maxScale : 0.7;
      const range = TOTAL_W * galleryScale - vw + 2 * ((vw - FRAME_W) / 2) * galleryScale + 200;
      setScrollRange(Math.max(0, Math.round(range)));
    }

    window.history.scrollRestoration = "manual";
    document.documentElement.scrollTo(0, 0);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [scaleSpring]);

  function handleScroll(scrollVal: number) {
    if (scrollRange === 0) {
      return;
    }
    cancelAnimation || setCancelAnimation(true);
    const maxScale = maxScaleRef.current;
    let targetScale = maxScale;
    if (scrollVal > 0) {
      targetScale = clamp(scaleSpring.get() + -0.01 * scrollVal * 0.01, [0.7, maxScale]);
    }
    scaleSpring.set(targetScale);
    const progress = scrollRange > 0 ? scrollVal / scrollRange : 0;
    const targetX = clamp(progress, [0, 1]) * -scrollRange;
    posX.set(targetX);
  }

  useEffect(() => {
    const update = () => {
      const val = Math.max(scrollX.get(), scrollY.get());
      handleScroll(val);
    };
    const unsubX = scrollX.on("change", update);
    const unsubY = scrollY.on("change", update);
    return () => {
      unsubX(); unsubY();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRange]);

  const labelScale = useTransform(scaleSpring, s => 1 / s);
  const labelTop = useTransform(scaleSpring, s => -28 / s);

  const framesRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!framesRef.current) {
      return;
    }
    const paths = framesRef.current.querySelectorAll(".draw-stroke");
    if (paths.length) {
      gsap.set(paths, { drawSVG: "0%" });
    }
    const reveals = framesRef.current.querySelectorAll("[data-reveal]");
    gsap.set(reveals, { autoAlpha: 0, y: 20 });
  }, { scope: framesRef });

  const revealedRef = useRef(new Set<number>());
  useEffect(() => {
    const unsub = posX.on("change", (x) => {
      if (!framesRef.current) {
        return;
      }
      const absX = Math.abs(x);
      const currentScale = scaleSpring.get();
      const viewW = window.innerWidth / currentScale;
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (revealedRef.current.has(i)) {
          continue;
        }
        const frameStart = i * FRAME_STEP;
        if (frameStart < absX + viewW * 2) {
          revealedRef.current.add(i);
          const frameEl = framesRef.current.querySelectorAll(".frame")[i];
          if (!frameEl) {
            continue;
          }
          gsap.to(frameEl.querySelectorAll("[data-reveal]"), {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
          });
          const paths = frameEl.querySelectorAll(".draw-stroke");
          if (paths.length) {
            gsap.to(paths, { drawSVG: "100%", duration: 1.8, stagger: 0.15, ease: "power1.inOut" });
          }
          const scramble = frameEl.querySelector("[data-scramble]") as HTMLElement;
          if (scramble) {
            gsap.to(scramble, {
              duration: 1.5,
              scrambleText: { text: scramble.dataset.scramble!, chars: "▓░█</>{}[]", revealDelay: 0.4, speed: 0.3 },
            });
          }
        }
      }
    });
    return unsub;
  }, [posX, scaleSpring]);

  return (
    <main
      ref={rootRef}
      className="root"
      data-cancel-animation={cancelAnimation}
      style={{
        ["--frame-width" as string]: `${FRAME_W}px`,
        ["--frame-height" as string]: `${FRAME_H}px`,
      }}
    >
      <div
        aria-hidden
        className="ghost"
        style={{
          width: `calc(100vw + ${scrollRange}px)`,
          height: `calc(100vh + ${scrollRange}px)`,
        }}
      />
      <Minimap posX={posX} scrollRange={scrollRange} />
      <CrossCursor />
      <div className="center">
        <motion.div
          ref={framesRef}
          className="frames"
          style={{ x: posX, scale: scaleSpring, width: TOTAL_W, height: FRAME_H }}
        >
          {/* ═══ FRAME 0: Hero ═══ */}
          <motion.div
            className="main-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 60, mass: 0.2, restSpeed: 0.0001, restDelta: 0.0001 }}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <div className="frame" style={{ position: "relative" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 80, mass: 0.2, delay: 0.4, restSpeed: 0.0001, restDelta: 0.0001 }}
                style={{ position: "absolute", right: 0, top: 0, height: "100%", aspectRatio: "1/1", borderRadius: "50%", background: "var(--color-yellow)" }}
              />
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", height: "100%", padding: "0 72px" }}>
                <div>
                  <ClipReveal>Kirk Lin</ClipReveal>
                  <ClipReveal delay={0.1} dim>is a</ClipReveal>
                  <ClipReveal delay={0.2}>founder</ClipReveal>
                  <ClipReveal delay={0.3} dim>building AI</ClipReveal>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ FRAME 1: The Spark ═══ */}
          <Frame index={1} labelScale={labelScale} labelTop={labelTop} label="The Spark">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", gap: 28, padding: "0 80px" }}>
              <svg width="440" height="320" viewBox="0 0 440 320" fill="none" style={{ opacity: 0.9 }}>
                <rect className="draw-stroke" x="70" y="15" width="300" height="220" rx="14" strokeWidth="1.8" />
                <rect className="draw-stroke" x="90" y="35" width="260" height="180" rx="6" strokeWidth="1.2" />
                <path className="draw-stroke" d="M185 235 L170 275 L270 275 L255 235" strokeWidth="1.2" />
                <path className="draw-stroke" d="M145 275 Q220 285 295 275" strokeWidth="1.2" />
                <circle className="draw-stroke" cx="340" cy="225" r="3" style={{ stroke: "var(--color-orange)" }} strokeWidth="1.5" />
                <path className="draw-stroke" d="M115 160 Q155 70 220 120 Q280 170 320 90 Q340 55 345 100" style={{ stroke: "var(--color-orange)", strokeWidth: 1.4 }} />
                <path className="draw-stroke" d="M110 130 Q160 190 220 145 Q280 100 330 170" style={{ stroke: "var(--color-orange)", strokeWidth: 1.2 }} />
                <path className="draw-stroke" d="M140 170 Q190 110 240 155 Q290 200 320 140" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8, opacity: 0.6 }} />
                <path className="draw-stroke" d="M100 195 L155 110 L195 165 L245 80 L295 145 L340 195" style={{ stroke: "var(--color-orange)", strokeWidth: 1.3 }} />
                <circle className="draw-stroke" cx="300" cy="65" r="16" style={{ stroke: "var(--color-orange)", strokeWidth: 1.2 }} />
                <line className="draw-stroke" x1="300" y1="45" x2="300" y2="38" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="316" y1="54" x2="321" y2="49" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="320" y1="65" x2="327" y2="65" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="316" y1="76" x2="321" y2="81" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="284" y1="54" x2="279" y2="49" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <line className="draw-stroke" x1="280" y1="65" x2="273" y2="65" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
                <circle className="draw-stroke" cx="135" cy="55" r="2.5" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="175" cy="45" r="1.8" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="250" cy="50" r="2" style={{ stroke: "var(--color-orange)", strokeWidth: 1 }} />
                <circle className="draw-stroke" cx="120" cy="80" r="1.5" style={{ stroke: "var(--color-orange)", strokeWidth: 0.8 }} />
              </svg>
              <p data-reveal style={{ textAlign: "center", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: 540 }}>
                A classmate drew something
                <br />
                beautiful on a screen.
              </p>
              <p data-reveal style={{ textAlign: "center", fontSize: 20, color: "var(--color-fg-muted)", lineHeight: 1.7, maxWidth: 440 }}>
                Computer class. Elementary school.
                <br />
                That&apos;s all it took.
              </p>
            </div>
          </Frame>

          {/* ═══ FRAME 2: The Hacker ═══ */}
          <Frame index={2} labelScale={labelScale} labelTop={labelTop} label="The Hacker" bg="#0a0a0a" labelColor="rgba(255,255,255,0.35)">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: "0 72px", gap: 6, color: "white" }}>
              <div data-reveal style={{ marginLeft: "4%" }}><span style={{ display: "block", fontSize: 96, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1 }}>HACKED</span></div>
              <div data-reveal style={{ marginLeft: "16%" }}><span style={{ display: "block", fontSize: 96, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--color-orange)" }}>THE SYSTEM</span></div>
              <div data-reveal style={{ marginLeft: "8%", marginTop: 16 }}><span style={{ display: "block", fontSize: 96, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "rgba(255,255,255,0.15)" }} data-scramble="THEN BUILT">████████████████</span></div>
              <p data-reveal style={{ marginTop: 36, marginLeft: "8%", maxWidth: 400, fontSize: 20, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                Wrote viruses. Hacked the grade system.
                <br />
                The thrill faded fast.
                <br />
                Then I built something for people —
                <br />
                and felt something new.
              </p>
            </div>
          </Frame>

          {/* ═══ FRAME 3: The Builder ═══ */}
          <Frame index={3} labelScale={labelScale} labelTop={labelTop} label="The Builder">
            <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: "0 72px" }}>
              <p data-reveal style={{ position: "absolute", top: 36, left: 44, fontSize: 18, color: "var(--color-fg-muted)", maxWidth: 400 }}>
                My PC exploded one summer.
                <br />
                The market was full of counterfeits.
              </p>
              <div data-reveal style={{ marginLeft: "4%" }}><span style={{ display: "block", fontSize: 120, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1 }}>BUILT</span></div>
              <div data-reveal style={{ marginLeft: "16%" }}><span style={{ display: "block", fontSize: 120, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--color-orange)" }}>MACHINES</span></div>
              <p data-reveal style={{ position: "absolute", bottom: 36, right: 44, textAlign: "right", fontSize: 22, fontWeight: 500 }}>
                So I started building —
                <br />
                one by one, from scratch.
              </p>
            </div>
          </Frame>

          {/* ═══ FRAME 4: The Leap ═══ */}
          <Frame index={4} labelScale={labelScale} labelTop={labelTop} label="The Leap" bg="var(--color-orange)" labelColor="rgba(255,255,255,0.5)">
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              <span data-reveal style={{ fontSize: 300, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 0.8, color: "white", userSelect: "none" }}>QUIT</span>
              <span data-reveal style={{ position: "absolute", top: 36, left: 44, fontSize: 18, color: "rgba(255,255,255,0.65)" }}>Took a stable job. A predictable future.</span>
              <p data-reveal style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", textAlign: "center", fontSize: 20, color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>
                A life without creation
                <br />
                was not a life I could accept.
              </p>
            </div>
          </Frame>

          {/* ═══ FRAME 5: The Creator ═══ */}
          <Frame index={5} labelScale={labelScale} labelTop={labelTop} label="The Creator">
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 56, background: "var(--color-orange)", borderRadius: "10px 0 0 10px" }}>
                <p data-reveal style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>2024 · Co-founder</p>
                <h2 data-reveal style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "white" }}>
                  From Idea
                  <br />
                  to Product
                </h2>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 56 }}>
                <p data-reveal style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-fg-muted)", marginBottom: 24 }}>AI × Hardware</p>
                <p data-reveal style={{ fontSize: 22, lineHeight: 1.7, color: "var(--color-fg-muted)" }}>
                  Built an AI hardware startup from scratch.
                  <br />
                  Pre-seed &amp; Seed funded.
                  <br />
                  Ran the full loop —
                  <br />
                  concept to pre-production.
                </p>
              </div>
            </div>
          </Frame>

          {/* ═══ FRAME 6: The Restart ═══ */}
          <Frame index={6} labelScale={labelScale} labelTop={labelTop} label="2026" bg="#0a0a0a" labelColor="rgba(255,255,255,0.35)">
            <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: "0 72px" }}>
              <span data-reveal style={{ position: "absolute", top: 36, left: 44, fontSize: 18, color: "rgba(255,255,255,0.4)" }}>Turned the page. Started fresh.</span>
              <div data-reveal style={{ marginLeft: "4%" }}><span style={{ display: "block", fontSize: 120, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "white" }}>AI</span></div>
              <div data-reveal style={{ marginLeft: "16%" }}><span style={{ display: "block", fontSize: 120, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--color-orange)" }}>SOFTWARE</span></div>
              <p data-reveal style={{ position: "absolute", bottom: 36, right: 44, textAlign: "right", fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                From hardware to software.
                <br />
                Building from scratch. Again.
              </p>
            </div>
          </Frame>

          {/* ═══ FRAME 7: The Vision ═══ */}
          <Frame index={7} labelScale={labelScale} labelTop={labelTop} bg="var(--color-yellow)">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div data-reveal style={{ position: "absolute", top: 48, left: 56, maxWidth: 480 }}>
                <p style={{ fontSize: 28, lineHeight: 1.6, fontWeight: 500 }}>
                  Pour AI&apos;s soul
                  <br />
                  into hardware&apos;s body.
                  <br />
                  <br />
                  Before the age of
                  <br />
                  brain-computer interfaces,
                  <br />
                  build the product that understands
                  <br />
                  human intent the most.
                </p>
              </div>
              <a data-reveal href="https://github.com/kirklin" target="_blank" rel="noreferrer" style={{ position: "absolute", top: 56, right: 56, fontSize: 32, fontWeight: 700, color: "inherit", textDecoration: "none" }}>GitHub</a>
              <a data-reveal href="https://kirklin.cn" target="_blank" rel="noreferrer" style={{ position: "absolute", bottom: 56, left: 56, fontSize: 32, fontWeight: 700, color: "inherit", textDecoration: "none" }}>Blog</a>
              <a data-reveal href="https://x.com/lkirkun" target="_blank" rel="noreferrer" style={{ position: "absolute", bottom: 56, right: 56, fontSize: 32, fontWeight: 700, color: "inherit", textDecoration: "none" }}>𝕏</a>
              <span data-reveal style={{ position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", fontSize: 14, color: "rgba(0,0,0,0.3)" }}>
                © Kirk Lin ·
                {new Date().getFullYear()}
              </span>
            </div>
          </Frame>
        </motion.div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────
   ClipReveal — text reveal (spring physics)
   ───────────────────────────────────────────────────────── */
function ClipReveal({ children, delay = 0, dim = false }: { children: React.ReactNode; delay?: number; dim?: boolean }) {
  return (
    <p className="clip-reveal" style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em", opacity: dim ? 0.4 : 1 }}>
      <motion.span
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{
          y: { type: "spring", stiffness: 240, damping: 32, mass: 0.1, restSpeed: 0.0001, restDelta: 0.0001, delay: delay + 0.2 },
        }}
      >
        {children}
      </motion.span>
    </p>
  );
}

/* ─────────────────────────────────────────────────────────
   Frame — Desktop frame wrapper with counter-scaled label
   ───────────────────────────────────────────────────────── */
function Frame({ children, index, label, labelScale, labelTop, bg, labelColor }: {
  children: React.ReactNode;
  index: number;
  label?: string;
  labelScale: MotionValue<number>;
  labelTop: MotionValue<number>;
  bg?: string;
  labelColor?: string;
}) {
  return (
    <div className="frame" style={{ left: index * FRAME_STEP, background: bg || "var(--color-sheet)" }}>
      {label && (
        <motion.div aria-hidden className="frame-label" style={{ scale: labelScale, top: labelTop, color: labelColor }}>
          {label}
        </motion.div>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Minimap
   ───────────────────────────────────────────────────────── */
const SECTION_NAMES = ["", "The Spark", "The Hacker", "The Builder", "The Leap", "The Creator", "2026", ""];

function Minimap({ posX, scrollRange }: { posX: MotionValue<number>; scrollRange: number }) {
  const LINE_GAP = 12;
  const LINE_COUNT = 20;
  const trackerXTarget = useTransform(posX, (x) => {
    if (scrollRange === 0) {
      return 0;
    }
    const progress = Math.abs(x) / scrollRange;
    return Math.round(progress * (LINE_COUNT - 1)) * (1 + LINE_GAP);
  });
  const trackerX = useSpring(trackerXTarget, { stiffness: 400, damping: 40 });
  const sectionIndex = useTransform(posX, (x) => {
    if (scrollRange === 0) {
      return 0;
    }
    const progress = Math.abs(x) / scrollRange;
    return Math.min(Math.round(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
  });
  const [sectionName, setSectionName] = useState("");
  useEffect(() => {
    const unsub = sectionIndex.on("change", v => setSectionName(SECTION_NAMES[Math.round(v)] || ""));
    return unsub;
  }, [sectionIndex]);

  return (
    <>
      <div className="minimap">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (<div key={i} className="minimap-line" />))}
        <motion.div className="minimap-tracker" style={{ x: trackerX }} />
      </div>
      {sectionName && <div className="minimap-label">{sectionName}</div>}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   CrossCursor
   ───────────────────────────────────────────────────────── */
function CrossCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 10); y.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.svg className="cross" style={{ x: springX, y: springY, opacity: 0.6 }} width="20" height="20" viewBox="0 0 30 30" fill="none">
      <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="1.5" />
      <line x1="0" y1="15" x2="30" y2="15" stroke="white" strokeWidth="1.5" />
    </motion.svg>
  );
}
