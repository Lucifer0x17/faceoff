// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    struct CrossChainDetails {
        address _dab;
        address _usdc;
    }

    uint256 public constant FLOW_CHAIN_ID = 545;
    uint256 public constant MORPH_CHAIN_ID = 2810;
    uint256 public constant USDC_DENOMINATION = 1e6;
    uint256 public constant FEE_AMOUNT = 1e5;
    uint256 public constant NO_OF_PROJECTS = 20;

    mapping(uint256 _chainId => CrossChainDetails) public chainIdToCrossChainDetails;

    function getChainDetails(uint256 _chainId) public view returns (address, address) {
        address usdc = chainIdToCrossChainDetails[_chainId]._usdc;
        address dab = chainIdToCrossChainDetails[_chainId]._dab;

        return (usdc, dab);
    }

    function getBasicUSDC(uint256 _chainId) public view returns (address) {
        address basicUSDC = DevOpsTools.get_most_recent_deployment("BasicUSDC", _chainId);
        return basicUSDC;
    }

    function getFlowDAB() public view returns (address) {
        address dab = DevOpsTools.get_most_recent_deployment("Flow_DAB", FLOW_CHAIN_ID);
        return dab;
    }
}
