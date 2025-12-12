import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import TiltedCard from '../components/TiltedCard';
import CircularCarousel from '../components/CircularCarousel';
import LightRays from '../components/LightRays';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { cn } from "../lib/utils";
import './Page.css';
import titleimg from '../assets/title-card.jpeg';
import isoLogo from '../assets/iso.png';
import msmeLogo from '../assets/MSME-Logo.webp';
import startupLogo from '../assets/startup-india.png';
import mcaLogo from '../assets/mca.jpg';
import bannerimg from '../assets/banner-bg.jpg';
import mentorimg from '../assets/Mentorship.jpg';
import whoBg from '../assets/who-bg.jpg';
import visionBg from '../assets/our-vision.png';
import mentor from '../assets/mentor.jpg';
import testimonialsData from '../data/testimonials.json';
function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([false, false, false, false]);
  const [statsValues, setStatsValues] = useState({ interns: 0, projects: 0, satisfaction: 0, instructors: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
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

  // Optimized certification cards animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simplified staggered animation
          const delays = [0, 200, 400, 600];
          delays.forEach((delay, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newCards = [...prev];
                newCards[index] = true;
                return newCards;
              });
            }, delay);
          });
        } else {
          setIsVisible(false);
          setVisibleCards([false, false, false, false]);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Optimized statistics counter animation
  useEffect(() => {
    if (hasAnimated) return;

    const animateCounter = (start, end, duration, callback) => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const targets = [
            { key: 'interns', end: 5000 },
            { key: 'projects', end: 9000 },
            { key: 'satisfaction', end: 93 },
            { key: 'instructors', end: 30 }
          ];
          targets.forEach(({ key, end }) => {
            animateCounter(0, end, 2000, (value) => {
              setStatsValues(prev => ({ ...prev, [key]: value }));
            });
          });
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const currentStats = statsSectionRef.current;
    if (currentStats) {
      observer.observe(currentStats);
    }

    return () => {
      if (currentStats) {
        observer.unobserve(currentStats);
      }
    };
  }, [hasAnimated]);

  // Who We Are Carousel - Memoized to prevent re-renders
  const whoWeAreCards = useMemo(() => [
    {
      title: "About InLighnX Global (InLighn Tech)",
      content: "At InlighnX Global, we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.",
      iconBg: "#14b8a6",
      image: "https://www.inlighntech.com/wp-content/uploads/2023/07/img-meta6.jpg", // Add your custom image here
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
      image: "https://www.inlighntech.com/wp-content/uploads/2023/07/img-meta5.jpg", // Add your custom image here
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
      image: visionBg, // Add your custom image here
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
  ], []);

  const totalCards = whoWeAreCards.length;

  // Optimized carousel navigation with useCallback
  const nextCard = useCallback(() => {
    if (isTransitioning) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsTransitioning(true);
    setCurrentCardIndex((prev) => (prev + 1) % totalCards);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalCards]);

  const prevCard = useCallback(() => {
    if (isTransitioning) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsTransitioning(true);
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalCards]);

  // Store functions in refs for use in event handlers
  useEffect(() => {
    nextCardRef.current = nextCard;
    prevCardRef.current = prevCard;
  }, [nextCard, prevCard]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized swipe handlers with useCallback
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? nextCardRef.current?.() : prevCardRef.current?.();
    }
  }, [touchStart, touchEnd]);

  // Optimized mouse drag handlers
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
    };

    const handleMouseMove = (e) => {
      if (!isDraggingLocal) return;
      currentX = e.clientX;
    };

    const handleMouseUp = () => {
      if (!isDraggingLocal || startX === null || currentX === null) {
        isDraggingLocal = false;
        setIsDragging(false);
        return;
      }
      
      const distance = startX - currentX;
      if (Math.abs(distance) > minSwipeDistance) {
        distance > 0 ? nextCardRef.current?.() : prevCardRef.current?.();
      }
      
      isDraggingLocal = false;
      setIsDragging(false);
      startX = null;
      currentX = null;
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

  // Optimized auto-play carousel
  useEffect(() => {
    if (isTransitioning) return;
    
    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentCardIndex((prev) => (prev + 1) % totalCards);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [totalCards, isTransitioning]);

  // Optimized parallax effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallax = parallaxImageRef.current;
          if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Convert Google Drive link to direct image URL with multiple fallback formats
  const convertGoogleDriveLink = (url) => {
    if (!url) return url;
    
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
      // Extract file ID from various Google Drive URL formats
      let fileId = null;
      
      // Try to extract from different URL patterns
      const patterns = [
        /[?&]id=([a-zA-Z0-9_-]+)/,  // ?id= or &id=
        /\/d\/([a-zA-Z0-9_-]+)/,     // /d/FILE_ID
        /\/file\/d\/([a-zA-Z0-9_-]+)/ // /file/d/FILE_ID
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          fileId = match[1];
          break;
        }
      }
      
      if (fileId) {
        // Try multiple Google Drive URL formats (in order of preference)
        // Format 1: Standard direct view (requires public access)
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    // Return original URL if not a Google Drive link or if ID extraction failed
    return url;
  };

  // Load testimonials data
  useEffect(() => {
    const records = testimonialsData.records || [];
    setTestimonials(records);
    console.log('Loaded testimonials:', records.length, 'records');
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
            <button className="home-cta-button" onClick={() => navigate('/programs')}>Explore Internships</button>
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
              At InLighnX Global (InLighn Tech), we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.
            </p>
            <button className="internship-know-more-button" onClick={() => navigate('/programs')}>Know More</button>
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
              src={mentor} 
              alt="Features" 
              className="features-image"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
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
                {/* Optimized: Only duplicate once for seamless loop */}
                {[...whoWeAreCards, ...whoWeAreCards].map((card, index) => (
                  <div key={`card-${index}`} className="who-we-are-card">
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
                      <button className="card-button" onClick={() => navigate('/about-us')}>
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
              const isCardVisible = !isMobile 
                ? index >= currentCardIndex && index < currentCardIndex + 3
                : index === currentCardIndex;
              return (
                <button
                  key={index}
                  className={`carousel-indicator ${isCardVisible ? 'active' : ''}`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      const targetIndex = isMobile ? index : Math.min(index, Math.max(0, totalCards - 3));
                      setCurrentCardIndex(targetIndex);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  aria-label={`Go to card ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Award Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto">
              <div className="md:w-2/5">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5622AQFM2HTwXoSnRg/feedshare-shrink_1280/B56ZnpFlO6HUAs-/0/1760552181859?e=2147483647&v=beta&t=jN4MPVa6QoxKucJwBGIn0wwpUAWiuvCy2-TeCmNG300" 
                  alt="Bharat Business Awards 2024" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-[#14b8a6] p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Bharat Business Awards 2024</h3>
                </div>

                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    Our organization, <span className="font-semibold text-gray-800">InLighnX Global Pvt Ltd (InLighn Tech)</span> was honored with the 
                    <span className="font-semibold text-[#14b8a6]"> "#Best_Emerging_EdTech_Startup_in_Tech_Training"</span> award at the 
                    Bharat Business Awards, presented by Ashneer Grover.
                  </p>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                    <p className="text-sm text-amber-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      We started this journey just one year ago with no guidance, building everything from scratch through countless sleepless nights — driven by one mantra: 
                      <span className="font-semibold">"Finish what you've started."</span>
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 mt-6">
                    This recognition is a testament to our team's dedication and hard work in revolutionizing tech education and training.
                  </p>
                </div>
              </div>
            </div>
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
              {/* Duplicate testimonials for seamless infinite scroll - shows all 50 items */}
              {testimonials.length > 0 ? [...testimonials, ...testimonials].map((testimonial, index) => {
                // Debug: Log each testimonial being rendered
                if (index === 0) {
                  console.log('Rendering testimonials. Total items:', testimonials.length * 2);
                }
                const getImageUrl = (url) => {
                  if (!url) return null;
                  
                  if (url.includes('drive.google.com')) {
                    let fileId = null;
                    const patterns = [
                      /[?&]id=([a-zA-Z0-9_-]+)/,
                      /\/d\/([a-zA-Z0-9_-]+)/,
                      /\/file\/d\/([a-zA-Z0-9_-]+)/
                    ];
                    
                    for (const pattern of patterns) {
                      const match = url.match(pattern);
                      if (match && match[1]) {
                        fileId = match[1];
                        break;
                      }
                    }
                    
                    if (fileId) {
                      // Try direct view first (works if file is publicly accessible)
                      const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                      
                      // If direct access fails, use a proxy service as fallback
                      // Using images.weserv.nl proxy which can access Google Drive images
                      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(directUrl)}`;
                      
                      // Return direct URL first, proxy will be used in error handler if needed
                      return directUrl;
                    }
                  }
                  return url;
                };

                const handleImageError = (e) => {
                  const originalUrl = testimonial.photo_link;
                  const currentSrc = e.target.src;
                  
                  // If we haven't tried the proxy yet, use it
                  if (originalUrl && originalUrl.includes('drive.google.com') && !currentSrc.includes('weserv.nl')) {
                    let fileId = null;
                    const patterns = [
                      /[?&]id=([a-zA-Z0-9_-]+)/,
                      /\/d\/([a-zA-Z0-9_-]+)/,
                      /\/file\/d\/([a-zA-Z0-9_-]+)/
                    ];
                    
                    for (const pattern of patterns) {
                      const match = originalUrl.match(pattern);
                      if (match && match[1]) {
                        fileId = match[1];
                        break;
                      }
                    }
                    
                    if (fileId) {
                      // Try proxy service
                      const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(directUrl)}`;
                      
                      if (currentSrc !== proxyUrl) {
                        e.target.src = proxyUrl;
                        return;
                      }
                      
                      // Try thumbnail format as another fallback
                      const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`;
                      if (currentSrc !== thumbnailUrl) {
                        e.target.src = thumbnailUrl;
                        return;
                      }
                    }
                  }
                  // Final fallback to placeholder
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                };

                // Ensure testimonial data exists
                if (!testimonial || !testimonial.id) {
                  console.warn('Invalid testimonial at index:', index);
                  return null;
                }

                // Ensure LinkedIn URL has https:// protocol
                const getLinkedInUrl = (url) => {
                  if (!url) return '#';
                  return url.startsWith('http') ? url : `https://${url}`;
                };

                return (
                  <a 
                    key={`${testimonial.id}-${index}`}
                    href={getLinkedInUrl(testimonial.linkedin_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="testimonial-card block hover:shadow-lg transition-shadow duration-300"
                    onClick={(e) => {
                      // Prevent default only if link is not available
                      if (!testimonial.linkedin_link) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="testimonial-content">
                      <div className="testimonial-avatar">
                        <img 
                          src={getImageUrl(testimonial.photo_link) || 'https://via.placeholder.com/150?text=No+Image'} 
                          alt={testimonial.name} 
                          className="testimonial-avatar-img"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-domain text-orange-500">{testimonial.internship_domain}</p>
                        <p className="testimonial-text">{testimonial.feedback}</p>
                        {testimonial.linkedin_link && (
                          <div className="mt-2 text-sm text-blue-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            View Profile
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                );
              }) : <div>Loading testimonials...</div>}
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
      <FloatingWhatsApp />
    </div>
  )
}

export default Home