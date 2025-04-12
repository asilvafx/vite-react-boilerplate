import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FaPlus,
  FaSearch,
  FaQrcode,
  FaUser
} from 'react-icons/fa'

import TopNav from '../components/Layout/TopNav'
import BottomNav from '../components/Layout/BottomNav'

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  margin: ${props => props.theme.space.lg};
`

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  margin-left: ${props => props.theme.space.sm};
  font-size: ${props => props.theme.fontSizes.md};
`

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.space.lg};
  padding: ${props => props.theme.space.lg};
  flex-grow: 1;
`

const TagCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.lg};
  box-shadow: ${props => props.theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
  position: relative;
`

const TagHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TagActions = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
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

const LostTag = styled.div`
  position: absolute;
  top: ${props => props.theme.space.sm};
  right: ${props => props.theme.space.sm};
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: ${props => props.theme.space.xs} ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.sm};
`

const AddTagButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 120px;
  right: ${props => props.theme.space.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  z-index: 10;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.space.xl};
  color: ${props => props.theme.colors.textLight};
`

const mockTags = [
  {
    id: 'WT001',
    name: 'Buddy',
    type: 'Pet',
    isLost: false,
    details: {
      species: 'Dog',
      breed: 'Labrador',
      age: '3 years'
    }
  },
  {
    id: 'WT002',
    name: 'Grandpa John',
    type: 'Person',
    isLost: true,
    details: {
      condition: 'Alzheimer\'s',
      lastKnownLocation: 'Home'
    }
  },
  {
    id: 'WT003',
    name: 'Whiskers',
    type: 'Pet',
    isLost: false,
    details: {
      species: 'Cat',
      breed: 'Siamese',
      age: '5 years'
    }
  },
  {
    id: 'WT004',
    name: 'Emma',
    type: 'Person',
    isLost: false,
    details: {
      condition: 'Dementia',
      lastKnownLocation: 'Care Home'
    }
  }
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const [tags, setTags] = useState(mockTags)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTags, setFilteredTags] = useState(mockTags)

  const handleSearch = (query) => {
    setSearchTerm(query)

    if (!query) {
      setFilteredTags(tags)
      return
    }

    // Search by tag name or tag ID (case-insensitive)
    const results = tags.filter(tag =>
        tag.name.toLowerCase().includes(query.toLowerCase()) ||
        tag.id.toLowerCase().includes(query.toLowerCase())
    )

    setFilteredTags(results)
  }

  const handleAddTag = () => {
    // TODO: Implement add tag modal/functionality
    alert('Add Tag Functionality (To be implemented)')
  }

  return (
    <DashboardContainer>

      <TopNav />
      <SearchContainer>
        <FaSearch />
        <SearchInput
            placeholder="Search by Tag Name or Tag ID"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchContainer>

      {filteredTags.length > 0 ? (
          <TagGrid>
            {filteredTags.map(tag => (
                <TagCard
                    key={tag.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                  {tag.isLost && <LostTag>LOST</LostTag>}
                  <TagHeader>
                    <h3>{tag.name}</h3>
                    <TagActions>
                      <ActionButton><FaUser /></ActionButton>
                      <ActionButton><FaQrcode /></ActionButton>
                    </TagActions>
                  </TagHeader>
                  <p>Tag ID: {tag.id}</p>
                  <p>Type: {tag.type}</p>

                  {/* Conditionally render details based on tag type */}
                  {tag.type === 'Pet' && (
                      <>
                        <p>Species: {tag.details.species}</p>
                        <p>Breed: {tag.details.breed}</p>
                        <p>Age: {tag.details.age}</p>
                      </>
                  )}

                  {tag.type === 'Person' && (
                      <>
                        <p>Condition: {tag.details.condition}</p>
                        <p>Last Known Location: {tag.details.lastKnownLocation}</p>
                      </>
                  )}
                </TagCard>
            ))}
          </TagGrid>
      ) : (
          <EmptyState>
            <h3>No Tags Found</h3>
            <p>Try a different search term or add a new tag</p>
          </EmptyState>
      )}


      <AddTagButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/add-tag')}
      >
        <FaPlus size={24} />
      </AddTagButton>

      <BottomNav />
    </DashboardContainer>
  )
}

export default DashboardPage
