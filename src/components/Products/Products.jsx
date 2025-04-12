import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaTag, FaQrcode, FaMobile, FaApple, FaBox, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Section, Container, Heading, Text } from '../Layout/Section'

const ProductsContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.lg};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.space.md};
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.space.lg};
  }
`

const SliderContainer = styled.div`
  position: relative;
  margin: 0 -${props => props.theme.space.lg};
  padding: 0 ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0 -${props => props.theme.space.md};
    padding: 0 ${props => props.theme.space.md};
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    margin: 0;
    padding: 0;
  }
`

const ProductSlider = styled.div`
  display: flex;
  gap: ${props => props.theme.space.lg};
  padding: ${props => props.theme.space.lg} 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  
  /* Show scrollbar only on large devices */
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    &::-webkit-scrollbar {
      height: 8px;
      background: ${props => props.theme.colors.backgroundAlt};
      border-radius: ${props => props.theme.radii.full};
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primary};
      border-radius: ${props => props.theme.radii.full};
      
      &:hover {
        background: ${props => props.theme.colors.primaryDark};
      }
    }

    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.colors.primary} ${props => props.theme.colors.backgroundAlt};
  }

  /* Hide scrollbar on mobile and smaller devices */
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Add bottom margin for scrollbar */
  margin-bottom: ${props => props.theme.space.md};
`

const ProductCard = styled(motion.div)`
  flex: 0 0 300px;
  scroll-snap-align: start;
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex: 0 0 260px;
    padding: ${props => props.theme.space.lg};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radii.full};
  background: white;
  box-shadow: ${props => props.theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  z-index: ${props => props.theme.zIndices.docked};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    ${props => props.direction === 'left' ? 'left: 5px;' : 'right: 5px;'}
  }

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`

const ScrollbarContainer = styled.div`
  position: relative;
  height: 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.full};
  margin: 0 ${props => props.theme.space.lg};
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`

const ScrollbarThumb = styled.div`
  position: absolute;
  height: 100%;
  width: 20%;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radii.full};
  left: 0;
  transition: transform 0.1s ease-out;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`

const ProductIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const ProductTitle = styled.h4`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textDark};
  margin-bottom: ${props => props.theme.space.sm};
`

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.lg};
  line-height: 1.6;
`

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    gap: ${props => props.theme.space.md};
    color: ${props => props.theme.colors.primaryLight};
  }
`

const PromoSection = styled(motion.div)`
  margin-top: ${props => props.theme.space.xl};
  text-align: center;
  padding: ${props => props.theme.space.xl};
  background: ${props => props.theme.colors.gradient.primary};
  border-radius: ${props => props.theme.radii.lg};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg};
    margin-top: ${props => props.theme.space.lg};
  }
`

const products = [
  {
    id: 1,
    icon: <FaQrcode />,
    title: 'QRCode Pet Tag',
    description: 'Durable, waterproof, and easy to use.',
    price: 29.99
  },
  {
    id: 2,
    icon: <FaTag />,
    title: 'Pet Tag + Collar',
    description: 'Secure and stylish collar with a built-in tag.',
    price: 49.99
  },
  {
    id: 3,
    icon: <FaMobile />,
    title: 'Pet Tag + NFC',
    description: 'Tap-to-scan technology for instant access.',
    price: 39.99
  },
  {
    id: 4,
    icon: <FaApple />,
    title: 'Pet Tag + AirTag',
    description: 'Ultimate tracking with Apple AirTag compatibility.',
    price: 59.99
  },
  {
    id: 5,
    icon: <FaBox />,
    title: 'Full Kit',
    description: 'All-in-one solution for maximum safety.',
    price: 99.99
  }
]

const Products = () => {
  const navigate = useNavigate()
  const sliderRef = useRef(null)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      const scrolled = sliderRef.current.scrollLeft
      const progress = (scrolled / scrollWidth) * 100
      setScrollProgress(progress)
    }
  }

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300 + 16 // card width + gap
      sliderRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount
    }
  }

  React.useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', handleScroll)
      return () => slider.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  return (
    <ProductsContainer>
      <Header>
        <Heading align="center" gradient="primary">
          Stay Connected, Anytime, Anywhere
        </Heading>
        <Text size="xl" color="textLight" align="center" margin="0 auto" style={{ maxWidth: '800px' }}>
          Explore our range of <strong>QR Code & NFC tags</strong> designed for <strong>pets and individuals</strong>.
          No app required—just scan and reconnect instantly!
        </Text>
      </Header>

      <SliderContainer>
        <NavigationButton direction="left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </NavigationButton>
        
        <ProductSlider 
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductIcon>{product.icon}</ProductIcon>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ViewButton onClick={() => handleViewDetails(product.id)}>
                View Details <FaArrowRight />
              </ViewButton>
            </ProductCard>
          ))}
        </ProductSlider>

        <NavigationButton direction="right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </NavigationButton>

        <ScrollbarContainer>
          <ScrollbarThumb 
            style={{ 
              transform: `translateX(${scrollProgress}%)`,
              width: `${100 / (products.length / 2)}%`
            }} 
          />
        </ScrollbarContainer>
      </SliderContainer>

      <PromoSection
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Text color="white" size="xl" weight="bold" margin="0 0 1rem">
          🔥 Limited-Time Offer! Get 10% OFF on your first tag.
        </Text>
        <Text color="white" size="lg" margin="0 0 2rem">
          Order Now & Stay Connected!
        </Text>
        <motion.button
          onClick={handleShopNow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'white',
            color: '#0062F5',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '1.125rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          Shop Now
        </motion.button>
      </PromoSection>
    </ProductsContainer>
  )
}

export default Products
