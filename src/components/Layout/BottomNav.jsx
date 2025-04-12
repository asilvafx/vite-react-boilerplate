import styled from 'styled-components'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHome, FaQrcode, FaStore, FaTags} from "react-icons/fa";


const BottomNavigation = styled.nav`
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: ${props => props.theme.space.md};
    background: white;
    box-shadow: ${props => props.theme.shadows.md};
`
const BottomSpace = styled.nav`
    content: '';
    width: 100%;
    min-height: 120px;
    max-height: 120px;
`
const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.sm};
  gap: ${props => props.theme.space.xs};
  transition: color ${props => props.theme.transitions.medium};

  &.active, &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const BottomNav = () => {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('tags')
    const handleNavigation = (path) => {
        switch(path) {
            case 'home':
                navigate('/')
                break
            case 'store':
                navigate('/products')
                break
            default:
                // Stay on current page
                break
        }
    }

    return (
        <>
        <BottomSpace />
        <BottomNavigation>
            <NavItem
                className={activeTab === 'tags' ? 'active' : ''}
                onClick={() => setActiveTab('tags')}
            >
                <FaTags />
                Tags
            </NavItem>
            <NavItem
                onClick={() => {/* TODO: Implement QR Scan */}}
            >
                <FaQrcode />
                Scan
            </NavItem>
            <NavItem
                onClick={() => handleNavigation('store')}
            >
                <FaStore />
                Store
            </NavItem>
            <NavItem
                onClick={() => handleNavigation('home')}
            >
                <FaHome />
                Home
            </NavItem>
        </BottomNavigation>
        </>
        )
}

export default BottomNav;