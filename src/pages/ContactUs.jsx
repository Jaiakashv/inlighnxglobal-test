import { useState } from 'react'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './Page.css'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12 text-center" style={{ color: '#333333' }}>
          Contact Us
        </h1>
        
        {/* Contact Information Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#14b8a6' }}>
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Email Address Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e0f2fe' }}>
                <svg className="w-6 h-6" style={{ color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
                <p className="text-base font-semibold text-gray-900">info@inlighnx.com</p>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e0f2fe' }}>
                <svg className="w-6 h-6" style={{ color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Call Us</p>
                <p className="text-base font-semibold text-gray-900">+91 93288 2087</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Office Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#14b8a6' }}>
            Our Office
          </h2>
          
          <div className="max-w-4xl">
            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e0f2fe' }}>
                  <svg className="w-6 h-6" style={{ color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
                  <p className="text-base font-semibold text-gray-900">InLighnX Global Private Limited</p>
                  <p className="text-sm text-gray-600 mt-1">Your office address here</p>
                </div>
              </div>
              
              {/* Map Iframe */}
              <div className="w-full rounded-lg overflow-hidden" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.1234567890123!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}

export default ContactUs

