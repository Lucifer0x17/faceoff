// SPDC-Licenese-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {BasicUSDC} from "../../src/BasicUSDC.sol";

import {HelperConfig} from "../HelperConfig.s.sol";

contract MintUSDC is Script {
    BasicUSDC usdc;

    uint256 constant AMOUNT_TO_MINT = 100_000;

    function mintUSDC(uint256 _amountToMint) public {
        vm.startBroadcast();
        usdc.mint(msg.sender, _amountToMint);
        vm.stopBroadcast();
    }

    function mintUSDCUsingConfigs() public {
        HelperConfig helper = new HelperConfig();
        address usdcAddress = helper.getBasicUSDC(block.chainid);
        uint256 denomination = helper.USDC_DENOMINATION();

        usdc = BasicUSDC(usdcAddress);

        console2.log("USDC Address: ", usdcAddress);

        uint256 amountToMint = AMOUNT_TO_MINT * denomination;

        mintUSDC(amountToMint);
    }

    function run() public {
        mintUSDCUsingConfigs();
    }
}
