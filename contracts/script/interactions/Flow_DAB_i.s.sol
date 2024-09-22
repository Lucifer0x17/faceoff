// SPDC-Licenese-Identifier: MIT
pragma solidity 0.8.25;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Flow_DAB} from "../../src/Flow_DAB.sol";
import {BasicUSDC} from "../../src/BasicUSDC.sol";

import {HelperConfig} from "../HelperConfig.s.sol";

contract PlaySlot is Script {
    Flow_DAB flowDAB;
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
        flowDAB = Flow_DAB(dabAddress);

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

contract PlaceBet is Script {
    Flow_DAB flowDAB;
    uint256 usdc_denomination;

    uint256 BET_AMOUNT = 1_000;

    function placeBet() public {
        vm.startBroadcast();
        flowDAB.placeBet(1, (usdc_denomination * BET_AMOUNT));
        vm.stopBroadcast();
    }

    function placeBetUsingConfigs() public {
        HelperConfig helper = new HelperConfig();
        address dabAddress = helper.getFlowDAB();
        usdc_denomination = helper.USDC_DENOMINATION();

        flowDAB = Flow_DAB(dabAddress);

        console2.log("DAB Address: ", dabAddress);
    }

    function run() public {
        placeBetUsingConfigs();
    }
}

contract ClaimWinning is Script {
    Flow_DAB flowDAB;

    function claimWinningUsingConfigs() public {
        HelperConfig helper = new HelperConfig();
        address dabAddress = helper.getFlowDAB();
        flowDAB = Flow_DAB(dabAddress);

        flowDAB.claimWinnings();

        console2.log("DAB Address: ", dabAddress);
    }

    function run() public {
        claimWinningUsingConfigs();
    }
}

contract CheckAllProjects is Script {
    Flow_DAB flowDAB;

    struct ProjectItem {
        uint256 projectId;
        uint256 collectedAmount;
    }

    function checkAllProjects() public {
        vm.startBroadcast();
        Flow_DAB.ProjectItem[] memory collectedAmount = flowDAB.getAllProjects();

        vm.stopBroadcast();

        for (uint256 i = 0; i < collectedAmount.length; i++) {
            console2.log("Project ID: ", collectedAmount[i].projectId);
            console2.log("Collected Amount: ", collectedAmount[i].totalCollectedAmt);
        }
    }

    function checkAllProjectsUsingConfigs() public {
        HelperConfig helper = new HelperConfig();
        address dabAddress = helper.getFlowDAB();
        flowDAB = Flow_DAB(dabAddress);

        console2.log("DAB Address: ", dabAddress);

        checkAllProjects();
    }

    function run() public {
        checkAllProjectsUsingConfigs();
    }
}
