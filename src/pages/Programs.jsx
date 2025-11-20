import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './Page.css'

function Programs() {
  const programs = [
    {
      title: 'Full Stack Web Development',
      description: 'Master both frontend and backend technologies to build complete web applications.',
      duration: '6 months',
      level: 'Beginner to Advanced'
    },
    {
      title: 'Data Science & Analytics',
      description: 'Learn to analyze data, build predictive models, and extract valuable insights.',
      duration: '4 months',
      level: 'Intermediate'
    },
    {
      title: 'Cloud Computing',
      description: 'Get hands-on experience with AWS, Azure, and Google Cloud platforms.',
      duration: '3 months',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications for iOS and Android.',
      duration: '5 months',
      level: 'Beginner to Intermediate'
    },
    {
      title: 'Cybersecurity',
      description: 'Learn to protect systems and networks from cyber threats and attacks.',
      duration: '4 months',
      level: 'Intermediate'
    },
    {
      title: 'Machine Learning & AI',
      description: 'Dive deep into artificial intelligence and machine learning algorithms.',
      duration: '6 months',
      level: 'Advanced'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Our Programs</h1>
        <p className="page-subtitle">Choose the program that fits your career goals</p>
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <div className="program-details">
                <span className="program-duration">Duration: {program.duration}</span>
                <span className="program-level">Level: {program.level}</span>
              </div>
              <button className="program-button">Learn More</button>
            </div>
          ))}
        </div>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}

export default Programs

