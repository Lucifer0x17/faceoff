export const FlowDABAbi = [
    {
        type: "constructor",
        inputs: [
            { name: "_USDC", type: "address", internalType: "address" },
            { name: "_s_totalNoOfProjects", type: "uint256", internalType: "uint256" }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "BET_AMOUNT",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "CADENCE_ARCH",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "DESTINATION_CHAIN_ID",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "FEE_AMOUNT",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "HYP_DESTINATION_MAILBOX",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "HYP_SOURCE_MAILBOX",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "contract IMailbox" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "claimWinnings",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "getAllProjects",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct Flow_DAB.ProjectItem[]",
                components: [
                    { name: "projectId", type: "uint256", internalType: "uint256" },
                    { name: "totalCollectedAmt", type: "uint256", internalType: "uint256" }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getBettorsForProject",
        inputs: [{ name: "_projectId", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "i_BET",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "i_USDC",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "placeBet",
        inputs: [
            { name: "_projectId", type: "uint256", internalType: "uint256" },
            { name: "_betAmt", type: "uint256", internalType: "uint256" }
        ],
        outputs: [],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "playSlot",
        inputs: [],
        outputs: [
            { name: "", type: "uint64", internalType: "uint64" },
            { name: "", type: "uint64", internalType: "uint64" },
            { name: "", type: "uint64", internalType: "uint64" }
        ],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "revertibleRandom",
        inputs: [],
        outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_bettors",
        inputs: [{ name: "bettor", type: "address", internalType: "address" }],
        outputs: [{ name: "total_pooledAmt", type: "uint256", internalType: "uint256" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_projects",
        inputs: [{ name: "projectId", type: "uint256", internalType: "uint256" }],
        outputs: [
            { name: "projectId", type: "uint256", internalType: "uint256" },
            { name: "totalCollectedAmt", type: "uint256", internalType: "uint256" }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_topProjects",
        inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        outputs: [
            { name: "projectId", type: "uint256", internalType: "uint256" },
            { name: "totalCollectedAmt", type: "uint256", internalType: "uint256" }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_totalNoOfProjects",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_totalNoOfWinningProjects",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "s_winnningProjects",
        inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "submitWinningProjects",
        inputs: [{ name: "_projectIds", type: "uint256[]", internalType: "uint256[]" }],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "event",
        name: "DAB_BetPlaced",
        inputs: [
            { name: "projectId", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "bettor", type: "address", indexed: false, internalType: "address" },
            { name: "_pooledAmt", type: "uint256", indexed: false, internalType: "uint256" }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "DAB_NFTMintInitialised",
        inputs: [{ name: "bettor", type: "address", indexed: false, internalType: "address" }],
        anonymous: false
    },
    {
        type: "event",
        name: "DAB_Played",
        inputs: [],
        anonymous: false
    },
    {
        type: "error",
        name: "DAB_InvalidBetAmount",
        inputs: []
    },
    {
        type: "error",
        name: "DAB_InvalidFeeAmount",
        inputs: []
    },
    {
        type: "error",
        name: "DAB_InvalidWinnersLength",
        inputs: []
    },
    {
        type: "error",
        name: "DAB_TransferFailed",
        inputs: []
    }
];