import React from 'react'
import Hero from '../components/Hero/Hero'
import { Features } from '../components/Features/Features'
import Stats from '../components/Stats/Stats'
import Products from '../components/Products/Products'
import { Testimonials } from '../components/Testimonials/Testimonials'
import { Section, Container, AnimatedSection } from '../components/Layout/Section'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  const handleBuyNow = () => {
    navigate('/products')
  }

  return (
    <main>
      <Section gradient="primary" noPadding>
        <Hero onBuyNow={handleBuyNow} />
      </Section>

      <AnimatedSection>
        <Section background="backgroundAlt">
          <Container>
            <Features />
          </Container>
        </Section>
      </AnimatedSection>

      <AnimatedSection>
        <Section>
          <Container>
            <Stats />
          </Container>
        </Section>
      </AnimatedSection>

      <AnimatedSection>
        <Section background="backgroundDark">
          <Container>
            <Products />
          </Container>
        </Section>
      </AnimatedSection>

      <AnimatedSection>
        <Section>
          <Container>
            <Testimonials />
          </Container>
        </Section>
      </AnimatedSection>
    </main>
  )
}

export default HomePage
