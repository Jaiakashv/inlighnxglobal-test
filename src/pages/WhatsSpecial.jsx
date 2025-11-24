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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', right: '10px', zIndex: 1 }}
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
      style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '10px', zIndex: 1 }}
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
      icon: <FaTrophy className="text-4xl text-[#14b8a6] mb-4" />,
      title: 'Interns of the Month',
      description: 'Recognizing outstanding interns who demonstrate exceptional skills and dedication.'
    },
    {
      icon: <FaLaptopCode className="text-4xl text-[#14b8a6] mb-4" />,
      title: 'Real Projects',
      description: 'Work on real-world projects that make an impact and build your portfolio.'
    },
    {
      icon: <FaUsers className="text-4xl text-[#14b8a6] mb-4" />,
      title: 'Mentorship',
      description: 'Learn from industry experts with years of experience in the field.'
    },
    {
      icon: <FaGraduationCap className="text-4xl text-[#14b8a6] mb-4" />,
      title: 'Career Growth',
      description: 'Gain valuable experience and skills to boost your career prospects.'
    }
  ];


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    touchMove: true,
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
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] text-white py-16 md:py-20 px-4">
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Internship Program?</h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6 md:mb-8"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              We provide a comprehensive learning experience that goes beyond traditional classroom education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#14b8a6]"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
                    className="inline-block bg-[#14b8a6] hover:bg-[#0d9488] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300"
                  >
                    {intern.ctaText}
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
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4">
              Intern Projects Showcase
            </h2>
            <div className="w-20 h-1 bg-[#14b8a6] mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Explore innovative projects developed by our talented interns. Each project demonstrates technical excellence and creative problem-solving.
            </p>
          </div>

          <div className="relative px-2 md:px-4">
            <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="hidden lg:flex absolute left-0 w-12 h-12 -ml-6 items-center justify-center text-gray-400 hover:text-[#14b8a6] transition-colors duration-200 bg-white rounded-full shadow-lg pointer-events-auto"
                aria-label="Previous project"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="hidden lg:flex absolute right-0 w-12 h-12 -mr-6 items-center justify-center text-gray-400 hover:text-[#14b8a6] transition-colors duration-200 bg-white rounded-full shadow-lg pointer-events-auto"
                aria-label="Next project"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
            <Slider {...sliderSettings} ref={sliderRef} className="py-4 md:py-8 group">
              {internProjects.map((project, index) => (
                <div key={index} className="px-2 focus:outline-none">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full hover:-translate-y-1">
                    <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden group">
                      <div className="absolute inset-0 bg-gray-100">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl mb-2 drop-shadow-md">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs bg-white/30 text-white px-2.5 md:px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors duration-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 text-[#14b8a6] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          View Details →
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 bg-white">
                      <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3 leading-relaxed">{project.description}</p>
                      <a 
                        href={project.ctaLink}
                        className="inline-flex items-center text-[#14b8a6] font-medium hover:text-[#0d9488] transition-colors duration-300 text-sm md:text-base group"
                      >
                        {project.ctaText}
                        <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
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
                  className="inline-block bg-[#14b8a6] hover:bg-[#0d9488] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Apply Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      <FloatingWhatsApp />
    </div>
  )
}

export default WhatsSpecial
