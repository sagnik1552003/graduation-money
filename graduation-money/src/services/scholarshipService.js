// Scholarship service - handles fetching and filtering scholarship data
// This can be configured to use different APIs or mock data

const SCHOLARSHIP_API_BASE = process.env.SCHOLARSHIP_API_BASE || 'https://api.example.com/scholarships'

/**
 * Fetch scholarships from external API
 * @param {Object} params - Search parameters
 * @param {string} params.gradYear - Graduation year
 * @param {string} params.subject - Field of study/major
 * @param {string} params.state - US State (optional)
 * @param {string} params.gpa - GPA (optional)
 * @returns {Promise<Array>} - Array of scholarship objects
 */
export async function fetchScholarships(params) {
  const { gradYear, subject, state, gpa } = params

  // Build query parameters
  const queryParams = new URLSearchParams()
  if (gradYear) queryParams.append('grad_year', gradYear)
  if (subject) queryParams.append('subject', subject)
  if (state) queryParams.append('state', state)
  if (gpa) queryParams.append('gpa', gpa)

  try {
    const response = await fetch(`${SCHOLARSHIP_API_BASE}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    return data.scholarships || []
  } catch (error) {
    console.error('Error fetching scholarships:', error)
    // Fall back to mock data if API fails
    return getMockScholarships(params)
  }
}

/**
 * Mock scholarship data for development/testing
 * This simulates what a real API would return
 */
function getMockScholarships(params) {
  const { gradYear, subject } = params
  
  // Simulated scholarship database
  const allScholarships = [
    {
      id: 'scholarship-1',
      name: 'National Merit Scholarship',
      organization: 'National Merit Scholarship Corporation',
      amount: '$2,500',
      deadline: '2025-12-01',
      requirements: 'PSAT/NMSQT qualification, 3.5+ GPA',
      description: ' Prestigious scholarship for academically talented students.',
      subject: 'General',
      gradYear: '2025',
      url: 'https://www.nationalmerit.org',
    },
    {
      id: 'scholarship-2',
      name: 'Coca-Cola Scholars Program',
      organization: 'Coca-Cola Company',
      amount: '$20,000',
      deadline: '2025-10-31',
      requirements: '3.0+ GPA, leadership experience',
      description: 'Four-year achievement-based scholarship for students.',
      subject: 'General',
      gradYear: '2025',
      url: 'https://www.coca-colascholarsfoundation.org',
    },
    {
      id: 'scholarship-3',
      name: 'Gates Millennium Scholars',
      organization: 'Bill & Melinda Gates Foundation',
      amount: 'Full Ride',
      deadline: '2025-09-15',
      requirements: 'Pell Grant eligible, 3.3+ GPA, leadership',
      description: 'Full scholarship for outstanding minority students.',
      subject: 'General',
      gradYear: '2025',
      url: 'https://www.gmsp.org',
    },
    {
      id: 'scholarship-4',
      name: 'STEM Excellence Scholarship',
      organization: 'National Science Foundation',
      amount: '$10,000',
      deadline: '2026-03-01',
      requirements: 'STEM major, 3.5+ GPA, US citizen',
      description: 'For students pursuing degrees in science, technology, engineering, or mathematics.',
      subject: 'STEM',
      gradYear: '2026',
      url: 'https://www.nsf.gov',
    },
    {
      id: 'scholarship-5',
      name: 'Arts Achievement Award',
      organization: 'National Endowment for the Arts',
      amount: '$5,000',
      deadline: '2026-02-15',
      requirements: 'Arts major, portfolio submission',
      description: 'For talented students in visual arts, music, theater, or dance.',
      subject: 'Arts',
      gradYear: '2026',
      url: 'https://www.arts.gov',
    },
    {
      id: 'scholarship-6',
      name: 'Business Leaders Scholarship',
      organization: 'Chamber of Commerce',
      amount: '$7,500',
      deadline: '2026-04-01',
      requirements: 'Business major, 3.0+ GPA, essay',
      description: 'For future business leaders and entrepreneurs.',
      subject: 'Business',
      gradYear: '2026',
      url: 'https://www.uschamber.com',
    },
    {
      id: 'scholarship-7',
      name: 'Healthcare Heroes Scholarship',
      organization: 'American Medical Association',
      amount: '$15,000',
      deadline: '2026-05-01',
      requirements: 'Healthcare major, 3.2+ GPA, community service',
      description: 'For students pursuing careers in healthcare and medicine.',
      subject: 'Healthcare',
      gradYear: '2026',
      url: 'https://www.ama-assn.org',
    },
    {
      id: 'scholarship-8',
      name: 'Education Future Teachers',
      organization: 'National Education Association',
      amount: '$8,000',
      deadline: '2026-03-15',
      requirements: 'Education major, 2.5+ GPA',
      description: 'Supporting the next generation of educators.',
      subject: 'Education',
      gradYear: '2026',
      url: 'https://www.nea.org',
    },
  ]

  // Filter based on parameters
  let filtered = allScholarships

  if (subject) {
    const subjectLower = subject.toLowerCase()
    filtered = filtered.filter(s => 
      s.subject.toLowerCase().includes(subjectLower) ||
      s.description.toLowerCase().includes(subjectLower) ||
      s.name.toLowerCase().includes(subjectLower)
    )
  }

  if (gradYear) {
    filtered = filtered.filter(s => s.gradYear === gradYear || s.gradYear === 'General')
  }

  return filtered
}