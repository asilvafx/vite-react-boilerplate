import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaPlus,
    FaSearch,
    FaQrcode,
    FaEdit
} from 'react-icons/fa';
import TopNav from '../components/Layout/TopNav';
import BottomNav from '../components/Layout/BottomNav';
import EditTagModal from '../components/Modals/EditTagModal';
import QRCodeModal from '../components/Modals/QRCodeModal';

import DBService from '../data/rest.db';
import useAuth from '../hooks/useAuth';

const DashboardContainer = styled.div`
    min-height: 100%;
    background: ${props => props.theme.colors.background};
    display: flex;
    flex-direction: column;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  margin: ${props => props.theme.space.md} ${props => props.theme.space.lg};
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
    margin-top: auto;
    width: 100%;
  display: flex;
    justify-content: space-between;
  gap: ${props => props.theme.space.sm};
`

const ActionButton = styled.button`
  display: flex;
    width: 30%;
  gap: ${props => props.theme.space.sm};
  align-items: center;
    justify-content: center;
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textLight};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
    font-weight: bolder;
  transition: all ${props => props.theme.transitions.medium};
    border: 1px solid ${props => props.theme.colors.border};
    
    &.primary {
        justify-content: space-between;
        border: 1px solid ${props => props.theme.colors.primary};
        background: ${props => props.theme.colors.primary};
        color: white;
        width: 70%;
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

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.space.xl};
  color: ${props => props.theme.colors.textLight};
`

const TagsTotal = styled.div`
  display: flex;
  align-items: center; 
  gap: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  margin: 0 ${props => props.theme.space.lg};
    
    &>h1 {
        font-size: ${props => props.theme.fontSizes.lg};
    }
    &>span {
        font-size: ${props => props.theme.fontSizes.lg};
    }
`

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);

    // Fetch tags from database
    const fetchTags = async () => {

        if (!isAuthenticated) {
            setError('User  is not authenticated.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const fetchUser = user.user;
            const fetchedTags = await DBService.getItemsByKeyValue('owner', fetchUser.email, 'tags');

            if (fetchedTags) {
                const tagsArray = Object.values(fetchedTags);
                setTags(tagsArray);
                setFilteredTags(tagsArray);
            } else {
                setTags([]);
                setFilteredTags([]);
            }
        } catch (err) {
            console.error('Error fetching tags:', err);
            setError('Failed to load tags. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleSearch = (query) => {
        setSearchTerm(query);

        if (!query) {
            setFilteredTags(tags);
            return;
        }

        const results = tags.filter(tag =>
            tag.name.toLowerCase().includes(query.toLowerCase()) ||
            tag.id.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTags(results);
    };

    const openEditModal = (tag) => {
        setSelectedTag(tag);
        setEditModalOpen(true);
    };

    const openQRCodeModal = (tag) => {
        setSelectedTag(tag);
        setQRCodeModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedTag(null);
    };

    const closeQRCodeModal = () => {
        setQRCodeModalOpen(false);
        setSelectedTag(null);
    };

    if (loading) {
        return (
            <DashboardContainer>
                <TopNav />
                <LoadingState>
                    <h3>Loading Tags...</h3>
                    <p>Please wait while we fetch your data</p>
                </LoadingState>
                <BottomNav />
            </DashboardContainer>
        );
    }

    if (error) {
        return (
            <DashboardContainer>
                <TopNav />
                <EmptyState>
                    <h3>Error</h3>
                    <p>{error}</p>
                </EmptyState>
                <BottomNav />
            </DashboardContainer>
        );
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
            <TagsTotal>
                <h1>Total:</h1> <span>{tags.length}</span>
            </TagsTotal>

            {filteredTags.length > 0 ? (
                <TagGrid>
                    {filteredTags.map(tag => {
                        const isPet = tag.type === 'pet';
                        const isPerson = tag.type === 'human';
                        const details = tag.details;

                        let parsedDetails = null;
                        if (isPet && typeof details === 'string') {
                            try {
                                const fixedDetails = tag.details.replace(/\\"/g, '"');
                                const fixedData = fixedDetails.replace(/([{,])\s*([^":]+)\s*:/g, '$1"$2":');
                                parsedDetails = JSON.parse(fixedData);
                            } catch (e) {
                                console.error('Invalid JSON in tag.details:', e);
                            }
                        }

                        return (
                            <TagCard
                                key={tag.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {tag.isLost && <LostTag>LOST</LostTag>}
                                <TagHeader>
                                    <h3>{tag.name}</h3>
                                </TagHeader>
                                <p>Tag ID: {tag.code}</p>
                                <p>Type: {tag.type}</p>

                                {isPet && parsedDetails && (
                                    <>
                                        <p>Species: {parsedDetails.species}</p>
                                        <p>Breed: {parsedDetails.breed}</p>
                                        <p>Age: {parsedDetails.age}</p>
                                    </>
                                )}

                                {isPerson && details && typeof details === 'object' && (
                                    <>
                                        <p>Condition: {details.condition}</p>
                                        <p>Last Known Location: {details.lastKnownLocation}</p>
                                    </>
                                )}

                                <TagActions>
                                    <ActionButton className="primary" onClick={() => openEditModal(tag)}><span>Edit</span> <FaEdit  /></ActionButton>
                                    <ActionButton onClick={() => openQRCodeModal(tag)}><FaQrcode /></ActionButton>
                                </TagActions>

                            </TagCard>
                        );
                    })}
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

{isEditModalOpen && (
    <EditTagModal
        tag={selectedTag}
        onClose={closeEditModal}
        onSave={() => {
            closeEditModal();
            fetchTags(); // Refresh tags after saving
        }}
    />
)}

{isQRCodeModalOpen && (
    <QRCodeModal
        tag={selectedTag}
        onClose={closeQRCodeModal}
    />
)}
</DashboardContainer>
);
};

export default DashboardPage;