import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
    FaEnvelope,
    FaPhone,
    FaComments,
    FaQuestionCircle,
    FaBook,
    FaUsers,
    FaPaperPlane
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const PageContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 120px auto;
    padding: ${props => props.theme.space.xl};
    position: relative;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        padding: 0 ${props => props.theme.space.lg};
    }
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

const ContactGrid = styled.div`
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

const ContactItem = styled(motion.div)`
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

const ContactIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`

const ResourceLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    transform: translateX(5px);
  }
`

const ContactForm = styled.form`
  display: grid;
  gap: ${props => props.theme.space.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
`

const Label = styled.label`
  color: ${props => props.theme.colors.textDark};
  font-weight: ${props => props.theme.fontWeights.semibold};
`

const Input = styled.input`
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  transition: all ${props => props.theme.transitions.medium};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(10, 37, 64, 0.1);
  }
`

const TextArea = styled.textarea`
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  min-height: 150px;
  resize: vertical;
  transition: all ${props => props.theme.transitions.medium};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(10, 37, 64, 0.1);
  }
`

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.md} ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.')
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
            setIsSubmitting(false)
        }, 1500)
    }

    const contactMethods = [
        {
            icon: <FaEnvelope />,
            title: 'Email Support',
            description: 'support@worldtag.com',
            link: 'mailto:support@worldtag.com'
        },
        {
            icon: <FaPhone />,
            title: 'Phone Support',
            description: '+1 (800) 123-4567',
            link: 'tel:+18001234567'
        },
        {
            icon: <FaComments />,
            title: 'Live Chat',
            description: 'Real-time support',
            link: '#live-chat'
        }
    ]

    const supportResources = [
        {
            icon: <FaQuestionCircle />,
            title: 'FAQs',
            description: 'Quick answers to common questions',
            link: '/faq'
        },
        {
            icon: <FaBook />,
            title: 'User Guides',
            description: 'Step-by-step tutorials',
            link: '#user-guides'
        },
        {
            icon: <FaUsers />,
            title: 'Community Forum',
            description: 'Connect with other users',
            link: '#community-forum'
        }
    ]

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>Contact & Support</Title>
                <Subtitle>
                    Have a question, need support, or want to share feedback?
                    Our friendly team is ready to help you anytime.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>How to Reach Us</SectionTitle>
                <ContactGrid>
                    {contactMethods.map((method, index) => (
                        <ContactItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <ContactIcon>{method.icon}</ContactIcon>
                            <h3>{method.title}</h3>
                            <p>{method.description}</p>
                            <ResourceLink as="a" href={method.link}>
                                Contact Now <FaPaperPlane />
                            </ResourceLink>
                        </ContactItem>
                    ))}
                </ContactGrid>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <SectionTitle>Support Resources</SectionTitle>
                <ContactGrid>
                    {supportResources.map((resource, index) => (
                        <ContactItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <ContactIcon>{resource.icon}</ContactIcon>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <ResourceLink to={resource.link}>
                                Explore {resource.title} <FaPaperPlane />
                            </ResourceLink>
                        </ContactItem>
                    ))}
                </ContactGrid>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <SectionTitle>Send Us a Message</SectionTitle>
                <ContactForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Subject</Label>
                        <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Message</Label>
                        <TextArea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: !isSubmitting ? 1.05 : 1 }}
                        whileTap={{ scale: !isSubmitting ? 0.95 : 1 }}
                    >
                        <FaPaperPlane /> {isSubmitting ? 'Sending...' : 'Send Message'}
                    </SubmitButton>
                </ContactForm>
            </ContentSection>
        </PageContainer>
    )
}

export default ContactPage
