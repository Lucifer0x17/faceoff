
import {parseEther} from 'viem'

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { useState } from 'react';

const Txn = () => {
    const {primaryWallet} = useDynamicContext({
        network: 1
    })
    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

    const handleOnClick = async (e) => {
        e.preventDefault();
        const publicClient = await primaryWallet.getPublicClient();
        const walletClient = await primaryWallet.getWalletClient();

        const transaction = {
            to: "",
            value:parseEther(10000000000000),
        };
        const hash = await walletClient.sendTransaction(transaction);
        setTxnHash(hash);
        const receipt = await publicClient.getTransactionReceipt({
            hash,
        });

        console.log(receipt);
    }
  return (
    <>
    <button onClick={handleOnClick}>Test Transaction</button>
    {txnHash ? txnHash : "No transaction initiated"} 
    </>
)
}

export default Txn