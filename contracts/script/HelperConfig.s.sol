// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    struct CrossChainDetails {
        address _usdc;
    }

    mapping(uint256 _chainId => CrossChainDetails) public chainIdToCrossChainDetails;

    constructor() {
        if (block.chainid == 545) {
            setFlowConfigs();
        } else if (block.chainid == 2810) {
            setMorphConfigs();
        } else {
            setAnvilConfigs();
        }
    }

    function getChainDetails(uint256 _chainId) public view returns (address) {
        return chainIdToCrossChainDetails[_chainId]._usdc;
    }

    function setFlowConfigs() private {
        chainIdToCrossChainDetails[545]._usdc = getBasicUSDC(block.chainid);
    }

    function setMorphConfigs() private {
        chainIdToCrossChainDetails[2810]._usdc = getBasicUSDC(block.chainid);
    }

    function setAnvilConfigs() private {
        chainIdToCrossChainDetails[1]._usdc = getBasicUSDC(block.chainid);
    }

    function getBasicUSDC(uint256 _chainId) public view returns (address) {
        address basicUSDC = DevOpsTools.get_most_recent_deployment("BasicUSDC", _chainId);
        return basicUSDC;
    }
}
