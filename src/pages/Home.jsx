import React, { useState, useEffect, useRef } from "react";
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
  const animationTimeoutsRef = useRef([]);
  const parallaxImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any existing timeouts
            animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
            animationTimeoutsRef.current = [];
            
            // Reset first
            setVisibleCards([false, false, false, false]);
            setIsVisible(false);
            
            // Force a reflow to ensure reset is processed
            if (cardRefs.current[0]) {
              cardRefs.current[0].offsetHeight;
            }
            
            // Small delay to ensure browser processes the reset before starting animation
            const resetTimeout = setTimeout(() => {
              setIsVisible(true);
              // Stagger the card animations with better timing for smoother effect
              const timeout1 = setTimeout(() => {
                setVisibleCards([true, false, false, false]);
              }, 200);
              const timeout2 = setTimeout(() => {
                setVisibleCards([true, true, false, false]);
              }, 400);
              const timeout3 = setTimeout(() => {
                setVisibleCards([true, true, true, false]);
              }, 600);
              const timeout4 = setTimeout(() => {
                setVisibleCards([true, true, true, true]);
              }, 800);
              
              animationTimeoutsRef.current = [timeout1, timeout2, timeout3, timeout4];
            }, 100);
            
            animationTimeoutsRef.current.push(resetTimeout);
          } else {
            // Clear timeouts when section leaves viewport
            animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
            animationTimeoutsRef.current = [];
            // Reset when section leaves viewport
            setIsVisible(false);
            setVisibleCards([false, false, false, false]);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Cleanup timeouts on unmount
      animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
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
      image: titleimg, // Add your custom image here
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
      image: titleimg, // Add your custom image here
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
      image: titleimg, // Add your custom image here
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
      image: titleimg, // Add your custom image here
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

  // Parallax effect for background image
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = parallaxImageRef.current;
      if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <div className="home-background">
        <div 
          ref={parallaxImageRef}
          className="home-background-image"
          style={{ backgroundImage: `url(${titleimg})` }}
        />
        <div className="home-overlay" />
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
          {/* Left Wavy Background */}
          <div className="certifications-wave certifications-wave-left">
            <svg viewBox="0 0 200 600" preserveAspectRatio="none" className="wave-svg">
              <defs>
                <linearGradient id="waveGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M0,0 Q30,80 0,160 T0,320 T0,480 T0,600" fill="url(#waveGradientLeft)" opacity="0.12"/>
              <path d="M0,40 Q50,120 0,200 T0,360 T0,520 T0,600" fill="url(#waveGradientLeft)" opacity="0.18"/>
              <path d="M0,80 Q40,160 0,240 T0,400 T0,560 T0,600" fill="url(#waveGradientLeft)" opacity="0.1"/>
            </svg>
          </div>
          
          {/* Right Wavy Background */}
          <div className="certifications-wave certifications-wave-right">
            <svg viewBox="0 0 200 600" preserveAspectRatio="none" className="wave-svg">
              <defs>
                <linearGradient id="waveGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b35" stopOpacity="1" />
                  <stop offset="100%" stopColor="#e55a2b" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M200,0 Q170,80 200,160 T200,320 T200,480 T200,600" fill="url(#waveGradientRight)" opacity="0.12"/>
              <path d="M200,40 Q150,120 200,200 T200,360 T200,520 T200,600" fill="url(#waveGradientRight)" opacity="0.18"/>
              <path d="M200,80 Q160,160 200,240 T200,400 T200,560 T200,600" fill="url(#waveGradientRight)" opacity="0.1"/>
            </svg>
          </div>
          
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
              style={{ transitionDelay: visibleCards[0] ? '0s' : '0s' }}
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
              style={{ transitionDelay: visibleCards[2] ? '0.4s' : '0s' }}
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
              style={{ transitionDelay: visibleCards[3] ? '0.6s' : '0s' }}
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
            <div className="floating-cards-container">
              {/* Top Center - Assignment Complete Notification */}
              <div className="floating-card floating-card-top">
                <div className="floating-card-icon" style={{ backgroundColor: '#10b981' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="floating-card-content">
                  <h4 className="floating-card-title">Daily Tasks</h4>
                  <p className="floating-card-subtitle">Activity Deadline</p>
                </div>
                <div className="floating-card-dots">
                  <span className="mini-dot mini-dot-red"></span>
                  <span className="mini-dot mini-dot-yellow"></span>
                  <span className="mini-dot mini-dot-green"></span>
                  <span className="mini-dot mini-dot-orange"></span>
                </div>
              </div>

              {/* Mid Left - Code Window */}
              <div className="floating-card floating-card-code">
                <div className="code-window-header">
                  <div className="code-window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                </div>
                <div className="code-window-content">
                  <div className="code-line">
                    <span className="code-keyword">const</span>
                    <span className="code-text">InlighnXglobal</span>
                    <span className="code-operator"> = </span>
                    <span className="code-text">()</span>
                    <span className="code-operator"> =&gt; </span>
                    <span className="code-text">{'{'}</span>
                  </div>
                  <div className="code-line">
                    <span className="code-keyword">  return</span>
                    <span className="code-string"> 'success'</span>
                    <span className="code-text">;</span>
                  </div>
                  <div className="code-line">
                    <span className="code-text">{'}'}</span>
                  </div>
                </div>
              </div>

              {/* Mid Right - Streak Widget */}
              <div className="floating-card floating-card-streak">
                <div className="streak-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#f97316" opacity="0.8"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="floating-card-title">Daily Sessions</h4>
              </div>

              {/* Bottom Right - New Mentor Notification */}
              <div className="floating-card floating-card-mentor">
                <div className="floating-card-icon" style={{ backgroundColor: '#10b981' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="floating-card-content">
                  <h4 className="floating-card-title">Mentor Support</h4>
                  <p className="floating-card-subtitle">Our Mentors are here to help you with your doubts and queries</p>
                </div>
              </div>

              {/* Main Dashboard Card - Center Right */}
              <div className="floating-card floating-card-dashboard">
                <h3 className="dashboard-title">Internship Completion Benefits</h3>
                
                {/* Progress Circles */}
                <div className="progress-circles">
                  <div className="progress-circle">
                    <svg className="progress-ring" width="100" height="100">
                      <circle className="progress-ring-bg" cx="50" cy="50" r="40" />
                      <circle className="progress-ring-fill" cx="50" cy="50" r="40" style={{ strokeDasharray: '251.2', strokeDashoffset: '0' }} />
                    </svg>
                    <div className="progress-text">
                      <span className="progress-percent">100%</span>
                      <span className="progress-label">Success</span>
                    </div>
                  </div>
                  <div className="progress-circle">
                    <svg className="progress-ring" width="100" height="100">
                      <circle className="progress-ring-bg" cx="50" cy="50" r="40" />
                      <circle className="progress-ring-fill" cx="50" cy="50" r="40" style={{ strokeDasharray: '251.2', strokeDashoffset: '25.12' }} />
                    </svg>
                    <div className="progress-text">
                      <span className="progress-percent">95%</span>
                      <span className="progress-label">Confidence</span>
                    </div>
                  </div>
                </div>

                {/* Completion Checklist */}
                <div className="completion-checklist">
                  <div className="checklist-item">
                    <div className="check-icon">✓</div>
                    <span className="checklist-text">Certificate</span>
                    <div className="checklist-progress">
                      <div className="checklist-progress-bar" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <div className="check-icon">✓</div>
                    <span className="checklist-text">Job Placement</span>
                    <div className="checklist-progress">
                      <div className="checklist-progress-bar" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <div className="check-icon">✓</div>
                    <span className="checklist-text">Real-World Project</span>
                    <div className="checklist-progress">
                      <div className="checklist-progress-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <div className="check-icon">✓</div>
                    <span className="checklist-text">LOR (Performance-based)</span>
                    <div className="checklist-progress">
                      <div className="checklist-progress-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      className="card-background-image"
                      style={{ backgroundImage: `url(${card.image})` }}
                    ></div>
                    <div className="card-content-wrapper">
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

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h1 className="testimonials-title">What Our Interns Say</h1>
          <div className="testimonials-marquee-container">
            <div className="testimonials-marquee">
              {/* First set of testimonials */}
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    DP
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">David Park</h4>
                  <p className="testimonial-handle">@davidtech</p>
                  <p className="testimonial-text">API integration is flawless. We've reduced our development time by 60% since implementing this solution.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    SR
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Sofia Rodriguez</h4>
                  <p className="testimonial-handle">@sofiaml</p>
                  <p className="testimonial-text">Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    ET
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Emma Thompson</h4>
                  <p className="testimonial-handle">@emmaai</p>
                  <p className="testimonial-text">Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                    MJ
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Michael Johnson</h4>
                  <p className="testimonial-handle">@mikecode</p>
                  <p className="testimonial-text">The reduced development time since implementing this solution has been remarkable. Highly recommended!</p>
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    DP
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">David Park</h4>
                  <p className="testimonial-handle">@davidtech</p>
                  <p className="testimonial-text">API integration is flawless. We've reduced our development time by 60% since implementing this solution.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    SR
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Sofia Rodriguez</h4>
                  <p className="testimonial-handle">@sofiaml</p>
                  <p className="testimonial-text">Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    ET
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Emma Thompson</h4>
                  <p className="testimonial-handle">@emmaai</p>
                  <p className="testimonial-text">Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                    MJ
                  </div>
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Michael Johnson</h4>
                  <p className="testimonial-handle">@mikecode</p>
                  <p className="testimonial-text">The reduced development time since implementing this solution has been remarkable. Highly recommended!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
