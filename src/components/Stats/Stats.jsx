import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPaw, FaHeart, FaBrain, FaHome, FaInfoCircle } from 'react-icons/fa'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${props => props.theme.space.md} 0;
  background: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.space.lg} 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.md} 0;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.space.md};
  }
`

const StatGroup = styled(motion.div)`
  background: white;
  margin-bottom: ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.space.xl};
  transition: all ${props => props.theme.transitions.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const GroupTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.space.md};
    font-size: 1.25rem;
  }
`

const StatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.space.sm};
  }
`

const StatItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.space.md};
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-items: center;
    gap: ${props => props.theme.space.sm};
  }
`

const StatIcon = styled.span`
  color: ${props => props.theme.colors.success};
  font-size: 1.25rem;
  margin-top: 0.25rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-top: 0;
  }
`

const Highlight = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`

const CTASection = styled(motion.div)`
  text-align: center;
  margin-top: ${props => props.theme.space.xxl};
  background: ${props => props.theme.colors.gradient.primary};
  padding: ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.lg};
  color: white;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: ${props => props.theme.space.lg};
    padding: ${props => props.theme.space.lg};
  }
`

const CTATitle = styled.h3`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  margin-bottom: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`

const CTADescription = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  margin-bottom: ${props => props.theme.space.lg};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.875rem;
    margin-bottom: ${props => props.theme.space.md};
  }
`

const CTAButton = styled(motion.button)`
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.space.md} ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.full};
  font-weight: 600;
  font-size: clamp(1rem, 3vw, 1.25rem);
  transition: all ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.colors.secondaryLight};
  }
`

const Stats = () => {
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
          Connecting & Protecting
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
          <GridContainer>
            <StatGroup variants={itemVariants}>
              <GroupTitle><FaPaw /> Pets & Safety</GroupTitle>
              <StatList>
                <StatItem variants={itemVariants}>
                  <StatIcon>✅</StatIcon>
                  <span><Highlight>841M pets worldwide</Highlight> – 471M dogs & 370M cats</span>
                </StatItem>
                <StatItem variants={itemVariants}>
                  <StatIcon>✅</StatIcon>
                  <span><Highlight>75% of lost cats</Highlight> are found within a third of a mile</span>
                </StatItem>
                <StatItem variants={itemVariants}>
                  <StatIcon>✅</StatIcon>
                  <span><Highlight>Lost dogs</Highlight> are typically reunited within <Highlight>2 days</Highlight></span>
                </StatItem>
                <StatItem variants={itemVariants}>
                  <StatIcon>✅</StatIcon>
                  <span><Highlight>33% of global households</Highlight> own at least one pet</span>
                </StatItem>
              </StatList>
            </StatGroup>

            <StatGroup variants={itemVariants}>
              <GroupTitle><FaBrain /> Alzheimer's & Dementia</GroupTitle>
              <StatList>
                <StatItem variants={itemVariants}>
                  <StatIcon>🧠</StatIcon>
                  <span><Highlight>55M+ people</Highlight> worldwide live with dementia</span>
                </StatItem>
                <StatItem variants={itemVariants}>
                  <StatIcon>🧠</StatIcon>
                  <span><Highlight>A new dementia case</Highlight> emerges <Highlight>every 3 seconds</Highlight></span>
                </StatItem>
                <StatItem variants={itemVariants}>
                  <StatIcon>🧠</StatIcon>
                  <span>Cases are expected to <Highlight>double every 20 years</Highlight></span>
                </StatItem>
              </StatList>
            </StatGroup>
          </GridContainer>

          <CTASection variants={itemVariants}>
            <CTATitle>Protect What Matters Most</CTATitle>
            <CTADescription>
              World Tag provides a smart, app-free solution to help keep pets and loved ones safe. 
              Our innovative technology ensures quick reunification and peace of mind.
            </CTADescription>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Tag Now
            </CTAButton>
          </CTASection>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Stats
