// Mock editorial data for browser environment
const mockEditorials = [
  {
    slug: "digital-governance-initiatives",
    frontmatter: {
      title: "Digital Governance Initiatives in Modern India",
      date: "2025-09-01",
      category: "Governance",
      tags: ["Digital India", "E-governance", "Technology"],
      author: "Editorial Team",
      readingTime: 8,
    },
    content: `# Digital Governance Initiatives in Modern India

India's digital transformation has been remarkable, with initiatives like Digital India revolutionizing how citizens interact with government services. This comprehensive analysis explores the impact and future prospects of digital governance.

## Key Initiatives

### 1. Digital India Programme
The Digital India programme, launched in 2015, aims to transform India into a digitally empowered society and knowledge economy.

### 2. E-Governance Services
Online services have made government processes more transparent and accessible to citizens across the country.

### 3. JAM Trinity
The Jan Dhan-Aadhaar-Mobile (JAM) trinity has enabled direct benefit transfers and financial inclusion.

## Impact Assessment

The digital governance initiatives have significantly improved:
- Service delivery efficiency
- Transparency in government operations
- Citizen satisfaction levels
- Reduced corruption in public services

## Challenges and Solutions

Despite progress, challenges remain in digital literacy, infrastructure, and cybersecurity. Addressing these requires continued investment and policy reforms.

## Conclusion

Digital governance represents a paradigm shift in public administration, making services more citizen-centric and efficient.`,
  },
  {
    slug: "climate-change-policy",
    frontmatter: {
      title: "India's Climate Change Policy Framework",
      date: "2025-09-02",
      category: "Environment",
      tags: ["Climate Change", "Environment", "Policy"],
      author: "Editorial Team",
      readingTime: 6,
    },
    content: `# India's Climate Change Policy Framework

As one of the world's largest economies, India plays a crucial role in global climate action. This editorial examines India's comprehensive approach to addressing climate change.

## National Action Plan on Climate Change

India's NAPCC outlines eight national missions to address climate change mitigation and adaptation.

### Key Missions:
1. National Solar Mission
2. National Mission for Enhanced Energy Efficiency
3. National Mission on Sustainable Habitat
4. National Water Mission

## International Commitments

India has made significant commitments under the Paris Agreement, including:
- Reducing emissions intensity by 33-35% by 2030
- Achieving 40% renewable energy capacity
- Creating additional carbon sink

## Policy Instruments

Various policy tools are being employed:
- Carbon pricing mechanisms
- Renewable energy incentives
- Energy efficiency standards
- Green building codes

## Conclusion

India's climate policy framework demonstrates commitment to sustainable development while balancing economic growth needs.`,
  },
  {
    slug: "education-reform-nep",
    frontmatter: {
      title: "National Education Policy 2020: Transforming Indian Education",
      date: "2025-09-03",
      category: "Education",
      tags: ["Education", "NEP 2020", "Reform"],
      author: "Editorial Team",
      readingTime: 7,
    },
    content: `# National Education Policy 2020: Transforming Indian Education

The National Education Policy 2020 represents a paradigm shift in India's approach to education, emphasizing holistic development and 21st-century skills.

## Key Features

### 1. Foundational Literacy and Numeracy
Focus on ensuring all children achieve foundational literacy and numeracy by Grade 3.

### 2. Flexible Curriculum Structure
Introduction of 5+3+3+4 structure replacing the traditional 10+2 system.

### 3. Multidisciplinary Approach
Breaking silos between arts, sciences, and commerce streams.

## Higher Education Reforms

- Multiple entry and exit points
- Academic Bank of Credits
- Holistic multidisciplinary education

## Implementation Challenges

Key challenges include:
- Infrastructure development
- Teacher training and capacity building
- Technology integration
- Funding requirements

## Way Forward

Successful implementation requires coordinated efforts from all stakeholders and sustained political commitment.

## Conclusion

NEP 2020 has the potential to transform India's education landscape, making it more inclusive, flexible, and globally competitive.`,
  },
]

export const getEditorialSlugs = () => {
  return mockEditorials.map((editorial) => editorial.slug)
}

export const getEditorialBySlug = (slug) => {
  return mockEditorials.find((editorial) => editorial.slug === slug) || null
}

export const getAllEditorials = () => {
  return mockEditorials.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })
}

export const getEditorialsByCategory = (category) => {
  return mockEditorials.filter((editorial) => editorial.frontmatter.category?.toLowerCase() === category.toLowerCase())
}

export const getEditorialsByTag = (tag) => {
  return mockEditorials.filter((editorial) =>
    editorial.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const getReadingTime = (content) => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return readingTime
}
