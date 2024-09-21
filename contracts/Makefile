-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops --no-commit && forge install foundry-rs/forge-std --no-commit && forge install transmissions11/solmate --no-commit 

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

coverage :; forge coverage --report debug > coverage-report.txt

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ifeq ($(findstring --network flow,$(ARGS)),--network flow)
	NETWORK_ARGS := --rpc-url $(FLOW_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --legacy
endif

ifeq ($(findstring --network morph,$(ARGS)),--network morph)
	NETWORK_ARGS := --rpc-url $(MORPH_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --legacy
endif

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
endif

ifeq ($(findstring --network fuji,$(ARGS)),--network fuji)
	NETWORK_ARGS := --rpc-url $(FUJI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SNOWTRACE_API_KEY)
endif

ifeq ($(findstring --network zkevmTestnet,$(ARGS)),--network zkevmTestnet)
	NETWORK_ARGS := --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)
endif

ifeq ($(findstring --network baseGoerli,$(ARGS)),--network baseGoerli)
	NETWORK_ARGS := --rpc-url $(BASE_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(BASE_SCAN_API_KEY)
endif

ifeq ($(findstring --network linea,$(ARGS)),--network linea)
	NETWORK_ARGS := --rpc-url $(LINEA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(LINEA_SCAN_API_KEY)
endif

ifeq ($(findstring --network scrollSepolia,$(ARGS)),--network scrollSepolia)
	NETWORK_ARGS := --rpc-url $(SCROLL_SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SEPOLIA_SCAN_API_KEY)
endif

ifeq ($(findstring --network xdcTestnet,$(ARGS)),--network xdcTestnet)
	NETWORK_ARGS := --rpc-url $(XDC_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
endif

ifeq ($(findstring --network celoTestnet,$(ARGS)),--network celoTestnet)
	NETWORK_ARGS := --rpc-url $(CELO_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(CELO_SCAN_API_KEY)
endif

ifeq ($(findstring --network arbGoreli,$(ARGS)),--network arbGoreli)
	NETWORK_ARGS := --rpc-url $(ARB_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ARB_GOERLI_SCAN_API_KEY)
endif

ifeq ($(findstring --network gnosis,$(ARGS)),--network gnosis)
	NETWORK_ARGS := --rpc-url $(GNOSIS_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(GONSIS_SCAN_API_KEY) 
endif

# Commands for Local

deployBasicUSDC: 
	@forge script script/DeployBasicUSDC.s.sol:DeployBasicUSDC $(NETWORK_ARGS)

deployDAB:
	@forge script script/DeployDAB.s.sol:DeployDAB $(NETWORK_ARGS)

mintUSDCToAddress:
	@forge script script/interactions/BasicUSDC_i.s.sol:MintUSDC $(NETWORK_ARGS)

playSlot:
	@forge script script/interactions/Flow_DAB_i.s.sol:PlaySlot $(NETWORK_ARGS)

approveUSDCToTreasury:
	@forge script script/interactions/BasicUSDC_i.s.sol:ApproveUSDCToTreasury $(NETWORK_ARGS)

deployUtils:
	@forge script script/DeployUtils.s.sol:DeployUtils $(NETWORK_ARGS)

setUpUtils:
	@forge script script/interactions/Utils_i.s.sol:SetUpUtils $(NETWORK_ARGS)

deployTreasuryCrossChain: 
	@forge script script/DeployTreasuryCrossChain.s.sol:DeployTreasuryCrossChain $(NETWORK_ARGS)

setTreasuryCrossChainAddressOnUtils:
	@forge script script/interactions/Utils_i.s.sol:SetTreasuryCrossChainAddress $(NETWORK_ARGS)

deployMainContract:
	@forge script script/DeployMainContract.s.sol:DeployMainContract $(NETWORK_ARGS)

sendFundsOnSameChain:
	@forge script script/interactions/MainContract_i.s.sol:SendFundsOnSameChain $(NETWORK_ARGS)

sendFundsOn_2Chains:
	@forge script script/interactions/MainContract_i.s.sol:SendFundsOn_2Chains $(NETWORK_ARGS)

sendFundsOn_3Chains:
	@forge script script/interactions/MainContract_i.s.sol:SendFundsOn_3Chains $(NETWORK_ARGS) -vvvvv

setTreasuryCrossChainAddressOnMainContract:
	@forge script script/interactions/MainContract_i.s.sol:SetTreasuryCrossChainAddress $(NETWORK_ARGS)

setUtilsOnTreasuryCrossChain:
	@forge script script/interactions/TreasuryCrossChain_i.s.sol:SetUtils $(NETWORK_ARGS)