// Available chest plans
export const chestPlans = [
    {
        id: 'basic',
        name: '100 Tokens Chest',
        price: 100,
        maxTickets: 100,
        maxTicketsPerUser: 10,
        winnerPlaces: 5,
        description: 'Basic chest with 5 winner places',
        color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
        id: 'advanced',
        name: '250 Tokens Chest',
        price: 250,
        maxTickets: 250,
        maxTicketsPerUser: 25,
        winnerPlaces: 10,
        description: 'Advanced chest with 10 winner places',
        color: 'from-blue-500/20 to-cyan-500/10'
    },
    {
        id: 'premium',
        name: '500 Tokens Chest',
        price: 500,
        maxTickets: 500,
        maxTicketsPerUser: 50,
        winnerPlaces: 15,
        description: 'Premium chest with 15 winner places',
        color: 'from-purple-500/20 to-pink-500/10'
    },
    {
        id: 'ultimate',
        name: '1000 Tokens Chest',
        price: 1000,
        maxTickets: 1000,
        maxTicketsPerUser: 100,
        winnerPlaces: 25,
        description: 'Ultimate chest with 25 winner places',
        color: 'from-yellow-500/20 to-orange-500/10'
    }
];

// Sample user address for demo
const currentUserAddress = '0x1234...5678';

