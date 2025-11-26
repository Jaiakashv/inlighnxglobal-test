import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrograms } from '../contexts/ProgramsContext';
import './Programs.css';

function Programs() {
  const navigate = useNavigate();
  const { programs, loading } = usePrograms();
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

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
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Combined Filter Dropdown */}
          <div className="mobile-filters-wrapper">
            {/* Active Filters Display */}
            {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedDuration !== 'All' || sortBy !== 'Featured') && (
              <div className="active-filters-mobile">
                {selectedCategory !== 'All' && (
                  <span className="active-filter-badge">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedLevel !== 'All' && (
                  <span className="active-filter-badge">
                    Level: {selectedLevel}
                  </span>
                )}
                {selectedDuration !== 'All' && (
                  <span className="active-filter-badge">
                    Duration: {selectedDuration}
                  </span>
                )}
                {sortBy !== 'Featured' && (
                  <span className="active-filter-badge">
                    Sort: {sortBy === 'Rating' ? 'Highest Rated' : 'Shortest Duration'}
                  </span>
                )}
              </div>
            )}
            
            <div className="mobile-filter-controls">
              <div className="mobile-filter-group">
                <label htmlFor="mobile-combined-filter" className="filter-label">Filters</label>
                <select
                  id="mobile-combined-filter"
                  className="mobile-combined-filter"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.startsWith('category:')) {
                      setSelectedCategory(value.replace('category:', ''));
                    } else if (value.startsWith('level:')) {
                      setSelectedLevel(value.replace('level:', ''));
                    } else if (value.startsWith('duration:')) {
                      setSelectedDuration(value.replace('duration:', ''));
                    } else if (value.startsWith('sort:')) {
                      setSortBy(value.replace('sort:', ''));
                    }
                    // Reset to placeholder after selection
                    setTimeout(() => {
                      e.target.value = '';
                    }, 100);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Select a filter...</option>
                  <optgroup label="Category">
                    {categories.map(cat => (
                      <option key={`category-${cat}`} value={`category:${cat}`}>
                        {cat === 'All' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Level">
                    {levels.map(level => (
                      <option key={`level-${level}`} value={`level:${level}`}>
                        {level === 'All' ? 'All Levels' : level}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Duration">
                    {durations.map(duration => (
                      <option key={`duration-${duration}`} value={`duration:${duration}`}>
                        {duration === 'All' ? 'All Durations' : duration}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Sort By">
                    <option value="sort:Featured">Featured</option>
                    <option value="sort:Rating">Highest Rated</option>
                    <option value="sort:Duration">Shortest Duration</option>
                  </optgroup>
                </select>
              </div>
              <button
                className="mobile-reset-btn"
                onClick={clearFilters}
                type="button"
                aria-label="Reset all filters"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M7 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                </svg>
                Reset
              </button>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="filters-row desktop-filters">
            <div className="filter-group">
              <label htmlFor="category-filter" className="filter-label">Category</label>
              <select
                id="category-filter"
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
            </div>

            <div className="filter-group">
              <label htmlFor="level-filter" className="filter-label">Level</label>
              <select
                id="level-filter"
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
            </div>

            <div className="filter-group">
              <label htmlFor="duration-filter" className="filter-label">Duration</label>
              <select
                id="duration-filter"
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
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter" className="filter-label">Sort By</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="Featured">Featured</option>
                <option value="Rating">Highest Rated</option>
                <option value="Duration">Shortest Duration</option>
              </select>
            </div>

            <button
              className="reset-btn"
              onClick={clearFilters}
              type="button"
              aria-label="Reset all filters"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
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
