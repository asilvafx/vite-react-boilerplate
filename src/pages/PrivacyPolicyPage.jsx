import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
    FaShieldAlt,
    FaDatabase,
    FaLock,
    FaUserSecret,
    FaEnvelope,
    FaUserCheck,
    FaClipboardList
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

const PrivacyGrid = styled.div`
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

const PrivacyItem = styled(motion.div)`
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

const PrivacyIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`

const PrivacyList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const PrivacyListItem = styled.li`
  margin-bottom: ${props => props.theme.space.md};
  padding: ${props => props.theme.space.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.md};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.space.md};
`

const PrivacyListIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-top: 0.25rem;
`

const ContactSection = styled.div`
  background: ${props => props.theme.colors.gradient.secondary};
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

const PrivacyPolicyPage = () => {
    const privacyDetails = [
        {
            icon: <FaDatabase />,
            title: 'What We Collect',
            description: 'Personal data, usage details, and cookies to enhance your experience.'
        },
        {
            icon: <FaLock />,
            title: 'Data Security',
            description: 'Industry-standard security measures to protect your information.'
        },
        {
            icon: <FaUserSecret />,
            title: 'Third-Party Sharing',
            description: 'We do not sell your data. Limited sharing only to provide services.'
        }
    ]

    const userRights = [
        {
            icon: <FaUserCheck />,
            title: 'Access & Update',
            description: 'View and update your personal data via your account.'
        },
        {
            icon: <FaClipboardList />,
            title: 'Opt-Out',
            description: 'Choose to stop receiving marketing emails at any time.'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Data Deletion',
            description: 'Request deletion of your information by contacting us.'
        }
    ]

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>Privacy Policy</Title>
                <Subtitle>
                    At World Tag, your privacy is our top priority.
                    We are committed to protecting your personal information
                    and maintaining your trust.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>
                    <FaShieldAlt /> Privacy Overview
                </SectionTitle>
                <PrivacyGrid>
                    {privacyDetails.map((detail, index) => (
                        <PrivacyItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <PrivacyIcon>{detail.icon}</PrivacyIcon>
                            <h3>{detail.title}</h3>
                            <p>{detail.description}</p>
                        </PrivacyItem>
                    ))}
                </PrivacyGrid>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <SectionTitle>How We Use Your Data</SectionTitle>
                <p>
                    We collect and use your data to:
                    <ul>
                        <li>Deliver and manage our services</li>
                        <li>Continuously improve our products</li>
                        <li>Communicate with you (with your consent)</li>
                    </ul>
                </p>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <SectionTitle>Your Privacy Rights</SectionTitle>
                <PrivacyList>
                    {userRights.map((right, index) => (
                        <PrivacyListItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 + (index * 0.2) }}
                        >
                            <PrivacyListIcon>{right.icon}</PrivacyListIcon>
                            <div>
                                <h3>{right.title}</h3>
                                <p>{right.description}</p>
                            </div>
                        </PrivacyListItem>
                    ))}
                </PrivacyList>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <SectionTitle>Policy Updates</SectionTitle>
                <p>
                    We may update this privacy policy periodically.
                    Any changes will be posted on this page, and continued
                    use of our services constitutes acceptance of the updated policy.
                </p>
            </ContentSection>

            <ContactSection>
                <ContactContent>
                    <ContactTitle>Questions About Your Privacy?</ContactTitle>
                    <ContactDescription>
                        If you have any questions or concerns regarding our Privacy Policy,
                        our dedicated privacy team is here to help you.
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

export default PrivacyPolicyPage