import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaTruck,
    FaShippingFast,
    FaExchangeAlt,
    FaBox,
    FaClipboardList,
    FaQuestionCircle,
    FaCheckCircle
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

const ShippingGrid = styled.div`
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

const ShippingItem = styled(motion.div)`
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

const ShippingIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
`

const ReturnPolicySection = styled.div`
  background: ${props => props.theme.colors.gradient.secondary};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.xl};
  margin-top: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`

const ReturnPolicyContent = styled.div`
  flex-grow: 1;
`

const ReturnPolicyTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const ReturnPolicyDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const ReturnButton = styled(motion.button)`
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

const ReturnRequestForm = styled.form`
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

const ShippingAndReturnsPage = () => {
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('shipping')
    const [returnRequestData, setReturnRequestData] = useState({
        orderNumber: '',
        reason: '',
        additionalDetails: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isRequestSubmitted, setIsRequestSubmitted] = useState(false)

    const shippingDetails = [
        {
            icon: <FaTruck />,
            title: 'Fast Processing',
            description: 'Orders processed within 24 hours'
        },
        {
            icon: <FaShippingFast />,
            title: 'Quick Delivery',
            description: 'Arrive in 3-5 business days'
        },
        {
            icon: <FaClipboardList />,
            title: 'Real-Time Tracking',
            description: 'Tracking number provided on shipment'
        }
    ]

    const returnDetails = [
        {
            icon: <FaExchangeAlt />,
            title: 'Easy Returns',
            description: 'Return within 30 days of purchase'
        },
        {
            icon: <FaBox />,
            title: 'Simple Exchanges',
            description: 'Swap for different size or style'
        },
        {
            icon: <FaQuestionCircle />,
            title: 'Support',
            description: 'Friendly team to assist you'
        }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setReturnRequestData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitReturnRequest = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate return request submission
        setTimeout(() => {
            setIsRequestSubmitted(true)
            setIsSubmitting(false)
            setReturnRequestData({
                orderNumber: '',
                reason: '',
                additionalDetails: ''
            })
        }, 1500)
    }

    const renderReturnRequestForm = () => {
        if (isRequestSubmitted) {
            return (
                <ContentSection>
                    <SectionTitle>
                        <FaCheckCircle /> Return Request Submitted
                    </SectionTitle>
                    <p>
                        Your return request has been received. Our support team will review
                        your request and contact you shortly with further instructions.
                    </p>
                </ContentSection>
            )
        }

        return (
            <ContentSection>
                <SectionTitle>Submit a Return Request</SectionTitle>
                <ReturnRequestForm onSubmit={handleSubmitReturnRequest}>
                    <FormGroup>
                        <Label>Order Number</Label>
                        <Input
                            type="text"
                            name="orderNumber"
                            value={returnRequestData.orderNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your order number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Reason for Return</Label>
                        <Input
                            type="text"
                            name="reason"
                            value={returnRequestData.reason}
                            onChange={handleInputChange}
                            required
                            placeholder="Why are you returning the product?"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Additional Details</Label>
                        <TextArea
                            name="additionalDetails"
                            value={returnRequestData.additionalDetails}
                            onChange={handleInputChange}
                            placeholder="Please provide more information about your return"
                        />
                    </FormGroup>
                    <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: !isSubmitting ? 1.05 : 1 }}
                        whileTap={{ scale: !isSubmitting ? 0.95 : 1 }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
                    </SubmitButton>
                </ReturnRequestForm>
            </ContentSection>
        )
    }

    return (
        <PageContainer>
            <SectionHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title>Shipping & Returns</Title>
                <Subtitle>
                    Your order, delivered with care. Fast shipping, easy returns,
                    and a commitment to your satisfaction.
                </Subtitle>
            </SectionHeader>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SectionTitle>Shipping Details</SectionTitle>
                <ShippingGrid>
                    {shippingDetails.map((detail, index) => (
                        <ShippingItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <ShippingIcon>{detail.icon}</ShippingIcon>
                            <h3>{detail.title}</h3>
                            <p>{detail.description}</p>
                        </ShippingItem>
                    ))}
                </ShippingGrid>
            </ContentSection>

            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <SectionTitle>Return Policy</SectionTitle>
                <ShippingGrid>
                    {returnDetails.map((detail, index) => (
                        <ShippingItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <ShippingIcon>{detail.icon}</ShippingIcon>
                            <h3>{detail.title}</h3>
                            <p>{detail.description}</p>
                        </ShippingItem>
                    ))}
                </ShippingGrid>
            </ContentSection>

            <ReturnPolicySection>
                <ReturnPolicyContent>
                    <ReturnPolicyTitle>Need Help with Your Return?</ReturnPolicyTitle>
                    <ReturnPolicyDescription>
                        Our support team is ready to assist you with any return or exchange.
                        We strive to make the process as smooth and stress-free as possible.
                    </ReturnPolicyDescription>
                </ReturnPolicyContent>
                <ReturnButton
                    onClick={() => navigate('/contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Contact Support
                </ReturnButton>
            </ReturnPolicySection>

            {renderReturnRequestForm()}
        </PageContainer>
    )
}

export default ShippingAndReturnsPage
