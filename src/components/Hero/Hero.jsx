import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Section, Container, Button } from '../Layout/Section'

const HeroSection = styled(Section)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  padding: 80px 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 120px 0;
    min-height: auto;
  }
`

const HeroContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.space.xl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${props => props.theme.space.lg};
  }
`

const Content = styled.div`
  max-width: 600px;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 0 auto;
    padding: 0 ${props => props.theme.space.md};
  }
`

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: ${props => props.theme.fontWeights.extrabold};
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin-bottom: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: ${props => props.theme.space.sm};
  }
`

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.lg};
  font-weight: ${props => props.theme.fontWeights.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    margin-bottom: ${props => props.theme.space.md};
  }
`

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, ${props => props.theme.fontSizes.lg});
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.xl};
  line-height: 1.8;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: ${props => props.theme.space.lg};
    line-height: 1.6;
  }
`

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.space.sm};
    
    & > button {
      width: 100%;
      margin-bottom: ${props => props.theme.space.sm};
    }
  }
`

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 250px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 120%;
    height: 120%;
    background: ${props => props.theme.colors.gradient.secondary};
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    z-index: 1;
  }

  img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${props => props.theme.radii.xl};
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const ResponsiveButton = styled(Button)`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
    font-size: ${props => props.theme.fontSizes.md};
  }
`

const StatsBar = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.space.xl};
  margin-top: ${props => props.theme.space.xl};
  padding: ${props => props.theme.space.lg};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.space.md};
    align-items: center;
    margin-top: ${props => props.theme.space.lg};
    padding: ${props => props.theme.space.md};
  }
`

const StatItem = styled.div`
  text-align: center;

  h3 {
    font-size: clamp(1.5rem, 3vw, ${props => props.theme.fontSizes['2xl']});
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-bottom: ${props => props.theme.space.xs};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    font-size: clamp(0.875rem, 1.5vw, ${props => props.theme.fontSizes.sm});
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${props => props.theme.space.sm} 0;
    border-bottom: 1px solid ${props => props.theme.colors.border};

    &:last-child {
      border-bottom: none;
    }
  }
`

const Hero = ({ onBuyNow }) => {
  return (
    <HeroSection>
      <HeroContainer>
        <Content>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Keep Your Loved Ones Safe & Connected
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart QR Tags for Pets & People
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            World Tag provides an innovative, app-free solution to help locate and identify lost pets and individuals with memory conditions. Our smart QR tags work instantly with any smartphone camera.
          </Description>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ResponsiveButton 
              color="primary"
              size="large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBuyNow}
            >
              Buy now
            </ResponsiveButton>
            <ResponsiveButton 
              variant="outline" 
              color="primary"
              size="large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </ResponsiveButton>
          </ButtonGroup>

          <StatsBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <StatItem>
              <h3>50M+</h3>
              <p>Use Cases</p>
            </StatItem>
            <StatItem>
              <h3>98%</h3>
              <p>Success Rate</p>
            </StatItem>
            <StatItem>
              <h3>24/7</h3>
              <p>Support</p>
            </StatItem>
          </StatsBar>
        </Content>

        <ImageWrapper
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2986&ixlib=rb-4.0.3" 
            alt="Happy dog with World Tag" 
          />
        </ImageWrapper>
      </HeroContainer>
    </HeroSection>
  )
}

export default Hero
