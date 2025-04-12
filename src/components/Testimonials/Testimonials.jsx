import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { containerVariants, itemVariants, FadeInWhenVisible } from '../Layout/Section'

const Section = styled.section`
  padding: ${props => props.theme.space.xl} 0; 
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.md};
`

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['4xl']};
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.space.lg};
`

const Testimonial = styled(motion.div)`
  padding: ${props => props.theme.space.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const Quote = styled.p`
  font-style: italic;
  margin-bottom: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const Author = styled.p`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary};
`

const testimonials = [
  {
    quote: "World Tag gave me peace of mind when my dog went missing. Thanks to the QR tag, he was back home within hours!",
    author: "Sarah M., Pet Owner"
  },
  {
    quote: "The simplicity of the system makes it perfect for my father with Alzheimer's. No complicated apps or devices needed.",
    author: "John D., Caregiver"
  },
  {
    quote: "As a veterinarian, I recommend World Tag to all my clients. It's the most reliable pet tracking solution I've seen.",
    author: "Dr. Emily R., DVM"
  }
]

export const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <Section>
      <Container>
        <FadeInWhenVisible>
          <Title>What Our Users Say</Title>
        </FadeInWhenVisible>

        <Grid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} variants={itemVariants}>
              <Quote>{testimonial.quote}</Quote>
              <Author>{testimonial.author}</Author>
            </Testimonial>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
