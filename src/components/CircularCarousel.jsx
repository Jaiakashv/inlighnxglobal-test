import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./CircularCarousel.css";
import man1 from '../assets/man-profile.jpg';
import man2 from '../assets/man-profile2.jpeg';

const carouselData = [
  {
    quote:
      "The internship program at InLighnX was transformative! The hands-on projects and mentorship helped me land my dream job at Google as a Software Engineer. The practical experience I gained here was invaluable.",
    name: "Tamar Mendelson",
    designation: "Placed at Google | Software Engineer",
    src: man1,
    linkedin: "", // Add LinkedIn profile URL here
  },
  {
    quote:
      "I'm grateful for the comprehensive training and real-world projects at InLighnX. The skills I developed here directly led to my placement at Microsoft as a Full Stack Developer. This program exceeded all my expectations!",
    name: "Joe Charlescraft",
    designation: "Placed at Microsoft | Full Stack Developer",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686",
    linkedin: "", // Add LinkedIn profile URL here
  },
  {
    quote:
      "InLighnX provided me with the perfect foundation to kickstart my career. The industry-relevant projects and expert guidance helped me secure a position at Amazon as a Cloud Solutions Architect. Highly recommended!",
    name: "Martina Edelweist",
    designation: "Placed at Amazon | Cloud Solutions Architect",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046",
    linkedin: "", // Add LinkedIn profile URL here
  },
  {
    quote:
      "The internship experience at InLighnX was exceptional! The mentorship and hands-on learning opportunities prepared me perfectly for my role at Meta as a Frontend Developer. I couldn't have asked for a better start to my career!",
    name: "Sarah Johnson",
    designation: "Placed at Meta | Frontend Developer",
    src: man2,
    linkedin: "", // Add LinkedIn profile URL here
  },
  {
    quote:
      "InLighnX's program gave me the confidence and skills needed to succeed. Thanks to the practical training and industry connections, I landed a position at Apple as an iOS Developer. This program truly changed my career trajectory!",
    name: "Michael Chen",
    designation: "Placed at Apple | iOS Developer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    linkedin: "", // Add LinkedIn profile URL here
  },
  {
    quote:
      "The comprehensive curriculum and real-world projects at InLighnX were exactly what I needed. I'm now working at Netflix as a Backend Engineer, and I credit this program for my success. The support and guidance were outstanding!",
    name: "Emily Rodriguez",
    designation: "Placed at Netflix | Backend Engineer",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    linkedin: "", // Add LinkedIn profile URL here
  },
];

