import React from "react";
import { Boxes } from '../components/ui/BackgroundBoxes';
import TiltedCard from '../components/TiltedCard';
import { cn } from "../lib/utils";
import './Page.css';
import titleimg from '../assets/title-card.jpg';
function Home() {
  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-overlay" />
        <Boxes />
        <div className="home-content-wrapper">
          <div className="home-content">
            <h1 className={cn("home-title")}>
              Transform Your Career with
            </h1>
            <h2 className={cn("home-company-name")}>
              InLighnX
            </h2>
            <h2 className={cn("home-company-name")}>
              Global Private
            </h2>
            <h2 className={cn("home-company-name")}>
              Limited
            </h2>
            <p className="home-description">
              Gain real-world experience with our immersive internship programs in Cyber Security, Full Stack Development, Data Science, Data Analyst and in various tech domains. Learn today, lead tomorrow.
            </p>
            <button className="home-cta-button">Explore Internships</button>
          </div>
          <div className="home-tilted-card-wrapper">
            <TiltedCard
              imageSrc={titleimg}
              altText="E-Learning for Career Growth"
              captionText="Empower Your Career with InlighnX Global"
              containerHeight="450px"
              containerWidth="350px"
              imageHeight="450px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text text-white text-center font-semibold">
                  "Learn. Grow. Succeed — Build your Career with InlighnX Global"
                </p>
              }
            />
          </div>
        </div>
      </div>
      
      <div className="page-content">
        <div className="page-section">
          <h2>Transform Your Future with Technology</h2>
          <p>
            At InLighn Tech, we provide cutting-edge technology education and training programs
            designed to help you excel in the digital world. Our comprehensive courses cover
            everything from programming fundamentals to advanced software development.
          </p>
        </div>
        <div className="page-section">
          <h2>Why Choose Us?</h2>
          <ul className="feature-list">
            <li>Expert instructors with industry experience</li>
            <li>Hands-on projects and real-world applications</li>
            <li>Flexible learning schedules</li>
            <li>Industry-recognized certificates</li>
            <li>Career support and guidance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