// Sample chests data
const sampleChests = [
    // User's active chests
    {
        id: '1',
        planId: 'basic',
        creator: currentUserAddress,
        ticketsSold: 95,
        participants: [
            {
                address: currentUserAddress,
                tickets: [1, 2, 3, 4, 5]
            },
            {
                address: '0x8765...4321',
                tickets: [6, 7, 8, 9, 10]
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    // User's completed chests
    {
        id: '2',
        planId: 'advanced',
        creator: currentUserAddress,
        ticketsSold: 250,
        participants: [
            {
                address: currentUserAddress,
                tickets: Array.from({ length: 20 }, (_, i) => i + 1)
            },
            {
                address: '0x5432...7890',
                tickets: Array.from({ length: 15 }, (_, i) => i + 21)
            }
        ],
        status: 'completed',
        winners: [
            { place: 1, address: currentUserAddress, reward: 100, ticketNumber: 5 },
            { place: 2, address: '0x5432...7890', reward: 75, ticketNumber: 25 },
            { place: 3, address: currentUserAddress, reward: 50, ticketNumber: 12 }
        ],
        createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
        id: '9',
        planId: 'premium',
        creator: currentUserAddress,
        ticketsSold: 500,
        participants: [
            {
                address: currentUserAddress,
                tickets: Array.from({ length: 50 }, (_, i) => i + 1)
            },
            {
                address: '0xWXYZ...4321',
                tickets: Array.from({ length: 30 }, (_, i) => i + 51)
            }
        ],
        status: 'completed',
        winners: [
            { place: 1, address: '0xWXYZ...4321', reward: 200, ticketNumber: 55 },
            { place: 2, address: currentUserAddress, reward: 150, ticketNumber: 12 },
            { place: 3, address: currentUserAddress, reward: 100, ticketNumber: 33 }
        ],
        createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
    },
    // Other users' active chests
    {
        id: '3',
        planId: 'premium',
        creator: '0xABCD...1234',
        ticketsSold: 25,
        participants: [
            {
                address: '0xABCD...1234',
                tickets: Array.from({ length: 15 }, (_, i) => i + 1)
            },
            {
                address: '0xEFGH...5678',
                tickets: Array.from({ length: 10 }, (_, i) => i + 16)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
    },
    {
        id: '4',
        planId: 'ultimate',
        creator: '0xIJKL...9012',
        ticketsSold: 150,
        participants: [
            {
                address: '0xIJKL...9012',
                tickets: Array.from({ length: 50 }, (_, i) => i + 1)
            },
            {
                address: '0xMNOP...3456',
                tickets: Array.from({ length: 40 }, (_, i) => i + 51)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
    },
    // Other users' completed chests
    {
        id: '10',
        planId: 'ultimate',
        creator: '0xDEAD...BEEF',
        ticketsSold: 1000,
        participants: [
            {
                address: '0xDEAD...BEEF',
                tickets: Array.from({ length: 100 }, (_, i) => i + 1)
            },
            {
                address: '0xCAFE...BABE',
                tickets: Array.from({ length: 100 }, (_, i) => i + 101)
            }
        ],
        status: 'completed',
        winners: [
            { place: 1, address: '0xCAFE...BABE', reward: 500, ticketNumber: 150 },
            { place: 2, address: '0xDEAD...BEEF', reward: 300, ticketNumber: 75 },
            { place: 3, address: '0xCAFE...BABE', reward: 200, ticketNumber: 120 }
        ],
        createdAt: new Date(Date.now() - 604800000).toISOString() // 7 days ago
    },
    {
        id: '11',
        planId: 'basic',
        creator: '0xFEED...FACE',
        ticketsSold: 100,
        participants: [
            {
                address: '0xFEED...FACE',
                tickets: Array.from({ length: 50 }, (_, i) => i + 1)
            },
            {
                address: '0xBABE...CAFE',
                tickets: Array.from({ length: 50 }, (_, i) => i + 51)
            }
        ],
        status: 'completed',
        winners: [
            { place: 1, address: '0xBABE...CAFE', reward: 50, ticketNumber: 75 },
            { place: 2, address: '0xFEED...FACE', reward: 30, ticketNumber: 25 },
            { place: 3, address: '0xBABE...CAFE', reward: 20, ticketNumber: 60 }
        ],
        createdAt: new Date(Date.now() - 518400000).toISOString() // 6 days ago
    },
    // More active chests
    {
        id: '5',
        planId: 'basic',
        creator: '0xQRST...7890',
        ticketsSold: 15,
        participants: [
            {
                address: '0xQRST...7890',
                tickets: Array.from({ length: 10 }, (_, i) => i + 1)
            },
            {
                address: '0xUVWX...1234',
                tickets: Array.from({ length: 5 }, (_, i) => i + 11)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
        id: '6',
        planId: 'advanced',
        creator: '0xYZAB...5678',
        ticketsSold: 50,
        participants: [
            {
                address: '0xYZAB...5678',
                tickets: Array.from({ length: 30 }, (_, i) => i + 1)
            },
            {
                address: '0xCDEF...9012',
                tickets: Array.from({ length: 20 }, (_, i) => i + 31)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
        id: '7',
        planId: 'premium',
        creator: '0xGHIJ...3456',
        ticketsSold: 75,
        participants: [
            {
                address: '0xGHIJ...3456',
                tickets: Array.from({ length: 45 }, (_, i) => i + 1)
            },
            {
                address: '0xKLMN...7890',
                tickets: Array.from({ length: 30 }, (_, i) => i + 46)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
    },
    {
        id: '8',
        planId: 'ultimate',
        creator: '0xOPQR...1234',
        ticketsSold: 200,
        participants: [
            {
                address: '0xOPQR...1234',
                tickets: Array.from({ length: 100 }, (_, i) => i + 1)
            },
            {
                address: '0xSTUV...5678',
                tickets: Array.from({ length: 100 }, (_, i) => i + 101)
            }
        ],
        status: 'open',
        createdAt: new Date(Date.now() - 28800000).toISOString() // 8 hours ago
    }
];

// Calculate rewards for winners based on chest plan
export const calculateRewards = (planId) => {
    const plan = chestPlans.find(p => p.id === planId);
    if (!plan) return [];

    const totalPrizePool = plan.price * 0.9; // 90% of chest price goes to prize pool
    const rewards = [];

    // Calculate rewards distribution based on place
    for (let i = 0; i < plan.winnerPlaces; i++) {
        // First place gets 30% of remaining pool
        // Each subsequent place gets 70% of what the previous place got
        const share = i === 0 ? 0.3 : rewards[i - 1] * 0.7;
        rewards.push(Math.floor(totalPrizePool * share));
    }

    return rewards;
};

// Get remaining tickets for a user in a chest
export const getRemainingTickets = (chest, userAddress) => {
    const plan = chestPlans.find(p => p.id === chest.planId);
    if (!plan) return 0;

    const userTickets = chest.participants.find(p => p.address === userAddress)?.tickets.length || 0;
    return plan.maxTicketsPerUser  - userTickets;
};

// Check if chest is ready for drawing winners
export const isChestReadyForDraw = (chest) => {
    const plan = chestPlans.find(p => p.id === chest.planId);
    return plan ? chest.ticketsSold === plan.maxTickets : false;
};

// Get chest details including plan information
export const getChestDetails = (chestId) => {
    // Remove 'chest_' prefix if it exists
    const id = chestId.replace('chest_', '');
    const chest = sampleChests.find(c => c.id === id);
    if (!chest) return null;

    const plan = chestPlans.find(p => p.id === chest.planId);
    if (!plan) return null;

    return {
        ...chest,
        plan,
        ticketPrice: 10, // Fixed ticket price for all chests
        remainingTickets: plan.maxTickets - chest.ticketsSold,
        rewards: calculateRewards(plan.id)
    };
};

// Get user's chests (both active and completed)
export const getUserChests = () => {
    return sampleChests
        .filter(chest => chest.creator === currentUserAddress)
.map(chest => {
        const plan = chestPlans.find(p => p.id === chest.planId);
        return {
            ...chest,
            plan,
            ticketPrice: 10,
            remainingTickets: plan ? plan.maxTickets - chest.ticketsSold : 0
        };
    });
};

// Get available chests (excluding user's chests)
export const getAvailableChests = () => {
    return sampleChests
        .filter(chest => chest.creator !== currentUserAddress && chest.status === 'open')
.map(chest => {
        const plan = chestPlans.find(p => p.id === chest.planId);
        return {
            ...chest,
            plan,
            ticketPrice: 10,
            remainingTickets: plan ? plan.maxTickets - chest.ticketsSold : 0
        };
    });
};

// Get completed chests (excluding user's chests)
export const getCompletedChests = () => {
    return sampleChests
        .filter(chest => chest.creator !== currentUserAddress && chest.status === 'completed')
.map(chest => {
        const plan = chestPlans.find(p => p.id === chest.planId);
        return {
            ...chest,
            plan,
            ticketPrice: 10,
            remainingTickets: 0
        };
    });
};