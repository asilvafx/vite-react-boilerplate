import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    FaHeart,
    FaGlobeAmericas,
    FaUsers,
    FaLightbulb,
    FaHandHoldingHeart
} from 'react-icons/fa'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 120px auto;
  padding: ${props => props.theme.space.md};
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
`

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`

const ContentSection = styled(motion.section)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.space.xl};
  margin-bottom: ${props => props.theme.space.xl};
`

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.lg};
`

const SectionContent = styled.div`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.8;
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const MissionItem = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const MissionIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.space.md};
  margin-top: ${props => props.theme.space.xl};
`

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.md} ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.full};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const AboutPage = () => {
    const navigate = useNavigate()

    const missionItems = [
        {
            icon: <FaUsers />,
            title: 'Connect People',
            description: 'Create instant connections between finders and owners, ensuring no one is ever truly lost.'
        },
        {
            icon: <FaHandHoldingHeart />,
            title: 'Protect What Matters',
            description: 'Offer a reliable safety net for pets, loved ones, and valuable belongings.'
        },
        {
            icon: <FaLightbulb />,
            title: 'Innovate with Heart',
            description: 'Design user-friendly technology that makes protecting loved ones simple and effective.'
        }
    ]

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>About World Tag</Title>
                <Subtitle>
                    We're more than a tech company—we're a community dedicated to keeping what matters most safe,
                    creating smart, app-free tracking solutions that empower quick reconnections.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>
                    <FaHeart /> Who We Are
                </SectionTitle>
                <SectionContent>
                    At World Tag, we're driven by a passion for safety and innovation. Our mission is simple:
                    create technology that instantly reconnects lost pets, loved ones, or valuable items.
                    We believe that peace of mind should be accessible to everyone, everywhere.
                </SectionContent>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <SectionTitle>
                    <FaGlobeAmericas /> Our Story
                </SectionTitle>
                <SectionContent>
                    Born from a personal experience of losing a beloved pet, World Tag was founded with a
                    mission to create a simple, effective solution for reconnection. We understand the
                    heartache of losing something or someone important, and we've dedicated ourselves to
                    preventing that pain for others.
                </SectionContent>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <SectionTitle>Our Mission</SectionTitle>
                <MissionGrid>
                    {missionItems.map((item, index) => (
                        <MissionItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <MissionIcon>{item.icon}</MissionIcon>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </MissionItem>
                    ))}
                </MissionGrid>
            </ContentSection>

            <ButtonGroup>
                <Button
                    onClick={() => navigate('/products')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore Our Products
                </Button>
                <Button
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Contact Us
                </Button>
            </ButtonGroup>
        </PageContainer>
    )
}

export default AboutPage
