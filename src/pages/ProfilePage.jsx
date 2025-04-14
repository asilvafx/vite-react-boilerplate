import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
    FaUser,
    FaLock,
    FaEdit,
    FaSave,
    FaTimes
} from 'react-icons/fa'

import TopNav from '../components/Layout/TopNav'
import BottomNav from '../components/Layout/BottomNav'

// Reuse styled components from DashboardPage
const DashboardContainer = styled.div`
  width: 100%; 
  max-width: ${props => props.theme.breakpoints.tablet};
    margin: 0 auto;
  min-height: 100%;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  position: relative;
`

const ProfileContainer = styled.div`
    width: 100%;
  flex-grow: 1;
  padding: ${props => props.theme.space.xl};
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg};
  }
`

const ProfileSection = styled(motion.div)`
  width: 100%;
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.space.xl};
  margin-bottom: ${props => props.theme.space.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.space.lg};
  }
`

const SectionTitle = styled.h2`
    width: 100%;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.lg};
  display: flex;
    flex-wrap: wrap;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const FormGroup = styled.div`
    width: 100%;
  margin-bottom: ${props => props.theme.space.md};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.textDark};
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const Input = styled.input`
  flex-grow: 1;
  width: 100%;
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  ${props => props.disabled && `
    background: ${props.theme.colors.backgroundAlt};
    color: ${props.theme.colors.textLight};
  `}
`

const EditButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
    font-size:  ${props => props.theme.fontSizes.sm};
`

const EditSection = styled.div`
    width: 100%;
    display: flex;
    gap: .3rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    
    &>button {
        width: 100%;
    }
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    width: 100%;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.border};
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: ${props => props.theme.colors.primary};
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
`

const ProfilePage = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [privacySettings, setPrivacySettings] = useState({
        emailVisible: false,
        locationSharing: false
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePrivacyToggle = (setting) => {
        setPrivacySettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }))
    }

    const handleSaveProfile = () => {
        // TODO: Implement actual save logic
        setIsEditingProfile(false)
        alert('Profile updated successfully!')
    }

    const handleChangePassword = () => {
        if (profileData.newPassword !== profileData.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        // TODO: Implement password change logic
        setIsEditingPassword(false)
        alert('Password changed successfully!')
    }

    return (
        <DashboardContainer>
            <TopNav />

            <ProfileContainer>
                <ProfileSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <SectionTitle>
                        <FaUser /> Personal Information
                        {!isEditingProfile && (
                            <EditButton
                                onClick={() => setIsEditingProfile(true)}
                            >
                                <FaEdit /> Edit
                            </EditButton>
                        )}
                    </SectionTitle>

                    <FormGroup>
                        <Label>Name</Label>
                        <InputContainer>
                            <Input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                disabled={!isEditingProfile}
                            />
                        </InputContainer>
                        {isEditingProfile && (
                            <>
                                <EditSection>
                                <EditButton onClick={handleSaveProfile}>
                                    <FaSave /> Save
                                </EditButton>
                                <EditButton
                                    onClick={() => setIsEditingProfile(false)}
                                    style={{
                                        background: 'transparent',
                                        color: 'red',
                                        border: '1px solid red'
                                    }}
                                >
                                    <FaTimes /> Cancel
                                </EditButton>
                                </EditSection>
                            </>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={profileData.email}
                            disabled
                        />
                    </FormGroup>
                </ProfileSection>

                <ProfileSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>
                        <FaLock /> Security
                    </SectionTitle>

                    {!isEditingPassword ? (
                        <EditButton
                            onClick={() => setIsEditingPassword(true)}
                        >
                            <FaEdit /> Change Password
                        </EditButton>
                    ) : (
                        <>
                            <FormGroup>
                                <Label>Current Password</Label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    value={profileData.currentPassword}
                                    onChange={handleInputChange}
                                    placeholder="Enter current password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={profileData.newPassword}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm New Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={profileData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm new password"
                                />
                            </FormGroup>
                            <InputContainer>
                                <EditButton onClick={handleChangePassword}>
                                    <FaSave /> Save New Password
                                </EditButton>
                                <EditButton
                                    onClick={() => setIsEditingPassword(false)}
                                    style={{
                                        background: 'transparent',
                                        color: 'red',
                                        border: '1px solid red'
                                    }}
                                >
                                    <FaTimes /> Cancel
                                </EditButton>
                            </InputContainer>
                        </>
                    )}
                </ProfileSection>

                <ProfileSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <SectionTitle>
                        <FaUser /> Privacy Settings
                    </SectionTitle>

                    <FormGroup>
                        <InputContainer>
                            <Label>Show Email to Tag Finders</Label>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={privacySettings.emailVisible}
                                    onChange={() => handlePrivacyToggle('emailVisible')}
                                />
                                <span className="slider"></span>
                            </ToggleSwitch>
                        </InputContainer>
                    </FormGroup>

                    <FormGroup>
                        <InputContainer>
                            <Label>Enable Location Sharing</Label>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={privacySettings.locationSharing}
                                    onChange={() => handlePrivacyToggle('locationSharing')}
                                />
                                <span className="slider"></span>
                            </ToggleSwitch>
                        </InputContainer>
                    </FormGroup>
                </ProfileSection>
            </ProfileContainer>

             <BottomNav />
        </DashboardContainer>
    )
}

export default ProfilePage
