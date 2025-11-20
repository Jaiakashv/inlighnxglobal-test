import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './Page.css'

function WhatsSpecial() {
  const specialFeatures = [
    {
      icon: '🎓',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience'
    },
    {
      icon: '💼',
      title: 'Industry-Relevant Curriculum',
      description: 'Courses designed based on current industry needs and trends'
    },
    {
      icon: '🛠️',
      title: 'Hands-On Projects',
      description: 'Build real-world projects that you can showcase in your portfolio'
    },
    {
      icon: '📜',
      title: 'Verified Certificates',
      description: 'Receive industry-recognized certificates upon course completion'
    },
    {
      icon: '👥',
      title: 'Community Support',
      description: 'Join a vibrant community of learners and professionals'
    },
    {
      icon: '🚀',
      title: 'Career Guidance',
      description: 'Get personalized career advice and job placement assistance'
    },
    {
      icon: '⏰',
      title: 'Flexible Learning',
      description: 'Learn at your own pace with lifetime access to course materials'
    },
    {
      icon: '💡',
      title: 'Cutting-Edge Technology',
      description: 'Stay updated with the latest tools and technologies in the industry'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>What's Special</h1>
        <p className="page-subtitle">Discover what makes InLighn Tech unique</p>
        
        <div className="special-features-grid">
          {specialFeatures.map((feature, index) => (
            <div key={index} className="special-feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="page-section highlight-section">
          <h2>Why InLighn Tech Stands Out</h2>
          <p>
            At InLighn Tech, we don't just teach technology—we create an immersive learning
            experience that prepares you for real-world challenges. Our unique approach combines
            theoretical knowledge with practical application, ensuring you're job-ready from day one.
          </p>
          <p>
            We understand that every learner is different, which is why we offer flexible learning
            paths, personalized mentorship, and continuous support throughout your journey. Join
            thousands of successful graduates who have transformed their careers with InLighn Tech.
          </p>
        </div>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}

export default WhatsSpecial

