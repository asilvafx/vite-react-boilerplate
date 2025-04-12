import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import {
    FaPaw,
    FaUser,
    FaBox,
    FaWarehouse,
    FaArrowLeft,
    FaCloudUploadAlt,
    FaTimes,
    FaQrcode,
    FaHome,
    FaStore
} from 'react-icons/fa'

import TopNav from '../components/Layout/TopNav'
import BottomNav from '../components/Layout/BottomNav'

// Reuse styled components from Dashboard for header and footer
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`

const ChangeTagTypeLink = styled.button`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: ${props => props.theme.space.md};
  cursor: pointer;
  transition: color ${props => props.theme.transitions.medium};

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`

const TagFormHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.space.lg};
`

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  text-align: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};
  margin-bottom: ${props => props.theme.space.lg};

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
  }
`

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.space.lg};
`

const PreviewImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
`

const RemoveImageButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.5);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageContainer = styled.div`
  min-height: 100vh;
  margin: 120px auto;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.space.md};
`

const PageTitle = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.xl};
`

const TagTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.space.lg};
`

const TagTypeCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`

const TagTypeIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`

const TagTypeTitle = styled.h2`
  margin-bottom: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.textDark};
`

const TagTypeDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
`

const TagForm = styled(motion.form)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.xl};
  box-shadow: ${props => props.theme.shadows.md};
  margin-top: ${props => props.theme.space.xl};
`

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.space.md};
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.textDark};
`

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.space.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.radii.full};
  margin-top: ${props => props.theme.space.lg};
`

const AddTagPage = () => {
    const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState(null)
    const [file, setFile] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        details: {}
    })

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
            icon: <FaUser />,
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
    ]

    const onDrop = useCallback(acceptedFiles => {
        const uploadedFile = acceptedFiles[0]
        setFile(Object.assign(uploadedFile, {
            preview: URL.createObjectURL(uploadedFile)
        }))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.gif']
        },
        multiple: false
    })

    const removeFile = () => {
        setFile(null)
    }

    const handleTypeSelect = (type) => {
        setSelectedType(type)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Implement tag creation logic
        console.log('Tag Created:', { type: selectedType, ...formData })
        navigate('/dashboard')
    }

    return (
        <DashboardContainer>
            <TopNav />

            <PageContainer>

                <PageTitle>Select Tag Type</PageTitle>

                {!selectedType ? (
                    <TagTypeGrid>
                        {tagTypes.map((tagType) => (
                            <TagTypeCard
                                key={tagType.type}
                                onClick={() => handleTypeSelect(tagType)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <TagTypeIcon>{tagType.icon}</TagTypeIcon>
                                <TagTypeTitle>{tagType.title}</TagTypeTitle>
                                <TagTypeDescription>{tagType.description}</TagTypeDescription>
                            </TagTypeCard>
                        ))}
                    </TagTypeGrid>
                ) : (
                    <TagForm
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <TagFormHeader>
                            <ChangeTagTypeLink
                                type="button"
                                onClick={() => {
                                    setSelectedType(null)
                                    setFile(null) // Reset file if changing tag type
                                }}
                            >
                                <FaArrowLeft /> Change Tag Type
                            </ChangeTagTypeLink>
                            <PageTitle>{selectedType.title} Details</PageTitle>
                        </TagFormHeader>
                        <DropzoneContainer {...getRootProps()}>
                            <input {...getInputProps()} />
                            <FaCloudUploadAlt
                                style={{
                                    fontSize: '3rem',
                                    color: isDragActive ? 'green' : 'gray'
                                }}
                            />
                            <p>
                                {isDragActive
                                    ? "Drop the file here"
                                    : "Drag 'n' drop a photo here, or click to select"}
                            </p>
                            <small>(Optional)</small>
                        </DropzoneContainer>

                        {file && (
                            <PreviewContainer>
                                <div style={{ position: 'relative' }}>
                                    <PreviewImage
                                        src={file.preview}
                                        alt="Preview"
                                        onLoad={() => URL.revokeObjectURL(file.preview)}
                                    />
                                    <RemoveImageButton onClick={removeFile}>
                                        <FaTimes />
                                    </RemoveImageButton>
                                </div>
                            </PreviewContainer>
                        )}
                        {selectedType.fields.map((field) => (
                            <FormGroup key={field.name}>
                                <FormLabel>{field.label}</FormLabel>
                                <FormInput
                                    type={field.type}
                                    name={field.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                        ))}
                        <SubmitButton
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create Tag
                        </SubmitButton>
                    </TagForm>
                )}
            </PageContainer>
            <BottomNav />
        </DashboardContainer>
    )
}

export default AddTagPage
