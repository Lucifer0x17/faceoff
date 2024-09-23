// SPDC-Licenese-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Base_DAB} from "../../src/Base_DAB.sol";
import {BasicUSDC} from "../../src/BasicUSDC.sol";

import {HelperConfig} from "../HelperConfig.s.sol";

contract PlaySlot is Script {
    Base_DAB flowDAB;
    BasicUSDC usdc;

    uint256 feeAmount;

    function playSlot() public {
        vm.startBroadcast();

        usdc.approve(address(flowDAB), (feeAmount * 2));
        flowDAB.playSlot();

        vm.stopBroadcast();
    }

    function playSlotUsingConfigs() public {
        HelperConfig helper = new HelperConfig();
        address usdcAddress = helper.getBasicUSDC(helper.FLOW_CHAIN_ID());
        address dabAddress = helper.getFlowDAB();
        feeAmount = helper.FEE_AMOUNT();

        usdc = BasicUSDC(usdcAddress);
        flowDAB = Base_DAB(dabAddress);

        uint256 balance = usdc.balanceOf(msg.sender);

        console2.log("DAB Address: ", dabAddress);
        console2.log("USDC Address: ", usdcAddress);
        console2.log("Balance: ", balance);
        console2.log("Sender", msg.sender);

        playSlot();
    }

    function run() public {
        playSlotUsingConfigs();
    }
}
