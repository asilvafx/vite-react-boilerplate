import React from 'react';
import styled from 'styled-components';
import {QRCodeCanvas} from 'qrcode.react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const QRModalOverlay = styled.div`
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

const QRModalContainer = styled(motion.div)`
  width: 100%;
  max-width: 300px;
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space.lg};
  text-align: center;
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.space.md};
`;

const QRCodeCanvasBox = styled.div`
    width: 100%;
    margin: auto;
`

const ShareButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.space.sm};
  border: none;
  border-radius: ${props => props.theme.radii.full};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const QRCodeModal = ({ tagId, onClose }) => {
    const link = `https://mysite.com/scan/${tagId}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
    };

    return (
        <QRModalOverlay>
            <QRModalContainer>
                <h3>QR Code</h3>
                <QRCodeCanvasBox as={QRCodeCanvas} value={link} />
                <ShareButton onClick={copyToClipboard}>Share Link</ShareButton>
                <button onClick={onClose}>Close</button>
            </QRModalContainer>
        </QRModalOverlay>
    );
};

export default QRCodeModal;