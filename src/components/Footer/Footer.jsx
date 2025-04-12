import React from 'react'
import styled from 'styled-components'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'

const FooterWrapper = styled.footer`
  width: 100%;
  background: ${props => props.theme.colors.text};
  color: white;
  padding: ${props => props.theme.space.xl} 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.space.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.md};
  }
`

const Column = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
`
const ColumnEnd = styled(motion.div)`
  margin-top: ${props => props.theme.space.xl};
  width: 100%; 
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
`

const Title = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.space.md};
  color: white;
  position: relative;
  padding-bottom: ${props => props.theme.space.sm};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
  }
`

const Link = styled(motion.a)`
  color: rgba(255,255,255,0.7);
  transition: all ${props => props.theme.transitions.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  
  &:hover {
    color: white;
    transform: translateX(5px);
  }
`

const SocialLinks = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.md};
  margin-top: ${props => props.theme.space.md};
`

const SocialIcon = styled(motion.a)`
  color: rgba(255,255,255,0.7);
  font-size: 1.5rem;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    color: white;
    transform: scale(1.2);
  }
`

const Copyright = styled.div`
  text-align: center;
  padding: ${props => props.theme.space.md} 0; 
  color: rgba(255,255,255,0.7);
  font-size: ${props => props.theme.fontSizes.sm};
`

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <>
      <FooterWrapper>
        <Container>
          <Column variants={itemVariants}>
            <Title>World Tag</Title>
            <Link href="#">About Us</Link>
            <Link href="#">Our Mission</Link>
            <Link href="#">Team</Link>
            <Link href="#">Careers</Link>
          </Column>
          
          <Column variants={itemVariants}>
            <Title>Products</Title>
            <Link href="#">Pet Tags</Link>
            <Link href="#">NFC Tags</Link>
            <Link href="#">AirTag Compatibility</Link>
            <Link href="#">Full Kit</Link>
          </Column>
          
          <Column variants={itemVariants}>
            <Title>Support</Title>
            <Link href="#">Contact</Link>
            <Link href="#">Help Center</Link>
            <Link href="#">FAQ</Link>
            <Link href="/shipping-returns">Shipping & Returns</Link>
          </Column>
          
          <Column variants={itemVariants}>
            <Title>Legal</Title>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Accessibility</Link>
          </Column>
        </Container>

        <ColumnEnd variants={itemVariants}>

          <SocialLinks>
            <SocialIcon
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </SocialIcon>
          </SocialLinks>
        </ColumnEnd>
        
        <Copyright>
          © {new Date().getFullYear()} World Tag. All Rights Reserved.
        </Copyright>
      </FooterWrapper>
    </>
  )
}

export default Footer
