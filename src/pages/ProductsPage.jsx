import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaQrcode, FaTag, FaMobile, FaApple, FaBox } from 'react-icons/fa'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl};
`

const PageTitle = styled.h1`
  text-align: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  margin-bottom: ${props => props.theme.space.xl};
  color: ${props => props.theme.colors.primary};
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.space.lg};
`

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const ProductIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const ProductTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.space.md};
`

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.space.lg};
`

const ProductPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const ViewDetailsButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.full};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
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

const ProductsPage = () => {
  const navigate = useNavigate()

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <PageContainer>
      <PageTitle>Our Products</PageTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductIcon>{product.icon}</ProductIcon>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <ViewDetailsButton 
              onClick={() => handleViewDetails(product.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </ViewDetailsButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  )
}

export default ProductsPage
