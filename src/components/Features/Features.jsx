import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaShieldAlt, FaMobileAlt, FaUserShield } from 'react-icons/fa'

const Section = styled.section`
  padding: ${props => props.theme.space.md} 0;
  background: ${props => props.theme.colors.backgroundAlt};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.space.xl} 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg} 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.space.md};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.space.lg};
  }
`

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: ${props => props.theme.colors.textDark};
  margin-bottom: ${props => props.theme.space.md};
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.space.sm};
  }
`

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  padding: 0 ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0 ${props => props.theme.space.sm};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.md};
  }
`

const Feature = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.medium};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.md};
    text-align: center;
    align-items: center;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.primaryLight};
  border-radius: ${props => props.theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.space.lg};
  color: white;
  font-size: 1.5rem;
  transition: all ${props => props.theme.transitions.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
    margin-bottom: ${props => props.theme.space.md};
  }

  ${Feature}:hover & {
    transform: scale(1.1);
    background: ${props => props.theme.colors.primary};
  }
`

const FeatureTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: ${props => props.theme.colors.textDark};
  margin-bottom: ${props => props.theme.space.md};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.3;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.space.sm};
  }
`

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  font-size: clamp(0.875rem, 2vw, 1rem);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`

const features = [
  {
    icon: <FaShieldAlt />,
    title: 'Advanced Security',
    description: 'Bank-level encryption ensures your tracking data stays private and protected at all times.'
  },
  {
    icon: <FaMobileAlt />,
    title: 'App-Free Solution',
    description: 'No app installation required. Access information instantly through any mobile browser.'
  },
  {
    icon: <FaUserShield />,
    title: 'Privacy First',
    description: 'You control what information is shared and who can access it.'
  }
]

export const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <Section>
      <Container>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose World Tag
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the next generation of tracking technology with features designed for your peace of mind.
          </Description>
        </SectionHeader>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Grid>
            {features.map((feature, index) => (
              <Feature 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <IconWrapper>{feature.icon}</IconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </Feature>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  )
}
