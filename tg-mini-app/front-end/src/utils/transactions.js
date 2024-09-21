import { parseUnits } from "viem";
import { UsdcContract } from "../abi/USDCABI";

export const approveUsdc = async (primaryWallet) => {
    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request } = await publicClient.simulateContract({
            ...UsdcContract,
            functionName: "approve",
            account: primaryWallet.address,
            args: [primaryWallet.address, parseUnits('10.0', 18)]
        })

        const hash = await walletClient.writeContract(request)
        console.log(hash)
        return hash
    } catch (error) {
        console.log("Error in aprrove usdc", error)
    }
}