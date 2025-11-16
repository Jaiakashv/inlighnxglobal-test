import { useState } from 'react'
import './Page.css'
import logo from '../assets/logo.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Helper function to format date from DD-MM-YYYY to DD/MM/YYYY
const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return '';
  // If already in DD-MM-YYYY format, convert to DD/MM/YYYY
  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    return dateStr.replace(/-/g, '/');
  }
  return dateStr;
}

function VerifyCertificate() {
  const [internId, setInternId] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()
    
    if (!internId.trim()) {
      setVerificationResult({
        valid: false,
        message: 'Please enter a valid Intern ID'
      })
      return
    }

    setLoading(true)
    setVerificationResult(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify/${internId.trim()}`)
      const data = await response.json()
      
      setVerificationResult(data)
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationResult({
        valid: false,
        message: 'Failed to connect to the server. Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Verify Certificate</h1>
        <p className="page-subtitle">Enter your Intern ID to verify your internship certificate</p>
        
        <div className="verify-section">
          <form onSubmit={handleVerify} className="verify-form">
            <div className="form-group">
              <label htmlFor="internId">Intern ID</label>
              <input
                type="text"
                id="internId"
                value={internId}
                onChange={(e) => setInternId(e.target.value)}
                placeholder="Enter your Intern ID (e.g., ITID00001)"
                className="certificate-input"
              />
            </div>
            <button type="submit" className="verify-button" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Certificate'}
            </button>
          </form>
          {!verificationResult && (
            <h4>Enter your Intern ID (e.g., ITID00001) in the field above to verify your internship certificate. You can find your Intern ID on your offer letter or experience letter.</h4>
          )}

          {verificationResult && (
            <>
              {verificationResult.valid ? (
                <div className="certificate-wrapper">
                  <div className="certificate-container">
                    {/* Decorative Star */}
                    <div className="certificate-star-top-left">
                      <div className="certificate-star-circle">
                        ★
                      </div>
                    </div>
                    <div className="certificate-star-bg">★</div>
                    
                    {/* Company Logo */}
                    <div className="certificate-logo">
                      <img src={logo} alt="InLighnX Global Logo" className="certificate-logo-image" />
                    </div>

                    {/* Certificate Header */}
                    <h1 className="certificate-header">CERTIFICATE OF ACHIEVEMENT</h1>
                    
                    {/* Presented To */}
                    <p className="certificate-presented">PROUDLY PRESENTED TO</p>
                    
                    {/* Name */}
                    <h2 className="certificate-name">{verificationResult["Name"]}</h2>
                    
                    {/* Achievement Text */}
                    <p className="certificate-achievement">
                      For successfully completing the internship in <strong>{verificationResult["Domain"]}</strong>
                    </p>
                    
                    {/* Details */}
                    <div className="certificate-details-section">
                      <p className="certificate-detail-item">
                        <span className="certificate-detail-label">Duration:</span> {verificationResult["Duration"]} {verificationResult["Duration"] === 1 ? 'month' : 'months'}
                      </p>
                      <p className="certificate-detail-item">
                        <span className="certificate-detail-label">Intern ID:</span> {verificationResult["Intern ID"]}
                      </p>
                    </div>
                    
                    {/* Dates */}
                    <div className="certificate-dates">
                      <span className="certificate-date-label">From:</span> {formatDateForDisplay(verificationResult["Starting Date"])}
                      <span className="certificate-date-separator"> To: </span>
                      {formatDateForDisplay(verificationResult["Completion Date"])}
                    </div>
                    
                    {/* Divider */}
                    <div className="certificate-divider"></div>
                    
                    {/* Signatures */}
                    <div className="certificate-signatures">
                      <div className="certificate-signature-left">
                        <img 
                          src="" 
                          alt="Authorized Signature" 
                          className="certificate-signature-image" 
                        />
                        <div className="certificate-signature-line"></div>
                        <p className="certificate-signature-label">Authorized Signature</p>
                      </div>
                      <div className="certificate-signature-right">
                        <p className="certificate-signature-name">Ghanshyam Tripathi</p>
                        <p className="certificate-signature-label">Director</p>
                      </div>
                    </div>
                    
                    {/* Decorative Shapes */}
                    {/* <div className="certificate-shapes">
                      <div className="certificate-shape-left"></div>
                      <div className="certificate-shape-right"></div>
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className={`verification-result invalid`}>
                  <div className="result-icon">✗</div>
                  <h3>Verification Failed</h3>
                  <p>{verificationResult.message || 'Invalid Intern ID. Please check and try again.'}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyCertificate

