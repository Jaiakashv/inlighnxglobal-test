import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import certificateIcon from '../assets/certificate-icon.webp';
import cloudIcon from '../assets/cloud-icon.png';
import forumIcon from '../assets/support-icon.png';
import projectsIcon from '../assets/project-icon.png';
import mentorIcon from '../assets/mentor-icon.png';
import durationIcon from '../assets/learn-icon.png';
import levelIcon from '../assets/level-icon.png';
import skillsIcon from '../assets/skills-icon.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://web-backend-0aiv.onrender.com';

function CourseDetail({ course: courseProp, onClose: onCloseProp }) {
  // All hooks must be called at the top, before any conditional returns
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(courseProp || null);
  const [loading, setLoading] = useState(!courseProp);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

  // Fetch course data based on slug or use prop
  useEffect(() => {
    // If course is passed as prop (from Programs page modal), use it directly
    if (courseProp) {
      setCourse(courseProp);
      setLoading(false);
      return;
    }

    // Otherwise, fetch by courseSlug/name
    const fetchCourse = async () => {
      if (!courseSlug) {
        setError('Course name is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // courseSlug already comes from URL path (e.g., "full-stack" from "/programs/full-stack")
        // The backend expects the slug as-is, it will decode and match internally
        const apiUrl = `${API_BASE_URL}/api/programs/by-name/${courseSlug}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Course not found (Status: ${response.status})`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setCourse(result.data);
        } else {
          throw new Error('Course not found - invalid response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug, courseProp]);

  // No need to lock body scroll for page view

  // Image carousel effect - only run when course is loaded
  useEffect(() => {
    if (!course) return;
    
    const courseImagesCount = course.additionalImages && course.additionalImages.length > 0
      ? course.additionalImages.length + 1 // +1 for thumbnail
      : 3; // thumbnail + 2 placeholders

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % courseImagesCount);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [course]);

  // onClose is only used if courseProp is provided (modal mode)
  // For page view, navigation is handled by browser back button or navbar
  const onClose = () => {
    if (onCloseProp) {
      onCloseProp();
    } else {
      navigate('/programs');
    }
  };

  if (loading) {
    return (
      <div className="course-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-error">
        <h2>Course Not Found</h2>
        <p>The requested course could not be found.</p>
        <button onClick={onClose} className="back-button">
          Back to Programs
        </button>
      </div>
    );
  }

  const courseImages = [
    { type: 'thumbnail', content: course.thumbnail },
    ...(course.additionalImages && course.additionalImages.length > 0
      ? course.additionalImages.map(img => ({ type: 'photo', content: img }))
      : [
          { type: 'award', content: '/certificate-placeholder.jpg' },
          { type: 'photo', content: '/course-photo-placeholder.jpg' }
        ]
    )
  ];

  const courseTopics = course.courseTopics && course.courseTopics.length > 0
    ? course.courseTopics
    : [
        `Introduction to ${course.title.split(' ')[0]}`,
        'Core Concepts and Fundamentals',
        'Advanced Techniques and Tools',
        'Hands-on Projects and Exercises',
        'Industry Best Practices',
        'Real-world Case Studies',
        'Portfolio Development',
        'Certification and Next Steps'
      ];

  const keyFeatures = [
    { image: certificateIcon, text: 'Globally Recognized Certification' },
    { image: cloudIcon, text: 'Full lifetime access to all content' },
    { image: forumIcon, text: 'Dedicated Forum Support to clear all your doubts' },
    { image: projectsIcon, text: `Access to ${course.category} Projects for hands-on experience` },
    { image: mentorIcon, text: '1-on-1 Doubt Solving with Mentors' },
    { image: durationIcon, text: `${course.duration} of flexible learning` },
    { image: levelIcon, text: `${course.level} level course` },
    { image: skillsIcon, text: `Skills: ${course.skills.join(', ')}` }
  ];
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    
    return (
      <div className="rating-stars">
        {stars}
        <span className="rating-value">{rating?.toFixed(1) || 'New'}</span>
      </div>
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + courseImages.length) % courseImages.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % courseImages.length)
  }

  if (!course) return null

  const originalPrice = course.originalPrice || 2000
  const discountedPrice = course.discountedPrice || 1499
  const savings = originalPrice - discountedPrice
  const modules = course.modules || 6
  const hours = course.hours || 8

  return (
    <div className="course-detail-overlay">
      <div className="course-detail-container">
        {/* Header Section - Dark Green */}
        <section className="course-detail-header">
          <div className="course-header-content">
            <div className="breadcrumbs">
              <span>Home</span>
              <span>/</span>
              <span>Courses</span>
              <span>/</span>
              <span>{course.title}</span>
            </div>
            
            <div className="course-header-main">
              <div className="course-header-left">
                <h1 className="course-detail-title">{course.title}</h1>
                <p className="course-tagline">Accelerate your Career</p>
                <p className="course-description">{course.summary}</p>
                
                <div className="course-pricing">
                  <span>Apply this Course @</span>
                  <span className="original-price">₹{originalPrice}</span>
                  <span className="discounted-price">₹{discountedPrice}</span>
                  <button 
                    onClick={() => window.open('https://www.youtube.com/watch?v=w07el7UywbQ', '_blank', 'noopener,noreferrer')}
                    style={{
                      background: '#FFD700',
                      color: '#064B45',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                  >Apply Now</button>
                </div>

                <div className="course-highlights">
                  <div className="highlight-item">
                    <span className="highlight-number">{modules}</span>
                    <span className="highlight-label">Modules</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number">{hours}</span>
                    <span className="highlight-label">Hours</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number">{course.rating ? Math.round(course.rating) : 5}</span>
                    <span className="highlight-label">Ratings</span>
                  </div>
                </div>

                {course.overview && course.overview.trim() && (
                  <div className="course-detailed-summary">
                    {course.overview.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Enrollment Card */}
              <div className="enrollment-card">
                <div className="enrollment-card-badge">Hot Opportunity</div>
                <div className="enrollment-card-header">
                  <h3 className="enrollment-card-title">{course.title}</h3>
                  <h4 className="enrollment-card-subtitle">Internship Program</h4>
                </div>
                
                <div className="enrollment-card-info">
                  <div className="info-card">
                    <div className="info-card-header">
                      <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="info-card-label">Batch Starts</span>
                    </div>
                    <div className="info-card-value">TBA</div>
                    <div className="info-card-subtitle">To Be Announced</div>
                  </div>

                  <div className="info-card price-card">
                    <div className="info-card-header">
                      <svg className="info-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <span className="info-card-label">Application Price</span>
                    </div>
                    <div className="price-display">
                      <span className="price-main">₹{discountedPrice}</span>
                      <span className="price-strike">₹{originalPrice}</span>
                    </div>
                    <div className="price-note">
                      <span className="price-note-text">Registration fee: ₹99 only</span>
                    </div>
                  </div>
                </div>

                <div className="enrollment-card-divider"></div>

                <button 
                  className="apply-now-btn" 
                  onClick={() => window.open('https://www.youtube.com/watch?v=w07el7UywbQ', '_blank', 'noopener,noreferrer')}
                >
                  <span>Apply Now</span>
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - White Background */}
        <section className="course-detail-content">
          <div className="content-wrapper">
            {/* Course Overview */}
            <div className="course-section">
              <h2 className="course-section-title">{course.title}</h2>
              <h3 className="course-section-subtitle">Course Overview</h3>
              {course.detailedSummary && course.detailedSummary.trim() ? (
                <div className="course-overview-text">
                  {course.detailedSummary.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              ) : (
                <p className="course-overview-text">
                  {`Unlock the magic of ${course.title} with this comprehensive masterclass. Master the fundamentals 
                  and learn how professionals build immersive solutions, right from scratch. This comprehensive program will 
                  teach you how to produce a wide variety of projects and applications. Through hands-on projects 
                  and expert guidance, you'll become proficient in the latest technologies and methodologies used by industry 
                  professionals. Whether you're a beginner looking to start your journey or an expert seeking to refine your 
                  skills, this course provides the perfect platform to accelerate your career.`}
                </p>
              )}
            </div>

            {/* Key Features */}
            <div className="course-section">
              <h3 className="course-section-subtitle">Key Features</h3>
              <div className="features-grid">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="feature-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <img src={feature.image} alt="" className="feature-icon" />
                    <span className="feature-text">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies You Will Learn */}
<div className="course-section">
  <h3 className="course-section-subtitle" style={{ textAlign: "center", marginBottom: "2rem",justifySelf: 'left' }}>
    Technologies You Will Learn
  </h3>

  <div className="tech-logos">
    {course.technologies && course.technologies.length > 0 ? (
      course.technologies.map((tech, index) => (
        <div key={index} className="tech-logo">{tech}</div>
      ))
    ) : (
      <>
        <div className="tech-logo">Git logo</div>
        <div className="tech-logo">GitHub logo</div>
        <div className="tech-logo">React logo</div>
        <div className="tech-logo">Node.js logo</div>
        <div className="tech-logo">MongoDB logo</div>
      </>
    )}
  </div>
</div>
<h3 
      className="course-section-subtitle"
      style={{textAlign: 'center', marginBottom: '1rem',justifySelf: 'left'}}
    >
      sample certificate
    </h3>

            {/* Certificate Section */}
            <div className="certificate-section">
              <div className="certificate-container">
                <div className="certificate-image-wrapper">
                  <img 
                    src={course.certificateImage || "/certificate-placeholder.jpg"} 
                    alt="Certificate"
                    className="certificate-image"
                  />
                  <div className="certificate-overlay">
                    <div className="certificate-badge">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      <span>Verified Certificate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Course Topics */}
            <div className="course-section">
              <h2 className="course-section-title">{course.title}</h2>
              <h3 className="course-section-subtitle">Course Topics You will Learn</h3>
              <div className="topics-container">
                <button
                  className="topics-toggle"
                  onClick={() => setIsTopicsOpen(!isTopicsOpen)}
                >
                  <span className="topics-icon">▶</span>
                  <span>Course Module</span>
                  <span className={`topics-arrow ${isTopicsOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isTopicsOpen && (
                  <div className="topics-list">
                    {courseTopics.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-number">{index + 1}</span>
                        <span className="topic-text">{topic}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CourseDetail

