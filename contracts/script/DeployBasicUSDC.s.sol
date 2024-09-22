// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {BasicUSDC} from "../src/BasicUSDC.sol";

contract DeployBasicUSDC is Script {
    function run() public {
        vm.startBroadcast();
        BasicUSDC usdc = new BasicUSDC();
        vm.stopBroadcast();
        console.log(address(usdc));
    }
}
