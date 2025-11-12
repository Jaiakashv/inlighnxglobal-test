import React from "react";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  return (
    <div className="animated-bg">
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="bg-svg"
      >
        {/* Curved Path */}
        <path
          id="motionPath"
          d="M 0 300 Q 200 150 400 250 T 800 200"
          stroke="rgba(0,255,255,0.5)"
          strokeWidth="2"
          fill="none"
        />

        {/* Moving Dot */}
        <circle r="6" fill="#00f7ff">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#motionPath" />
          </animateMotion>
        </circle>
      </svg>

      {/* Overlay Content */}
      <div className="content">
        <h1>
          Transform Your Career with <br />
          <span>INLIGHN TECH | InLighnX Global Private Limited</span>
        </h1>
        <p>
          Gain real-world experience with our immersive internship programs in
          Cyber Security, Full Stack Development, Data Science, and various
          other tech domains.
        </p>
        <button>Explore Internships</button>
      </div>
    </div>
  );
};

export default AnimatedBackground;
