import styled from 'styled-components'
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaUser, FaShieldAlt} from "react-icons/fa";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${props => props.theme.space.lg};
  padding-right: ${props => props.theme.space.lg};
  padding-top: ${props => props.theme.space.md};
  padding-bottom: ${props => props.theme.space.md};
  background: transparent;
`

const Logo = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const ActionButton = styled.a`
    background-color: ${props => props.theme.colors.primary};
    color: white;
  font-weight: ${props => props.theme.fontWeights.bold};
  transition: color ${props => props.theme.transitions.fast};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  align-items: center;
  gap: .3rem;

  &:hover {
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.primaryDark};
  }
 
    &>svg {
        fill: white;
    }

    &:hover>svg {
        fill: ${props => props.theme.colors.accent}; 
    }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.lg};
    padding: ${props => props.theme.space.md};
    width: 100%;
    text-align: left;
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const TopNav = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        // Redirect to logout page
        navigate('/logout')
    }

    return (
        <Header>
            <Logo>World Tag</Logo>
            <HeaderActions>
                <ActionButton onClick={() => navigate('/admin')}>
                    <span>Admin</span>
                </ActionButton>
                <ActionButton as={Link} to="/profile">
                    <span>Profile</span>
                </ActionButton>
                <ActionButton onClick={handleLogout}>
                    <span>Logout</span>
                </ActionButton>
            </HeaderActions>
        </Header>
    )
}

export default TopNav;