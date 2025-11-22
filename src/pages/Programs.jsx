import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Programs.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://web-backend-0aiv.onrender.com';

function Programs() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  // Fetch programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/programs`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setPrograms(result.data);
        } else if (Array.isArray(result)) {
          setPrograms(result);
        } else {
          setPrograms([]);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    let result = [...programs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(program =>
        program.title?.toLowerCase().includes(query) ||
        program.summary?.toLowerCase().includes(query) ||
        (program.skills || []).some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(program => program.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'All') {
      result = result.filter(program => program.level === selectedLevel);
    }

    // Duration filter
    if (selectedDuration !== 'All') {
      result = result.filter(program => program.duration === selectedDuration);
    }

    // Sort
    if (sortBy === 'Rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'Duration') {
      result.sort((a, b) => {
        const getMonths = (d) => {
          const match = String(d || '').match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getMonths(a.duration) - getMonths(b.duration);
      });
    }

    return result;
  }, [programs, searchQuery, selectedCategory, selectedLevel, selectedDuration, sortBy]);

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

  // Get unique values for filters
  const categories = ['All', ...new Set(programs.map(p => p.category).filter(Boolean))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['All', ...new Set(programs.map(p => p.duration).filter(Boolean))];

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedDuration('All');
    setSortBy('Featured');
  };

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
      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-filter-container">
          {/* Search Input */}
          <div className="search-wrapper">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search programs, tags, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="filters-row">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filter-select"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : level}
                </option>
              ))}
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="filter-select"
            >
              {durations.map(duration => (
                <option key={duration} value={duration}>
                  {duration === 'All' ? 'All Durations' : duration}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="Featured">Featured</option>
              <option value="Rating">Highest Rated</option>
              <option value="Duration">Shortest Duration</option>
            </select>

            <button
              className="reset-btn"
              onClick={clearFilters}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <section className="programs-section">
        <h2 className="section-title">Available Programs</h2>
        
        {filteredPrograms.length === 0 ? (
          <div className="no-results">
            <p>No programs found matching your criteria.</p>
          </div>
        ) : (
          <div className="programs-grid">
            {filteredPrograms.map((program) => (
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

                  {/* Meta Info */}
                  <div className="program-meta">
                    <span className="program-level">{program.level}</span>
                    <span className="program-duration">{program.duration}</span>
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
