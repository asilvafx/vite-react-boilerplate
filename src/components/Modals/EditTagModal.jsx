import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DBService from '../../data/rest.db';
import toast from 'react-hot-toast';
import { FaPaw, FaUser  , FaBox, FaWarehouse, FaTrash } from 'react-icons/fa';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
    background: white;
    border-radius: ${props => props.theme.radii.lg};
    padding: ${props => props.theme.space.lg};
    width: 400px;
`;

const ModalHeader = styled.h3`
    margin: 0;
`;

const ModalInput = styled.input`
    width: 100%;
    padding: ${props => props.theme.space.md};
    margin: ${props => props.theme.space.sm} 0;
`;

const ModalButton = styled.button`
    background: ${props => props.theme.colors.primary};
    color: white;
    font-weight: bolder;
    padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
    border: none;
    border-radius: ${props => props.theme.radii.full};
    cursor: pointer;

    &:hover {
        background: ${props => props.theme.colors.primaryDark};
    }
`;

const DeleteButton = styled(ModalButton)`
    width: 100%;
    background: ${props => props.theme.colors.error};
    margin-top: ${props => props.theme.space.md};
    margin-bottom: ${props => props.theme.space.md};
`;

const ActionSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.space.md};
    flex-wrap: wrap;
`

const tagTypes = [
    {
        type: 'pet',
        icon: <FaPaw />,
        title: 'Pet Tag',
        description: 'Create online profile for pets. Manage pet\'s health info and owner\'s info online.',
        fields: [
            { name: 'petName', label: 'Pet Name', type: 'text' },
            { name: 'species', label: 'Species', type: 'text' },
            { name: 'breed', label: 'Breed', type: 'text' },
            { name: 'age', label: 'Age', type: 'text' }
        ]
    },
    {
        type: 'human',
        icon: <FaUser   />,
        title: 'Human Tag',
        description: 'Create online profile for the elderly, children, extreme sports people, patients.',
        fields: [
            { name: 'fullName', label: 'Full Name', type: 'text' },
            { name: 'condition', label: 'Medical Condition', type: 'text' },
            { name: 'emergencyContact', label: 'Emergency Contact', type: 'text' }
        ]
    },
    {
        type: 'belongings',
        icon: <FaBox />,
        title: 'Belongings Tag',
        description: 'Create an online profile for important belongings. Finders can scan the QR code.',
        fields: [
            { name: 'itemName', label: 'Item Name', type: 'text' },
            { name: 'description', label: 'Description', type: 'text' },
            { name: 'value', label: 'Estimated Value', type: 'number' }
        ]
    },
    {
        type: 'storage',
        icon: <FaWarehouse />,
        title: 'Storage Tag',
        description: 'What\'s in the box? Which box is the item in? QR codes make it easy.',
        fields: [
            { name: 'boxNumber', label: 'Box Number', type: 'text' },
            { name: 'contents', label: 'Contents', type: 'text' },
            { name: 'location', label: 'Storage Location', type: 'text' }
        ]
    }
];

const EditTagModal = ({ tag, onClose, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!tag) return; // Ensure tag is defined

        const tagType = tagTypes.find(type => type.type === tag.type);

        if (!tagType) {
            console.error("Invalid tag type:", tag.type);
            return;
        }

        const initialData = tagType.fields.reduce((acc, field) => {
            acc[field.name] = tag.details && tag.details[field.name] !== undefined ? tag.details[field.name] : ''; // Ensure default value is an empty string
            return acc;
        }, {});
        setFormData(initialData);
    }, [tag]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        await DBService.update(tag.id, { ...tag, details: formData }, 'tags');
        toast.success('Tag updated successfully!');
        onSave();
        onClose();
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
        if (confirmDelete) {
            await DBService.delete(tag.id, 'tags');
            toast.success('Tag deleted successfully!');
            onSave();
            onClose();
        }
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader>Edit - {tag.name}</ModalHeader>
                {tagTypes.find(type => type.type === tag.type).fields.map(field => (
                    <ModalInput
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={formData[field.name] || ''} // Ensure controlled input
                        onChange={handleInputChange}
                        placeholder={field.label}
                    />
                ))}
                <DeleteButton onClick={handleDelete}>
                    <FaTrash /> Delete Tag
                </DeleteButton>
                <ActionSection>
                <ModalButton onClick={onClose}>Cancel</ModalButton>
                <ModalButton onClick={handleSave}>Save Changes</ModalButton>
                </ActionSection>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default EditTagModal;