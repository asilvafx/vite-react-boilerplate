import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    FaBalanceScale,
    FaUserShield,
    FaClipboardList,
    FaExclamationTriangle,
    FaEnvelope
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

const TermsList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const TermsListItem = styled.li`
  margin-bottom: ${props => props.theme.space.md};
  padding: ${props => props.theme.space.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.md};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.space.md};
`

const TermsIcon = styled.div`
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

const TermsOfServicePage = () => {
    const termsDetails = [
        {
            icon: <FaBalanceScale />,
            title: 'Acceptance of Terms',
            description: 'By accessing or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy.'
        },
        {
            icon: <FaUserShield />,
            title: 'User Responsibilities',
            description: 'Use our services only for legal and intended purposes. Keep your account details accurate and secure.'
        },
        {
            icon: <FaClipboardList />,
            title: 'Our Rights',
            description: 'We reserve the right to modify or discontinue our service, update terms, and maintain ownership of our content.'
        },
        {
            icon: <FaExclamationTriangle />,
            title: 'Disclaimer & Limitation of Liability',
            description: 'Our services are provided "as is" without warranties. World Tag is not liable for indirect or consequential damages.'
        }
    ]

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>Terms of Service</Title>
                <Subtitle>
                    Welcome to World Tag. These terms govern your use of our services
                    and help ensure a safe, transparent experience for everyone.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>
                    <FaBalanceScale /> Key Terms Overview
                </SectionTitle>
                <TermsList>
                    {termsDetails.map((term, index) => (
                        <TermsListItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                        >
                            <TermsIcon>{term.icon}</TermsIcon>
                            <div>
                                <h3>{term.title}</h3>
                                <p>{term.description}</p>
                            </div>
                        </TermsListItem>
                    ))}
                </TermsList>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <SectionTitle>Introduction</SectionTitle>
                <p>
                    World Tag provides smart tracking solutions to keep your loved ones,
                    pets, and valuable belongings safe. By using our website and products,
                    you agree to these terms. If you have any questions, feel free to reach out.
                </p>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <SectionTitle>Changes to These Terms</SectionTitle>
                <p>
                    We may update these Terms of Service from time to time. We will notify
                    you of significant changes, and your continued use of the service after
                    such changes will constitute your acceptance of the new terms.
                </p>
            </ContentSection>

            <ContactSection>
                <ContactContent>
                    <ContactTitle>Questions About Our Terms?</ContactTitle>
                    <ContactDescription>
                        If you have any questions or concerns regarding our Terms of Service,
                        our support team is here to help you.
                    </ContactDescription>
                </ContactContent>
                <ContactButton
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaEnvelope /> Contact Support
                </ContactButton>
            </ContactSection>
        </PageContainer>
    )
}

export default TermsOfServicePage
