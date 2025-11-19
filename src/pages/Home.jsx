import React, { useState, useEffect, useRef } from "react";
import TiltedCard from '../components/TiltedCard';
import CircularCarousel from '../components/CircularCarousel';
import LightRays from '../components/LightRays';
import { cn } from "../lib/utils";
import './Page.css';
import titleimg from '../assets/title-card.jpg';
import isoLogo from '../assets/iso.png';
import msmeLogo from '../assets/MSME-Logo.png';
import startupLogo from '../assets/startup-india.png';
import mcaLogo from '../assets/mca.jpg';
import bannerimg from '../assets/banner-bg.jpg';
import mentorimg from '../assets/Mentorship.jpg';
import whoBg from '../assets/who-bg.jpg';
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
          style={{ backgroundImage: `url(${bannerimg})` }}
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
                <p className="tilted-card-demo-text text-dark text-center font-semibold">
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
              src={mentorimg} 
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
        
        <div className="who-we-are-section" style={{ ['--who-bg-image']: `url(${whoBg})` }}>
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
        <div className="testimonials-section" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>
          <div style={{ position: 'relative', zIndex: 4 }}>
            <h1 className="testimonials-title">What Our Interns Say</h1>
            <div className="testimonials-marquee-container">
            <div className="testimonials-marquee">
              {/* First set of testimonials */}
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="" alt="David Park" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">David Park</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    davidpark
                  </p>
                  <p className="testimonial-text">The e-learning platform is incredible! The interactive courses and real-world projects helped me land my dream job. Highly recommend!</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmwlMjBwcm9maWxlfGVufDB8fDB8fHww" alt="Sofia Rodriguez" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Sofia Rodriguez</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    sofiarodriguez
                  </p>
                  <p className="testimonial-text">Amazing learning experience! The instructors are knowledgeable and the course materials are comprehensive. I've gained so much practical knowledge.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmwlMjBwcm9maWxlfGVufDB8fDB8fHww" alt="Emma Thompson" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Emma Thompson</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    emmathompson
                  </p>
                  <p className="testimonial-text">Best online learning platform I've used! The flexible schedule and hands-on projects made it perfect for balancing work and learning.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww" alt="Michael Johnson" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Michael Johnson</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    michaeljohnson
                  </p>
                  <p className="testimonial-text">The mentorship program is outstanding! My mentor guided me through every step and helped me build a strong portfolio. Thank you!</p>
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="https://img.freepik.com/free-photo/vertical-shot-male-wearing-suit-tie-standing-classroom_181624-14287.jpg?semt=ais_hybrid&w=740&q=80" alt="David Park" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">David Park</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    davidpark
                  </p>
                  <p className="testimonial-text">The e-learning platform is incredible! The interactive courses and real-world projects helped me land my dream job. Highly recommend!</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="data:image/jpeg;base64,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" alt="Sofia Rodriguez" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Sofia Rodriguez</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    sofiarodriguez
                  </p>
                  <p className="testimonial-text">Amazing learning experience! The instructors are knowledgeable and the course materials are comprehensive. I've gained so much practical knowledge.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUQEhIVFhUVFhUVFRYQFRYVFRUVFRcXFxcXGBUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHyUtLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0rLS0rLS0tLS0tLS0tLSstLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBgMFAAECBwj/xABBEAACAQIEAwQGBwYFBQEAAAABAgADEQQFEiEGMUEiUWFxE4GRobHBByMyQmJy0RQzUnOC8CSStOHxFSU0Q6Jk/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQIAAwQFBv/EACoRAAICAQQBAgUFAQAAAAAAAAABAhEhAwQSMSJBcTIzgcHRBRNCUWEj/9oADAMBAAIRAxEAPwCtWnJRTkqpJAk89Z6JRI0STIk6VJMqRWxkjlEkypNqkmRYtjJGkSTKk2qyZVi2NRyqSRUnarJAkFhIwk6CSULOtMlkF/jJf8DiP5bfKR4WmP2miP8A8+C92HWEcbi2AxP8s/ETnBp/iqY7qGD/ANMk62w+VL3/AAcb9Q+bH2+7GTilrURtfccojYyqrWAB+0OcfOKB9WvmIkMlyPzj4y2byVQWBs4hUDCW6WWecYykhJtbmJ6XxEP8Pb8s89qpd/6h8ZG8gQ5Z1TAwJHTQBPN8ZhVB7O3LkZ6bxGD+yW8FEQKuFGpSP4gPfGFPScrpaaKD8IndZdoVQp2RR4CRVVHWOIeXZtmOMWtUCV3VQxsNiBMkvFQw7VScP6RRvr9IQbtfcjuEyRALlUnYSdqs6tOEeio5VZKqzSiSqIApG1WTKs5USZBAMdIsmRZwohCLAwmKskCzaidgRSM0Fm9M6AnVpBbF3jsf9vxP8s/ETvBr/i1/l4X/AE1OZx8P+34n+WfiIdlWEL4lmBACU8Jz8cNTnY2Hype/2Rxv1B/9Y+33ZbcTIPRr5xRbDAMni4jxm+DaqqhCNjfcymq5LW1odIsrAneWyi2yqDwFcSUfqR6ok18uZWRtLAM43INjv3z0TNNekFFuQQbHcbSjzfEY6sUDp2AynSqgDb3wyTsEWS8SUbYe35Yjmj2qY73EeuJtbUgFUk3F7CKODwFX0qala2u+4NhCA9BVeyB4CQYleyfIw3TtA8wH1b/lPwjiHjlUszOTv2j8ZkOr4MJTDB1Yv2iF5qb8iJqSPRGNemaKybTNETz6Z6SiICSqJoCdrCQ7USVROFkiyEJUEIQSBITTihOwJ2BMUSQCQrbNATdp0BAs0zWhh11VXC9w5sfIQpXhCNlV9IA/7dif5fzEvuFqYNXEXH/rwf8ApkiTnfEuHxlGrhF1L6RdOoi9t73IW9uUduF8RT11X1CzrQC72/d0lpnbpus6+zThBxljP4OVvPOacc4GP0C900cOslLCZqHfNVIzWwdsKvj7ZE2G7ifbC3tI7iSiWBvhPxGQnDno3ulkyzj0YkolgoXa0Hrg2IHvhdRZARe8BChrZd+FP8syXLUbzJKZLQsWnDCTWkbieeTPTMhnYmrTYhFJFkimQgyRTIEJpmE04GhhdEwEYSslUSNJKJEUyKjijPUwdA1W3Y9mmv8AE36DmZ4nj83q16pqVGLMx3J6DwHQeEuPpLzk1sWyA9ij9WO7UP3h9u3qixltIu23NjYTr7XRUY8n2zmbnVcpcUMGWCo+yKT4LzPmY1YejmCDsUQB17RY+zvltwrl6U6aqByG/eT1MdMNSBHKWN2RaSSyUWAxdWpSprW1A96m3qNpmH1CvTCu9i24LEiV/FmrDOjg/Vu1iO5vCGZcwNekR3/KVsKVWhqz6kWVR6QpvzBtFdUqJiKSiuzBjuCby64ucBV1d/yixk7KcXTI8ZZNq6KoJ8bGfP8A0ll0VjT8rb+2L+WZhiRi0otXLqQSdh8oZx3VA0XHeYt8F9rGA2+6ZYlbKW6R6Y5lPxDWqJQdqbBWtsT0lwwi3xv/AOK9upA94lhUIuP4nzGkVtVRr3+7/vMg7YHtUxvvfn5GakbCoj0RI3EnIkNSeaR6lg5M1qnLGc3jiEgaSK0gvOg0AQpGhlBpWo0NwzRWEsqc5x+JFOm9U8kRnP8ASLzdMyl49r6MvxB700f5yF+ceC5NIzzxbPCcTULsWPM7nzJJMs8nqJTYF6no7fetqseZ29kr0Tc37/gLxw4TyOjXTVUF2ubdRY+BnetJHHjFylgY8qzkJVp0vSLU9IQFZBb1EdDuIy8R52mGqJTauaerlpXUTfbuJ9giFW00sXT0i5plb7dBsPdynqGOyuhWKVHUahYqTa/f15yt1ZpSdC7x3aplj1kqmroembkLcEOFYbAWO5BB5SbhrerRPeAf/kSz40oouW4hbDdV5C1yXUQbhfL6l6NQKdIUb+oRZLoS6u/6LHjg9lfXF/hdf8UnkYycW0GqBQqk2ve0p8ky6rTrLUZCFta8jXnYqfgcfSO9jT8m+Uqvo+S+KJ7k+cu+MssrV2UopYBT8pFwXk9ajWZqiaQVAE0pGSTHKpF/jBL0Ao6svxjC6yl4kouyKEUsQ1yBCKhLaj9fTW/RvgZks8Jl9VsQtRkIAVhvbqJuKxywIkFWEGQVZ5xHp2AvOCZuoZCxjlbJNU1rkRacF5CWFLUh2FeU6vDsJUiNDJjBRaLf0mPbAsP4npj/AOgflL/DtFH6VsQBhqadWqg+pQb/ABEs2+dSK/0o18Rb/wAPK6YuW87R44JxGgPtfQpYgdwiZgluf6j7rfpLvJMyFGpU8VKnyYbTtyyjk6cuMrLDLa4xOINVhUIdgT6FC32dwAe6elY7FKtEBlrIzECmXVrF1UkADpspv05xC4YwdRKgqUq5ph9wF3Bvz2vznp+CwhtrrVGdtNrudlHWwvtfviySNUMK2UPHWLb/AKdY7Gq1BLHnu6sR7FPsjVwZZsHSN+jKf6WI+U8q424jTF4mnRom9DD6n1DlUqBSLjvUC4B63PhPTPo+rD9m0E8mPvAb5wxw0mZdV8raL98MsibDLJq9RV5m3nIqeIRuTA+RllIpt0RtQEiFHfmYXUrUxzYDzM4WvTb7LA+Rj0VNkbyGtTvJ3gmIx1Knb0jhb95tIyIiqYceMydUszoVDpR1Y9wN5uCkNZRGD1oSYLXnmkeoZW1TvIGMkqmDu0tRUzGeQvUnLvB3qRqEbCUqQ/CPvKZakPwjxJIaLGfCvtPL/pLzT0uJ9EDdaQ0/1Gxb5D1R0zPPaeGos5YagOyt92boLec8fxdYuxdjcsSST1JNyfjNWx0ny5szb7VSjxQXlo7Vu8n4TvHUiH1DuHxIkeUm7ev5H9IfmA5N5idNfEcx9DdwRQc6WFiLHZvu3529kM49zlvRfsiObbekKnb8l+vefV3xIy/Nqq6aNN9JchdV+V5bZzQC0wvja53JO+onxMK082wy1fHiiqyuj9W72+6QPWQJ6n9H9UMU33AsR6hb3RFynDJpNMm1rE+0WEacjtSdSjBWFu2b2PgV69fbK2rYU6Q4cU4imrDWehlXwmytiGK8gsm4hwrYkKyFeRvc6RfwvIuD8vq0qra1ttsQQwPrBMN3IDSUQTjLFItYhgSdI5euZ9G6A+mfvO14PxdR1Yhr/wAI+cs/o/p2Sp+aX+hjryY1NPM/pXq2eiPBj8J6Y080+k6jrq0x3KfiJBwP6MFvUqP4WmQr6NE0moLdBMgaySxkMFxEKaCYieaR6plTXMEqNCMQd4FVaXpFEmQ1Xgr1Jus8GZ5akVNhKPA89zI00CKbM3Mjoo/X9ZMjRWzavqqv4Gw8ht8pdt9JSnn0KNfU4wx6geMxJY7knzgjt8fgP1vNk73mqosbd39mdOjm2H5M3aXxcD4/rLPMN0U+BPnbn7vhKvKF7S/zB85ZZhslBumrSfJgV+cT+Y1+J1kfDv7Sj1jUZAjaQFFySAG2PTnGfN6Q0DqR2vI25zngyn/hFP8AG9Qn1HSPhJs0/d2vzIT1Kb++3vmisUUXkpcqr3codtQt477g+2T1sU1M9l6gHdqYfCVeKUqQVO429UMrVFq6b7PbcHqf1lfFJ5H5NovMFm/3mv07X2j/ALx0ybGP2ahN97nTy8rdNp5zg6RNNb9XAN/w7/pG3K8QQwHIabWPMgdSJckVtlvxDZqxPlLDgpbU3P4jCMJl9Gqq1GUkkW5920tMFhadIaUWwO8qqsArNm3M82+kFz6cAdE+c9LqCU+MwQdtRRSe8yXQRX+j2kdNRz3gTIyUaBQEKAL90yBsNAJgmJhRMExE8yj1TKTEneAVmhmLO8razTVFGaTBcQ8G1TrENIby6ihsJRon1GJ1N5k+sxrU7RUVbKx8h8Zq2q7+hk3T6+oI3MSWunbPmfjOdH2fK8KqJuT4MfdNbZkSwTZKm6/nH9+6WGbJfCjwufY85yGiAEJ/jHxI+UsM0pf4Yg/w1T75S35lteAx8MJbCUPGmGPmxLH4wHPaliF7t/bt8jLnDUwlFV/hpqPYsV8XUL1PO4H9Iv8AAGbjIQCjftGd0aAqPewsF6+QnTD7IvtY+2XnD+HCryN97beJtuYGshsCp9jTTvqbSWp6j/EbHUettPXvlnw9VDKzkm7MRqP3gtrkDuvtFfiwO+Ip0E5sg1W6Xdj+scMuZShN76RoJ/EBv77eu8iVMDdj/wANi9Kw6MfgDLYpaI2Ez16FLs6d7t2vK0v+GszqYil6Spa5J+zytEl2RFpUMhZZIxiJxDm7rVdQz7D7vLlECObIJkVeDcRUfDF3csSx3buvNyWiExMFxBk5aC4gzzKPVsosadzKuu0sMc25lTWabIIxzYLWO8jBm6pkYMuKSdTFV2NipHX3iNCGK1Te563v7Zq2nbMu76RlPdQe7b3S1rYW3+U+0k/rKrCONwfP5fOXuHq6kUnnq0/If34S6eGUQygihT9HQQ9b39QufibSXiCsPRhR94afWXAPw983jB2SL7C9vIaTKXNSS6fmQ/5t/wBZIQumCU6tD5nmL0qFHM93laUFGndhvyJJ9hHzh3FNOzK48j6iSJW4KuNVj3TYZg6jS3sP72jHhKQVfdK/K6Haue75S0xFQIl78gT7BIQQswx2nE18R94WopffkNz7bxjwNM0MIAT2mAJv3vv7YlZPROIrhehdqj+WosY5isK9ZV5KrXt32+EiAWGLpjSi9yR04LFsKvrifmq9eoUfOOnCQthU8pVPsZFs5ixnVFdNRrdD8IyVGivn2KQU6g1C9jtFBI44RW2EXxJ+Myd5CQmDpk8rD3mZAMRFoJiWkpeB4l55qPZ6qTKXHNuZVVWh+NbeVlUzdBYMU3kgqmcAzKhnIMtKSemYsA7mMqRcpoD1ud9us07VZZm3TwgetcGWGFxPZCfxFLed/wBCYDivEWguFrFX1c7EWv4TXKNmOMqHMvcFe4sPYFlbnw0sp/Cjf5W/SRZTjWesAeTFveL/ACnXFL37PcLe6FRwRvI6cQbqD/fIRZy4aqth0jLmrA0UbvRTfzUeyUvClHW7MeVzvLCsaMGpUavZfzgXFWMKYaq17HSQL+O3zlux2AHf/v8AKKPH1VdCUr/acX7gBvCQG4XpChhjVP7yqLDwXp+ss+FmLViR0UlreoAD3mL9Gs9QBAQRyA6x74bwK0qQUEFibt33/wCJADEvDgrKKjVdII5Ad20Zcsw606a01Nwotec5TTBopt0PxMK02Eqk8jJENSUFfLqNyxo6ix3vvL55AwiZCAstk0BAFHSZCqqgC5MySmHApM8DxLzsvAsTUnnYo9LJ4K3GNvKyo0NxTbyuqNNsEY5siqGaBnDNNqZaVWEUzF6nhwSXW9tRtt498v6ZlRRQCq62UAMdzyHlfrNG1+JmfdfCgfHIQN7/ANXyMqQd49HBCqoBFwRsbge4RPxmFNOqUYW3m5mEt8mo6PrG527Pr6wTMahYk98uKRDIAeYFr+AErGoXe3jA8IPbGzFVScBTPUU0B9QsfhCeCsL9Rq/iY+wQFWLYFlG5XUtv6r/BhDOFMYAnowfsxkBjBUp25ePwiFx5e9M3tcn3R1xeJCqTeec8Q1DXrDqAD18Yz6FCsixVJST9k7dodLR/y2utRRurfiQj4dIh5VlNS47A7xvp9hF9/VG/C4AKpe3aK7G661J+ydSj3mREY6jiH0FBbi5Ud9r7ky5y/GmrSWoRbUL27oo5vlaphtTi9TSNR/Fbf3xiyU2oU/yiUyDEKxL2UnwM8qzTPsV2vrGHaIFttrz0/FvZW8jPKszIZTbq3zioYZs8xTLgVbUbnRc335jrMnedoP2VFP4ZuBOg1ZVPVgdd5tqkDr1Jw4xO/KQLiXlfVeT4h4BVea4oyyZhadK0H1TtWljRWmGUjAMUlqh8d/79kKpPIMzb7JBF9737v+YdF1MGqrgXGVvewtt18JV8Z4cKadQAc7Hx6yxyvECwW4va56QriPAiphyLC67g91jvv5XnSXRzn2U6ISgIP3RseXKZhsC7HUuwBF9uYvuINVxWkLTQamICqB1J2t6569S4bp0sKFI7aoAT31DzPtMWbxQYLJ5rh8eKK1QwuDpIA/EQp95SC5diTSxHIgMAQPDuhWaUglU7alFwR/Ep2I9kr+IKYslWkbgAWI/hhg8AmsljnmbfdXny9ZgGFwmmzG56kje/jOsFhzVtVZbdwjXhMOGAI277dLR+xSyweCAUHwB8eV7w2hhlaqq2NidyvQcz6rSLDlgm5va3PqIfl7WJPVha3h/zC+gE3FeMT0DKGBJ22lvlm1FPyiKg4cruO0ygE3tG/DqFQL3C0pkxoqiDMW+rb8pnlTUNIsXBJYbDznqWNW6le/aUC5PRXlTG3fFTDRxxBXVaCXv05eUyGVk1AAgbcpqDAaEt6kDrVJj1ILWqTlRidiUiCu8CqPJK7wR2mmMTPKR3qmw0hvNho9CWEpUkeNqfZI3tfn6pEakiDEm8MI+VgnLxousvIbe1pf0GDIUPUW+Ui4ZyWmLVMS1lPJAbXJ6E8/UI84DGYILpp4ZCOR1KPnczV+4kZ1pSl0eVcLYdUxXpa3KgxsDbtVFvp2Plf2T0bG8VI1JdTKGIJIve29hy8OkoMyy5BWfsDSzXW+9gd7X625eqaGBpgbKBfnp2v7JG7yLTWGVWaYhClR+bXWwHRR/zKTA0mc2v2O6XGNydTfQLE7dbb99t7RvyTgJGpgpibuBuGQW/y7MPfAmkyOLasXsvwnIRjwVEBbDv598ixOVVsO2h1035MN1byb5c4QhsPj4S9FTNVt7K3XpfnaG0uV/72geAyGviXWqpCi/Z1X5eodYZmeFq4eoaNS17AjSbgqeo9h9kKaFYyYdgyq1uY9/X3zp9topVOIXoIqKoa5O5PLvHvvGKnWLKGPMiUSVMdOzuoekBxFSmvNgPMyHO65FFyDuAeU811u1RNRJ7Q5mRKyN0z0bG4qkgBZgO6ai1xQzdgAjl13mpEhXKmLbvBarzHqQWrUnPjE60pEdV4OWmVGkV5ekUNkmqa1Ti81eNQLJBcmw3J2EucRlhRKZAvpcM1uvf/fhOOG8Dqb0pGw2Xz6mMxWK5UxuNxyK2Fx1SriLvc2+yD93cchyEbMLjNBPcfjKbMKARg4Ft95vE1+yGB36+MLfIbTXFDTh62tS9Sy0gCSzdfKEZeq1WAVCic7t9pvbyEV8gpIp9JWZiAbqhuRc8tK9WMcsLSep9a9qaD7Kg7+bHqfAQVRYmnkucPhE8DClwgAsNj0KkgjyI5QTL3strbDlfaWSuLXJ2HMwJBkwDM8+oUdOGxzApVBtUFgyhRcuy+G3aX2RV4fIxttCsKYZrlxYsqsQu3QsACR0ljmmSftFf0rC/QauijkP774zZLlqUUCILCaoWkc7VpvBcZNhACAByiLxrjdWMe33bL7B+pM9GwPZDMegM8YxuK11Hdj9pmPtJPzlsSlk1VFqAAuq2IIZ9lv3E/dv3nblG9RpUA9wnnb5uaLKqOi1WJFMVACpJBFnBFip3BvzvLfJc/LXorTK1VB14Mm7ADcvhGP7xOZ9EdxvpJAizVskS4z5/qX8oh0herT/MI35ziQ+HL0zrVuRXffqCOYI6g7xay/L6zVFbQbA9doq6I+yw4jbdfKZMzzBO7jtBQB1MyFdAcW2JL1ILVeY7wd2mSMToykadpzeckzV5bRXZ1eS4WiXcIOp/5MgvMVyDcGx8JKJZ6DhMMEUKo2AtCAhiAma115VX9Zv8ZulxVi1+8D+ZR8rRVo/0wvXrtDvjMLrUiUdBSoK1PsofX4WgVHjasPtU0PlcfrMGf06xL1F0aRcAG9z0ttzh/bkiLViy9wPP07mxBAROdu4AdWPWNWBxzDtVFP4EXe/gPHvMSWxi01FaqQCR9Wt78+n6mXmDzkA0xpN6gtrYjTqHQW5QNFsJeg3NmCIpfEnTvsov6lUDdj/e0ssFV9IocqVXmqtz/M3j4RTyUaKj08VVp1DcMCxGsHmAV6bEcto20sVTPJhHhH1KtXU9EG0klhh1gFGqveJYYdhLkZWSZ/ifRYKq/UqQPM7fOeHYx6gVjTXU1tr8r+PfPYuN1L0Eoj7zAnyXf42i3hckFuUZMR9ngOLeoXY1b6r76v75S8y/NFqBaWJJutvRV1/eUiOW/Mi9vL4ei8W8CJXXUg01ByIHPwM8jxmEq4dzSqqQR3/EeEVhTPS8uz1lqBcSyU67204k/wDi40dBiLbU6tuVUevvN+bszAa0qJvUov8AbQHkwts6Ho67TyjLMzAU0aq+kotzU818UPQxoyzNjhxTWsz1cIv7nEUt8Rg79Px0++mdu6x5hoIyvhtW9rnxmQmti2KqdVIl96VZDbD4hRzKN/66g3vTbcWPr1FolnkLtIXaYzSImVpGls3eZec3mXjAs6vMvOZl5CGqh2MFhFY7SECWR6Kp9nSrNlZgmxCKaYE8zfzhgzKt6MUtfZDBhtvcCw3gkySiJtHWIqNUYu7FmPMsdzJsPWqrYJUqDuCMw9wkAj5wZlFIAVT2n8eS+Xj4yAJsmynNdKv+1lb76H3NulzY7xiwf/WEIIZHt4j/AGlthEEu8IokAFhnq6WqWuFAsByPWGUqQEjpQhDCQxqAIiRxrwhSxKm4sw+yw5j/AGj4GkVdAwtIQ+W81y2rhahp1B5How8JNlmZtTN13B2ZW3DDxHzntPF3DNOuhDLfuPUTxPOsnq4V9Lbr0YcjA0RMZsmzN6AdsKiVqNSxrYPEDVT1fdcA8iDbcd1vCbijhcWynUpIPhMgCcGcmZMiIvNTJkyQhuZMmSEI60jE3Mjroqn2bE3MmQimTJkyEh1baOvBVVr2vtMmRURno2ElzhTNzIwCwpwhZuZAQ6M5JmTJCA2LAtPO+MsJTZG1KD5zJkPoB9njlUWYgdCZkyZAWI//2Q==" alt="Emma Thompson" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Emma Thompson</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    emmathompson
                  </p>
                  <p className="testimonial-text">Best online learning platform I've used! The flexible schedule and hands-on projects made it perfect for balancing work and learning.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src="data:image/jpeg;base64,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" alt="Michael Johnson" className="testimonial-avatar-img" />
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">Michael Johnson</h4>
                  <p className="testimonial-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    michaeljohnson
                  </p>
                  <p className="testimonial-text">The mentorship program is outstanding! My mentor guided me through every step and helped me build a strong portfolio. Thank you!</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Circular 3D Carousel Section */}
        <div className="circular-carousel-section">
          <h1 className="circular-carousel-title">Placed Interns from Our Program</h1>
          <CircularCarousel />
        </div>
      </div>
    </div>
  )
}

export default Home