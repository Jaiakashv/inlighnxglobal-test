import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
// Import from react-icons/fa6
import { FaTrophy, FaLaptopCode, FaUsers, FaGraduationCap, FaChevronLeft, FaChevronRight, FaCheck, FaUserTie, FaBriefcase, FaHandshake, FaArrowRight } from 'react-icons/fa6';
// Import from react-icons/fa
import { FaCalendarAlt, FaClipboardList, FaMedal, FaCertificate, FaAward, FaUserFriends, FaNetworkWired, FaInfoCircle, FaExternalLinkAlt, FaUniversity, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Page.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      <FaChevronRight className="text-white" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      <FaChevronLeft className="text-white" />
    </div>
  );
}

function WhatsSpecial() {
  const sliderRef = useRef(null);
  const eventsSliderRef = useRef(null);

  // Intern Projects data
  const internProjects = [
    {
      title: 'Tables in Database',
      description: 'Data Analysis of Tables in Database',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/07/Screenshot-2025-07-08-at-12.31.13%E2%80%AFPM.png',
      ctaText: 'View Project',
      ctaLink: 'https://www.linkedin.com/posts/avishee-dubey-152329278_sql-postgresql-dataanalysis-activity-7347958385717182464-nQwX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEfdUx0Bju2m32WJAuF-DbWdByJKlYPEGZE',
      tags: ['PostgreSQL + pgAdmin 4 ', 'Excel + CSVs', 'Canva ', 'Github']
    },
    {
      title: 'Subdomain Enumeration Tool',
      description: 'Subdomain Enumeration Tool in Cybersecurity',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-27-155243.png',
      ctaText: 'View Project',
      ctaLink: 'https://drive.google.com/file/d/1zg2KJ6PJJlG3-FY0_tjAewfP0xcpxr1e/view',
      tags: ['Cybersecurity', 'Python', 'Github']
    },
    {
      title: 'PDF Protector Tool',
      description: 'PDF Protector Tool in Cybersecurity',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-27-155434.png',
      ctaText: 'View Project',
      ctaLink: 'https://docs.google.com/presentation/d/1CUslcz6XM013FIqp90nNddkD1va4bm77/edit?slide=id.p1#slide=id.p1',
      tags: ['Cybersecurity', 'Python', 'Github']
    },
    {
      title: 'Amazon Sales Dashboard',
      description: 'Amazon Sales Dashboard using data analysis',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-27-155626.png',
      ctaText: 'View Project',
      ctaLink: 'https://github.com/G-arimaP/Excel-Project/blob/main/Amazon%20Dashboard.xlsx',
      tags: ['Data Analysis', 'Python', 'Github', 'PowerBI']
    },
    {
      title: 'Nova – Voice-Activated AI Assistant',
      description: 'Nova – Voice-Activated AI Assistant',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/04/Screenshot-2025-04-27-155900.png',
      ctaText: 'View Project',
      ctaLink: 'https://drive.google.com/file/d/1M8oX1FyaiXdv6kIwwoxRNEP37YPoLRS8/view',
      tags: ['React', 'Firebase', 'Chart.js']
    },
    {
      title: 'Python Programming Projects',
      description: 'Python Programming Projects',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/05/Screenshot-2025-05-24-130059.png',
      ctaText: 'View Project',
      ctaLink: 'https://drive.google.com/file/d/1HXIhDx4CIn3ajKDgij7hfDzEqpJNbLsh/view',
      tags: ['Python', 'Github']
    },
    {
      title: 'AI interview Mocker',
      description: 'Webdevelopment',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/07/Screenshot-2025-07-08-at-12.33.47%E2%80%AFPM.png',
      ctaText: 'View Project',
      ctaLink: 'https://ai-mock-interview-sonia-sharmas-projects.vercel.app/sign-in?redirect_url=https%3A%2F%2Fai-mock-interview-sonia-sharmas-projects.vercel.app%2Fdashboard%2Finterview%2F335eb553-8aca-43df-81fc-1763dc551a67%2Fstart',
      tags: ['Webdevelopment', 'Hosting','Github']
    },
    {
      title: 'Flipkart Sales Dashboard',
      description: 'Flipkart Sales Dashboard using data analysis',
      image: 'https://www.inlighntech.com/wp-content/uploads/2025/07/Screenshot-2025-07-08-at-12.37.26%E2%80%AFPM.png',
      ctaText: 'View Project',
      ctaLink: 'https://www.linkedin.com/posts/jotham-bhattacharya-a51346230_powerbi-businessanalytics-dashboarddesign-activity-7345348066977185792-jnbZ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnT9RcBLXg7RhZ1-KtA7oqpHgC5uaS2NV4',
      tags: ['Data Analysis', 'Python', 'Github', 'PowerBI']
    },
  ];

  // Features data
  const features = [
    {
      icon: <FaTrophy className="text-4xl text-[#252c30] mb-4" />,
      title: 'Interns of the Month',
      description: 'Recognizing outstanding interns who demonstrate exceptional skills and dedication.'
    },
    {
      icon: <FaLaptopCode className="text-4xl text-[#252c30] mb-4" />,
      title: 'Real Projects',
      description: 'Work on real-world projects that make an impact and build your portfolio.'
    },
    {
      icon: <FaUsers className="text-4xl text-[#252c30] mb-4" />,
      title: 'Mentorship',
      description: 'Learn from industry experts with years of experience in the field.'
    },
    {
      icon: <FaGraduationCap className="text-4xl text-[#252c30] mb-4" />,
      title: 'Career Growth',
      description: 'Gain valuable experience and skills to boost your career prospects.'
    }
  ];


  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  arrows: false,
  swipe: true,
  swipeToSlide: true,
  draggable: true,
  touchMove: true,
  cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 820,      // broader breakpoint for many phones/tablets
      settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false, centerPadding: "0px" }
    },
    {
      breakpoint: 480,      // very small devices
      settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false, centerPadding: "0px" }
    }
  ]
};


  return (
    <div className="min-h-screen bg-white">
      <style>{`
        /* Custom slick carousel dots styling to match theme */
        .slick-dots li button:before {
          color: #14b8a6 !important;
          opacity: 0.5 !important;
        }
        .slick-dots li.slick-active button:before {
          color: #14b8a6 !important;
          opacity: 1 !important;
        }
        .slick-dots li button:hover:before {
          color: #0d9488 !important;
          opacity: 0.8 !important;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 mt-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#1e293b]/80 to-[#0F172A]/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
            alt="E-learning background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <div className="max-w-4xl mx-auto bg-transparent rounded-2xl p-8 md:p-12 shadow-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What's Special About Our Program?
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Discover what makes our internship program unique and how it can shape your career in technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                to="/programs" 
                style={{color : 'white' }}
                className="px-8 py-3 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white font-semibold rounded-full hover:from-[#e55a2b] hover:to-[#ff6b35] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Programs
              </Link>
              <Link 
                to="/contact-us" 
                style={{color : 'white' }}
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeIn" }}
            >
              Why Choose Our Internship Program?
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-[#252c30] mx-auto mb-6 md:mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeIn" }}
            ></motion.div>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeIn" }}
            >
              We provide a comprehensive learning experience that goes beyond traditional classroom education.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1), ease: "easeIn" }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#252c30]"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Projects Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeIn" }}
            >
              Intern Projects Showcase
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeIn" }}
            ></motion.div>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeIn" }}
            >
              Explore innovative projects developed by our talented interns. Each project demonstrates technical excellence and creative problem-solving.
            </motion.p>
          </motion.div>

          <motion.div 
            className="relative px-2 md:px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
          >
            <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
              <motion.button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="hidden lg:flex absolute left-0 w-11 h-11 -ml-7 items-center justify-center text-gray-500 hover:text-white transition-all duration-300 bg-white hover:bg-[#14b8a6] rounded-full shadow-xl hover:shadow-2xl pointer-events-auto border border-gray-200 hover:border-[#14b8a6]"
                aria-label="Previous project"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FaChevronLeft className="text-xl" />
              </motion.button>
              <motion.button 
                onClick={() => sliderRef.current?.slickNext()}
                className="hidden lg:flex absolute right-0 w-11 h-11 -mr-7 items-center justify-center text-gray-500 hover:text-white transition-all duration-300 bg-white hover:bg-[#14b8a6] rounded-full shadow-xl hover:shadow-2xl pointer-events-auto border border-gray-200 hover:border-[#14b8a6]"
                aria-label="Next project"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FaChevronRight className="text-xl" />
              </motion.button>
            </div>
            <Slider {...sliderSettings} ref={sliderRef} className="py-4 md:py-8 group">
              {internProjects.map((project, index) => (
                <motion.div 
                  key={index} 
                  className="px-2 focus:outline-none"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (index * 0.1), 
                    ease: "easeOut" 
                  }}
                >
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden group">
                      <motion.div 
                        className="absolute inset-0 bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                      >
                        <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl mb-3 drop-shadow-lg">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <motion.span 
                              key={tagIndex} 
                              className="text-xs bg-white/30 text-white px-2.5 md:px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all duration-300 border border-white/20"
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) + (tagIndex * 0.05) }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.a 
                        href={project.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="bg-white/95 text-[#14b8a6] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl border border-[#14b8a6]/20 cursor-pointer"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                          transition={{ duration: 0.2 }}
                        >
                          View Details →
                        </motion.span>
                      </motion.a>
                    </div>
                    <div className="p-5 md:p-6 bg-white">
                      <p className="text-gray-600 mb-5 text-sm md:text-base line-clamp-3 leading-relaxed min-h-[4.5rem]">{project.description}</p>
                      <motion.a 
                        href={project.ctaLink}
                        className="inline-flex items-center text-[#14b8a6] font-semibold hover:text-[#0d9488] transition-colors duration-300 text-sm md:text-base group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.ctaText}
                        <motion.svg 
                          className="w-4 h-4 md:w-5 md:h-5 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      {/* How to Participate Section */}
      <section className="py-16 bg-gradient-to-b from-[#0F172A] via-[#1e293b] to-[#0F172A]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How to Participate?</h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Follow these simple steps to join our internship program and kickstart your career in technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-20 h-20 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaClipboardList className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Apply Online</h3>
                <p className="text-gray-600 text-sm md:text-base">Fill out our online application form with your details and upload your resume.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-20 h-20 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCalendarAlt className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Schedule Interview</h3>
                <p className="text-gray-600 text-sm md:text-base">If shortlisted, schedule an interview with our team to discuss your skills and interests.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-20 h-20 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Get Selected</h3>
                <p className="text-gray-600 text-sm md:text-base">Successful candidates will receive an offer letter and onboarding details.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules & Selection Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Rules & Selection Process</h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Our transparent selection process ensures we find the best talent for our internship program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaUserTie className="text-3xl text-[#14b8a6] mb-4" />,
                title: 'Eligibility',
                items: [
                  'Currently enrolled in a degree program',
                  'Basic programming knowledge',
                  'Passion for technology',
                  'Good communication skills'
                ]
              },
              {
                icon: <FaClipboardList className="text-3xl text-[#14b8a6] mb-4" />,
                title: 'Application',
                items: [
                  'Submit online application',
                  'Attach updated resume',
                  'Portfolio (if applicable)',
                  'Cover letter (optional)'
                ]
              },
              {
                icon: <FaMedal className="text-3xl text-[#14b8a6] mb-4" />,
                title: 'Selection',
                items: [
                  'Resume screening',
                  'Technical assessment',
                  'Interview round',
                  'Final selection'
                ]
              },
              {
                icon: <FaCalendarAlt className="text-3xl text-[#14b8a6] mb-4" />,
                title: 'Duration',
                items: [
                  'Minimum 3 months',
                  'Flexible start dates',
                  'Full-time/Part-time options',
                  'Possibility of extension'
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#14b8a6] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm md:text-base">{listItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Perks & Benefits</h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              We offer a comprehensive package to help you grow both professionally and personally.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Internship Certificate"
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#14b8a6] text-white p-4 rounded-full shadow-lg">
                    <FaCertificate className="text-3xl" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FaAward className="text-2xl text-[#14b8a6]" />,
                    title: 'Certificate',
                    description: 'Earn a certificate upon successful completion of the internship.'
                  },
                  {
                    icon: <FaUserFriends className="text-2xl text-[#14b8a6]" />,
                    title: 'Mentorship',
                    description: 'Guidance from industry experts throughout your internship.'
                  },
                  {
                    icon: <FaNetworkWired className="text-2xl text-[#14b8a6]" />,
                    title: 'Networking',
                    description: 'Connect with professionals and like-minded individuals.'
                  },
                  {
                    icon: <FaBriefcase className="text-2xl text-[#14b8a6]" />,
                    title: 'Job Opportunities',
                    description: 'Potential full-time employment opportunities based on performance.'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-teal-50 p-3 rounded-full">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 text-center md:text-left"
              >
                <a
                  href="https://www.youtube.com/watch?v=w07el7UywbQ"
                  className="card-button"
                >
                  <span>Apply Now</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Events Section */}
      <section className="py-16 bg-white w-full">
        <div className="w-full">
          <div className="container mx-auto px-4 max-w-7xl mb-12 md:mb-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeIn" }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeIn" }}
              >
                Our Events & Sponsorship
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeIn" }}
              ></motion.div>
              <motion.p 
                className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeIn" }}
              >
                Celebrating our achievements and recognizing outstanding participants in various competitions and hackathons.
              </motion.p>
            </motion.div>
          </div>

          <div className="relative w-full flex justify-center">
            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
              <motion.button 
                onClick={() => eventsSliderRef.current?.slickPrev()}
                className="hidden lg:flex absolute left-4 xl:left-8 w-11 h-11 items-center justify-center text-gray-500 hover:text-white transition-all duration-300 bg-white hover:bg-[#14b8a6] rounded-full shadow-xl hover:shadow-2xl pointer-events-auto border border-gray-200 hover:border-[#14b8a6] z-20"
                aria-label="Previous event"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FaChevronLeft className="text-xl" />
              </motion.button>
              <motion.button 
                onClick={() => eventsSliderRef.current?.slickNext()}
                className="hidden lg:flex absolute right-4 xl:right-8 w-11 h-11 items-center justify-center text-gray-500 hover:text-white transition-all duration-300 bg-white hover:bg-[#14b8a6] rounded-full shadow-xl hover:shadow-2xl pointer-events-auto border border-gray-200 hover:border-[#14b8a6] z-20"
                aria-label="Next event"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FaChevronRight className="text-xl" />
              </motion.button>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4">
              <Slider 
                ref={eventsSliderRef}
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={5000}
                pauseOnHover={true}
                arrows={false}
                className="py-4"
              >
                {/* Ideathon Winner Event */}
                <div className="px-2 focus:outline-none">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col lg:flex-row min-h-[450px]">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto lg:w-3/5 lg:min-h-[450px] overflow-hidden flex items-center justify-center bg-gray-100">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D5622AQHThJRGCWH1ig/feedshare-shrink_800/B56ZpUz2VqHIAg-/0/1762359474505?e=1766016000&v=beta&t=u7WKkssOLT5eUqZ42qFqScFf1gT6QISZrFfg3eYXwdM" 
                        alt="Ideathon Winner"
                        className="w-full h-full object-contain lg:object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow-lg">
                          <FaTrophy className="inline-block mr-2" />
                          <span className="font-semibold text-sm">Winners</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg">Ideathon Winner</h3>
                        <p className="text-gray-200 text-sm md:text-base">Innovation Challenge</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col justify-center">
                      <p className="text-gray-700 text-sm md:text-base mb-5 leading-relaxed">
                        Celebrating the Top 3 Innovators of Ideathon 2025! After an incredible journey of innovation, creativity, and impact-driven ideas — here are our Top 3 winners who truly stood out!
                      </p>
                      
                      {/* Winners in Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                        {/* First Place */}
                        <div className="bg-gradient-to-b from-yellow-50 to-amber-50 p-3 rounded-lg border-l-4 border-yellow-500 flex flex-col justify-between">
                          <div className="text-center">
                            <span className="text-2xl block mb-2">🥇</span>
                            <h5 className="font-semibold text-gray-800 text-xs mb-1">Jyoti & Team</h5>
                            <p className="text-xs font-semibold text-gray-700 mb-1">TwinDrive</p>
                            <p className="text-xs text-gray-600 leading-tight">AI-powered 3D Digital Twin System for Vehicle Health Monitoring</p>
                          </div>
                        </div>

                        {/* Second Place */}
                        <div className="bg-gradient-to-b from-gray-50 to-slate-50 p-3 rounded-lg border-l-4 border-gray-400 flex flex-col justify-between">
                          <div className="text-center">
                            <span className="text-2xl block mb-2">🥈</span>
                            <h5 className="font-semibold text-gray-800 text-xs mb-1">Jaiakash & Team</h5>
                            <p className="text-xs font-semibold text-gray-700 mb-1">TravelFlux</p>
                            <p className="text-xs text-gray-600 leading-tight">AI Mobility Intelligence for Tier-2 & Tier-3 Cities</p>
                          </div>
                        </div>

                        {/* Third Place */}
                        <div className="bg-gradient-to-b from-orange-50 to-amber-50 p-3 rounded-lg border-l-4 border-orange-600 flex flex-col justify-between">
                          <div className="text-center">
                            <span className="text-2xl block mb-2">🥉</span>
                            <h5 className="font-semibold text-gray-800 text-xs mb-1">Aaradhya & Team</h5>
                            <p className="text-xs font-semibold text-gray-700 mb-1">Pathify</p>
                            <p className="text-xs text-gray-600 leading-tight">AI Career Pathway Platform for Students</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs mb-4 italic text-center lg:text-left">
                        ✨ Congratulations to these brilliant innovators for redefining the future with technology and purpose!
                      </p>
                      
                      <div className="flex items-center justify-center lg:justify-start text-sm text-gray-600 pt-4 border-t border-gray-200">
                        <FaCalendarAlt className="text-[#14b8a6] mr-2" />
                        <span>Event Conducted by InLighnX Global</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IITB Hackathon Event */}
              <div className="px-2 focus:outline-none">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col lg:flex-row min-h-[450px]">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto lg:w-3/5 lg:min-h-[450px] overflow-hidden flex items-center justify-center bg-gray-100">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D4E22AQGRY9jvA2emJA/feedshare-shrink_1280/B4EZdoY5NjHIAk-/0/1749803052112?e=2147483647&v=beta&t=C1ehqQrDFwlLNx6au9UpUXGg7QSu8u2XdVbSZ_-fPqU" 
                        alt="IITB Hackathon"
                        className="w-full h-150 object-cover lg:object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow-lg">
                          <FaTrophy className="inline-block mr-2" />
                          <span className="font-semibold text-sm">Winner</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg">IITB Hackathon</h3>
                        <p className="text-gray-200 text-sm md:text-base">IIT Bombay Hackathon Competition</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-2/5 p-6 lg:p-8 flex items-center justify-center">
                      <div className="max-w-md">
                        <div className="flex items-center mb-4">
                          <div className="bg-[#14b8a6] p-2 rounded-lg mr-3">
                            <FaHandshake className="text-white text-xl" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Our Partnership</h3>
                        </div>
                        
                        <div className="space-y-4 text-gray-600">
                          <p className="text-sm leading-relaxed">
                            We're proud to be the <span className="font-semibold text-[#14b8a6]">Sponsorship Partner</span> for Frontend Battle 2025 – 2nd Edition, hosted by WebnD!
                          </p>
                          
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r">
                            <p className="text-xs text-amber-800">
                              <FaInfoCircle className="inline mr-1" />
                              Join us in this exciting journey of innovation and code!
                            </p>
                          </div>
                          
                          <p className="text-sm leading-relaxed">
                            This collaboration marks a significant step in bringing together the brightest minds in frontend development. With Inlighn Tech's support, we're gearing up for a bigger, bolder, and more impactful competition.
                          </p>
                          
                          <div className="pt-2">
                            <a 
                              href="https://www.linkedin.com/posts/webd-iitbbs_webnd-iitbhubaneswar-frontendbattle-activity-7339205948038606848-NTIr?utm_source=li_share&utm_content=feedcontent&utm_medium=g_dt_web&utm_campaign=copy" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{color:'white'}}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#14b8a6] to-teal-600  text-sm font-medium rounded-md hover:shadow-md transition-all duration-200"
                            >
                              Learn More About the Event
                              <FaArrowRight className="ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hack Summit 2025 Event */}
              <div className="px-2 focus:outline-none mt-8">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col lg:flex-row min-h-[450px]">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto lg:w-3/5 lg:min-h-[450px] overflow-hidden flex items-center justify-center bg-gray-100">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D5622AQH6xJx0FduCsw/feedshare-shrink_800/B56ZbTug8JGsAg-/0/1747308909135?e=2147483647&v=beta&t=Vs6yXzyGbKOHXBNk2NGRd8Ggql_WzIS9kbqbGoS5fyU" 
                        alt="Hack Summit 2025 at PACE"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow-lg">
                          <FaCalendarAlt className="inline-block mr-2" />
                          <span className="font-semibold text-sm">May 15-16, 2025</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-2/5 p-6 lg:p-8 flex items-center justify-center">
                      <div className="max-w-md">
                        <div className="flex items-center mb-4">
                          <div className="bg-[#14b8a6] p-2 rounded-lg mr-3">
                            <FaTrophy className="text-white text-xl" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Hack Summit 2025</h3>
                        </div>
                        
                        <div className="space-y-4 text-gray-600">
                          <p className="text-sm leading-relaxed">
                            Thrilled to announce that InlighnX Global is proudly sponsoring Hack Summit 2025 at P.A. College of Engineering, Mangalore! 🚀 This 24-hour hackathon, powered by GD Edu Tech, is bringing together brilliant minds to innovate and collaborate. 💻
                          </p>

                          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                            <p className="text-xs text-blue-800">
                              <FaInfoCircle className="inline mr-1" />
                              Special thanks to Mohammed Bilal, President of GLUG PACE, for this opportunity!
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Organized by:</p>
                            <ul className="grid grid-cols-2 gap-2 text-xs">
                              <li className="flex items-center"><FaUniversity className="mr-1 text-[#14b8a6]" /> P A College of Engineering</li>
                              <li className="flex items-center"><FaGraduationCap className="mr-1 text-[#14b8a6]" /> Department of CS</li>
                              <li className="flex items-center"><FaUsers className="mr-1 text-[#14b8a6]" /> GD Edu Tech</li>
                              <li className="flex items-center"><FaNetworkWired className="mr-1 text-[#14b8a6]" /> IEEE Mangalore</li>
                              <li className="flex items-center"><FaLaptopCode className="mr-1 text-[#14b8a6]" /> GLUG PACE</li>
                            </ul>
                          </div>

                          <p className="text-sm leading-relaxed">
                            At InlighnX Global, we're passionate about fostering innovation and empowering the next generation of tech leaders. Join us at Hack Summit 2025 to witness creativity in action! 💡
                          </p>

                          <div className="pt-2">
                            <a 
                              href="https://www.linkedin.com/posts/inlighn-tech_pacollegeofengineeringmangalore-hacksummit2025-activity-7328744752240046080-PFOS?utm_source=li_share&utm_content=feedcontent&utm_medium=g_dt_web&utm_campaign=copy" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{color:'white'}}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#14b8a6] to-teal-600 text-white text-sm font-medium rounded-md hover:shadow-md transition-all duration-200"
                            >
                              View Event Details
                              <FaExternalLinkAlt className="ml-2 text-xs" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement and Recognition Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievement and Recognition
            </h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-8">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5622AQFM2HTwXoSnRg/feedshare-shrink_1280/B56ZnpFlO6HUAs-/0/1760552181859?e=2147483647&v=beta&t=jN4MPVa6QoxKucJwBGIn0wwpUAWiuvCy2-TeCmNG300" 
                  alt="Bharat Business Award"
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="bg-[#14b8a6] p-3 rounded-lg mr-4">
                    <FaTrophy className="text-white text-2xl" />
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
                      <FaQuoteLeft className="inline mr-1 text-amber-400" />
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
      </section>
    
      <FloatingWhatsApp />
    </div>
  )
}

export default WhatsSpecial
