import styled from 'styled-components'
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaSignOutAlt, FaUser} from "react-icons/fa";

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
  background-color: white;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
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
                <ActionButton onClick={() => navigate('/admin')}>Administration</ActionButton>
                <ActionButton as={Link} to="/profile"><FaUser/></ActionButton>
                <ActionButton onClick={handleLogout}>
                    <FaSignOutAlt />
                </ActionButton>
            </HeaderActions>
        </Header>
    )
}

export default TopNav;