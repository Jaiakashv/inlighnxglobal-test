import { useEffect } from 'react'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './aboutus.css'
import Roadmap from '../assets/Roadmap.jpg';

function AboutUs() {
  const roadmapSvg = (
    <div className="roadmap-container" style={{ width: '100%', height: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
      <img 
        src={Roadmap}
        alt="Internship Journey Roadmap"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
  useEffect(() => {
    if (typeof window === 'undefined') return
    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target
              if (el.classList.contains('aboutus-certifications-section')) el.classList.add('fade-in-up')
              if (el.classList.contains('aboutus-certifications-title')) el.classList.add('fade-in-up')
              if (el.classList.contains('aboutus-certifications-subtitle')) el.classList.add('fade-in-up')
              if (el.classList.contains('aboutus-certification-card')) el.classList.add('fade-in-slide')
              if (el.classList.contains('reveal-on-scroll')) el.classList.add('is-visible')
              io.unobserve(el)
            }
          })
        },
        { threshold: 0.2 }
      )
      document
        .querySelectorAll(
          '.aboutus-certifications-section, .aboutus-certifications-title, .aboutus-certifications-subtitle, .aboutus-certification-card, .reveal-on-scroll'
        )
        .forEach((el) => io.observe(el))
    } catch {}
    return () => {
      try {
        if (!io) return
        document
          .querySelectorAll(
            '.aboutus-certifications-section, .aboutus-certifications-title, .aboutus-certifications-subtitle, .aboutus-certification-card, .reveal-on-scroll'
          )
          .forEach((el) => io.unobserve(el))
      } catch {}
    }
  }, [])

  // Animate the stats numbers when they enter the viewport
  useEffect(() => {
    if (typeof window === 'undefined') return
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const animateCount = (el) => {
      if (el.dataset.animated) return
      el.dataset.animated = 'true'
      const text = el.textContent.trim()
      const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/)
      if (!match) return
      const target = parseFloat(match[1])
      const suffix = match[2] || ''
      const duration = 1500
      const startTime = performance.now()
      const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
      const step = (now) => {
        const t = Math.min(1, (now - startTime) / duration)
        const eased = easeOutCubic(t)
        const current = target * eased
        el.textContent = `${current.toFixed(decimals)}${suffix}`
        if (t < 1) requestAnimationFrame(step)
      }
      el.textContent = `0${suffix}`
      requestAnimationFrame(step)
    }

    let io
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target)
            io.unobserve(entry.target)
          }
        })
      }, { threshold: 0.3 })
      document.querySelectorAll('.stat-value').forEach((el) => io.observe(el))
    } catch {}

    return () => {
      try {
        if (!io) return
        document.querySelectorAll('.stat-value').forEach((el) => io.unobserve(el))
      } catch {}
    }
  }, [])

  return (
    <div className="aboutus-page-container">
      <div className="aboutus-page-content">
        <h1>About Us</h1>
        <p className="aboutus-page-subtitle">
          At INLIGHN TECH, we believe the future of education lies in bridging the gap between
          academic learning and industry needs.
        </p>

        <section className="about-hero reveal-on-scroll">
          <div className="about-hero-grid">
            <div className="about-hero-media">
              <div className="roadmap-wrapper" aria-hidden="true">
                {roadmapSvg}
              </div>
            </div>
            <div className="about-hero-content">
              <h2 className="about-hero-title">
                We Provide Best <span className="about-highlight">Industry</span> Services For You.
              </h2>
              <p className="about-hero-text">
                Founded with a passion for providing meaningful and immersive learning experiences, we offer internship
                programs that equip students and young professionals with practical skills in Cyber Security, Full Stack
                Development, Data Science, and Project Management.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section reveal-on-scroll" aria-labelledby="team-title">
          <h2 id="team-title" className="team-title">Meet Our Mentors</h2>
          <p className="team-subtitle">Experienced professionals guiding you with practical, hands-on mentorship.</p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <img src="https://i.pravatar.cc/240?img=5" alt="Ananya Gupta, Lead Data Scientist" loading="lazy" />
              </div>
              <div className="team-info">
                <div className="team-name">Ananya Gupta</div>
                <div className="team-role">Lead Data Scientist</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <img src="https://i.pravatar.cc/240?img=20" alt="Rohit Mehra, Full Stack Architect" loading="lazy" />
              </div>
              <div className="team-info">
                <div className="team-name">Rohit Mehra</div>
                <div className="team-role">Full Stack Architect</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <img src="https://i.pravatar.cc/240?img=11" alt="Sara Khan, Cyber Security Lead" loading="lazy" />
              </div>
              <div className="team-info">
                <div className="team-name">Sara Khan</div>
                <div className="team-role">Cyber Security Lead</div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <img src="https://i.pravatar.cc/240?img=45" alt="Vikram Patel, Program Manager" loading="lazy" />
              </div>
              <div className="team-info">
                <div className="team-name">Vikram Patel</div>
                <div className="team-role">Program Manager</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section reveal-on-scroll" aria-labelledby="faq-title">
          <h2 id="faq-title" className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-accordion" role="list">
            <details className="faq-item" role="listitem">
              <summary className="faq-question">What is the duration of the internships?</summary>
              <div className="faq-answer">Most programs run 6–12 weeks, with flexible weekly commitment depending on the track.</div>
            </details>
            <details className="faq-item" role="listitem">
              <summary className="faq-question">Do I receive a verified certificate?</summary>
              <div className="faq-answer">Yes. You get a verifiable certificate upon successful completion, with unique verification links.</div>
            </details>
            <details className="faq-item" role="listitem">
              <summary className="faq-question">Are the internships remote?</summary>
              <div className="faq-answer">Yes, programs are designed to be remote-first with live mentor support and async resources.</div>
            </details>
            <details className="faq-item" role="listitem">
              <summary className="faq-question">How do I apply?</summary>
              <div className="faq-answer">Use the Apply CTA below or reach out via the contact form. You’ll receive next steps by email.</div>
            </details>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-banner reveal-on-scroll" aria-labelledby="cta-title">
          <div className="cta-inner">
            <h2 id="cta-title" className="cta-title">Ready to accelerate your career?</h2>
            <p className="cta-subtitle">Join 5,000+ learners who built real projects with mentor guidance.</p>
            <div className="cta-actions">
              <a className="btn-primary" href="/contact-us">Start Application</a>
              <a className="btn-secondary" href="/contact-us">Talk to Us</a>
            </div>
          </div>
        </section>

        <div className="about-wave-separator" aria-hidden="true">
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path d="M0,96L60,112C120,128,240,160,360,149.3C480,139,600,85,720,69.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
          </svg>
        </div>

        {/* <section className="about-banner reveal-on-scroll">
          <div className="about-banner-inner"><br />
            <h3>Save Time and Effort with INLIGHN TECH</h3>
          </div>
        </section> */}

        <section className="vision-mission reveal-on-scroll">
          <div className="vm-grid">
            <div className="vm-content">
              <div className="vm-item">
                <div className="vm-icon" aria-hidden="true">✓</div>
                <div>
                  <h4>Our Vision</h4>
                  <p>
                    To be a leading EdTech platform that bridges the gap between academic knowledge and industry
                    demands, shaping the next generation of tech innovators and leaders through hands-on, practical
                    learning.
                  </p>
                </div>
              </div>
              <div className="vm-item">
                <div className="vm-icon" aria-hidden="true">✓</div>
                <div>
                  <h4>Our Mission</h4>
                  <p>
                    To empower students and young professionals by providing immersive, real-world learning experiences
                    through tailored internship programs.
                  </p>
                </div>
              </div>
            </div>
            <div className="vm-illustration">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop"
                alt="Mentorship and learning"
                className="about-hero-image"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('vm-ready')}
              />
            </div>
          </div>
        </section>

        <section className="about-stats reveal-on-scroll">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-value">5000+</div><div className="stat-label">Interns Enrolled</div></div>
            <div className="stat-card"><div className="stat-value">9000+</div><div className="stat-label">Projects Completed</div></div>
            <div className="stat-card"><div className="stat-value">93%</div><div className="stat-label">Satisfaction Rate</div></div>
            <div className="stat-card"><div className="stat-value">30+</div><div className="stat-label">Top Instructors</div></div>
          </div>
        </section>

        <div className="aboutus-page-section">
          <h2>The Best Beneficial Side of INLIGHNTECH</h2>
        </div>
        <section className="features-showcase reveal-on-scroll">
          <div className="features-connector" aria-hidden="true">
            <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
              <path d="M0,120 C200,60 350,160 520,110 C720,50 880,140 1200,80" />
            </svg>
          </div>

          <div className="features-bubbles">
            <div className="feature-item">
              <div className="feature-bubble bubble-orange"><div className="bubble-icon" aria-hidden>📘</div></div>
              <h3 className="feature-title">High Quality Resources</h3>
              <p className="feature-desc">Curated content, real-world projects, and structured roadmaps to accelerate your growth.</p>
            </div>
            <div className="feature-item">
              <div className="feature-bubble bubble-purple"><div className="bubble-icon" aria-hidden>🎓</div></div>
              <h3 className="feature-title">Expert Instructors</h3>
              <p className="feature-desc">Guidance from seasoned industry professionals with practical, hands-on mentorship.</p>
            </div>
            <div className="feature-item">
              <div className="feature-bubble bubble-teal"><div className="bubble-icon" aria-hidden>🧭</div></div>
              <h3 className="feature-title">Internship Portal Access</h3>
              <p className="feature-desc">Gain practical exposure with opportunities and verified certificates, all in one place.</p>
            </div>
          </div>
        </section>

        <section className="aboutus-certifications-section achievements-wrapper" aria-labelledby="achievements-title">
          <h2 id="achievements-title" className="aboutus-certifications-title">Our Achievements</h2>
          <p className="aboutus-certifications-subtitle">Recognitions and verifiable credentials</p>

          <div className="aboutus-certifications-grid">
            <a
              className="achievement-card slide-from-left aboutus-certification-card"
              href="https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-30-164507.png"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="achievement-image">
                <img src="https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-30-164507.png" alt="Incorporation Certificate" loading="lazy" />
                <span className="achievement-badge" aria-hidden>+</span>
              </div>
              <div className="achievement-texts">
                <p className="achievement-title">Incorporation Certificate</p>
                <p className="achievement-subtitle">Ministry of Corporate Affairs Approved</p>
              </div>
            </a>

            <a
              className="achievement-card slide-from-right aboutus-certification-card"
              href="https://www.startupindia.gov.in/content/sih/en/block-chain-recognised-certificate.html?DIPP=DIPP201797"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="achievement-image">
                <img src="/startup-india-certificate.jpg" alt="Startup India Recognitions" loading="lazy" />
                <span className="achievement-badge" aria-hidden>+</span>
              </div>
              <div className="achievement-texts">
                <p className="achievement-title">Startup India Recognitions</p>
                <p className="achievement-subtitle">Department for Promotion of Industry and Internal Trade Approved</p>
              </div>
            </a>
          </div>
        </section>

        <section className="contact-dark reveal-on-scroll" aria-labelledby="contact-title">
          <div className="contact-pill">GET IN TOUCH</div>
          <h2 id="contact-title" className="contact-title">Speak with our team</h2>
          <div className="contact-meta">
            <div className="contact-meta-item" aria-label="Email">
              <span className="meta-icon" aria-hidden>✉️</span>
              <div>
                <div className="meta-label">Email</div>
                <a href="mailto:support@inlighntech.com" className="meta-link">support@inlighntech.com</a>
              </div>
            </div>
            <div className="contact-meta-item" aria-label="Phone">
              <span className="meta-icon" aria-hidden>📞</span>
              <div>
                <div className="meta-label">Phone</div>
                <a href="tel:+919999999999" className="meta-link">+91 99999 99999</a>
              </div>
            </div>
          </div>
          <form className="contact-form-mock" onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact-us' }}>
            <div className="contact-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" className="form-input" placeholder="e.g., Priya Sharma" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" className="form-input" placeholder="you@example.com" type="email" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" className="form-input" placeholder="e.g., +91 98765 43210" type="tel" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="program">Program</label>
                <select id="program" name="program" className="form-input">
                  <option value="">Select program</option>
                  <option value="data-science">Data Science</option>
                  <option value="full-stack">Full Stack Development</option>
                  <option value="cyber-security">Cyber Security</option>
                  <option value="project-management">Project Management</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <input id="state" name="state" className="form-input" placeholder="Your state" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" className="form-input" placeholder="How can we help?" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea" placeholder="Tell us a bit about your goals or queries" rows="4"></textarea>
              <div className="form-help">We aim to respond within 1–2 business days.</div>
            </div>
            <div className="form-consent">
              <input id="consent" name="consent" type="checkbox" required />
              <label htmlFor="consent">I agree to be contacted and accept the privacy policy.</label>
            </div>
            <div className="form-actions">
              <button className="submit-button" type="submit">Send message</button>
            </div>
          </form>
        </section>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}

export default AboutUs


