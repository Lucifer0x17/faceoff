// error
// event
// struct
// constants
// state variables
// constructor
// modifier
// write functions
// read functions

// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";

contract DAB {
    using FixedPointMathLib for uint256;

    error DAB_InvalidBetAmount();
    error DAB_TransferFailed();
    error DAB_InvalidFeeAmount();
    error DAB_InvalidWinnersLength();

    event DAB_Played();
    event DAB_BetPlaced(uint256 projectId, address bettor, uint256 _pooledAmt);

    struct Bettor {
        uint256 total_pooledAmt;
        mapping(uint256 projectId => uint256 _pooledAmt) pooledAmts;
        mapping(uint256 projectId => uint256 _proportion) proportions;
    }

    struct Project {
        uint256 projectId;
        uint256 totalCollectedAmt;
        address[] bettors;
    }

    struct ProjectItem {
        uint256 projectId;
        uint256 totalCollectedAmt;
    }

    uint32 public constant FEE_AMOUNT = 1_00_000;
    uint32 public constant BET_AMOUNT = 1_000_000;

    address public immutable i_USDC;
    address public immutable i_BET;

    mapping(uint256 projectId => Project) public s_projects;
    mapping(address bettor => Bettor) public s_bettors;

    uint256 public s_totalNoOfProjects;
    uint256 public s_totalNoOfWinningProjects;

    constructor(address _USDC, address _BET, uint256 _s_totalNoOfProjects) {
        i_USDC = _USDC;
        i_BET = _BET;
        s_totalNoOfProjects = _s_totalNoOfProjects;
    }

    modifier checkBetAmount(uint256 _betAmt) {
        if (_betAmt < BET_AMOUNT) {
            revert DAB_InvalidBetAmount();
        }
        _;
    }

    modifier checkFeeAmount(uint256 _playAmt) {
        if (_playAmt < FEE_AMOUNT) {
            revert DAB_InvalidFeeAmount();
        }
        _;
    }

    modifier checkWinnersLength(uint256[] calldata _projectIds) {
        if (_projectIds.length != s_totalNoOfWinningProjects) {
            revert DAB_InvalidWinnersLength();
        }
        _;
    }

    function getAllProjects() public view returns (ProjectItem[] memory) {
        ProjectItem[] memory projects = new ProjectItem[](s_totalNoOfProjects);

        for (uint256 i = 0; i < s_totalNoOfProjects; i++) {
            projects[i] = ProjectItem(i, s_projects[i].totalCollectedAmt);
        }

        return projects;
    }

    function getTopProjects(uint256 _noOfProjects) public returns (ProjectItem[] memory) {
        s_totalNoOfWinningProjects = _noOfProjects;
        ProjectItem[] memory projects = new ProjectItem[](s_totalNoOfProjects);

        // Populate the array with project IDs and their amounts
        for (uint256 i = 0; i < s_totalNoOfProjects; i++) {
            projects[i] = ProjectItem(i, s_projects[i].totalCollectedAmt);
        }

        // Sort the array based on totalCollectedAmt in descending order
        for (uint256 i = 0; i < s_totalNoOfProjects; i++) {
            for (uint256 j = i + 1; j < s_totalNoOfProjects; j++) {
                if (projects[i].totalCollectedAmt < projects[j].totalCollectedAmt) {
                    // Swap
                    ProjectItem memory temp = projects[i];
                    projects[i] = projects[j];
                    projects[j] = temp;
                }
            }
        }

        // Retrieve the top 10 projects
        uint256 topProjectsCount = s_totalNoOfProjects < _noOfProjects ? s_totalNoOfProjects : _noOfProjects;
        ProjectItem[] memory topProjects = new ProjectItem[](topProjectsCount);
        for (uint256 i = 0; i < topProjectsCount; i++) {
            topProjects[i] = projects[i];
        }

        return topProjects;
    }

    function playSlot() external payable {
        _collectFee();

        emit DAB_Played();
    }

    function placeBet(uint256 _projectId, uint256 _betAmt) external payable checkBetAmount(_betAmt) {
        address bettor = msg.sender;

        _transferFundsToEscrow(_betAmt);

        (bool success,) = i_BET.call(abi.encodeWithSignature("mint(address,uint256)", bettor, FEE_AMOUNT));

        if (!success) {
            revert DAB_TransferFailed();
        }

        s_projects[_projectId].totalCollectedAmt += _betAmt;
        s_projects[_projectId].bettors.push(bettor);

        s_bettors[bettor].total_pooledAmt += _betAmt;
        s_bettors[bettor].pooledAmts[_projectId] += _betAmt;
        s_bettors[bettor].proportions[_projectId] = _calculateProportion(_projectId, bettor);

        s_totalNoOfProjects += 1;

        emit DAB_BetPlaced(_projectId, bettor, _betAmt);
    }

    function submitWinningProjects(uint256[] calldata _projectIds) external checkWinnersLength(_projectIds) {}

    function getBettorsForProject(uint256 _projectId) external view returns (address[] memory) {
        return s_projects[_projectId].bettors;
    }

    function _collectFee() private {
        address bettor = msg.sender;

        (bool success,) = i_USDC.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", bettor, address(this), FEE_AMOUNT)
        );

        if (!success) {
            revert DAB_TransferFailed();
        }
    }

    function _transferFundsToEscrow(uint256 _betAmt) private {
        address bettor = msg.sender;

        (bool success,) = i_USDC.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", bettor, address(this), _betAmt)
        );

        if (!success) {
            revert DAB_TransferFailed();
        }
    }

    function _getPooledAmountForBettor(uint256 _projectId, address _bettor) private view returns (uint256) {
        return s_bettors[_bettor].pooledAmts[_projectId];
    }

    function _getTotalCollectedAmountForProject(uint256 _projectId) private view returns (uint256) {
        return s_projects[_projectId].totalCollectedAmt;
    }

    function _calculateProportion(uint256 _projectId, address _bettor) private view returns (uint256) {
        uint256 pooledAmt = _getPooledAmountForBettor(_projectId, _bettor);

        uint256 total_CollectedAmt = _getTotalCollectedAmountForProject(_projectId);

        uint256 proportion =
            FixedPointMathLib.divWadDown((pooledAmt * 100), (total_CollectedAmt * FixedPointMathLib.WAD));

        return proportion;
    }

    function claimWinnings(uint256 _noOfWinningProjects) external {
        uint256 winningAmount = 0;
        address bettor = msg.sender;

        for (uint256 i = s_totalNoOfWinningProjects; i < s_totalNoOfProjects; i++) {
            winningAmount += s_projects[i].totalCollectedAmt;
        }

        uint256 winningAmountPerProject = winningAmount / s_totalNoOfWinningProjects;

        ProjectItem[] memory topProjects = getTopProjects(_noOfWinningProjects);

        uint256 finalWinAmount = 0;

        for (uint256 i = 0; i < topProjects.length; i++) {
            finalWinAmount += s_bettors[bettor].proportions[topProjects[i].projectId]
                * (winningAmountPerProject + s_projects[i].totalCollectedAmt);
        }

        (bool success,) = i_USDC.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", address(this), bettor, finalWinAmount)
        );

        if (!success) {
            revert DAB_TransferFailed();
        }
    }
}
