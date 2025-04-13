import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { FaBox } from 'react-icons/fa'
import useCatalog from '../hooks/useCatalog' // Adjust the path if needed

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 120px auto;
  padding: ${props => props.theme.space.xl};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.space.lg};  
  }
`

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const ProductImage = styled.div` 
  width: 100%; 
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  justify-content: center;
  align-items: start;
  padding: ${props => props.theme.space.lg};  
  border-radius: ${props => props.theme.radii.lg};
  margin-bottom: ${props => props.theme.space.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0;
    justify-content: center;
    align-items: center;
  }
`

const ProductIconImg = styled.img` 
  width: 100%; 
  max-width: 600px;
  height: auto;
  border-radius: ${props => props.theme.radii.md};
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.lg};
`

const ProductTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
`

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const ProductMore = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Price = styled.div`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const QuantityButton = styled.button`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.md};
`

const OrderSection = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.lg};
`

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
`

const Input = styled.input`
  padding: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid ${props => props.theme.colors.border};
`

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.bold};
`

const ProductDetailPage = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const { allProducts, loading, error } = useCatalog()

  // Convert id to number for lookup
  const productId = parseInt(id)
  const product = allProducts.find(p => p.id === productId)

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement payment processing logic
    console.log('Order submitted', { product, quantity, formData })
    alert('Order placed successfully!')
  }

  if (loading) return <div>Loading product...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) return <div>Product not found</div>

  return (
      <PageContainer>
        <ProductContainer>
        <ProductImage>
          {product.cover ? <ProductIconImg src={product.cover} /> : <FaBox />}
        </ProductImage>
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductMore>{product.details}</ProductMore>

          <PriceSection>
            <Price>${parseFloat(product.price).toFixed(2)}</Price>
            <QuantityControl>
              <QuantityButton type="button" onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
              <span>{quantity}</span>
              <QuantityButton type="button" onClick={() => handleQuantityChange(1)}>+</QuantityButton>
            </QuantityControl>
          </PriceSection>
        </ProductDetails>
        </ProductContainer>
        <ProductContainer />
        <OrderSection>
          <PaymentForm onSubmit={handleSubmit}>
            <h3>Billing & Shipping Details</h3>
            <FormGroup>
              <label>Full Name</label>
              <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
              />
            </FormGroup>
            <FormGroup>
              <label>Email Address</label>
              <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
              />
            </FormGroup>
            <FormGroup>
              <label>Shipping Address</label>
              <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
              />
            </FormGroup>

            <h3>Payment Details</h3>
            <FormGroup>
              <label>Card Number</label>
              <Input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
              />
            </FormGroup>
            <FormGroup>
              <label>Expiry Date</label>
              <Input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
              />
            </FormGroup>
            <FormGroup>
              <label>CVV</label>
              <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
              />
            </FormGroup>

            <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Place Order (${(product.price * quantity).toFixed(2)})
            </SubmitButton>
          </PaymentForm>
        </OrderSection>
      </PageContainer>
  )
}

export default ProductDetailPage
