import { useState } from 'react'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import './Page.css'
import logo from '../assets/logo.png'
import signature from '../assets/sign.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://web-backend-0aiv.onrender.com'

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
                <div className="flex justify-center items-center py-8 px-2 my-8 sm:py-6 sm:px-4 md:py-4 md:px-2 md:my-4">
                  <div 
                    className="relative w-full max-w-[900px] min-h-[900px] bg-white border-8 border-[#1a5f3f] rounded shadow-[0_10px_30px_rgba(0,0,0,0.2)] mx-auto py-[4.5rem] px-16 sm:min-h-auto sm:border-[5px] sm:max-w-full sm:py-8 sm:px-6 md:min-h-auto md:border-[5px] md:max-w-full md:py-8 md:px-6"
                  >
                    {/* Inner Border */}
                    <div className="absolute inset-2 border-[3px] border-[#ff6b35] rounded-[2px] pointer-events-none sm:inset-[5px] sm:border-2 md:inset-[5px] md:border-2"></div>
                    
                    {/* Decorative Star */}
                    <div className="absolute top-5 left-[30px] z-[1] sm:top-3 sm:left-4 md:top-5 md:left-[30px]">
                      <div className="w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center text-white text-2xl sm:text-xl md:text-2xl shadow-[0_2px_8px_rgba(255,215,0,0.3)]">
                        ★
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-[10%] -translate-y-1/2 text-[12rem] sm:text-[6rem] md:text-[12rem] text-[rgba(255,107,53,0.15)] z-0 font-thin pointer-events-none hidden sm:hidden md:block">★</div>
                    
                    {/* Company Logo */}
                    <div className="text-center mb-6 sm:mb-4 md:mb-6 relative z-[2] flex justify-center items-center">
                      <img src={logo} alt="InLighnX Global Logo" className="max-w-[70px] sm:max-w-[100px] md:max-w-[150px] w-auto h-auto object-contain block" />
                    </div>

                    {/* Certificate Header */}
                    <h1 className="text-center text-[#1e3a5f] text-[2.5rem] sm:text-xs md:text-2xl font-bold my-6 sm:my-4 md:my-4 tracking-[2px] sm:tracking-[1px] md:tracking-[1px] font-serif relative z-[2] px-2">CERTIFICATE OF ACHIEVEMENT</h1>
                    
                    {/* Presented To */}
                    <p className="text-center text-[#333333] text-base sm:text-xs md:text-sm my-4 sm:my-2 md:my-3 font-medium tracking-[1px] sm:tracking-[0.5px] relative z-[2] px-2">PROUDLY PRESENTED TO</p>
                    
                    {/* Name */}
                    <h2 className="text-center text-[#ff6b35] text-[2.2rem] sm:text-xl md:text-2xl font-semibold my-4 sm:my-2 md:my-3 italic font-serif relative z-[2] px-2 break-words">{verificationResult["Name"]}</h2>
                    
                    {/* Achievement Text */}
                    <p className="text-center text-[#333333] text-lg sm:text-sm md:text-base leading-relaxed my-6 sm:my-3 md:my-4 relative z-[2] px-2 sm:px-1">
                      For successfully completing the internship in <strong className="text-[#1e3a5f] font-semibold">{verificationResult["Domain"]}</strong>
                    </p>
                    
                    {/* Details */}
                    <div className="text-center my-6 sm:my-3 md:my-4 relative z-[2] px-2">
                      <p className="text-[#333333] text-base sm:text-xs md:text-sm my-2 sm:my-1 leading-relaxed">
                        <span className="font-semibold text-[#1e3a5f]">Duration:</span> {verificationResult["Duration"]} {verificationResult["Duration"] === 1 ? 'month' : 'months'}
                      </p>
                      <p className="text-[#333333] text-base sm:text-xs md:text-sm my-2 sm:my-1 leading-relaxed">
                        <span className="font-semibold text-[#1e3a5f]">Intern ID:</span> {verificationResult["Intern ID"]}
                      </p>
                    </div>
                    
                    {/* Dates */}
                    <div className="text-center text-[#333333] text-base sm:text-xs md:text-sm my-6 sm:my-3 md:my-4 relative z-[2] px-2 break-words">
                      <span className="font-semibold text-[#1e3a5f]">From:</span> {formatDateForDisplay(verificationResult["Starting Date"])}
                      <span className="mx-2 sm:mx-1"> To: </span>
                      {formatDateForDisplay(verificationResult["Completion Date"])}
                    </div>
                    
                    {/* Divider */}
                    <div 
                      className="w-full h-px my-8 sm:my-4 md:my-6 relative z-[2]"
                      style={{
                        background: 'repeating-linear-gradient(to right, #333333 0px, #333333 10px, transparent 10px, transparent 20px)'
                      }}
                    ></div>
                    
                    {/* Signatures */}
                    <div className="flex justify-between mt-8 sm:mt-4 md:mt-6 relative z-[2] flex-col sm:flex-col md:flex-row gap-4 sm:gap-3 md:gap-0">
                      <div className="flex-1 text-center sm:text-center md:text-left flex flex-col items-center sm:items-center md:items-start">
                        <img 
                          src={signature} 
                          alt="Authorized Signature" 
                          className="w-auto max-w-[180px] sm:max-w-[120px] md:max-w-[150px] h-auto max-h-[60px] sm:max-h-[40px] md:max-h-[50px] object-contain mb-2 block" 
                        />
                        <div className="w-[200px] sm:w-[120px] md:w-[150px] h-0.5 bg-[#333333] mb-2"></div>
                        <p className="text-[#666666] text-sm sm:text-xs m-0">Authorized Signature</p>
                      </div>
                      <div className="flex-1 text-center sm:text-center md:text-right">
                        <p className="font-semibold text-[#333333] mb-1 text-base sm:text-sm md:text-sm">Ghanshyam Tripathi</p>
                        <p className="text-[#666666] text-sm sm:text-xs m-0">Director</p>
                      </div>
                    </div>
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
      <FloatingWhatsApp />
    </div>
  )
}

export default VerifyCertificate

