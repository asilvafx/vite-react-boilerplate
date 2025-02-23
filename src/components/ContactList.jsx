import React from 'react';
import { Users, ArrowRight, SendHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts }) => {
    return (
        <section className="mb-10 w-full max-w-screen-lg mx-auto">
            <div className="w-full premium-panel p-4 md:p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <Users className="w-6 h-6 premium-icon"/>
                        </div>
                        <h2 className="text-xl font-medium">Recent Contacts</h2>
                    </div>
                    <Link to="/contacts" className="hidden md:flex cyber-button items-center space-x-2">
                        <span>View All</span>
                        <ArrowRight className="w-4 h-4"/>
                    </Link>
                </div>

                <div className="space-y-4">
                    {contacts.length > 0 ? (
                        contacts.slice(0, 3).map(contact => (
                            <div
                                key={contact.id}
                                className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                            >
                                <div className="w-full flex items-center space-x-4">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                  <span className="text-lg font-medium text-cyan-400">
                    {contact.name[0].toUpperCase()}
                  </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-200">{contact.name}</p>
                                        <p className="text-sm text-gray-400 font-mono">
                                            {contact.address.slice(0, 6)}...{contact.address.slice(-4)}
                                        </p>
                                    </div>
                                    <div className="m-l-auto">
                                        <Link
                                            to={`/send/${btoa(contact.address)}`}
                                        >
                                            <button className="premium-border premium-bg px-3 py-2 uppercase shadow-sm text-sm font-semibold neon-text rounded-lg flex items-center justify-center gap-2">

                                                <span>Send</span>
                                                <SendHorizontal className="w-3 h-3" />

                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4"/>
                            <p className="text-gray-400">No contacts yet</p>
                        </div>
                    )}

                </div>

                <Link to="/contacts" className="mt-6 w-full cyber-button flex md:hidden items-center justify-between space-x-2">
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4"/>
                </Link>
            </div>
        </section>
        );
};

export default ContactList;