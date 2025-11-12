import React, { useEffect, useRef, useState } from "react";
import "./BackgroundBoxes.css";

export const Boxes = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [boxCount, setBoxCount] = useState({ cols: 0, rows: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const calculateBoxCount = () => {
      const boxSize = 30;
      const gap = 1;
      const container = containerRef.current;
      if (container) {
        const width = container.offsetWidth || window.innerWidth;
        const height = container.offsetHeight || window.innerHeight;
        const cols = Math.ceil(width / (boxSize + gap));
        const rows = Math.ceil(height / (boxSize + gap));
        setBoxCount({ cols, rows });
      } else {
        const cols = Math.ceil(window.innerWidth / (boxSize + gap));
        const rows = Math.ceil(window.innerHeight / (boxSize + gap));
        setBoxCount({ cols, rows });
      }
    };

    const timeoutId = setTimeout(calculateBoxCount, 0);
    window.addEventListener("resize", calculateBoxCount);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateBoxCount);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const handleMouseMove = (e) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update single overlay position - much more efficient
        overlay.style.left = `${x}px`;
        overlay.style.top = `${y}px`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [boxCount]);

  const totalBoxes = boxCount.cols * boxCount.rows;
  const particleCount = 20;

  return (
    <div 
      ref={containerRef} 
      className="boxes-container"
      style={{
        gridTemplateColumns: `repeat(${boxCount.cols}, 30px)`,
        gridTemplateRows: `repeat(${boxCount.rows}, 30px)`,
      }}
    >
      {Array.from({ length: totalBoxes || 100 }).map((_, i) => (
        <div key={i} className="box" />
      ))}
      <div ref={overlayRef} className="mouse-overlay" />
      <div className="particles-container">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

