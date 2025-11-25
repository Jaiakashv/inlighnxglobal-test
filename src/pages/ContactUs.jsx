import { useState } from 'react'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    otherDomain: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [hoveredOffice, setHoveredOffice] = useState(null)

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Map embed URLs for each office using standard Google Maps embed
  const officeMaps = {
    corporate: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62214.544675061334!2d77.60007038796358!3d12.945657267494292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae173ecba2d963%3A0xdb979f5f7974e8da!2sWeWork%20Prestige%20Central%20-%20Coworking%20%26%20Office%20Space%20in%20Infantry%20Road%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1764035923335!5m2!1sen!2sin%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade",
    lucknow: "https://www.google.com/maps?q=B1-722,+DLF+MyPad,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010&output=embed",
    registered: "https://www.google.com/maps?q=Opposite+Swasti+Hospital,+Anupam+Nagar,+Bareilly,+Uttar+Pradesh+243001&output=embed"
  }

  const faqs = [
    {
      question: "What makes Inlighn tech different from other learning platforms?",
      answer: "InLighnX Global stands out with its comprehensive internship programs that combine real-world projects, industry mentorship, and hands-on experience. We focus on practical skills development through live projects, ensuring our interns are job-ready upon completion. Our programs are designed in collaboration with industry experts and offer certificates that are recognized by leading companies."
    },
    {
      question: "How can I register for an internship?",
      answer: "You can register for an internship by filling out the contact form above or visiting our website's registration page. Simply provide your details including your name, email, and the domain of internship you're interested in. Our team will reach out to you with further details about the program, eligibility criteria, and the application process."
    },
    {
      question: "What domains are available for internships?",
      answer: "We offer internships across various domains including Web Development, Mobile App Development, Data Science, Machine Learning, UI/UX Design, Digital Marketing, Content Writing, and many more. The exact domains may vary based on current availability. Please specify your area of interest in the contact form, and we'll guide you accordingly."
    },
    {
      question: "Are the internship certificates verified?",
      answer: "Yes, all our internship certificates are verified and can be checked using the certificate verification system on our website. Each intern receives a unique Intern ID that can be used to verify the authenticity of their certificate. This ensures transparency and helps employers validate the credentials."
    },
    {
      question: "What is the duration of the internship programs?",
      answer: "Our internship programs typically range from 1 to 6 months, depending on the domain and complexity of the projects. The duration is designed to provide sufficient time for skill development while accommodating different learning paces. Specific program durations will be communicated during the registration process."
    },
    {
      question: "Is there any fee for the internship program?",
      answer: "Please contact us directly through the contact form or email us at inlighnxglobal@gmail.com to get detailed information about program fees, payment plans, and any available scholarships or financial assistance options. We're committed to making quality education accessible to all."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 mt-8 sm:mt-12">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Get in touch with us. We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Information Section */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
                Contact Information
              </h2>
              
              {/* Primary Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <div className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Email Address</h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">info@inlighntech.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">+91 9368842663</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices Section */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Offices</h3>
                
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Corporate Office */}
                  <div 
                    className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300 hover:-translate-y-1 relative"
                    onMouseEnter={() => setHoveredOffice('corporate')}
                    onMouseLeave={() => setHoveredOffice(null)}
                  >
                    <div 
                      className="flex items-start space-x-3 sm:space-x-4 cursor-pointer"
                      onClick={() => setHoveredOffice(hoveredOffice === 'corporate' ? null : 'corporate')}
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Corporate Office</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          VO-301, WeWork Prestige Central, Ground Floor,<br className="hidden sm:block"/>
                          38, Infantry Rd, Tasker Town,<br className="hidden sm:block"/>
                          Shivaji Nagar, Bengaluru,<br className="hidden sm:block"/>
                          Karnataka 560001
                        </p>
                      </div>
                    </div>
                    <div 
                      className={`mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-500 ease-in-out transform ${
                        hoveredOffice === 'corporate'
                          ? 'opacity-100 max-h-[400px] translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 max-h-0 -translate-y-4 scale-95 pointer-events-none overflow-hidden'
                      }`}
                      style={{ transition: 'opacity 0.5s ease-in-out, max-height 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                    >
                      <iframe
                        src={officeMaps.corporate}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                        title="Corporate Office Location"
                      ></iframe>
                    </div>
                  </div>

                  {/* Lucknow Office */}
                  <div 
                    className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 hover:-translate-y-1 relative"
                    onMouseEnter={() => setHoveredOffice('lucknow')}
                    onMouseLeave={() => setHoveredOffice(null)}
                  >
                    <div 
                      className="flex items-start space-x-3 sm:space-x-4 cursor-pointer"
                      onClick={() => setHoveredOffice(hoveredOffice === 'lucknow' ? null : 'lucknow')}
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Lucknow Office</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          B1- 722, DLF MyPad,<br className="hidden sm:block"/>
                          Gomti Nagar,<br className="hidden sm:block"/>
                          Lucknow, Uttar Pradesh<br className="hidden sm:block"/>
                          226010
                        </p>
                      </div>
                    </div>
                    <div 
                      className={`mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-500 ease-in-out transform ${
                        hoveredOffice === 'lucknow'
                          ? 'opacity-100 max-h-[400px] translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 max-h-0 -translate-y-4 scale-95 pointer-events-none overflow-hidden'
                      }`}
                      style={{ transition: 'opacity 0.5s ease-in-out, max-height 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                    >
                      <iframe
                        src={officeMaps.lucknow}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                        title="Lucknow Office Location"
                      ></iframe>
                    </div>
                  </div>

                  {/* Registered Office */}
                  <div 
                    className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1 relative"
                    onMouseEnter={() => setHoveredOffice('registered')}
                    onMouseLeave={() => setHoveredOffice(null)}
                  >
                    <div 
                      className="flex items-start space-x-3 sm:space-x-4 cursor-pointer"
                      onClick={() => setHoveredOffice(hoveredOffice === 'registered' ? null : 'registered')}
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Registered Office</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          Opposite Swasti Hospital<br className="hidden sm:block"/>
                          Anupam Nagar,<br className="hidden sm:block"/>
                          Bareilly, Uttar Pradesh<br className="hidden sm:block"/>
                          243001
                        </p>
                      </div>
                    </div>
                    <div 
                      className={`mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-500 ease-in-out transform ${
                        hoveredOffice === 'registered'
                          ? 'opacity-100 max-h-[400px] translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 max-h-0 -translate-y-4 scale-95 pointer-events-none overflow-hidden'
                      }`}
                      style={{ transition: 'opacity 0.5s ease-in-out, max-height 0.5s ease-in-out, transform 0.5s ease-in-out' }}
                    >
                      <iframe
                        src={officeMaps.registered}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                        title="Registered Office Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8">
                Send us a Message
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
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Find answers to common questions about our internship programs
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === index 
                    ? 'shadow-2xl ring-2 ring-teal-500/20 scale-[1.01]' 
                    : 'shadow-md hover:shadow-lg border border-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 flex items-center justify-between text-left group hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 sm:mt-2.5 transition-all duration-300 ${
                      openFaq === index 
                        ? 'bg-teal-500 scale-150' 
                        : 'bg-gray-300 group-hover:bg-teal-400'
                    }`}></div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg leading-relaxed text-white transition-colors duration-200 pr-2">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        openFaq === index
                          ? 'bg-teal-500 text-white rotate-180'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-teal-500 group-hover:text-white rotate-0'
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === index 
                      ? 'max-h-[1000px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 pl-8 sm:pl-10 md:pl-12 lg:pl-14">
                    <div className="h-px bg-gradient-to-r from-teal-500/20 via-teal-300/30 to-transparent mb-4 sm:mb-5"></div>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-6 sm:leading-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs;