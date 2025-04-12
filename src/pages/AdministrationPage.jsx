import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {QRCodeSVG} from 'qrcode.react'
import { useNavigate } from 'react-router-dom'
import {
    FaHome,
    FaStore,
    FaSignOutAlt,
    FaPrint,
    FaTag,
    FaEdit,
    FaTimes,
    FaTrash,
    FaUserShield,
} from 'react-icons/fa'

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.space.lg};
  background: white;
  box-shadow: ${props => props.theme.shadows.sm};
`

const Logo = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const PageContainer = styled.div`
  flex-grow: 1;
  padding: ${props => props.theme.space.xl};
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.space.xl};
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

const AdminSection = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.space.xl};
  margin-bottom: ${props => props.theme.space.lg};
`

const BottomNavigation = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: ${props => props.theme.space.md};
  background: white;
  box-shadow: ${props => props.theme.shadows.md};
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

const TableContainer = styled.div`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: ${props => props.theme.colors.backgroundAlt};
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:hover {
    background: rgba(10, 37, 64, 0.05);
  }
`

const TableCell = styled.td`
  padding: ${props => props.theme.space.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

const ActionButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.md};
  margin-right: ${props => props.theme.space.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.space.lg};
`

const Tab = styled.button`
  padding: ${props => props.theme.space.md};
  background: ${props => props.active
    ? props.theme.colors.primary
    : props.theme.colors.backgroundAlt};
  color: ${props => props.active ? 'white' : props.theme.colors.textLight};
  border: none;
  margin-right: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active
    ? props.theme.colors.primaryDark
    : props.theme.colors.border};
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.space.lg};
  gap: ${props => props.theme.space.md};
`

const PaginationButton = styled.button`
  background: ${props => props.disabled
    ? props.theme.colors.backgroundAlt
    : props.theme.colors.primary};
  color: ${props => props.disabled
    ? props.theme.colors.textLight
    : 'white'};
  border: none;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radii.md};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
  }
`

const PageInfo = styled.span`
  color: ${props => props.theme.colors.textLight};
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  overflow-y: auto;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.xl};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.space.lg};
`

const CloseButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.radii.full};
  cursor: pointer;
`

const PrintButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.space.md} ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.radii.full};
  margin-top: ${props => props.theme.space.lg};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.md};
`

// Sample Data
const generateSampleOrders = () => {
    return Array.from({ length: 20 }, (_, index) => ({
        id: `ORD-${1000 + index}`,
        customerName: `Customer ${index + 1}`,
        tagType: ['Pet Tag', 'Human Tag', 'Belongings Tag'][Math.floor(Math.random() * 3)],
        status: ['Processing', 'Shipped', 'Completed'][Math.floor(Math.random() * 3)],
        date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString()
    }))
}

const generateSampleTags = () => {
    return Array.from({ length: 20 }, (_, index) => ({
        id: `TAG-${5000 + index}`,
        type: ['Pet', 'Human', 'Belongings'][Math.floor(Math.random() * 3)],
        qrCode: `https://worldtag.com/qr/${5000 + index}`,
        activationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)]
    }))
}

const generateSampleUsers = () => {
    return Array.from({ length: 20 }, (_, index) => ({
        id: `USER-${2000 + index}`,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
        tags: Math.floor(Math.random() * 3)
    }))
}


const AdministrationPage = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('orders')
    const [orders, setOrders] = useState([])
    const [tags, setTags] = useState([])
    const [users, setUsers] = useState([])
    const [printModalOrder, setPrintModalOrder] = useState(null)

    // Function to generate a unique QR code URL
    const generateQRCodeUrl = (order) => {
        // In a real-world scenario, this would be a unique identifier for the tag
        return `https://worldtag.com/tag/${order.id}`
    }

    // Function to handle print modal
    const handlePrintOrder = (order) => {
        setPrintModalOrder(order)
    }

    // Function to close print modal
    const closePrintModal = () => {
        setPrintModalOrder(null)
    }

    // Function to handle actual printing
    const handleActualPrint = () => {
        if (printModalOrder) {
            window.print()
        }
    }

    const [currentPage, setCurrentPage] = useState({
        orders: 1,
        tags: 1,
        users: 1
    })

    const ITEMS_PER_PAGE = 15

    // Pagination helper function
    const getPaginatedData = (data, currentPage) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return data.slice(startIndex, endIndex)
    }

    // Pagination component for reuse
    const PaginationControls = ({
                                    data,
                                    currentPage,
                                    onPageChange
                                }) => {
        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

        return (
            <Pagination>
                <PaginationButton
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </PaginationButton>
                <PageInfo>
                    Page {currentPage} of {totalPages}
                </PageInfo>
                <PaginationButton
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </PaginationButton>
            </Pagination>
        )
    }

    useEffect(() => {
        // Simulate data fetching
        setOrders(generateSampleOrders())
        setTags(generateSampleTags())
        setUsers(generateSampleUsers())
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        navigate('/auth')
    }

    const handleNavigation = (path) => {
        switch(path) {
            case 'home':
                navigate('/')
                break
            case 'store':
                navigate('/products')
                break
            case 'dashboard':
                navigate('/dashboard')
                break
            default:
                break
        }
    }

    const renderOrdersManagement = () => {
        const paginatedOrders = getPaginatedData(
            orders,
            currentPage.orders
        )

        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Tag Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <tbody>
                        {paginatedOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.tagType}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <ActionButton onClick={() => handlePrintOrder(order)}>
                                        <FaPrint /> Print
                                    </ActionButton>
                                    <ActionButton>
                                        <FaEdit /> Edit
                                    </ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </TableContainer>
                {/* Print Modal */}
                {printModalOrder && (
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>
                                <h2>Print Tag for Order {printModalOrder.id}</h2>
                                <CloseButton onClick={closePrintModal}>
                                    <FaTimes />
                                </CloseButton>
                            </ModalHeader>

                            <QRCodeContainer>
                                <QRCodeSVG
                                    value={generateQRCodeUrl(printModalOrder)}
                                    size={256}
                                    level={'H'}
                                />
                                <p>
                                    <strong>Tag ID:</strong> {printModalOrder.id}
                                </p>
                                <p>
                                    <strong>Tag Type:</strong> {printModalOrder.tagType}
                                </p>
                            </QRCodeContainer>

                            <PrintButton onClick={handleActualPrint}>
                                <FaPrint /> Print Tag
                            </PrintButton>
                        </ModalContent>
                    </ModalOverlay>
                )}
                <PaginationControls
                    data={orders}
                    currentPage={currentPage.orders}
                    onPageChange={(page) => setCurrentPage(prev => ({
                        ...prev,
                        orders: page
                    }))}
                />
            </>
        )
    }

    const renderTagGeneration = () => {
        const paginatedTags = getPaginatedData(
            tags,
            currentPage.tags
        )

        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>Tag ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>QR Code</TableCell>
                                <TableCell>Activation Code</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <tbody>
                        {paginatedTags.map((tag) => (
                            <TableRow key={tag.id}>
                                <TableCell>{tag.id}</TableCell>
                                <TableCell>{tag.type}</TableCell>
                                <TableCell>
                                    <a href={tag.qrCode} target="_blank" rel="noopener noreferrer">
                                        View QR
                                    </a>
                                </TableCell>
                                <TableCell>{tag.activationCode}</TableCell>
                                <TableCell>{tag.status}</TableCell>
                                <TableCell>
                                    <ActionButton>
                                        <FaPrint /> Print
                                    </ActionButton>
                                    <ActionButton>
                                        <FaTrash /> Delete
                                    </ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </TableContainer>
                <PaginationControls
                    data={tags}
                    currentPage={currentPage.tags}
                    onPageChange={(page) => setCurrentPage(prev => ({
                        ...prev,
                        tags: page
                    }))}
                />
            </>
        )
    }

    const renderUserManagement = () => {
        const paginatedUsers = getPaginatedData(
            users,
            currentPage.users
        )

        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>User ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Registration Date</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <tbody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.registrationDate}</TableCell>
                                <TableCell>{user.tags}</TableCell>
                                <TableCell>
                                    <ActionButton>
                                        <FaEdit /> Edit
                                    </ActionButton>
                                    <ActionButton>
                                        <FaTrash /> Delete
                                    </ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </TableContainer>
                <PaginationControls
                    data={users}
                    currentPage={currentPage.users}
                    onPageChange={(page) => setCurrentPage(prev => ({
                        ...prev,
                        users: page
                    }))}
                />
            </>
        )
    }

    return (
        <DashboardContainer>
            <Header>
                <Logo>World Tag Administration</Logo>
                <HeaderActions>
                    <ActionButton onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </ActionButton>
                </HeaderActions>
            </Header>

            <PageContainer>
                <SectionHeader>
                    <Title>
                        <FaUserShield /> Staff-Only Dashboard
                    </Title>
                </SectionHeader>

                <TabContainer>
                    <Tab
                        active={activeTab === 'orders' ? 1 : 0}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders Management
                    </Tab>
                    <Tab
                        active={activeTab === 'tags' ? 1 : 0}
                        onClick={() => setActiveTab('tags')}
                    >
                        Tag Generation
                    </Tab>
                    <Tab
                        active={activeTab === 'users' ? 1 : 0}
                        onClick={() => setActiveTab('users')}
                    >
                        User Management
                    </Tab>
                </TabContainer>

                <AdminSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {activeTab === 'orders' && renderOrdersManagement()}
                    {activeTab === 'tags' && renderTagGeneration()}
                    {activeTab === 'users' && renderUserManagement()}
                </AdminSection>
            </PageContainer>

            <BottomNavigation>
                <NavItem onClick={() => handleNavigation('home')}>
                    <FaHome />
                    Home
                </NavItem>
                <NavItem onClick={() => handleNavigation('store')}>
                    <FaStore />
                    Store
                </NavItem>
                <NavItem onClick={() => handleNavigation('dashboard')}>
                    <FaTag />
                    Tags
                </NavItem>
            </BottomNavigation>
        </DashboardContainer>
    )
}

export default AdministrationPage
