import Web3 from 'web3';

const balanceOfABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];

const transferABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];

const tokenContract = process.env.WEB3_CONTRACT_ADDRESS || "";
const tokenProvider = process.env.WEB3_INFURA_RPC || "";

let web3 = null;
if(tokenProvider){
    web3 = new Web3(new Web3.providers.HttpProvider(tokenProvider));
}
export const createWallet = async () => {
    if (!web3) {
        return ('Please ensure you have a valid RPC provider, and try again.');
    }

    return web3.eth.accounts.create();
}
export const sendTransaction = async (amountToSend, destinationAddress, tokenHolder, holderSecretKey) => {
    if (!web3) return;

    const amountInWei = web3.utils.toWei(amountToSend, "ether");

    try {
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 200000;

        const signer = web3.eth.accounts.privateKeyToAccount(holderSecretKey);
        web3.eth.accounts.wallet.add(signer);

        const web3contract = new web3.eth.Contract(transferABI, tokenContract, { from: tokenHolder });

        const params = {
            from: tokenHolder,
            to: tokenContract,
            nonce: await web3.eth.getTransactionCount(tokenHolder),
            value: '0x00',
            data: web3contract.methods.transfer(destinationAddress, amountInWei).encodeABI(),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
        };

        const signedTx = await web3.eth.accounts.signTransaction(params, holderSecretKey);

        let transactionHash = "";
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .once("transactionHash", (txhash) => {
                console.log(`Mining transaction ...`);
                console.log(`https://polygonscan.com/tx/${txhash}`);
                transactionHash = txhash;
            });

        console.log(`Mined in block ${receipt.blockNumber}`);
        return {
            txhash: transactionHash,
            block: receipt.blockNumber,
        };

    } catch (error) {
        console.error("Transaction failed:", error);
    } finally {
        await getTokenBalance(false);
    }
};

export const getTokenBalance = async (tokenHolder, chain = false) => {
 
    if (!web3) return; // Ensure web3 is initialized
    try {
        // Get main chain token balance
        if(chain){
            const balance = await web3.eth.getBalance(tokenHolder);
            const formattedBalance = parseFloat(web3.utils.fromWei(balance, "ether"));

            return formattedBalance.toFixed(4);
        }

        // Or, Get custom erc-20 token balance
        const contract = new web3.eth.Contract(balanceOfABI, tokenContract);
        const result = await contract.methods.balanceOf(tokenHolder).call();
        const formattedResult = parseFloat(web3.utils.fromWei(result, "ether"));

        return formattedResult.toFixed(4);
    } catch (error) {
        console.log("Failed to fetch balance. " + error.message);
        return null;
    }
};