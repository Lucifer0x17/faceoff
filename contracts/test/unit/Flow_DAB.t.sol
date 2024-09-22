//SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {Flow_DAB} from "../../src/Flow_DAB.sol";
import {BasicUSDC} from "../../src/BasicUSDC.sol";

contract Flow_DABTest is Test {
    Flow_DAB flowDAB;
    BasicUSDC usdc;

    uint256 public constant USDC_DENOMINATION = 1_000_000;

    uint256 public constant INITIAL_USDC_MINT = USDC_DENOMINATION * 1_00_000;
    uint256 public constant BET_AMOUNT_A = USDC_DENOMINATION * 10_000;
    uint256 public constant BET_AMOUNT_B = USDC_DENOMINATION * 20_000;
    uint256 public constant BET_AMOUNT_C = USDC_DENOMINATION * 30_000;
    uint256 public constant BET_AMOUNT_D = USDC_DENOMINATION * 40_000;

    address public immutable i_UserA = makeAddr("UserA");
    address public immutable i_UserB = makeAddr("UserB");
    address public immutable i_UserC = makeAddr("UserC");
    address public immutable i_UserD = makeAddr("UserD");

    function setUp() external {
        usdc = new BasicUSDC();
        flowDAB = new Flow_DAB(address(usdc), 20);

        usdc.mint(i_UserA, INITIAL_USDC_MINT);
        usdc.mint(i_UserB, INITIAL_USDC_MINT);
        usdc.mint(i_UserC, INITIAL_USDC_MINT);
        usdc.mint(i_UserD, INITIAL_USDC_MINT);

        vm.prank(i_UserA);
        usdc.approve(address(flowDAB), INITIAL_USDC_MINT);

        vm.prank(i_UserB);
        usdc.approve(address(flowDAB), INITIAL_USDC_MINT);

        vm.prank(i_UserC);
        usdc.approve(address(flowDAB), INITIAL_USDC_MINT);

        vm.prank(i_UserD);
        usdc.approve(address(flowDAB), INITIAL_USDC_MINT);
    }

    modifier _betSetup() {
        vm.startPrank(i_UserA);
        flowDAB.placeBet(1, BET_AMOUNT_A);
        flowDAB.placeBet(3, BET_AMOUNT_B);
        flowDAB.placeBet(4, BET_AMOUNT_D);
        flowDAB.placeBet(5, BET_AMOUNT_A);
        vm.stopPrank();

        vm.startPrank(i_UserB);
        flowDAB.placeBet(1, BET_AMOUNT_B);
        flowDAB.placeBet(2, BET_AMOUNT_C);
        flowDAB.placeBet(3, BET_AMOUNT_A);
        flowDAB.placeBet(4, BET_AMOUNT_D);
        vm.stopPrank();

        vm.startPrank(i_UserC);
        flowDAB.placeBet(1, BET_AMOUNT_C);
        flowDAB.placeBet(2, BET_AMOUNT_B);
        flowDAB.placeBet(3, BET_AMOUNT_D);
        flowDAB.placeBet(5, BET_AMOUNT_A);
        vm.stopPrank();

        vm.startPrank(i_UserD);
        flowDAB.placeBet(1, BET_AMOUNT_D);
        flowDAB.placeBet(2, BET_AMOUNT_C);
        flowDAB.placeBet(3, BET_AMOUNT_B);
        flowDAB.placeBet(5, BET_AMOUNT_A);
        vm.stopPrank();

        _;
    }

    function test_PlaceBet() public _betSetup {
        console2.log("Bets placed");
    }

    function test_submitWinningProjects() public _betSetup {
        uint256[] memory winningProjects = new uint256[](2);
        winningProjects[0] = 0;
        winningProjects[1] = 2;
        flowDAB.submitWinningProjects(winningProjects);

        console2.log("Winning projects submitted");
        uint256 winnerPerProject = flowDAB.s_winningAmountPerProject();
        assertEq(winnerPerProject, (95000 * 1e18 * 1e6));
    }

    function test_claimWinnings() public _betSetup {
        uint256 balanceBefore = usdc.balanceOf(i_UserA);

        vm.startPrank(i_UserA);
        flowDAB.claimWinnings();
        vm.stopPrank();

        uint256 balanceAfter = usdc.balanceOf(i_UserA);

        assertEq(balanceAfter, balanceBefore + 95000 * 1e18 * 1e6);
    }
}
