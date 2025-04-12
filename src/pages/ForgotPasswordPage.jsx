import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    FaEnvelope,
    FaArrowLeft,
    FaCheckCircle
} from 'react-icons/fa'

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background} 0%, 
    ${props => props.theme.colors.backgroundAlt} 100%
  );
  padding: ${props => props.theme.space.lg};
`

const AuthContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: ${props => props.theme.radii.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  padding: ${props => props.theme.space.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    margin: 0;
    height: auto;
    justify-content: center;
    padding: ${props => props.theme.space.lg};
  }
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.space.lg};
  left: ${props => props.theme.space.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: ${props => props.theme.space.md};
    left: ${props => props.theme.space.md};
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
  width: 100%;
`

const MainTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.sm};
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: ${props => props.theme.space.lg};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
`

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.space.md};
  padding-left: 50px;
  border: 1px solid ${props =>
    props.error ? props.theme.colors.accent : props.theme.colors.border
};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.md};
  transition: all ${props => props.theme.transitions.medium};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(10, 37, 64, 0.1);
  }
`

const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
`

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.bold};
  transition: all ${props => props.theme.transitions.medium};
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 100%;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin-top: ${props => props.theme.space.sm};
  font-size: ${props => props.theme.fontSizes.sm};
`

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors.success};
  gap: ${props => props.theme.space.md};
  margin-top: ${props => props.theme.space.lg};
`

const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Simulate password reset request
        setTimeout(() => {
            if (email === 'admin@test.com') {
                setIsEmailSent(true)
                setIsLoading(false)
            } else {
                setError('Email not found in our system')
                setIsLoading(false)
            }
        }, 1500)
    }

    if (isEmailSent) {
        return (
            <PageContainer>
                <AuthContainer
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <BackButton
                        onClick={() => navigate('/auth')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaArrowLeft /> Back to Login
                    </BackButton>

                    <SuccessMessage>
                        <FaCheckCircle style={{ fontSize: '4rem' }} />
                        <MainTitle>Check Your Email</MainTitle>
                        <Subtitle>
                            We've sent a password reset link to {email}.
                            Please check your inbox and follow the instructions.
                        </Subtitle>
                        <SubmitButton
                            onClick={() => navigate('/auth')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Return to Login
                        </SubmitButton>
                    </SuccessMessage>
                </AuthContainer>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <AuthContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <BackButton
                    onClick={() => navigate('/auth')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaArrowLeft /> Back to Login
                </BackButton>

                <HeaderSection>
                    <MainTitle>Forgot Password</MainTitle>
                    <Subtitle>
                        Enter your email and we'll send you a reset link
                    </Subtitle>
                </HeaderSection>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <IconWrapper><FaEnvelope /></IconWrapper>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: !isLoading ? 1.05 : 1 }}
                        whileTap={{ scale: !isLoading ? 0.95 : 1 }}
                    >
                        {isLoading ? 'Sending...' : 'Reset Password'}
                    </SubmitButton>
                </Form>
            </AuthContainer>
        </PageContainer>
    )
}

export default ForgotPasswordPage
