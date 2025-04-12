import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const StyledSection = styled(motion.section)`
  padding: ${props => props.noPadding ? '0' : props.theme.space['2xl']} 0;
  background: ${props => props.theme.colors[props.background] || props.theme.colors.background};
  position: relative;
  overflow: hidden;
  
  ${props => props.gradient && `
    background: ${props.theme.colors.gradient[props.gradient]};
    color: white;
  `}
`

export const Section = ({ children, ...props }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <StyledSection
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...props}
    >
      {children}
    </StyledSection>
  )
}

export const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.lg};
  position: relative;
  z-index: ${props => props.theme.zIndices.base};
`

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || props.theme.space.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(${props => props.tabletColumns || 6}, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(${props => props.mobileColumns || 4}, 1fr);
  }
`

export const Flex = styled(motion.div)`
  display: flex;
  gap: ${props => props.gap || props.theme.space.md};
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: ${props => props.tabletDirection || props.direction || 'row'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: ${props => props.mobileDirection || 'column'};
  }
`

export const Card = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

export const Button = styled(motion.button)`
  text-transform: capitalize;
  background: ${props => props.variant === 'outline' 
    ? 'transparent' 
    : props.theme.colors[props.color || 'primary']};
  color: ${props => props.variant === 'outline' 
    ? props.theme.colors[props.color || 'primary']
    : 'white'};
  padding: ${props => props.size === 'large' 
    ? `${props.theme.space.lg} ${props.theme.space.xl}`
    : `${props.theme.space.md} ${props.theme.space.lg}`};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes[props.size === 'large' ? 'xl' : 'md']};
  transition: all ${props => props.theme.transitions.medium};
  border: ${props => props.variant === 'outline' ? `2px solid ${props.theme.colors[props.color || 'primary']}` : 'none'};
  box-shadow: ${props => props.variant === 'outline' ? 'none' : props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.variant === 'outline'
      ? props.theme.colors[props.color || 'primary']
      : props.theme.colors[`${props.color || 'primary'}Light`]};
    color: white;
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Text = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes[props.size || 'md']};
  font-weight: ${props => props.theme.fontWeights[props.weight || 'normal']};
  color: ${props => props.theme.colors[props.color || 'text']};
  line-height: ${props => props.leading || 1.5};
  margin: ${props => props.margin || 0};
  text-align: ${props => props.align || 'left'};
`

export const Heading = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes[props.size || '4xl']};
  font-weight: ${props => props.theme.fontWeights[props.weight || 'bold']};
  color: ${props => props.theme.colors[props.color || 'text']};
  line-height: ${props => props.leading || 1.2};
  margin: ${props => props.margin || `0 0 ${props.theme.space.lg} 0`};
  text-align: ${props => props.align || 'left'};
  
  ${props => props.gradient && `
    background: ${props.theme.colors.gradient[props.gradient]};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  `}
`

// Animation variants for staggered children
export const containerVariants = {
  hidden: { 
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Reusable AnimatedSection component with fade-in effect
export const AnimatedSection = ({ children, delay = 0, ...props }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: "easeOut"
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Reusable FadeInWhenVisible component for individual elements
export const FadeInWhenVisible = ({ children, delay = 0, ...props }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
