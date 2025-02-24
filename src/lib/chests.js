// Prize distribution percentages for each chest type
export const prizeDistributions = {
    'V1000': {
        total: 7500,
        creatorReward: { tokens: 2000, percentage: '20%' },
        systemFee: { tokens: 500, percentage: '5%' },
        breakdown: [
            { rank: '1', percentage: '20%', tokens: 1500.00 },
            { rank: '2', percentage: '12%', tokens: 900.00 },
            { rank: '3', percentage: '10%', tokens: 750.00 },
            { rank: '4', percentage: '8%', tokens: 600.00 },
            { rank: '5', percentage: '6%', tokens: 450.00 },
            { rank: '6', percentage: '5%', tokens: 375.00 },
            { rank: '7', percentage: '4.5%', tokens: 337.50 },
            { rank: '8', percentage: '4%', tokens: 300.00 },
            { rank: '9', percentage: '3.5%', tokens: 262.50 },
            { rank: '10', percentage: '3%', tokens: 225.00 },
            { rank: '11', percentage: '2.5%', tokens: 187.50 },
            { rank: '12', percentage: '2.3%', tokens: 172.50 },
            { rank: '13', percentage: '2.1%', tokens: 157.50 },
            { rank: '14', percentage: '2%', tokens: 150.00 },
            { rank: '15', percentage: '1.8%', tokens: 135.00 },
            { rank: '16', percentage: '1.6%', tokens: 120.00 },
            { rank: '17', percentage: '1.5%', tokens: 112.50 },
            { rank: '18', percentage: '1.4%', tokens: 105.00 },
            { rank: '19', percentage: '1.3%', tokens: 97.50 },
            { rank: '20', percentage: '1.2%', tokens: 90.00 },
            { rank: '21', percentage: '1.1%', tokens: 82.50 },
            { rank: '22', percentage: '1%', tokens: 75.00 },
            { rank: '23', percentage: '0.9%', tokens: 67.50 },
            { rank: '24', percentage: '0.8%', tokens: 60.00 },
            { rank: '25', percentage: '0.7%', tokens: 52.50 },
        ],
    },
    'V500': {
        total: 3750,
        creatorReward: { tokens: 1000, percentage: '20%' },
        systemFee: { tokens: 250, percentage: '5%' },
        breakdown: [
            { rank: '1', percentage: '25%', tokens: 937.50 },
            { rank: '2', percentage: '15%', tokens: 562.50 },
            { rank: '3', percentage: '10%', tokens: 375.00 },
            { rank: '4', percentage: '9%', tokens: 337.50 },
            { rank: '5', percentage: '8%', tokens: 300.00 },
            { rank: '6', percentage: '7%', tokens: 262.50 },
            { rank: '7', percentage: '6%', tokens: 225.00 },
            { rank: '8', percentage: '5%', tokens: 187.50 },
            { rank: '9', percentage: '4%', tokens: 150.00 },
            { rank: '10', percentage: '3%', tokens: 112.50 },
            { rank: '11', percentage: '2.5%', tokens: 93.75 },
            { rank: '12', percentage: '2%', tokens: 75.00 },
            { rank: '13', percentage: '1.5%', tokens: 56.25 },
            { rank: '14', percentage: '1%', tokens: 37.50 },
            { rank: '15', percentage: '0.5%', tokens: 18.75 },
        ],
    },
    'V250': {
        total: 1875,
        creatorReward: { tokens: 500, percentage: '20%' },
        systemFee: { tokens: 125, percentage: '5%' },
        breakdown: [
            { rank: '1', percentage: '30%', tokens: 562.50 },
            { rank: '2', percentage: '20%', tokens: 375.00 },
            { rank: '3', percentage: '15%', tokens: 281.25 },
            { rank: '4', percentage: '10%', tokens: 187.50 },
            { rank: '5', percentage: '8%', tokens: 150.00 },
            { rank: '6', percentage: '6%', tokens: 112.50 },
            { rank: '7', percentage: '4%', tokens: 75.00 },
            { rank: '8', percentage: '3%', tokens: 56.25 },
            { rank: '9', percentage: '2%', tokens: 37.50 },
            { rank: '10', percentage: '2%', tokens: 37.50 },
        ],
    },
    'V100': {
        total: 750,
        creatorReward: { tokens: 200, percentage: '20%' },
        systemFee: { tokens: 50, percentage: '5%' },
        breakdown: [
            { rank: '1', percentage: '38.46%', tokens: 288.46 },
            { rank: '2', percentage: '26.92%', tokens: 201.92 },
            { rank: '3', percentage: '19.23%', tokens: 144.23 },
            { rank: '4', percentage: '11.54%', tokens: 86.54 },
            { rank: '5', percentage: '3.85%', tokens: 28.85 },
        ],
    },
};

// Available chest plans
export const chestPlans = [
    {
        id: 'basic',
        name: 'V100',
        price: 100,
        ticketPrice: 10,
        maxTickets: 100,
        maxTicketsPerUser: 10,
        winnerPlaces: 5,
        description: 'Basic chest with 5 winner places',
        color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
        id: 'advanced',
        name: 'V250',
        price: 250,
        ticketPrice: 10,
        maxTickets: 250,
        maxTicketsPerUser: 25,
        winnerPlaces: 10,
        description: 'Advanced chest with 10 winner places',
        color: 'from-blue-500/20 to-cyan-500/10'
    },
    {
        id: 'premium',
        name: 'V500',
        price: 500,
        ticketPrice: 10,
        maxTickets: 500,
        maxTicketsPerUser: 50,
        winnerPlaces: 15,
        description: 'Premium chest with 15 winner places',
        color: 'from-purple-500/20 to-pink-500/10'
    },
    {
        id: 'ultimate',
        name: 'V1000',
        price: 1000,
        ticketPrice: 10,
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