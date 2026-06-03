import { useState, useEffect, useRef } from "react";

const greetings = [
  { text: "Selamat Datang", isLast: false },
  { text: "Wilujeng Sumping", isLast: false },
  { text: "Sugeng Rawuh", isLast: false },
  { text: "Selamat Nyampe", isLast: false },
  { text: "Welcome to my World", isLast: false },
  { text: "أَهْلاً وَسَهْلاً", isLast: false },
  { text: "I Build Things", isLast: false },
  { text: "Imu Abdurroofi", isLast: true },
];

export default function LoadingScreen({ onDone }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);  // text visible
  const [slideOut, setSlideOut] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let t1, t2, t3;

    const runStep = (i) => {
      if (doneRef.current) return;

      // Show text
      setIndex(i);
      setVisible(true);

      const isLast = greetings[i].isLast;
      const showDuration = isLast ? 1000 : 650;

      // After showDuration, fade out text
      t1 = setTimeout(() => {
        setVisible(false);

        if (isLast) {
          // After fade out, slide up overlay
          t2 = setTimeout(() => {
            setSlideOut(true);
            // After slide animation, call onDone
            t3 = setTimeout(() => {
              if (!doneRef.current) {
                doneRef.current = true;
                onDone && onDone();
              }
            }, 700);
          }, 350);
        } else {
          // Next word
          t2 = setTimeout(() => {
            runStep(i + 1);
          }, 300);
        }
      }, showDuration);
    };

    runStep(0);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.5); opacity: 0.35; }
        }
        .ls-text {
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
      `}</style>

      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1628 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: slideOut ? "translateY(-100%)" : "translateY(0)",
        opacity: slideOut ? 0 : 1,
        transition: slideOut
          ? "transform 0.7s cubic-bezier(0.76,0,0.24,1), opacity 0.7s ease"
          : "none",
        overflow: "hidden",
      }}>

        {/* Decorative dots */}
        {[
          { l: "10%", t: "20%", s: "10px", d: "0s" },
          { l: "85%", t: "15%", s: "6px",  d: "0.5s" },
          { l: "75%", t: "75%", s: "12px", d: "1s" },
          { l: "15%", t: "80%", s: "8px",  d: "0.3s" },
          { l: "50%", t: "8%",  s: "5px",  d: "0.8s" },
        ].map((d, i) => (
          <div key={i} style={{
            position: "absolute",
            left: d.l, top: d.t,
            width: d.s, height: d.s,
            borderRadius: "50%",
            background: "#3B82F6",
            animation: `dotPulse 2s ${d.d} ease-in-out infinite`,
          }} />
        ))}

        {/* Counter */}
        <div style={{
          position: "absolute",
          top: "2rem", right: "2rem",
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
        }}>
          {String(index + 1).padStart(2, "0")} / {String(greetings.length).padStart(2, "0")}
        </div>

        {/* Main text */}
        <div className="ls-text" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.05)",
          fontSize: greetings[index].isLast
            ? "clamp(2rem, 6vw, 4rem)"
            : "clamp(1.4rem, 4vw, 2.6rem)",
          fontWeight: greetings[index].isLast ? "800" : "500",
          color: greetings[index].isLast ? "#3B82F6" : "#ffffff",
          letterSpacing: "0.05em",
          textAlign: "center",
          padding: "0 2rem",
          fontFamily: "inherit",
          direction: index === 5 ? "rtl" : "ltr",
        }}>
          {greetings[index].text}
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "2px",
          background: "rgba(59,130,246,0.2)",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "#3B82F6",
            borderRadius: "2px",
            width: `${((index + 1) / greetings.length) * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>
    </>
  );
}
