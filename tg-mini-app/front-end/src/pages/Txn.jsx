
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { useState } from 'react';
import { approveUsdc, claimWinnings, placeBet, playSlot } from '../utils/transactions';

// const Txn = () => {
//     const {primaryWallet} = useDynamicContext()
//     const [txnHash, setTxnHash] = useState("");

//     if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

//     const handleOnClick = async (e) => {
//         e.preventDefault();
//         const publicClient = await primaryWallet.getPublicClient();
//         const walletClient = await primaryWallet.getWalletClient();
//         console.log("Public Client", publicClient)
//         console.log("Wallet Client", walletClient)

//         const transaction = {
//             to: "0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56",
//             value:0,
//         };
//         const hash = await walletClient.sendTransaction(transaction);
//         setTxnHash(hash);
//         const receipt = await publicClient.getTransactionReceipt({
//             hash,
//         });

//         console.log(receipt);
//     }
//   return (
//     <>
//     <button onClick={handleOnClick}>Test Transaction</button>
//     {txnHash ? txnHash : "No transaction initiated"} 
//     </>
// )
// }

const Txn = () => {
    const {primaryWallet} = useDynamicContext()
    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

    const handleOnClick = async (e) => {
        e.preventDefault();

        // const contract = getContract({
        //     address: contractAddress,
        //     abi: contractABI,
        //     publicClient: publicClient,
        // });

        // const result = await contract.write({
        //     functionName: 'approve',
        //     args: ['SPENDER_ADDRESS', parseUnits('10.0', 18)], // Replace SPENDER_ADDRESS and amount
        //     from: primaryWallet.address,
        // });



        // const tns = await walletClient.writeContract({
        //     address:contractAddress,
        //     abi: contractABI,
        //     functionName: 'approve',
        //     account: primaryWallet.address,
        //     args: [""]
        // })
        // const hash = await approveUsdc(primaryWallet)

        // console.log("===============",hash)
        const hash2 = await claimWinnings(primaryWallet)
        console.log(hash2)

        // const transaction = {
        //     to: "0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56",
        //     value:0,
        // };
        // const hash = await walletClient.sendTransaction(transaction);
        // setTxnHash(hash);
        // const receipt = await publicClient.getTransactionReceipt({
        //     hash,
        // });

        // // Allowance slot: A 32 bytes hex string representing the allowance slot of the sender.
        // const allowanceSlot = '0x....'
        
        // // Max allowance: A 32 bytes hex string representing the maximum allowance (2^256 - 1)
        // const maxAllowance = numberToHex(maxUint256)

        // const { request0 } = await publicClient.simulateContract({
        //     address: '0xc769CAf97b6b8011381f8E257c5517010a24AB6f',
        //     abi: USDCAbi,
        //     functionName: 'transferFrom',
        //     args: [
        //         '0x4CfC50EFd9e0058E5E5D5F0A39b7BBe1776bB10b',
        //         '0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56',
        //         1
        //     ],
        //     stateOverride: [ 
        //         { 
        //         // modifying the state of the token contract
        //         address, 
        //         stateDiff: [ 
        //             { 
        //             slot: allowanceSlot, 
        //             value: maxAllowance, 
        //             }, 
        //         ], 
        //         }, 
        //     ], 
        // })
        // await walletClient.writeContract(request0)
        // console.log(request0)

        // const {approvalReq} = await publicClient.simulateContract({
        //     address: '0xc769CAf97b6b8011381f8E257c5517010a24AB6f',
        //     abi: USDCAbi,
        //     functionName: 'approve',
        //     args: [
        //         '0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56',
        //         BigInt(1000000),
        //     ]
        // })
        // await walletClient.writeContract(approvalReq)
        // console.log(approvalReq)

        // const { request1 } = await publicClient.simulateContract({
        //     address: '0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56',
        //     abi: FlowDABAbi,
        //     functionName: 'playSlot',

        // })
        // await walletClient.writeContract(request1)
        // console.log(request1)

        // const { request2 } = await publicClient.simulateContract({
        //     address: '0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56',
        //     abi: FlowDABAbi,
        //     functionName: 'placeBet',
        // })
        // await walletClient.writeContract(request2)

        // const { request3 } = await publicClient.simulateContract({
        //     address: '0xC6310652Bf9c856d63567bFAb7aA3BAdF3999D56',
        //     abi: FlowDABAbi,
        //     functionName: 'claimWinnings',
        // })
        // await walletClient.writeContract(request3)

        // console.log(receipt);
    }
  return (
    <>
    <button onClick={handleOnClick}>Test Transaction</button>
    {txnHash ? txnHash : "No transaction initiated"} 
    </>
)
}

export default Txn