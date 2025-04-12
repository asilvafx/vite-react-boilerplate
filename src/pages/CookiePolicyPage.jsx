import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
    FaCookie,
    FaLock,
    FaChartLine,
    FaBullhorn,
    FaCog,
    FaEnvelope,
    FaQuestionCircle
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

const CookieGrid = styled.div`
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

const CookieItem = styled(motion.div)`
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

const CookieIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`

const CookieChoicesSection = styled.div`
  background: ${props => props.theme.colors.gradient.secondary};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  margin-top: ${props => props.theme.space.xl};
`

const CookieChoicesTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const CookieChoicesDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.space.lg};
`

const CookieSettingsButton = styled(motion.button)`
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

const ContactSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    gap: ${props => props.theme.space.lg};
  }
`

const ContactContent = styled.div`
  flex-grow: 1;
`

const ContactTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const ContactDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const ContactButton = styled(motion.a)`
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

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: ${props => props.theme.space.lg};
  }
`

const CookiePolicyPage = () => {
    const [showCookieSettings, setShowCookieSettings] = useState(false)

    const cookieTypes = [
        {
            icon: <FaLock />,
            title: 'Essential Cookies',
            description: 'Enable core functionality like security and network management.'
        },
        {
            icon: <FaChartLine />,
            title: 'Performance Cookies',
            description: 'Collect data on how visitors use our site to improve functionality.'
        },
        {
            icon: <FaBullhorn />,
            title: 'Marketing Cookies',
            description: 'Personalize content and ads to ensure you see relevant information.'
        }
    ]

    const handleCookieSettings = () => {
        // In a real implementation, this would open a detailed cookie settings modal
        setShowCookieSettings(true)
        alert('Cookie settings management will be implemented in a future update.')
    }

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>Cookie Policy</Title>
                <Subtitle>
                    At World Tag, we use cookies to enhance your browsing experience
                    and deliver personalized content. Learn how we use cookies and
                    your options for managing them.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>
                    <FaCookie /> What Are Cookies?
                </SectionTitle>
                <p>
                    Cookies are small data files stored on your device by your web browser.
                    They help us remember your preferences, improve site performance,
                    and analyze traffic. Think of them as digital memory helpers that
                    make your online experience smoother and more personalized.
                </p>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <SectionTitle>Types of Cookies We Use</SectionTitle>
                <CookieGrid>
                    {cookieTypes.map((cookie, index) => (
                        <CookieItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <CookieIcon>{cookie.icon}</CookieIcon>
                            <h3>{cookie.title}</h3>
                            <p>{cookie.description}</p>
                        </CookieItem>
                    ))}
                </CookieGrid>
            </ContentSection>

            <CookieChoicesSection>
                <CookieChoicesTitle>Your Cookie Choices</CookieChoicesTitle>
                <CookieChoicesDescription>
                    By using our website, you agree to our cookie use. However, you can
                    manage your cookie preferences. Most browsers allow you to control
                    cookies through their settings. Keep in mind that disabling cookies
                    might impact some website features.
                </CookieChoicesDescription>
                <CookieSettingsButton
                    onClick={handleCookieSettings}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaCog /> Manage Cookie Settings
                </CookieSettingsButton>
            </CookieChoicesSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <SectionTitle>Policy Updates</SectionTitle>
                <p>
                    We may update this Cookie Policy periodically. Any changes will be
                    posted on this page with an updated effective date. We recommend
                    reviewing this policy occasionally to stay informed about our
                    cookie practices.
                </p>
            </ContentSection>

            <ContactSection>
                <ContactContent>
                    <ContactTitle>Questions About Cookies?</ContactTitle>
                    <ContactDescription>
                        If you have any questions or concerns about our Cookie Policy,
                        our privacy team is here to help you understand and manage your
                        cookie preferences.
                    </ContactDescription>
                </ContactContent>
                <ContactButton
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaEnvelope /> Contact Privacy Team
                </ContactButton>
            </ContactSection>
        </PageContainer>
    )
}

export default CookiePolicyPage
