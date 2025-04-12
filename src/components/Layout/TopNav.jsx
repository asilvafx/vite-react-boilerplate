import styled from 'styled-components'
import React from "react";
import {useNavigate} from "react-router-dom";
import {FaSignOutAlt, FaUser} from "react-icons/fa";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${props => props.theme.space.lg};
  padding-right: ${props => props.theme.space.lg};
  padding-top: ${props => props.theme.space.md};
  padding-bottom: ${props => props.theme.space.md};
  background: white;
  box-shadow: ${props => props.theme.shadows.sm};
`

const Logo = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const ActionButton = styled.button`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textLight};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
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
                <ActionButton onClick={() => navigate('/profile')}>
                    <FaUser />
                </ActionButton>
                <ActionButton onClick={handleLogout}>
                    <FaSignOutAlt />
                </ActionButton>
            </HeaderActions>
        </Header>
    )
}

export default TopNav;