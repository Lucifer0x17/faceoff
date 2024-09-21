// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {DAB} from "../src/DAB.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployDAB is Script {
    bytes32 public constant SALT = bytes32("DAB");

    function deployDAB(address _usdc) private returns (address) {
        vm.startBroadcast();
        DAB dab = new DAB(_usdc);
        vm.stopBroadcast();
        return address(dab);
    }

    function deployDABusingConfigs() private {
        HelperConfig helperConfig = new HelperConfig();
        address usdc = helperConfig.getChainDetails(block.chainid);

        deployDAB(usdc);
    }

    function run() public {
        deployDABusingConfigs();
    }
}
