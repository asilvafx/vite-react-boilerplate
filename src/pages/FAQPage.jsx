import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa'

const PageContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 120px auto;
    padding: ${props => props.theme.space.xl};
    position: relative;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        padding: 0 ${props => props.theme.space.lg};
    }
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space.xl};
`

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.md};
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-top: ${props => props.theme.space.md};
`

const FAQSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
`

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`

const FAQHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.space.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border: none;
  cursor: pointer;
  transition: background ${props => props.theme.transitions.medium};

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`

const FAQTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  text-align: left;
`

const ToggleIcon = styled(motion.div)`
  color: ${props => props.theme.colors.primary};
`

const FAQContent = styled(motion.div)`
  padding: ${props => props.theme.space.lg};
  background: white;
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`

const faqData = [
    {
        question: "What is World Tag?",
        answer: "World Tag is an innovative QR-based tracking solution designed to help locate and identify lost pets and individuals with memory conditions."
    },
    {
        question: "How does World Tag work?",
        answer: "Each tag comes with a unique QR code. When scanned by a smartphone, it provides contact information for the tag's owner, helping to quickly reunite lost individuals or pets with their families."
    },
    {
        question: "How does the Smart ID tag work?",
        answer: "The tag uses a QR code or NFC chip to link directly to your pet's profile. If your pet is found, anyone can scan or tap the tag with a smartphone to access their info and contact you."
    },
    {
        question: "Do I need a subscription?",
        answer: "No! The Smart ID has no subscription fees or hidden costs."
    },
    {
        question: "What information can I add to my pet's profile?",
        answer: "You can include your pet's name, your contact details, medical information, and any special notes to help keep your pet safe."
    },
    {
        question: "Does it work without an app?",
        answer: "Yes, there's no need to download an app. The tag works with any smartphone that can scan QR codes or use NFC."
    },
    {
        question: "Is my information secure?",
        answer: "Yes, your details are stored securely, and only those who scan the tag can access the profile."
    },
    {
        question: "What if I need to update my pet's information?",
        answer: "You can update your pet's profile anytime by scanning the QR code or tapping the NFC chip and logging into your account."
    },
    {
        question: "Will this tag track my pet's location?",
        answer: "No, the Smart ID tag is not a GPS tracker. It helps reconnect you with your pet by providing your contact information to anyone who finds them."
    },
    {
        question: "Does it work worldwide?",
        answer: "Yes, the tag can be scanned or tapped anywhere in the world."
    },
    {
        question: "What should I do if I cannot receive verification code?",
        answer: [
            "1). Please verify you have entered the correct email address.",
            "2). Check spam and promotions mail folder to look up the code.",
            "3). Your mailbox does not have sufficient space.",
            "4). Please click the button of leaving message on top right of home page for customer service."
        ].join("\n")
    },
    {
        question: "What should I do if I have forgotten my password?",
        answer: "You can click 'Forgot Password' and reset your password."
    },
    {
        question: "What should I do if it shows the activation code is wrong or has been used?",
        answer: "Please check first whether you have received the correct activation code. For example, letter S is similar with number 5, letter B is similar with number 8. If you have entered the correct activation code, but it still shows that the activation code is incorrect, please click the button of leaving message on top right of home page for customer service."
    },
    {
        question: "How do I change email for my account?",
        answer: "You can log in to your account and delete the tag in the page of 'My Tag'. Then scan the QR code on tag and re-register a new account with your new email address."
    }
]

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <PageContainer>
            <PageHeader>
                <Title>
                    <FaQuestionCircle /> Frequently Asked Questions
                </Title>
                <Subtitle>
                    Find answers to the most common questions about World Tag
                </Subtitle>
            </PageHeader>

            <FAQSection>
                <AnimatePresence>
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FAQHeader onClick={() => toggleFAQ(index)}>
                                <FAQTitle>{faq.question}</FAQTitle>
                                <ToggleIcon
                                    animate={{
                                        rotate: activeIndex === index ? 180 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown />
                                </ToggleIcon>
                            </FAQHeader>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <FAQContent
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: 1,
                                            height: 'auto',
                                            transition: { duration: 0.3 }
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {faq.answer}
                                    </FAQContent>
                                )}
                            </AnimatePresence>
                        </FAQItem>
                    ))}
                </AnimatePresence>
            </FAQSection>
        </PageContainer>
    )
}

export default FAQPage
