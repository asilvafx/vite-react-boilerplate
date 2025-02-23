// Mock transactions data
export const transactions = [
    {
        id: 't1',
        type: 'send',
        amount: 100,
        token: 'POL',
        timestamp: '2024-03-15T14:30:00Z',
        status: 'completed',
        description: 'Sent to Alice',
        to: '0x1234...5678',
        txHash: '0xabcd...efgh'
    },
    {
        id: 't2',
        type: 'receive',
        amount: 500,
        token: 'BOLT',
        timestamp: '2024-03-14T10:15:00Z',
        status: 'completed',
        description: 'Received from Bob',
        from: '0x8765...4321',
        txHash: '0xijkl...mnop'
    },
    {
        id: 't3',
        type: 'exchange',
        amount: 250,
        token: 'POL',
        timestamp: '2024-03-13T18:45:00Z',
        status: 'completed',
        description: 'Exchanged POL for BOLT',
        txHash: '0xqrst...uvwx'
    },
    {
        id: 't4',
        type: 'chest_join',
        amount: 50,
        token: 'BOLT',
        timestamp: '2024-03-12T09:20:00Z',
        status: 'completed',
        description: 'Joined Chest #1337',
        txHash: '0xyzab...cdef'
    },
    {
        id: 't5',
        type: 'chest_win',
        amount: 1000,
        token: 'BOLT',
        timestamp: '2024-03-11T21:00:00Z',
        status: 'completed',
        description: 'Won Chest #1234',
        txHash: '0xghij...klmn'
    },
    {
        id: 't6',
        type: 'send',
        amount: 75,
        token: 'POL',
        timestamp: '2024-03-10T15:30:00Z',
        status: 'failed',
        description: 'Failed to send to Charlie',
        to: '0x9876...5432',
        txHash: '0xopqr...stuv'
    },
    {
        id: 't7',
        type: 'exchange',
        amount: 300,
        token: 'BOLT',
        timestamp: '2024-03-09T12:45:00Z',
        status: 'pending',
        description: 'Exchange BOLT for POL',
        txHash: '0xwxyz...abcd'
    }
];

export const getRecentTransactions = (limit = 5) => {
    return transactions.slice(0, limit);
};

export const getAllTransactions = () => {
    return transactions;
};

export const getTransactionById = (id) => {
    return transactions.find(tx => tx.id === id);
};

export const searchTransactions = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return transactions.filter(tx =>
        tx.description.toLowerCase().includes(lowercaseQuery) ||
        tx.id.toLowerCase().includes(lowercaseQuery) ||
        tx.txHash?.toLowerCase().includes(lowercaseQuery) ||
        tx.from?.toLowerCase().includes(lowercaseQuery) ||
        tx.to?.toLowerCase().includes(lowercaseQuery)
    );
};