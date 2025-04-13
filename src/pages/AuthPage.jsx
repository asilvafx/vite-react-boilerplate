import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/slices/authSlice'
import { encryptHash } from '../lib/crypto.js'
import toast from 'react-hot-toast'
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaArrowLeft,
  FaUserPlus,
  FaKey,
  FaGoogle,
  FaFacebook,
  FaApple,
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
  padding: ${props => props.theme.space.md};
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
  font-size:  ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: ${props => props.theme.space.md};
    left: ${props => props.theme.space.md};
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.space.lg};
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

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.space.lg};
  width: 100%;
`

const Tab = styled(motion.button)`
  flex: 1;
  padding: ${props => props.theme.space.md};
  background: ${props => props.active
    ? props.theme.colors.primary
    : props.theme.colors.backgroundAlt};
  color: ${props => props.active
    ? 'white'
    : props.theme.colors.textLight};
  border-radius: ${props => props.theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
  transition: all ${props => props.theme.transitions.medium};
  margin: 0 ${props => props.theme.space.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0 ${props => props.theme.space.xs};
    padding: ${props => props.theme.space.sm};
  }
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

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.space.lg} 0;
  color: ${props => props.theme.colors.textLight};

  &::before, &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }

  &::before {
    margin-right: ${props => props.theme.space.md};
  }

  &::after {
    margin-left: ${props => props.theme.space.md};
  }
`

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.space.lg};
  margin-top: ${props => props.theme.space.lg};
  width: 100%;
`

const SocialLoginButton = styled(motion.button)`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textLight};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.medium};
  font-size: 1.5rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }
`

const ForgotPasswordLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: right;
  margin-top: -${props => props.theme.space.sm};
  margin-bottom: ${props => props.theme.space.md};
  transition: color ${props => props.theme.transitions.medium};

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    text-decoration: underline;
  }
`

const SuccessMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.space.xl};
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  max-width: 500px;
  margin: 0 auto;
`

const SuccessTitle = styled.h2`
  color: ${props => props.theme.colors.success};
  margin-bottom: ${props => props.theme.space.md};
  font-size: ${props => props.theme.fontSizes.xl};
`

const SuccessDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.lg};
`

const SuccessButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.space.md};
`

const SuccessButton = styled(motion.button)`
  padding: ${props => props.theme.space.md} ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.medium};

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  &.secondary {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.border};
  }
`

const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login, isAuthenticated } = useAuth()
  const loading = useSelector((state) => state.auth.loading)

  const [activeTab, setActiveTab] = useState('signin')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (activeTab === 'signin') {
        // Login logic using the useAuth hook - pass the whole formData
        setIsLoading(true)
        await login(formData)
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        // Registration logic using Redux
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          toast.error('Passwords do not match')
          return
        }

        const resultAction = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: encryptHash(formData.password),
          isAdmin: false,
          createdAt: new Date().toISOString()
        })).unwrap()

        // If we get here, registration was successful
        if (resultAction && resultAction.key) {
          toast.success('Registration successful!')
          setRegistrationSuccess(true)
        } else {
          // This shouldn't happen due to error handling in the thunk,
          // but just in case
          toast.error('Registration failed. Please try again.')
        }
      }
    } catch (err) {
      const errorMessage = err?.message || 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (platform) => {
    toast.error(`${platform} login not implemented yet`)
  }

  const handleGoToLogin = () => {
    setRegistrationSuccess(false)
    setActiveTab('signin')
  }

  // Registration Success Component
  if (registrationSuccess) {
    return (
        <PageContainer>
          <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
          >
            <FaCheckCircle
                style={{
                  fontSize: '4rem',
                  color: '#4CAF50',
                  marginBottom: '20px'
                }}
            />
            <SuccessTitle>Registration Successful!</SuccessTitle>
            <SuccessDescription>
              Your account has been created successfully.
              You can now log in to continue to your dashboard.
            </SuccessDescription>

            <SuccessButtonGroup>
              <SuccessButton
                  className="primary"
                  onClick={handleGoToLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Go to Login
              </SuccessButton>
            </SuccessButtonGroup>
          </SuccessMessage>
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
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Home
          </BackButton>

          <HeaderSection>
            <MainTitle>
              {activeTab === 'signin'
                  ? 'Welcome Back'
                  : 'Create Your Account'}
            </MainTitle>
            <Subtitle>
              {activeTab === 'signin'
                  ? 'Sign in to continue to World Tag'
                  : 'Join our community and stay connected'}
            </Subtitle>
          </HeaderSection>

          <TabContainer>
            <Tab
                active={activeTab === 'signin' ? 1 : 0}
                onClick={() => setActiveTab('signin')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <FaUser /> Sign In
            </Tab>
            <Tab
                active={activeTab === 'register' ? 1 : 0}
                onClick={() => setActiveTab('register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus /> Register
            </Tab>
          </TabContainer>

          <Form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
                <InputGroup>
                  <IconWrapper><FaUser /></IconWrapper>
                  <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                  />
                </InputGroup>
            )}

            <InputGroup>
              <IconWrapper><FaEnvelope /></IconWrapper>
              <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <IconWrapper><FaLock /></IconWrapper>
              <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
              />
            </InputGroup>

            {activeTab === 'register' && (
                <InputGroup>
                  <IconWrapper><FaKey /></IconWrapper>
                  <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      
                      required
                      disabled={loading}
                  />
                </InputGroup>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginBottom: '10px'
                    }}
                >
                  {error}
                </motion.div>
            )}

            <SubmitButton
                type="submit"
                disabled={isLoading || loading}
                whileHover={{ scale: (!isLoading && !loading) ? 1.05 : 1 }}
                whileTap={{ scale: (!isLoading && !loading) ? 0.95 : 1 }}
            >
              {isLoading || loading
                  ? (activeTab === 'signin' ? 'Logging in...' : 'Registering...')
                  : (activeTab === 'signin' ? 'Sign In' : 'Create Account')}
            </SubmitButton>

            {activeTab === 'signin' && (
                <ForgotPasswordLink to="/forgot-password">
                  Forgot Password?
                </ForgotPasswordLink>
            )}

            <Divider>or</Divider>

            <SocialLoginContainer>
              <SocialLoginButton
                  onClick={() => handleSocialLogin('Google')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                <FaGoogle />
              </SocialLoginButton>
              <SocialLoginButton
                  onClick={() => handleSocialLogin('Facebook')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                <FaFacebook />
              </SocialLoginButton>
              <SocialLoginButton
                  onClick={() => handleSocialLogin('Apple')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                <FaApple />
              </SocialLoginButton>
            </SocialLoginContainer>
          </Form>
        </AuthContainer>
      </PageContainer>
  )
}

export default AuthPage