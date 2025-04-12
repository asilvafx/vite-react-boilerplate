import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { FaCreditCard, FaShippingFast, FaBox } from 'react-icons/fa'

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const ProductImage = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space.xl};
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

const products = [
  {
    id: 1,
    icon: <FaBox size={200} />,
    title: 'QRCode Pet Tag',
    description: 'Durable, waterproof, and easy to use. Perfect for tracking pets and loved ones with memory conditions.',
    price: 29.99
  },
  {
    id: 2,
    icon: <FaBox size={200} />,
    title: 'Pet Tag + Collar',
    description: 'Secure and stylish collar with a built-in tag. Ensures your pet is always identifiable.',
    price: 49.99
  },
  {
    id: 3,
    icon: <FaBox size={200} />,
    title: 'Pet Tag + NFC',
    description: 'Tap-to-scan technology for instant access. Quick and easy identification.',
    price: 39.99
  },
  {
    id: 4,
    icon: <FaBox size={200} />,
    title: 'Pet Tag + AirTag',
    description: 'Ultimate tracking with Apple AirTag compatibility. Advanced location tracking.',
    price: 59.99
  },
  {
    id: 5,
    icon: <FaBox size={200} />,
    title: 'Full Kit',
    description: 'All-in-one solution for maximum safety. Includes multiple tags and accessories.',
    price: 99.99
  }
]

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

  const product = products.find(p => p.id === parseInt(id))

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

  if (!product) return <div>Product not found</div>

  return (
    <PageContainer>
      <ProductImage>
        {product.icon}
      </ProductImage>
      <ProductDetails>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        
        <PriceSection>
          <Price>${product.price.toFixed(2)}</Price>
          <QuantityControl>
            <QuantityButton type="button" onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
            <span>{quantity}</span>
            <QuantityButton type="button" onClick={() => handleQuantityChange(1)}>+</QuantityButton>
          </QuantityControl>
        </PriceSection>

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
      </ProductDetails>
    </PageContainer>
  )
}

export default ProductDetailPage
