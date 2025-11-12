import React, { useState, useEffect, useRef } from "react";
import { Boxes } from '../components/ui/BackgroundBoxes';
import TiltedCard from '../components/TiltedCard';
import { cn } from "../lib/utils";
import './Page.css';
import titleimg from '../assets/title-card.jpg';
import isoLogo from '../assets/iso.png';
import msmeLogo from '../assets/MSME-Logo.png';
import startupLogo from '../assets/startup-india.png';
import mcaLogo from '../assets/mca.jpg';
function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([false, false, false, false]);
  const [statsValues, setStatsValues] = useState({ interns: 0, projects: 0, satisfaction: 0, instructors: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const statsSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const autoPlayRef = useRef(null);
  const nextCardRef = useRef(null);
  const prevCardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger the card animations
            setTimeout(() => {
              setVisibleCards([true, false, false, false]);
            }, 100);
            setTimeout(() => {
              setVisibleCards([true, true, false, false]);
            }, 200);
            setTimeout(() => {
              setVisibleCards([true, true, true, false]);
            }, 300);
            setTimeout(() => {
              setVisibleCards([true, true, true, true]);
            }, 400);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Statistics counter animation
  useEffect(() => {
    const animateCounter = (start, end, duration, callback) => {
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        callback(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          callback(end);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate interns (0 to 5000)
            animateCounter(0, 5000, 2000, (value) => {
              setStatsValues(prev => ({ ...prev, interns: value }));
            });
            
            // Animate projects (0 to 9000)
            animateCounter(0, 9000, 2000, (value) => {
              setStatsValues(prev => ({ ...prev, projects: value }));
            });
            
            // Animate satisfaction (0 to 93)
            animateCounter(0, 93, 2000, (value) => {
              setStatsValues(prev => ({ ...prev, satisfaction: value }));
            });
            
            // Animate instructors (0 to 30)
            animateCounter(0, 30, 2000, (value) => {
              setStatsValues(prev => ({ ...prev, instructors: value }));
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (statsSectionRef.current) {
        observer.unobserve(statsSectionRef.current);
      }
    };
  }, [hasAnimated]);

  // Who We Are Carousel
  const whoWeAreCards = [
    {
      title: "About INLIGHN TECH",
      content: "At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.",
      iconBg: "#14b8a6",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="14" x2="12" y2="18"></line>
          <line x1="8" y1="14" x2="8" y2="18"></line>
          <line x1="16" y1="14" x2="16" y2="18"></line>
          <circle cx="12" cy="10" r="2"></circle>
        </svg>
      )
    },
    {
      title: "Our Mission",
      content: "To empower students and young professionals by providing immersive, real-world learning experiences through tailored internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed in the fast-evolving tech industry.",
      iconBg: "#ff6b35",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: "Our Vision",
      content: "To empower students and young professionals by providing immersive, real-world learning experiences through tailored internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed in the fast-evolving tech industry.",
      iconBg: "#14b8a6",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )
    },
    {
      title: "What's Different from Others",
      content: "We stand out by offering real-world projects, expert mentorship, certified programs, and flexible learning paths. Our immersive approach ensures that every participant gains hands-on experience with industry-standard tools and practices, making them job-ready from day one.",
      iconBg: "#ff6b35",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  const totalCards = whoWeAreCards.length;

  const nextCard = () => {
    if (isTransitioning) return;
    // Pause auto-play temporarily
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsTransitioning(true);
    // Infinite loop - wrap around
    setCurrentCardIndex((prev) => {
      const next = prev + 1;
      return next >= totalCards ? 0 : next;
    });
    setTimeout(() => {
      setIsTransitioning(false);
      // Resume auto-play
      autoPlayRef.current = setInterval(() => {
        setCurrentCardIndex((prev) => {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 500);
          return (prev + 1) % totalCards;
        });
      }, 5000);
    }, 500);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    // Pause auto-play temporarily
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsTransitioning(true);
    // Infinite loop - wrap around
    setCurrentCardIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? totalCards - 1 : next;
    });
    setTimeout(() => {
      setIsTransitioning(false);
      // Resume auto-play
      autoPlayRef.current = setInterval(() => {
        setCurrentCardIndex((prev) => {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 500);
          return (prev + 1) % totalCards;
        });
      }, 5000);
    }, 500);
  };

  // Store functions in refs for use in event handlers
  useEffect(() => {
    nextCardRef.current = nextCard;
    prevCardRef.current = prevCard;
  }, [isTransitioning, totalCards]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && nextCardRef.current) {
      nextCardRef.current();
    } else if (isRightSwipe && prevCardRef.current) {
      prevCardRef.current();
    }
  };

  // Add mouse event listeners for drag
  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    if (!wrapper) return;

    let startX = null;
    let currentX = null;
    let isDraggingLocal = false;

    const handleMouseDown = (e) => {
      isDraggingLocal = true;
      setIsDragging(true);
      startX = e.clientX;
      currentX = null;
    };

    const handleMouseMove = (e) => {
      if (!isDraggingLocal) return;
      currentX = e.clientX;
      setDragEnd(e.clientX);
    };

    const handleMouseUp = () => {
      if (!isDraggingLocal) return;
      
      if (startX !== null && currentX !== null) {
        const distance = startX - currentX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && nextCardRef.current) {
          nextCardRef.current();
        } else if (isRightSwipe && prevCardRef.current) {
          prevCardRef.current();
        }
      }
      
      isDraggingLocal = false;
      setIsDragging(false);
      startX = null;
      currentX = null;
      setDragStart(null);
      setDragEnd(null);
    };

    wrapper.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      wrapper.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Auto-play carousel with infinite loop
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentCardIndex((prev) => {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 500);
        // Infinite loop
        return (prev + 1) % totalCards;
      });
    }, 5000); // Change card every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [totalCards]);

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-overlay" />
        <Boxes />
        <div className="home-content-wrapper">
          <div className="home-content">
            <h1 className={cn("home-title")}>
              Transform Your Career with
            </h1>
            <h2 className={cn("home-company-name")}>
              InLighnX
            </h2>
            <h2 className={cn("home-company-name")}>
              Global Private
            </h2>
            <h2 className={cn("home-company-name")}>
              Limited
            </h2>
            <p className="home-description">
              Gain real-world experience with our immersive internship programs in Cyber Security, Full Stack Development, Data Science, Data Analyst and in various tech domains. Learn today, lead tomorrow.
            </p>
            <button className="home-cta-button">Explore Internships</button>
          </div>
          <div className="home-tilted-card-wrapper">
            <TiltedCard
              imageSrc={titleimg}
              altText="E-Learning for Career Growth"
              captionText="Empower Your Career with InlighnX Global"
              containerHeight="450px"
              containerWidth="350px"
              imageHeight="450px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text text-white text-center font-semibold">
                  "Learn. Grow. Succeed — Build your Career with InlighnX Global"
                </p>
              }
            />
          </div>
        </div>
      </div>
      
      <div className="page-content">
        <div 
          ref={sectionRef}
          className={`certifications-section ${isVisible ? 'fade-in-up' : ''}`}
        >
          <h2 className={`certifications-title ${isVisible ? 'fade-in-up' : ''}`}>
            Our Certifications & Recognitions
          </h2>
          <p className={`certifications-subtitle ${isVisible ? 'fade-in-up' : ''}`}>
            Trusted and recognized by leading organizations
          </p>
          <div className="certifications-grid">
            <div 
              ref={(el) => (cardRefs.current[0] = el)}
              className={`certification-card slide-from-left ${visibleCards[0] ? 'fade-in-slide' : ''}`}
              style={{ transitionDelay: visibleCards[0] ? '0.1s' : '0s' }}
            >
              <div className="certification-logo-wrapper">
                <img 
                  src={isoLogo} 
                  alt="ISO Certification" 
                  className="certification-logo"
                />
              </div>
              <h3 className="certification-name">ISO Certified</h3>
            </div>
            <div 
              ref={(el) => (cardRefs.current[1] = el)}
              className={`certification-card slide-from-left ${visibleCards[1] ? 'fade-in-slide' : ''}`}
              style={{ transitionDelay: visibleCards[1] ? '0.2s' : '0s' }}
            >
              <div className="certification-logo-wrapper">
                <img 
                  src={msmeLogo} 
                  alt="MSME Certification" 
                  className="certification-logo"
                />
              </div>
              <h3 className="certification-name">MSME Registered</h3>
            </div>
            <div 
              ref={(el) => (cardRefs.current[2] = el)}
              className={`certification-card slide-from-right ${visibleCards[2] ? 'fade-in-slide' : ''}`}
              style={{ transitionDelay: visibleCards[2] ? '0.3s' : '0s' }}
            >
              <div className="certification-logo-wrapper">
                <img 
                  src={startupLogo} 
                  alt="Startup India Certification" 
                  className="certification-logo"
                />
              </div>
              <h3 className="certification-name">Startup India</h3>
            </div>
            <div 
              ref={(el) => (cardRefs.current[3] = el)}
              className={`certification-card slide-from-right ${visibleCards[3] ? 'fade-in-slide' : ''}`}
              style={{ transitionDelay: visibleCards[3] ? '0.4s' : '0s' }}
            >
              <div className="certification-logo-wrapper">
                <img 
                  src={mcaLogo} 
                  alt="Ministry of Corporate Affairs" 
                  className="certification-logo"
                />
              </div>
              <h3 className="certification-name">Ministry of Corporate Affairs</h3>
            </div>
          </div>
        </div>
        <div className="internship-section">
          <div className="internship-image-wrapper">
            <img 
              src={titleimg} 
              alt="Best Internship Programs" 
              className="internship-image"
            />
          </div>
          <div className="internship-content">
            <h2 className="internship-title">We Provide Best Internship For You</h2>
            <p className="internship-description">
              At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.
            </p>
            <button className="internship-know-more-button">Know More</button>
          </div>
        </div>
        
        <div className="features-section">
          <div className="features-cards-wrapper">
            <div className="feature-card">
              <h3 className="feature-card-title">Real-World Projects</h3>
              <p className="feature-card-description">
                Gain hands-on experience with real industry projects and build a portfolio that stands out.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-card-title">Expert Mentorship</h3>
              <p className="feature-card-description">
                Learn from seasoned professionals who guide you through every step of your journey.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-card-title">Certified Programs</h3>
              <p className="feature-card-description">
                Complete the programs and get certified in your field to showcase your skills
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-card-title">Flexible Learning</h3>
              <p className="feature-card-description">
                Do at your own pace with online programs designed to fit your schedule.
              </p>
            </div>
          </div>
          <div className="features-image-wrapper">
            <img 
              src={titleimg} 
              alt="Features" 
              className="features-image"
            />
          </div>
        </div>
        
        <div ref={statsSectionRef} className="statistics-section">
          <div className="statistics-banner">
            <Boxes />
            <div className="statistics-cards-container">
              <div className="statistics-card">
                <div className="statistics-number">{statsValues.interns.toLocaleString()}+</div>
                <div className="statistics-label">INTERNS ENROLLED</div>
              </div>
              <div className="statistics-card">
                <div className="statistics-number">{statsValues.projects.toLocaleString()}+</div>
                <div className="statistics-label">PROJECTS COMPLETED</div>
              </div>
              <div className="statistics-card">
                <div className="statistics-number">{statsValues.satisfaction}%</div>
                <div className="statistics-label">SATISFACTION RATE</div>
              </div>
              <div className="statistics-card">
                <div className="statistics-number">{statsValues.instructors}+</div>
                <div className="statistics-label">TOP INSTRUCTORS</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="who-we-are-section">
          <h2 className="who-we-are-title">Who We Are</h2>
          <div className="carousel-container" ref={carouselRef}>
            <div 
              className="carousel-wrapper"
              ref={carouselWrapperRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div 
                className="carousel-track"
                style={{
                  transform: isMobile
                    ? `translateX(-${currentCardIndex * 100}%)`
                    : `translateX(-${currentCardIndex * (100 / 3)}%)`,
                  transition: isTransitioning && !isDragging ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
              >
                {/* Duplicate cards for seamless loop */}
                {[...whoWeAreCards, ...whoWeAreCards, ...whoWeAreCards].map((card, index) => (
                  <div key={index} className="who-we-are-card">
                    <div 
                      className="card-icon-wrapper"
                      style={{ backgroundColor: card.iconBg }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-content">{card.content}</p>
                    <button className="card-button">
                      <span>Learn More</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="carousel-indicators">
            {whoWeAreCards.map((_, index) => {
              // Check if this card is currently visible (within the 3-card view)
              const isVisible = index >= currentCardIndex && index < currentCardIndex + 3;
              return (
                <button
                  key={index}
                  className={`carousel-indicator ${isVisible ? 'active' : ''}`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      // Show the clicked card as the leftmost card, but constrain to valid positions
                      const targetIndex = Math.min(index, totalCards - 3);
                      setCurrentCardIndex(Math.max(0, targetIndex));
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  aria-label={`Go to card ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
