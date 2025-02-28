import React, { useEffect, useState } from 'react';
import { Users, Plus, Trash2, Copy, Check, Edit } from 'lucide-react';
import { Label } from 'flowbite-react';
import toast from 'react-hot-toast';
import AppHeader from "../components/AppHeader";
import SectionTitle from "../components/SectionTitle";
import AppFooter from "../components/AppFooter";
import { shortenAddress } from "../lib/utils";
import DBService from '../data/db.service';
import { useUser  } from '../context/UserProvider';
import {updateData} from "../lib/user"; 

const Contacts = () => {
    const { userData } = useUser ();
    const [contacts, setContacts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', address: '' });
    const [editContactId, setEditContactId] = useState(null); // Track which contact is being edited

    // Load user contacts when the component mounts
    useEffect(() => {
        if (userData?.contacts && userData.contacts.length > 0) {
            setContacts(userData.contacts);
        }
    }, [userData]);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddContact = async (e) => {
        e.preventDefault();

        if (!newContact.address.startsWith('0x') || newContact.address.length !== 42) {
            toast.error('Please enter a valid wallet address');
            return;
        }

        const exists = contacts.some(c =>
            c.address.toLowerCase() === newContact.address.toLowerCase() ||
            c.name.toLowerCase() === newContact.name.toLowerCase()
        );

        if (exists) {
            toast.error('A contact with this name or address already exists');
            return;
        }

        // Add the new contact to the local state
        const updatedContacts = [...contacts, { ...newContact, id: Date.now().toString() }];
        setContacts(updatedContacts);
        setNewContact({ name: '', address: '' });
        setShowAddForm(false);
        toast.success('Contact added successfully');

        // Save the new contact to the database
        let userId = userData?.uid;
        if (!userId) {
            userId = await DBService.getItemKey('email', userData.email, 'users');
        }
        await DBService.update(userId, { contacts: updatedContacts }, 'users'); // Update the user's contacts in the database
        await updateData();
    };

    const handleEditContact = async (e) => {
        e.preventDefault();

        if (!newContact.address.startsWith('0x') || newContact.address.length !== 42) {
            toast.error('Please enter a valid wallet address');
            return;
        }

        const updatedContacts = contacts.map(contact =>
            contact.id === editContactId ? { ...contact, ...newContact } : contact
        );

        setContacts(updatedContacts);
        setNewContact({ name: '', address: '' });
        setShowAddForm(false);
        setEditContactId(null); // Reset edit contact ID
        toast.success('Contact updated successfully');

        // Update the contacts in the database
        let userId = userData?.uid;
        if (!userId) {
            userId = await DBService.getItemKey('email', userData.email, 'users');
        }
        await DBService.update(userId, { contacts: updatedContacts }, 'users'); // Update the user's contacts in the database
        await updateData();
    };

    const handleDeleteContact = async (id) => {
        const updatedContacts = contacts.filter(c => c.id !== id);
        setContacts(updatedContacts);
        toast.success('Contact deleted successfully');

        // Update the contacts in the database
        let userId = userData?.uid;
        if (!userId) {
            userId = await DBService.getItemKey('email', userData.email, 'users');
        }
        await DBService.update(userId, { contacts: updatedContacts }, 'users'); // Update the user's contacts in the database
        await updateData();
    };

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address);
        toast.success('Address copied to clipboard', {
            icon: <Copy className="w-4 h-4 text-emerald-400" />,
            duration: 2000,
        });
    };

    return (
        <>
            <section className="w-full max-w-screen-lg mx-auto mb-10">
                <AppHeader backUrl="/dashboard" />
                <SectionTitle title="Contacts" />

                <div className="premium-panel p-6 rounded-xl">
                    {/* Search and Add */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg premium-icon"
                                type="text"
                                placeholder="Search contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="cyber-button flex items-center justify-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Contact
                        </button>
                    </div>

                    {/* Add Contact Form */}
                    {showAddForm && (
                        <div className="premium-panel p-6 rounded-lg mb-6 bg-cyan-500/5">
                            <form onSubmit={editContactId ? handleEditContact : handleAddContact} className="space-y-4">
                                <div>
                                    <Label htmlFor="name" value="Contact Name" className="text-gray-300 mb-2" />
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="name"
                                        type="text"
                                        placeholder="Enter contact name"
                                        value={newContact.name}
                                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address" value="Wallet Address" className="text-gray-300 mb-2" />
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="address"
                                        type="text"
                                        placeholder="0x..."
                                        value={newContact.address}
                                        onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button type="submit" className="w-full cyber-button flex items-center justify-center">
                                        <Check className="w-4 h-4 mr-2" />
                                        {editContactId ? 'Update Contact' : 'Save Contact'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setNewContact({ name: '', address: '' });
                                            setEditContactId(null); // Reset edit contact ID
                                        }}
                                        className="w-full cyber-button flex items-center justify-center bg-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Contacts List */}
                    <div className="space-y-4">
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map(contact => (
                                <div
                                    key={contact.id}
                                    className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                                                <span className="text-lg font-medium text-cyan-400">
                                                    {contact.name[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-200">{contact.name}</p>
                                                <p className="text-sm text-gray-400 font-mono">{shortenAddress(contact.address)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => {
                                                    setNewContact({ name: contact.name, address: contact.address });
                                                    setEditContactId(contact.id); // Set the ID of the contact being edited
                                                    setShowAddForm(true);
                                                }}
                                                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContact(contact.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400">No contacts found</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <AppFooter />
        </>
    );
};

export default Contacts;