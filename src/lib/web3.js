import Web3 from 'web3';
import {loadConfig} from './site';
import DbService from "../data/db.service";

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
const tokenContract = loadConfig.WEB3_CONTRACT_ADDRESS || "";
const tokenProvider = process.env.WEB3_INFURA_RPC || "";

let web3 = null;
if(tokenProvider){
    web3 = new Web3(new Web3.providers.HttpProvider(tokenProvider));
}

export const validateWallet = async (address) => {
    if (!web3) {
        return ('Please ensure you have a valid RPC provider, and try again.');
    }
    return web3.utils.isAddress(address);
}
export const getGasPrice = async () => {
    if (!web3) {
        return ('Please ensure you have a valid RPC provider, and try again.');
    }

    const gasPrice = await web3.eth.getGasPrice();
    const ethPrice = web3.utils.fromWei(gasPrice, "Gwei");
    const ratePrice = parseFloat(ethPrice / 10000);
    return ratePrice.toFixed(3);
}
export const createWallet = async () => {
    if (!web3) {
        return ('Please ensure you have a valid RPC provider, and try again.');
    }

    return web3.eth.accounts.create();
}
export const getTxStatus = async (hash) => {
    if (!web3) {
        return ('Please ensure you have a valid RPC provider, and try again.');
    }

    try {
        // Get transaction receipt
        const receipt = await web3.eth.getTransactionReceipt(hash);

        if(receipt) {
            // Return data
            return receipt;
        } else {
            return ('Transaction is not mined yet or does not exist.');
        }
    } catch (error) {
        return ('Error fetching transaction status: ' + error);
    }

    return web3.eth.accounts.create();
}
export const sendTransaction = async (amountToSend, destinationAddress, tokenHolder, holderSecretKey, inChain = false, txType = 'transfer') => {
    if (!web3) return;

    try {
        const amountInWei = web3.utils.toWei(amountToSend, "ether");

        //const signer = web3.eth.accounts.privateKeyToAccount(holderSecretKey);
        //web3.eth.accounts.wallet.add(signer);

        const nonce = await web3.eth.getTransactionCount(tokenHolder);
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 200000;

        let web3contract = null;

        let params = {};

        if(inChain){

            params = {
                to: destinationAddress,
                value: amountInWei,
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(gasPrice),
                gas: web3.utils.toHex(gasLimit),
            };
        } else {

            web3contract = new web3.eth.Contract(transferABI, tokenContract, { from: tokenHolder });

            params = {
                from: tokenHolder,
                to: tokenContract,
                nonce: web3.utils.toHex(nonce),
                value: '0x00',
                data: web3contract.methods.transfer(destinationAddress, amountInWei).encodeABI(),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(gasLimit),
            };
        }

        const signedTx = await web3.eth.accounts.signTransaction(params, holderSecretKey);

        let transactionHash = "";
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .once("transactionHash", async (txhash) => {
                transactionHash = txhash;
                const contractToken = inChain ? loadConfig.WEB3_CHAIN_SYMBOL : loadConfig.WEB3_CONTRACT_SYMBOL;
                const transactionData = {
                    address_from: tokenHolder,
                    address_to: destinationAddress,
                    amount: amountToSend,
                    tx_hash: transactionHash,
                    tx_type: txType,
                    tx_contract: contractToken,
                    reference: '',
                    status: 1,
                    created_at: new Date().toISOString(),
                };

                await DbService.create(transactionData, 'transactions');

            })
            .on('error', function(error){ console.log("error", error); });

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