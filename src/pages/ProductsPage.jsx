import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBox } from 'react-icons/fa'
import useCatalog from '../hooks/useCatalog' // Adjust the import path if needed

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 120px auto;
  padding: ${props => props.theme.space.xl};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.space.lg};
  }
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
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg};
  }
`

const ProductIcon = styled.div`
  width: 100%;
  height: auto;
  max-width: 400px;
  max-height: 400px;
  position: relative;
  margin: 0 auto 2rem auto;
  font-size: 3rem;
  padding: 1rem 1.5rem;
  border: 3px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.lg};
  color: ${props => props.theme.colors.primary};
`

const ProductIconImg = styled.img` 
  border-radius: ${props => props.theme.radii.md};
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

const ProductsPage = () => {
  const navigate = useNavigate()
  const { products, loading, error } = useCatalog()

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (loading) {
    return (
        <PageContainer>
          <p>Loading products...</p>
        </PageContainer>
    )
  }

  if (error) {
    return (
        <PageContainer>
          <p>Error: {error}</p>
        </PageContainer>
    )
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
                <ProductIcon>
                  {product.cover ? <ProductIconImg src={product.cover} /> : <FaBox />}
                </ProductIcon>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>${parseFloat(product.price).toFixed(2)}</ProductPrice>
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
