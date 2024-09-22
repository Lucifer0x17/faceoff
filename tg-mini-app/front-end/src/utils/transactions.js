import { parseUnits } from "viem";
import { UsdcContract } from "../abi/USDCABI";
import { FlowDabContract } from "../abi/FlowDABAbi";

export const approveUsdc = async (primaryWallet) => {
    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request } = await publicClient.simulateContract({
            ...UsdcContract,
            functionName: "approve",
            account: primaryWallet.address,
            args: [FlowDabContract.address, parseUnits('10.0', 18)]
        })

        const hash = await walletClient.writeContract(request)
        console.log(hash)
        return hash
    } catch (error) {
        console.log("Error in aprrove usdc", error)
    }
}

export const playSlot = async (primaryWallet) => {
    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request, result } = await publicClient.simulateContract({
            ...FlowDabContract,
            functionName: "playSlot",
            account: primaryWallet.address,
        })
        console.log("===>", result)
        const hash = await walletClient.writeContract(request)
        console.log(hash)
        return { hash, result }
    } catch (error) {
        console.log("Error in play slot", error)
    }
}

export const placeBet = async (primaryWallet, projectId = '5') => {
    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request, result } = await publicClient.simulateContract({
            ...FlowDabContract,
            functionName: "placeBet",
            account: primaryWallet.address,
            args: [parseUnits(projectId), parseUnits('10.0', 6)]
        })
        console.log("===>", result)
        const hash = await walletClient.writeContract(request)
        console.log(hash)
        return { hash, result }
    } catch (error) {
        console.log("Error in play slot", error)
    }
}

export const claimWinnings = async (primaryWallet) => {
    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request, result } = await publicClient.simulateContract({
            ...FlowDabContract,
            functionName: "claimWinnings",
            account: primaryWallet.address,
        })
        console.log("===>", result)
        const hash = await walletClient.writeContract(request)
        console.log(hash)
        return { hash, result }
    } catch (error) {
        console.log("Error in play slot", error)
    }
}