import React, { useEffect, useRef, useState, useMemo } from "react";
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
      // Limit maximum boxes to prevent performance issues on very large screens
      const maxCols = 80;
      const maxRows = 50;
      
      if (container) {
        const width = container.offsetWidth || window.innerWidth;
        const height = container.offsetHeight || window.innerHeight;
        const cols = Math.min(Math.ceil(width / (boxSize + gap)), maxCols);
        const rows = Math.min(Math.ceil(height / (boxSize + gap)), maxRows);
        setBoxCount({ cols, rows });
      } else {
        const cols = Math.min(Math.ceil(window.innerWidth / (boxSize + gap)), maxCols);
        const rows = Math.min(Math.ceil(window.innerHeight / (boxSize + gap)), maxRows);
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
  const particleCount = 18; // Balanced for performance and visual appeal

  // Memoize particle data to prevent recalculation on every render
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => {
      // Pre-calculate random values once
      // Increased movement range for more dynamic effect
      const randomX = (Math.random() - 0.5) * 800; // -400 to 400
      const randomY = (Math.random() - 0.5) * 800; // -400 to 400
      // Stagger delays more evenly to ensure particles are always visible
      const delay = (i / particleCount) * 15 + Math.random() * 5;
      const duration = 18 + Math.random() * 8; // 18-26 seconds
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      return {
        id: i,
        randomX,
        randomY,
        delay,
        duration,
        startX,
        startY,
      };
    });
  }, []); // Empty dependency array - only calculate once

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
        {particles.map((particle) => (
          <div 
            key={particle.id} 
            className="particle"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              '--random-x': `${particle.randomX}px`,
              '--random-y': `${particle.randomY}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

