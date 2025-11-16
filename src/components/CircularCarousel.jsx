import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./CircularCarousel.css";

const carouselData = [
  {
    quote:
      "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686",
  },
  {
    quote:
      "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046",
  },
];

export default function CircularCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const imageContainerRef = useRef(null);
  const nameRef = useRef(null);
  const designationRef = useRef(null);
  const quoteRef = useRef(null);

  const updateCarousel = (direction) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const newIndex =
      (activeIndex + direction + carouselData.length) %
      carouselData.length;
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
    if (nameRef.current && designationRef.current && quoteRef.current) {
      nameRef.current.textContent = carouselData[newIndex].name;
      designationRef.current.textContent = carouselData[newIndex].designation;
      quoteRef.current.textContent = carouselData[newIndex].quote;
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
    if (nameRef.current && designationRef.current && quoteRef.current) {
      nameRef.current.textContent = carouselData[0].name;
      designationRef.current.textContent = carouselData[0].designation;
      quoteRef.current.textContent = carouselData[0].quote;
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

    const interval = setInterval(next, 6000);

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    const updateContent = () => {
      const currentData = carouselData[activeIndex];
      if (nameRef.current && designationRef.current && quoteRef.current) {
        nameRef.current.textContent = currentData.name;
        designationRef.current.textContent = currentData.designation;
        quoteRef.current.textContent = currentData.quote;
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

