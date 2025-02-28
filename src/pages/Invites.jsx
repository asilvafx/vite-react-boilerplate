import React, { useState } from 'react';
import { User, Filter, Clock, Check, X, Copy, Mail, Share2, Gift, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import { loadConfig } from '../lib/site';


// Mock data for invites
const Invites = () => {
    const { userData } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [expandedInvite, setExpandedInvite] = useState(null);
    const [referralCode] = useState('CYBER' + Math.random().toString(36).substring(2, 8).toUpperCase());

    // Mock invites data
    const [invites, setInvites] = useState([
        {
            id: '1',
            email: 'alice@example.com',
            name: 'Alice',
            status: 'accepted',
            date: '2024-04-10T14:30:00Z',
            rewardClaimed: true
        },
        {
            id: '2',
            email: 'bob@example.com',
            name: 'Bob',
            status: 'pending',
            date: '2024-04-12T09:15:00Z',
            rewardClaimed: false,
            lastReminder: '2024-04-15T10:00:00Z'
        },
        {
            id: '3',
            email: 'charlie@example.com',
            name: 'Charlie',
            status: 'expired',
            date: '2024-03-25T16:45:00Z',
            rewardClaimed: false
        },
        {
            id: '4',
            email: 'dave@example.com',
            name: 'Dave',
            status: 'pending',
            date: '2024-04-14T11:20:00Z',
            rewardClaimed: false
        },
        {
            id: '5',
            email: 'eve@example.com',
            name: 'Eve',
            status: 'accepted',
            date: '2024-04-08T13:10:00Z',
            rewardClaimed: true
        }
    ]);

    // Filter and sort invites
    const filteredInvites = invites
        .filter(invite => {
            const matchesSearch =
                invite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invite.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || invite.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

    const toggleExpandInvite = (id) => {
        setExpandedInvite(expandedInvite === id ? null : id);
    };

    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode);
        toast.success('Referral code copied to clipboard!', {
            icon: <Copy className="w-4 h-4 text-emerald-400" />,
            duration: 2000,
        });
    };

    const sendReminder = (invite) => {
        // In a real app, this would send an API request
        toast.success(`Reminder sent to ${invite.name}!`);

        // Update the invite with the new reminder date
        setInvites(invites.map(i =>
            i.id === invite.id
                ? { ...i, lastReminder: new Date().toISOString() }
                : i
        ));
    };

    const cancelInvite = (id) => {
        // In a real app, this would send an API request
        setInvites(invites.filter(invite => invite.id !== id));
        toast.success('Invitation cancelled successfully');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-500/20 text-green-400';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'expired':
                return 'bg-gray-500/20 text-gray-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const shareReferral = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join CyberChest',
                    text: `Join CyberChest using my referral code: ${referralCode} and get 50 BOLT tokens!`,
                    url: window.location.origin
                });
            } catch (error) {
                copyReferralCode();
            }
        } else {
            copyReferralCode();
        }
    };

    const sendNewInvite = (e) => {
        e.preventDefault();
        const form = e.target;
        const emailInput = form.elements.namedItem('email');
        const nameInput = form.elements.namedItem('name');

        if (emailInput && nameInput) {
            const newInvite = {
                id: Date.now().toString(),
                email: emailInput.value,
                name: nameInput.value,
                status: 'pending',
                date: new Date().toISOString(),
                rewardClaimed: false
            };

            setInvites([newInvite, ...invites]);
            toast.success(`Invitation sent to ${nameInput.value}!`);
            form.reset();
        }
    };

    return (
        <>
        <section className="w-full max-w-screen-lg mx-auto mb-10">

            <AppHeader backUrl="/dashboard" />
            <SectionTitle title={`Past Invitations`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invite Management Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-panel p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <User Plus className="w-6 h-6 premium-icon" />
                                </div>
                                <h1 className="text-2xl font-medium neon-text">Manage Invitations</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                                    className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {sortOrder === 'newest' ? (
                                        <Clock className="w-5 h-5" />
                                    ) : (
                                        <Clock className="w-5 h-5 transform rotate-180" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <input
                                    className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2 min-w-[200px]">
                                <Filter className="text-gray-400" />
                                <select
                                    className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>

                        {/* Invites List */}
                        <div className="space-y-4">
                            {filteredInvites.length > 0 ? (
                                filteredInvites.map(invite => (
                                    <div key={invite.id} className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                          <span className="text-lg font-medium text-cyan-400">
                            {invite.name[0].toUpperCase()}
                          </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-200">{invite.name}</p>
                                                    <p className="text-sm text-gray-400">{invite.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invite.status)}`}>
                          {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                        </span>
                                                <button
                                                    onClick={() => toggleExpandInvite(invite.id)}
                                                    className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                                                >
                                                    {expandedInvite === invite.id ? (
                                                        <ChevronUp className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {expandedInvite === invite.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-700">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-400">Invited On</p>
                                                        <p className="text-gray-300">{formatDate(invite.date)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Reward Status</p>
                                                        <p className="text-gray-300 flex items-center">
                                                            {invite.rewardClaimed ? (
                                                                <>
                                                                    <Check className="w-4 h-4 text-green-400 mr-1" />
                                                                    Claimed (50 BOLT)
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {invite.status === 'accepted' ? (
                                                                        <>
                                                                            <Check className="w-4 h-4 text-yellow-400 mr-1" />
                                                                            Pending Claim
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <X className="w-4 h-4 text-gray-400 mr-1" />
                                                                            Not Claimed
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {invite.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => sendReminder(invite)}
                                                                className="cyber-button text-sm px-3 py-1"
                                                                disabled={invite.lastReminder && (new Date().getTime() - new Date(invite.lastReminder).getTime() < 24 * 60 * 60 * 1000)}
                                                            >
                                                                <Mail className="w-3 h-3 mr-1" />
                                                                Send Reminder
                                                            </button>
                                                            <button
                                                                onClick={() => cancelInvite(invite.id)}
                                                                className="cyber-button text-sm px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                                            >
                                                                <X className="w-3 h-3 mr-1" />
                                                                Cancel Invite
                                                            </button>
                                                        </>
                                                    )}
                                                    {invite.lastReminder && (
                                                        <p className="text-xs text-gray-400 mt-2 w-full">
                                                            Last reminder sent: {formatDate(invite.lastReminder)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <User Plus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400">No invitations found</p>
                                    {searchTerm || statusFilter !== 'all' ? (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setStatusFilter('all');
                                            }}
                                            className="cyber-button mt-4"
                                        >
                                            Clear Filters
                                        </button>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Referral Stats */}
                    <div className="premium-panel p-6 rounded-xl">
                        <h2 className="text-xl font-medium mb-6 neon-text">Referral Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Total Invites</p>
                                <p className="text-2xl font-medium neon-text">{invites.length}</p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Accepted</p>
                                <p className="text-2xl font-medium neon-text">
                                    {invites.filter(i => i.status === 'accepted').length}
                                </p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Pending</p>
                                <p className="text-2xl font-medium neon-text">
                                    {invites.filter(i => i.status === 'pending').length}
                                </p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Rewards Earned</p>
                                <p className="text-2xl font-medium neon-text">
                                    {invites.filter(i => i.rewardClaimed).length * 50} BOLT
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Referral Code */}
                    <div className="premium-panel p-6 rounded-xl">
                        <h2 className="text-xl font-medium mb-4 neon-text">Your Referral Code</h2>
                        <div className="premium-panel p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 mb-4">
                            <p className="text-sm text-gray-400 mb-2">Share this code with friends</p>
                            <div className="flex items-center space-x-3">
                                <code className="flex-1 font-mono text-xl font-medium text-cyan-400 tracking-wider">
                                    {referralCode}
                                </code>
                                <button
                                    onClick={copyReferralCode}
                                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={shareReferral}
                                className="cyber-button flex-1 flex items-center justify-center"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </button>
                            <button
                                onClick={copyReferralCode}
                                className="cyber-button flex-1 flex items-center justify-center"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                            </button>
                        </div>
                    </div>

                    {/* Referral Program Info */}
                    <div className="premium-panel p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <Gift className="w-5 h-5 text-cyan-400" />
                            <h2 className="text-lg font-medium">Referral Program</h2>
                        </div>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p>
                                For each friend who joins using your referral code and makes their first deposit:
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>You receive 50 BOLT tokens</li>
                                <li>Your friend receives 50 BOLT tokens</li>
                                <li>No limit on how many friends you can invite</li>
                            </ul>
                            <div className="premium-panel p-3 rounded-lg bg-cyan-500/5">
                                <div className="flex items-start space-x-2">
                                    <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <p>
                                        Rewards are automatically credited once your friend completes their first deposit of at least 100 BOLT tokens.
                                    </p>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="inline-flex items-center text-cyan-400 hover:text-cyan-300"
                            >
                                View full program terms
                                <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
        </>
    );
};

export default Invites;