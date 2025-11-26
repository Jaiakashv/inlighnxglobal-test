import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrograms } from '../contexts/ProgramsContext';
import './Programs.css';

function Programs() {
  const navigate = useNavigate();
  const { programs, loading } = usePrograms();
  const parallaxRef = useRef(null);

  // Handle navigation to course detail
  const handleLearnMore = (program) => {
    if (program.detailsLink) {
      navigate(program.detailsLink);
    } else {
      const courseSlug = program.title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/programs/${courseSlug}`);
    }
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= fullStars ? 'star filled' : 'star'}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Parallax effect for hero section
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallax = parallaxRef.current;
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

  if (loading) {
    return (
      <div className="programs-page">
        <div className="loading-container">
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div 
          ref={parallaxRef}
          className="programs-hero-background"
        ></div>
        <div className="programs-hero-content">
          <h1 className="programs-hero-title">Our Programs</h1>
          <p className="programs-hero-subtitle">Discover comprehensive internship programs designed to accelerate your career</p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <h2 className="section-title">Available Programs</h2>
        
        {programs.length === 0 ? (
          <div className="no-results">
            <p>No programs found matching your criteria.</p>
          </div>
        ) : (
          <div className="programs-grid">
            {programs.map((program) => (
              <article key={program._id || program.id} className="program-card">
                {/* Program Image */}
                <div className="program-card-image">
                  <img
                    src={program.thumbnail || '/placeholder-program-thumbnail.jpg'}
                    alt={program.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-program-thumbnail.jpg';
                    }}
                  />
                </div>

                {/* Program Content */}
                <div className="program-card-content">
                  <h3 className="program-card-title">{program.title}</h3>
                  <p className="program-card-summary">{program.summary}</p>

                  {/* Rating */}
                  <div className="program-rating">
                    <div className="stars">{renderStars(program.rating)}</div>
                    <span className="rating-value">
                      {program.rating ? program.rating.toFixed(1) : '0.0'}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="program-skills">
                    {(program.skills || []).slice(0, 4).map((skill, index) => (
                      <span key={index} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(program)}
                    type="button"
                  >
                    Learn More
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Programs;