export default function CircularCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const imageContainerRef = useRef(null);
  const nameRef = useRef(null);
  const designationRef = useRef(null);
  const quoteRef = useRef(null);
  const linkedinRef = useRef(null);

  const updateCarousel = (direction) => {
    // Calculate next index with looping (wraps around from last to first)
    const newIndex =
      (activeIndex + direction + carouselData.length) %
      carouselData.length;
    
    // Don't block auto-rotation, only prevent rapid manual clicks
    if (isAnimatingRef.current) {
      return;
    }
    
    isAnimatingRef.current = true;
    setActiveIndex(newIndex);

    const images = imageContainerRef.current.children;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      Array.from(images).forEach((img, index) => {
        const offset = (index - newIndex + carouselData.length) % carouselData.length;
        
        let zIndex, opacity, scale, translateX, translateY, rotateY;
        
        if (offset === 0) {
          // Current/active image - front center - HIGHEST z-index
          zIndex = 100;
          opacity = 1;
          scale = 1;
          translateX = 0;
          translateY = 0;
          rotateY = 0;
        } else if (offset === 1) {
          // Next image - right side, behind
          zIndex = 50;
          opacity = 0.5;
          scale = 0.8;
          translateX = "30%";
          translateY = "8%";
          rotateY = -15;
        } else {
          // Previous image - left side, behind
          zIndex = 50;
          opacity = 0.5;
          scale = 0.8;
          translateX = "-30%";
          translateY = "8%";
          rotateY = 15;
        }

        // Use CSS transforms directly for better performance
        gsap.to(img, {
          zIndex,
          opacity,
          scale,
          x: translateX,
          y: translateY,
          rotationY: rotateY,
          duration: 0.5,
          ease: "none",
          force3D: true,
          immediateRender: false,
        });
      });
    });

    // Simplified text update - no complex animations
    if (nameRef.current && designationRef.current && quoteRef.current && linkedinRef.current) {
      nameRef.current.textContent = carouselData[newIndex].name;
      designationRef.current.textContent = carouselData[newIndex].designation;
      quoteRef.current.textContent = carouselData[newIndex].quote;
      linkedinRef.current.href = carouselData[newIndex].linkedin || "#";
      // Always show the button - it will be disabled if no LinkedIn URL is provided
      linkedinRef.current.style.display = "inline-flex";
      linkedinRef.current.style.pointerEvents = carouselData[newIndex].linkedin ? "auto" : "none";
      linkedinRef.current.style.opacity = carouselData[newIndex].linkedin ? "1" : "0.5";
    }
    
    // Simple fade for text
    gsap.fromTo([nameRef.current, designationRef.current, quoteRef.current],
      { opacity: 0 },
      { 
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      }
    );
  };

  const next = () => updateCarousel(1);
  const prev = () => updateCarousel(-1);
  
  // Use ref to store the latest next function for interval
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [activeIndex]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;
    
    // Create all image elements
    carouselData.forEach((item, index) => {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.name;
      img.className = "carousel-image";
      container.appendChild(img);
    });

    // Initialize content
    if (nameRef.current && designationRef.current && quoteRef.current && linkedinRef.current) {
      nameRef.current.textContent = carouselData[0].name;
      designationRef.current.textContent = carouselData[0].designation;
      quoteRef.current.textContent = carouselData[0].quote;
      linkedinRef.current.href = carouselData[0].linkedin || "#";
      // Always show the button - it will be disabled if no LinkedIn URL is provided
      linkedinRef.current.style.display = "inline-flex";
      linkedinRef.current.style.pointerEvents = carouselData[0].linkedin ? "auto" : "none";
      linkedinRef.current.style.opacity = carouselData[0].linkedin ? "1" : "0.5";
      // Set initial opacity
      gsap.set([nameRef.current, designationRef.current, quoteRef.current], { opacity: 1 });
    }

    // Initialize positioning after images are created
    setTimeout(() => {
      const images = container.children;
      Array.from(images).forEach((img, index) => {
        const offset = index;
        let zIndex, opacity, scale, translateX, translateY, rotateY;
        
        if (offset === 0) {
          zIndex = 100;
          opacity = 1;
          scale = 1;
          translateX = 0;
          translateY = 0;
          rotateY = 0;
        } else if (offset === 1) {
          zIndex = 50;
          opacity = 0.5;
          scale = 0.8;
          translateX = "30%";
          translateY = "8%";
          rotateY = -15;
        } else {
          zIndex = 50;
          opacity = 0.5;
          scale = 0.8;
          translateX = "-30%";
          translateY = "8%";
          rotateY = 15;
        }

        gsap.set(img, {
          zIndex,
          opacity,
          scale,
          x: translateX,
          y: translateY,
          rotationY: rotateY,
          force3D: true,
        });
      });
    }, 0);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Auto-rotate carousel - loops continuously
  useEffect(() => {
    const interval = setInterval(() => {
      // Force update even if animation is in progress
      if (nextRef.current) {
        nextRef.current();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const updateContent = () => {
      const currentData = carouselData[activeIndex];
      if (nameRef.current && designationRef.current && quoteRef.current && linkedinRef.current) {
        nameRef.current.textContent = currentData.name;
        designationRef.current.textContent = currentData.designation;
        quoteRef.current.textContent = currentData.quote;
        linkedinRef.current.href = currentData.linkedin || "#";
        // Always show the button - it will be disabled if no LinkedIn URL is provided
        linkedinRef.current.style.display = "inline-flex";
        linkedinRef.current.style.pointerEvents = currentData.linkedin ? "auto" : "none";
        linkedinRef.current.style.opacity = currentData.linkedin ? "1" : "0.5";
      }
    };
    updateContent();
  }, [activeIndex]);

  return (
    <div className="circular-carousel-container">
      <div className="circular-carousel-grid">
        <div className="carousel-image-container" ref={imageContainerRef}></div>

        <div className="carousel-content">
          <div>
            <h3 className="carousel-name" ref={nameRef}></h3>
            <p className="carousel-designation" ref={designationRef}></p>
            <p className="carousel-quote" ref={quoteRef}></p>
            <a 
              ref={linkedinRef}
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="carousel-linkedin-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="carousel-arrow-buttons">
            <button className="carousel-arrow-button prev-button" onClick={prev}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button className="carousel-arrow-button next-button" onClick={next}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

