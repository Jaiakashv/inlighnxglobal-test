import './Page.css'

function AboutUs() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About Us</h1>
        <div className="page-section">
          <h2>Our Mission</h2>
          <p>
            At InLighn Tech, our mission is to empower individuals and organizations with
            the knowledge and skills needed to thrive in the rapidly evolving technology landscape.
            We believe in making quality education accessible to everyone.
          </p>
        </div>
        <div className="page-section">
          <h2>Our Vision</h2>
          <p>
            To become a leading technology education platform that bridges the gap between
            theoretical knowledge and practical application, creating a generation of skilled
            professionals ready to tackle real-world challenges.
          </p>
        </div>
        <div className="page-section">
          <h2>Our Values</h2>
          <ul className="feature-list">
            <li><strong>Excellence:</strong> We strive for the highest quality in everything we do</li>
            <li><strong>Innovation:</strong> We embrace new technologies and teaching methodologies</li>
            <li><strong>Integrity:</strong> We maintain transparency and honesty in all our interactions</li>
            <li><strong>Community:</strong> We foster a supportive learning environment</li>
            <li><strong>Growth:</strong> We are committed to continuous improvement</li>
          </ul>
        </div>
        <div className="page-section">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for technology education, InLighn Tech has been at the
            forefront of providing comprehensive training programs. Our team of experienced
            professionals brings years of industry expertise to help you succeed in your
            technology journey.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

