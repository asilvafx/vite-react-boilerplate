import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTag,
  FaQrcode,
  FaExclamationCircle,
  FaCheckCircle,
  FaSearch,
  FaPhoneAlt
} from 'react-icons/fa'

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl};
  background: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.md};
  }
`

const SearchHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.space.lg};
    padding: ${props => props.theme.space.md};
  }
`

const SearchTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: ${props => props.theme.space.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.md};
`

const SearchDescription = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: clamp(0.875rem, 2vw, 1.125rem);
`

const ResultsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.md};
  }
`

const ResultCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const CardImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ResultCard}:hover & {
    transform: scale(1.1);
  }
`

const PlaceholderImage = styled.div`
  width: 100%;
  height: 250px;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.space.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

const TagIdentifier = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const TagIcon = styled.div`
  background: ${props => props.theme.colors.primaryLight};
  color: white;
  padding: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.full};
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.full};
  background: ${props => props.status === 'lost' 
    ? props.theme.colors.accent 
    : props.theme.colors.success};
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
`

const CardContent = styled.div`
  padding: ${props => props.theme.space.lg};
`

const TagName = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.sm};
`

const TagDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.md};
  line-height: 1.6;
`

const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.space.md};
  margin-bottom: ${props => props.theme.space.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.md};
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`

const ActionSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.space.lg};
`

const ActionList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ActionItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.sm};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`

const NoResultsContainer = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.space.xl};
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
`

const CallButton = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  border-radius: 0 0 ${props => props.theme.radii.lg} ${props => props.theme.radii.lg};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`

const ContactReveal = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.space.md};
  text-align: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary};
`

const mockTags = [
  {
    id: '1',
    name: 'Theo',
    description: 'Nervous and anxious cat, neutered with chip',
    location: 'Viña del Mar, Chile',
    status: 'lost',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', // White cat image
    contactInfo: {
      phone: '+56 9 1234 5678',
      email: 'theo.owner@example.com'
    },
    specialInstructions: [
      'Contact owners if found',
      'Cat is easily scared',
      'Has microchip registered'
    ]
  },
  {
    id: '2',
    name: 'Luna',
    description: 'Friendly dog with blue collar, loves treats',
    location: 'Santiago, Chile',
    status: 'safe',
    image: 'https://images.unsplash.com/photo-1537151625747-f809d8acf7d6', // Dog image
    contactInfo: {
      phone: '+56 9 8765 4321',
      email: 'luna.owner@example.com'
    },
    specialInstructions: [
      'Very social and approachable',
      'Knows basic commands',
      'Vaccinations up to date'
    ]
  }
]

const SearchResultsPage = () => {
  const location = useLocation()
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [revealedContacts, setRevealedContacts] = useState({})

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('q')
    setSearchQuery(query)

    const results = mockTags.filter(tag => 
      tag.name.toLowerCase().includes(query.toLowerCase()) ||
      tag.id.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }, [location])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const handleCallClick = (tagId, phoneNumber) => {
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      // Directly initiate phone call on mobile
      window.location.href = `tel:${phoneNumber}`
    } else {
      // Toggle contact visibility for desktop
      setRevealedContacts(prev => ({
        ...prev,
        [tagId]: !prev[tagId]
      }))
    }
  }

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {searchResults.length === 0 && (
        <SearchHeader
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SearchTitle>
            <FaSearch /> Search Results for "{searchQuery}"
          </SearchTitle>
          <SearchDescription>
            No tags found matching your search
          </SearchDescription>
        </SearchHeader>
      )}

      {searchResults.length > 0 && (
        <ResultsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {searchResults.map(tag => (
            <ResultCard 
              key={tag.id} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <CardImageContainer>
                {tag.image ? (
                  <CardImage 
                    src={tag.image} 
                    alt={`Image of ${tag.name}`} 
                  />
                ) : (
                  <PlaceholderImage>
                    <FaTag style={{ fontSize: '3rem' }} />
                    <span>No Image Available</span>
                  </PlaceholderImage>
                )}
              </CardImageContainer>

              <CardHeader>
                <TagIdentifier>
                  <TagIcon>
                    <FaQrcode />
                  </TagIcon>
                  <span>Tag ID: {tag.id}</span>
                </TagIdentifier>
                <StatusBadge status={tag.status}>
                  {tag.status === 'lost' ? (
                    <>
                      <FaExclamationCircle /> Lost
                    </>
                  ) : (
                    <>
                      <FaCheckCircle /> Safe
                    </>
                  )}
                </StatusBadge>
              </CardHeader>

              <CardContent>
                <TagName>{tag.name}</TagName>
                <TagDescription>{tag.description}</TagDescription>

                <ContactSection>
                  <ContactInfo>
                    <FaMapMarkerAlt /> {tag.location}
                  </ContactInfo>
                  <ContactInfo>
                    <FaPhone /> {tag.contactInfo.phone}
                  </ContactInfo>
                  <ContactInfo>
                    <FaEnvelope /> {tag.contactInfo.email}
                  </ContactInfo>
                </ContactSection>
              </CardContent>

              <ActionSection>
                <ActionList>
                  {tag.specialInstructions.map((instruction, index) => (
                    <ActionItem key={index}>
                      <FaTag /> {instruction}
                    </ActionItem>
                  ))}
                </ActionList>
              </ActionSection>
              <CallButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCallClick(tag.id, tag.contactInfo.phone)}
              >
                <FaPhoneAlt /> Contact Owner
              </CallButton>

              {revealedContacts[tag.id] && (
                  <ContactReveal
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                  >
                    {tag.contactInfo.phone}
                  </ContactReveal>
              )}
            </ResultCard>
          ))}
        </ResultsGrid>
      )}

      {searchResults.length === 0 && (
        <NoResultsContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSearch style={{ fontSize: '3rem', color: '#888', marginBottom: '1rem' }} />
          <h2>No Tags Found</h2>
          <p>Try a different search term or tag ID</p>
        </NoResultsContainer>
      )}
    </PageContainer>
  )
}

export default SearchResultsPage
