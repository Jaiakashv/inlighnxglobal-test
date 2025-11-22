import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Programs from './pages/Programs'
import VerifyCertificate from './pages/VerifyCertificate'
import WhatsSpecial from './pages/WhatsSpecial'
import ContactUs from './pages/ContactUs'
import CourseDetail from './components/CourseDetail'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/programs/:courseSlug" element={<CourseDetail />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/whats-special" element={<WhatsSpecial />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

