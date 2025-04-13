import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import { useAuth } from '../../hooks/useAuth';
import logo_img from '../../assets/vite.svg';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.scrolled ? 'rgba(255, 249, 242, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  padding: ${props => props.theme.space.md} 0;
  z-index: ${props => props.theme.zIndices.sticky};
`

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.space.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    justify-content: end;
    gap: ${props => props.theme.space.md};
  }
`

const Logo = styled.a`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-right: auto;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`

const MobileNavLinks = styled(motion.div)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 80%;
    max-width: 400px;
    background: white;
    padding: ${props => props.theme.space.lg};
    gap: ${props => props.theme.space.lg};
    box-shadow: ${props => props.theme.shadows.xl};
    z-index: 9999;
    
    /* Enable scrolling */
    overflow-y: auto;
    overscroll-behavior: contain;
    
    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.backgroundAlt};
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primary};
      border-radius: ${props => props.theme.radii.full};
    }
    
    /* Smooth scrolling */
    scroll-behavior: smooth;
  }
`

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.lg};
  padding-bottom: ${props => props.theme.space.xl}; /* Extra padding at bottom */
`

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.space.xl};
`

const NavLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: color ${props => props.theme.transitions.fast};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.md};
  display: flex;

  &:hover {
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.lg};
    padding: ${props => props.theme.space.md};
    width: 100%;
    text-align: left;
  }
`

const NavLinkBtn = styled.a`
  background-color: white;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: color ${props => props.theme.transitions.fast};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.lg};
  display: flex;

  &:hover {
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.backgroundAlt};
  }
  
  &>svg {
    fill: #0A2540
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.lg};
    padding: ${props => props.theme.space.md};
    width: 100%;
    text-align: left;
  }
`

const SearchBar = styled.div`
  display: none;
  align-items: center;
  background: white;
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin: ${props => props.theme.space.md} 0;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }

  input {
    border: none;
    outline: none;
    background: none;
    font-size: ${props => props.theme.fontSizes.md};
    width: 200px;
    color: ${props => props.theme.colors.text};

    &::placeholder {
      color: ${props => props.theme.colors.textLight};
    }

    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      width: 100%;
    }
  }

  svg {
    color: ${props => props.theme.colors.textLight};
    margin-right: ${props => props.theme.space.sm};
  }
`

const JoinButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
    width: 100%;
    padding: ${props => props.theme.space.md};
    text-align: center;
  }
`

const JoinMenuButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) { 
    width: 100%;
    padding: ${props => props.theme.space.md};
    text-align: center;
  }
`

const MenuButton = styled.button`
  display: none;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: ${props => props.theme.radii.md};
    background: white;
    box-shadow: ${props => props.theme.shadows.sm};
    
    &:hover {
      background: ${props => props.theme.colors.backgroundAlt};
    }
  }
`

const Overlay = styled(motion.div)`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: ${props => props.theme.zIndices.overlay};
`

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      delay: 0.2
    }
  },
  open: {
    opacity: 1
  }
}

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/auth')
    setIsMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('') // Reset search input
      setIsMenuOpen(false) // Close mobile menu if open
    }
  }

  // Update the SearchBar in both desktop and mobile sections
  const SearchBarComponent = (
      <SearchBar as="form" onSubmit={handleSearch}>
        <FaSearch />
        <input
            type="text"
            placeholder="Search by Tag ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Nav
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Logo as={Link} to="/">World Tag</Logo>
        
        <NavLinks>
          <NavLink as={Link} to="/">Explore</NavLink>
          <NavLink as={Link} to="/products">Shop</NavLink>
          <NavLink as={Link} to="/faq">FAQ</NavLink>
          <NavLink as={Link} to="/support">Support</NavLink>
        </NavLinks>
          {SearchBarComponent}
          {isAuthenticated ? (
              <>
                <NavLinkBtn as={Link} to="/dashboard"><FaUser size={20} /></NavLinkBtn>
                <JoinButton onClick={handleLogout}>Logout</JoinButton>
              </>
          ) : (
              <JoinButton onClick={handleSignIn}>Sign in / Register</JoinButton>
          )}

        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <Overlay
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={closeMenu}
              />
              <MobileNavLinks
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <MobileNavHeader>
                  <Logo href="/">World Tag</Logo>
                  <MenuButton onClick={closeMenu}>
                    <FaTimes />
                  </MenuButton>
                </MobileNavHeader>
                 <ScrollContainer>
                   <NavLink as={Link} to="/" onClick={closeMenu}>Explore</NavLink>
                   <NavLink as={Link} to="/products" onClick={closeMenu}>Shop</NavLink>
                   <NavLink as={Link} to="/faq" onClick={closeMenu}>FAQ</NavLink>
                   <NavLink as={Link} to="/support" onClick={closeMenu}>Support</NavLink>

                 {SearchBarComponent}
                 {isAuthenticated ? (
                     <>
                       {user?.user.isAdmin === "true" && (
                         <NavLink as={Link} to="/admin" onClick={closeMenu}>Administration</NavLink>
                       )}
                       <NavLink as={Link} to="/dashboard" onClick={closeMenu}>My Tags</NavLink>
                       <JoinMenuButton onClick={handleLogout}>Logout</JoinMenuButton>
                     </>
                 ) : (
                     <JoinMenuButton onClick={handleSignIn}>Sign in / Register</JoinMenuButton>
                 )}

                </ScrollContainer>
              </MobileNavLinks>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Nav>
  )
}

export default Navbar
