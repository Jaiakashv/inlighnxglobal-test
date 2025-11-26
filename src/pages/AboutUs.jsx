import { useEffect, useState } from 'react'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './aboutus.css'
import Roadmap from '../assets/Roadmap.jpg';

function AboutUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    otherDomain: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Construct email body with form data
    const emailBody = `
Name: ${formData.name}

Email: ${formData.email}

Domain of Internship: ${formData.domain}

Message:
${formData.message}
    `.trim()
    
    // Encode the email body for URL
    const encodedBody = encodeURIComponent(emailBody)
    const encodedSubject = encodeURIComponent('Contact Form Submission - InLighnX Global')
    
    // Create mailto link
    const mailtoLink = `mailto:inlighnxglobal@gmail.com?subject=${encodedSubject}&body=${encodedBody}`
    
    // Open the email client
    window.location.href = mailtoLink
    
    // Show success message
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', domain: '', otherDomain: '', message: '' })
    }, 3000)
  }
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
       
        {/* Mentor Cards Section */}
        <br />
        <section className="mentor-section reveal-on-scroll" aria-labelledby="mentor-title">
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 id="mentor-title" className="section-title" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>Meet our mentors</h1>
            <p className="section-subtitle">Learn from industry professionals with real-world experience</p>
            
            <div className="mentor-cards-container">
              {/* Mentor Card 1 */}
              <div className="mentor-card">
                <div className="mentor-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Sarah Johnson" 
                    className="mentor-image"
                    loading="lazy"
                  />
                  <div className="mentor-initials">SJ</div>
                  <div className="mentor-overlay">
                    <h3 className="mentor-name">Sarah Johnson</h3>
                    <p className="mentor-role">Senior UX Designer at Google</p>
                    <p className="mentor-bio">
                      Specializing in user-centered design with 8+ years of experience in creating intuitive and engaging digital experiences for global audiences.
                    </p>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mentor-linkedin"
                      aria-label="Connect on LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect
                    </a>
                  </div>
                </div>
              </div>

              {/* Mentor Card 2 */}
              <div className="mentor-card">
                <div className="mentor-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Michael Chen" 
                    className="mentor-image"
                    loading="lazy"
                  />
                  <div className="mentor-initials">MC</div>
                  <div className="mentor-overlay">
                    <h3 className="mentor-name">Michael Chen</h3>
                    <p className="mentor-role">Full Stack Developer at Microsoft</p>
                    <p className="mentor-bio">
                      Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about teaching clean code and best practices.
                    </p>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mentor-linkedin"
                      aria-label="Connect on LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect
                    </a>
                  </div>
                </div>
              </div>

              {/* Mentor Card 3 */}
              <div className="mentor-card">
                <div className="mentor-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                    alt="Priya Patel" 
                    className="mentor-image"
                    loading="lazy"
                  />
                  <div className="mentor-initials">PP</div>
                  <div className="mentor-overlay">
                    <h3 className="mentor-name">Priya Patel</h3>
                    <p className="mentor-role">Data Science Lead at Amazon</p>
                    <p className="mentor-bio">
                      Data science expert with a focus on machine learning and AI. Loves breaking down complex concepts into easy-to-understand lessons.
                    </p>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mentor-linkedin"
                      aria-label="Connect on LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect
                    </a>
                  </div>
                </div>
              </div>

              {/* Mentor Card 4 - New Mentor */}
              <div className="mentor-card">
                <div className="mentor-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Rajesh Kumar" 
                    className="mentor-image"
                    loading="lazy"
                  />
                  <div className="mentor-initials">RK</div>
                  <div className="mentor-overlay">
                    <h3 className="mentor-name">Rajesh Kumar</h3>
                    <p className="mentor-role">AI/ML Lead at TechCorp</p>
                    <p className="mentor-bio">
                      Machine learning expert with 7+ years of experience in building scalable AI solutions. Specializes in deep learning, NLP, and computer vision applications.
                    </p>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mentor-linkedin"
                      aria-label="Connect on LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect
                    </a>
                  </div>
                </div>
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


        <section className="vision-mission reveal-on-scroll ">
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
        <section className="relative py-8 pb-4 mb-8 overflow-hidden reveal-on-scroll">
          <div className="absolute inset-0 top-0 h-[180px] z-0 overflow-hidden animated-dashed-line-container" aria-hidden="true">
            <svg className="w-full h-full block max-w-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
              <path 
                d="M0,120 C200,60 350,160 520,110 C720,50 880,140 1200,80" 
                fill="none" 
                stroke="#0F172A" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeDasharray="8 10" 
                className="opacity-60 animate-dash-move"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start w-full">
            <div className="flex flex-col items-center text-center gap-2 px-2">
              <div className="bg-transparent rounded-full w-[210px] h-[210px] mx-auto mb-4 flex flex-col items-center justify-center shadow-2xl relative transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_26px_48px_rgba(15,23,42,0.18)]" style={{ background: 'radial-gradient(80% 80% at 30% 30%, #fde68a, #f59e0b)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-[#0f172a] bg-white/90 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.7)]" aria-hidden>📘</div>
              </div>
              <h3 className="mt-1 text-xl font-extrabold text-[#0f172a]">High Quality Resources</h3>
              <p className="text-[#475569] text-[0.98rem] leading-[1.7] max-w-[28ch]">Curated content, real-world projects, and structured roadmaps to accelerate your growth.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 px-2">
              <div className="bg-transparent rounded-full w-[210px] h-[210px] mx-auto mb-4 flex flex-col items-center justify-center shadow-2xl relative transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_26px_48px_rgba(15,23,42,0.18)]" style={{ background: 'radial-gradient(80% 80% at 30% 30%, #cbd5e1, #0F172A)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-[#0f172a] bg-white/90 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.7)]" aria-hidden>🎓</div>
              </div>
              <h3 className="mt-1 text-xl font-extrabold text-[#0f172a]">Expert Instructors</h3>
              <p className="text-[#475569] text-[0.98rem] leading-[1.7] max-w-[28ch]">Guidance from seasoned industry professionals with practical, hands-on mentorship.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 px-2">
              <div className="bg-transparent rounded-full w-[210px] h-[210px] mx-auto mb-4 flex flex-col items-center justify-center shadow-2xl relative transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_26px_48px_rgba(15,23,42,0.18)]" style={{ background: 'radial-gradient(80% 80% at 30% 30%, #a7f3d0, #10b981)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-[#0f172a] bg-white/90 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.7)]" aria-hidden>🧭</div>
              </div>
              <h3 className="mt-1 text-xl font-extrabold text-[#0f172a]">Internship Portal Access</h3>
              <p className="text-[#475569] text-[0.98rem] leading-[1.7] max-w-[28ch]">Gain practical exposure with opportunities and verified certificates, all in one place.</p>
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
              href="https://www.startupindia.gov.in/content/sih/en/block-chain-recognized-certificate.html?DIPP=DIPP201797"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="achievement-image">
                <img src="https://www.inlighntech.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-30-at-16.32.01_07ba59ed-780x777.jpg" alt="Startup India Recognitions" loading="lazy" style={{objectFit: 'cover', backgroundColor: '#fff'}} />
                <span className="achievement-badge" aria-hidden>+</span>
              </div>
              <div className="achievement-texts">
                <p className="achievement-title">Startup India Recognitions</p>
                <p className="achievement-subtitle">Department for Promotion of Industry and Internal Trade Approved</p>
              </div>
            </a>
          </div>
        </section>


        <section className="contact-form-section reveal-on-scroll" aria-labelledby="contact-title">
        <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8">
                Get in Touch
              </h2>
              
              {submitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 sm:mb-6 animate-bounce">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank you for contacting us!</h3>
                  <p className="text-gray-600">Your email client should open shortly. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="domain" className="block text-sm font-semibold text-gray-700 mb-2">
                      Domain of Internship
                    </label>
                    <input
                      type="text"
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      placeholder="Enter your domain of interest"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 outline-none resize-y text-gray-900 placeholder-gray-400"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F172A] to-[#1e293b] text-white font-semibold py-3 sm:py-3.5 px-6 rounded-lg hover:from-[#1e293b] hover:to-[#0F172A] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}

export default AboutUs


