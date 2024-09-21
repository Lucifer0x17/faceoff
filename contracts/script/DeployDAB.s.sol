// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {Flow_DAB} from "../src/Flow_DAB.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployDAB is Script {
    uint256 noOfProjects;

    function deployDAB(address _usdc) private returns (address) {
        vm.startBroadcast();
        Flow_DAB dab = new Flow_DAB(_usdc, _usdc, noOfProjects);
        vm.stopBroadcast();
        return address(dab);
    }

    function deployDABusingConfigs() private {
        HelperConfig helperConfig = new HelperConfig();
        address usdc = helperConfig.getBasicUSDC(block.chainid);
        noOfProjects = helperConfig.NO_OF_PROJECTS();

        deployDAB(usdc);
    }

    function run() public {
        deployDABusingConfigs();
    }
}
