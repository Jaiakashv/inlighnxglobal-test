import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
// Import from react-icons/fa6
import { FaTrophy, FaLaptopCode, FaUsers, FaGraduationCap, FaChevronLeft, FaChevronRight, FaCheck, FaUserTie, FaBriefcase } from 'react-icons/fa6';
// Import from react-icons/fa
import { FaCalendarAlt, FaClipboardList, FaMedal, FaCertificate, FaAward, FaUserFriends, FaNetworkWired } from 'react-icons/fa';
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
  // Interns of the Month data
  const internsOfTheMonth = [
    {
      name: 'Intern of the Month',
      description: 'If you\'re in your last month of internship, you\'re eligible! You\'ll receive a Google Form to apply for this prestigious title!',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Apply Now',
      ctaLink: '#',
      month: 'November 2023'
    },
    {
      name: 'Top Performer',
      description: 'Recognizing interns who have demonstrated exceptional performance and dedication throughout their internship program.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Details',
      ctaLink: '#',
      month: 'October 2023'
    },
    {
      name: 'Innovation Champion',
      description: 'Awarded to interns who have shown outstanding creativity and innovation in their projects and problem-solving approaches.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Learn More',
      ctaLink: '#',
      month: 'September 2023'
    }
  ];

  // Intern Projects data
  const internProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with product listings, cart functionality, and secure payment integration.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      title: 'Task Management App',
      description: 'A productivity application for managing tasks, deadlines, and team collaboration in real-time.',
      image: 'https://images.unsplash.com/photo-1543285198-3af15c4592ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React Native', 'Firebase', 'Redux']
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing projects, skills, and professional experience.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Food Delivery App',
      description: 'A mobile application for ordering food from local restaurants with real-time order tracking.',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React Native', 'Node.js', 'MongoDB']
    },
    {
      title: 'Fitness Tracker',
      description: 'A comprehensive fitness tracking application with workout plans and progress monitoring.',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React', 'Firebase', 'Chart.js']
    },
    {
      title: 'Social Media Dashboard',
      description: 'An analytics dashboard for tracking social media metrics and engagement across multiple platforms.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'View Project',
      ctaLink: '#',
      tags: ['React', 'D3.js', 'Express', 'MongoDB']
    }
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
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
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
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] text-white py-16 md:py-20 px-4 mt-12">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What's Special About Our Program?</h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-200">
            Discover what makes our internship program unique and how it can shape your career in technology.
          </p>
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

      {/* Interns of the Month Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4">
              Interns of the Month Challenge
            </h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Every month, we recognize and reward our most outstanding interns who demonstrate exceptional skills and dedication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {internsOfTheMonth.map((intern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={intern.image} 
                    alt={intern.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg md:text-xl">{intern.name}</h3>
                    <p className="text-sm text-gray-200">{intern.month}</p>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">{intern.description}</p>
                  <a 
                    href={intern.ctaLink}
                    className="card-button"
                  >
                    <span>{intern.ctaText}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="bg-white/95 text-[#14b8a6] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl border border-[#14b8a6]/20"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          View Details →
                        </motion.span>
                      </motion.div>
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
                  href="/apply"
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
      <section className="py-16 bg-white">
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
              Our Events
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Ideathon Winner Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5622AQHThJRGCWH1ig/feedshare-shrink_800/B56ZpUz2VqHIAg-/0/1762359474505?e=1766016000&v=beta&t=u7WKkssOLT5eUqZ42qFqScFf1gT6QISZrFfg3eYXwdM" 
                  alt="Ideathon Winner"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow-lg">
                    <FaTrophy className="inline-block mr-2" />
                    <span className="font-semibold text-sm">Winners</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg">Ideathon Winner</h3>
                  <p className="text-gray-200 text-sm md:text-base">Innovation Challenge</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
                    Celebrating the Top 3 Innovators of Ideathon 2025! After an incredible journey of innovation, creativity, and impact-driven ideas — here are our Top 3 winners who truly stood out!
                  </p>
                  
                  <div className="space-y-4">
                    {/* First Place */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🥇</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1">Jyoti & Team — TwinDrive</h5>
                          <p className="text-sm text-gray-700 mb-2">An AI-powered 3D Digital Twin System for Vehicle Health Monitoring</p>
                          <p className="text-xs text-gray-600">Transforming automotive safety by predicting and preventing vehicle breakdowns in real time using AI.</p>
                        </div>
                      </div>
                    </div>

                    {/* Second Place */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border-l-4 border-gray-400">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🥈</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1">Jaiakash & Team — TravelFlux</h5>
                          <p className="text-sm text-gray-700 mb-2">AI Mobility Intelligence for Tier-2 & Tier-3 Cities</p>
                          <p className="text-xs text-gray-600">Forecasting future travel demand, traffic surges, and pricing — making mobility planning smarter and data-driven.</p>
                        </div>
                      </div>
                    </div>

                    {/* Third Place */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border-l-4 border-orange-600">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🥉</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1">Aaradhya & Team — Pathify</h5>
                          <p className="text-sm text-gray-700 mb-2">AI Career Pathway Platform for Students</p>
                          <p className="text-xs text-gray-600">Connecting learners, universities, and companies with intelligent career recommendations and skill roadmaps.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs mt-4 italic">
                    ✨ Congratulations to these brilliant innovators for redefining the future with technology and purpose!
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600 pt-4 border-t border-gray-200">
                  <FaCalendarAlt className="text-[#14b8a6] mr-2" />
                  <span>Event Conducted by InLighnX Global</span>
                </div>
              </div>
            </motion.div>

            {/* IITB Hackathon Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="IITB Hackathon"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow-lg">
                    <FaTrophy className="inline-block mr-2" />
                    <span className="font-semibold text-sm">Winner</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg">IITB Hackathon</h3>
                  <p className="text-gray-200 text-sm md:text-base">IIT Bombay Hackathon Competition</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="text-[#14b8a6] mr-2" />
                  <span>Event Conducted</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  )
}

export default WhatsSpecial
