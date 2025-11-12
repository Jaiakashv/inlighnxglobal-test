import { useState } from 'react'
import './Page.css'

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)

  const handleVerify = (e) => {
    e.preventDefault()
    // Simulate certificate verification
    if (certificateId.trim()) {
      setVerificationResult({
        valid: true,
        name: 'John Doe',
        course: 'Full Stack Web Development',
        issueDate: '2024-01-15',
        certificateId: certificateId
      })
    } else {
      setVerificationResult({
        valid: false,
        message: 'Please enter a valid certificate ID'
      })
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Verify Certificate</h1>
        <p className="page-subtitle">Enter your certificate ID to verify its authenticity</p>
        
        <div className="verify-section">
          <form onSubmit={handleVerify} className="verify-form">
            <div className="form-group">
              <label htmlFor="certificateId">Certificate ID</label>
              <input
                type="text"
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter your certificate ID"
                className="certificate-input"
              />
            </div>
            <button type="submit" className="verify-button">Verify Certificate</button>
          </form>

          {verificationResult && (
            <div className={`verification-result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
              {verificationResult.valid ? (
                <>
                  <div className="result-icon">✓</div>
                  <h3>Certificate Verified</h3>
                  <div className="certificate-details">
                    <p><strong>Name:</strong> {verificationResult.name}</p>
                    <p><strong>Course:</strong> {verificationResult.course}</p>
                    <p><strong>Issue Date:</strong> {verificationResult.issueDate}</p>
                    <p><strong>Certificate ID:</strong> {verificationResult.certificateId}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="result-icon">✗</div>
                  <h3>Verification Failed</h3>
                  <p>{verificationResult.message || 'Invalid certificate ID. Please check and try again.'}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyCertificate

