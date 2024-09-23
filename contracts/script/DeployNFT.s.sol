// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {NFT} from "../src/NFT.sol";

contract DeployNFT is Script {
    function run() public {
        vm.startBroadcast();
        NFT nft = new NFT();
        vm.stopBroadcast();
    }
}
