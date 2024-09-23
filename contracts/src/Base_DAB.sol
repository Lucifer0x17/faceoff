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
import {IMailbox} from "./interfaces/IMailbox.sol";

import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";

contract Base_DAB is IEntropy {
    using FixedPointMathLib for uint256;

    error DAB_InvalidBetAmount();
    error DAB_TransferFailed();
    error DAB_InvalidFeeAmount();
    error DAB_InvalidWinnersLength();

    event DAB_Played();
    event DAB_BetPlaced(uint256 projectId, address bettor, uint256 _pooledAmt);
    event DAB_NFTMintInitialised(address bettor);

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

    struct CrossChainDetails {
        uint32 destinationChainId;
        address destinationChainAddress;
        address sourceMailbox;
    }

    uint32 public constant FEE_AMOUNT = 1_00_000;
    uint32 public constant BET_AMOUNT = 1_000_000;
    address public constant CADENCE_ARCH = 0x0000000000000000000000010000000000000001;
    address public immutable i_USDC;
    address public constant ENTROPY_ADDRESS = 0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c;

    mapping(uint256 projectId => Project) public s_projects;
    mapping(address bettor => Bettor) public s_bettors;
    mapping(uint256 chainId => CrossChainDetails) public s_crossChainDetails;

    uint256 public s_totalNoOfProjects;
    uint256 public s_totalNoOfWinningProjects;
    uint256 public s_winningAmountPerProject;
    uint256 public s_destinationChainId;

    uint256[] public s_winnningProjects;

    ProjectItem[] public s_topProjects;

    IEntropy entropy = IEntropy(ENTROPY_ADDRESS);

    constructor(address _USDC, uint256 _s_totalNoOfProjects) {
        i_USDC = _USDC;
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

    function setDestinationChainId(uint256 _destinationChainId) public {
        s_destinationChainId = _destinationChainId;
    }

    function setCrossChainDetails(
        uint32 _destinationChainId,
        address _destinationChainAddress,
        address _sourceMailboxAddress
    ) public {
        s_crossChainDetails[_destinationChainId] =
            CrossChainDetails(_destinationChainId, _destinationChainAddress, _sourceMailboxAddress);
    }

    function getAllProjects() public view returns (ProjectItem[] memory) {
        ProjectItem[] memory projects = new ProjectItem[](s_totalNoOfProjects);

        for (uint256 i = 0; i < s_totalNoOfProjects; i++) {
            projects[i] = ProjectItem(i, s_projects[i].totalCollectedAmt);
        }

        return projects;
    }

    function getTopProjects(uint256 _noOfProjects) public returns (ProjectItem[] memory) {
        ProjectItem[] memory projects = new ProjectItem[](_noOfProjects);

        // Populate the array with project IDs and their amounts
        for (uint256 i = 0; i < _noOfProjects; i++) {
            projects[i] = ProjectItem(i, s_projects[i].totalCollectedAmt);
        }

        // Sort the array based on totalCollectedAmt in descending order
        for (uint256 i = 0; i < _noOfProjects; i++) {
            for (uint256 j = i + 1; j < _noOfProjects; j++) {
                if (projects[i].totalCollectedAmt < projects[j].totalCollectedAmt) {
                    // Swap
                    ProjectItem memory temp = projects[i];
                    projects[i] = projects[j];
                    projects[j] = temp;
                }
            }
        }

        // Retrieve the top 10 projects
        uint256 topProjectsCount = _noOfProjects < _noOfProjects ? _noOfProjects : _noOfProjects;
        ProjectItem[] memory topProjects = new ProjectItem[](topProjectsCount);
        for (uint256 i = 0; i < topProjectsCount; i++) {
            topProjects[i] = projects[i];
        }

        for (uint256 i = 0; i < _noOfProjects; i++) {
            s_topProjects.push(projects[i]);
        }

        return topProjects;
    }

    function playSlot() external returns (uint64, uint64, uint64) {
        _collectFee();

        emit DAB_Played();

        return (
            randomNumber(bytes32(block.timestamp)),
            randomNumber(bytes32(block.timestamp)),
            randomNumber(bytes32(block.timestamp))
        );
    }

    function placeBet(uint256 _projectId, uint256 _betAmt) external payable checkBetAmount(_betAmt) {
        address bettor = msg.sender;

        _transferFundsToEscrow(_betAmt);

        s_projects[_projectId].totalCollectedAmt += _betAmt;
        s_projects[_projectId].bettors.push(bettor);

        s_bettors[bettor].total_pooledAmt += _betAmt;
        s_bettors[bettor].pooledAmts[_projectId] += _betAmt;
        s_bettors[bettor].proportions[_projectId] = _calculateProportion(_projectId, bettor);

        emit DAB_BetPlaced(_projectId, bettor, _betAmt);
    }

    function contains(uint256[] memory array, uint256 value) internal pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

    function getEntropy() internal view returns (address) {
        return address(entropy);
    }

    function entropyCallback(
        uint64 sequenceNumber,
        // If your app uses multiple providers, you can use this argument to
        // distinguish which one is calling the app back.
        address provider,
        bytes32 randomNumber
    ) internal {
        // Implement your callback logic here.
    }

    function claimWinnings() public {
        ProjectItem[] memory topProjects = s_topProjects;

        for (uint256 i = 0; i < s_totalNoOfWinningProjects; i++) {
            if (contains(s_winnningProjects, topProjects[i].projectId)) {
                for (uint256 j = 0; j < s_projects[topProjects[i].projectId].bettors.length; j++) {
                    address bettor = s_projects[topProjects[i].projectId].bettors[j];
                    uint256 proportion = s_bettors[bettor].proportions[topProjects[i].projectId];
                    uint256 winAmount = FixedPointMathLib.divWadDown(
                        proportion * s_winningAmountPerProject, (100 * FixedPointMathLib.WAD)
                    );
                    uint256 pooledAmt = s_bettors[bettor].pooledAmts[topProjects[i].projectId];

                    uint256 finalWinAmount = winAmount + pooledAmt;

                    (bool success,) = i_USDC.call(
                        abi.encodeWithSignature(
                            "transferFrom(address,address,uint256)", address(this), bettor, finalWinAmount
                        )
                    );

                    if (!success) {
                        revert DAB_TransferFailed();
                    }

                    if (winAmount > 0) {
                        mintCrossChainNFT(winAmount, s_destinationChainId);
                    }
                }
            }
        }
    }

    function submitWinningProjects(uint256[] calldata _projectIds) external {
        uint256 _noOfWinningProjects = _projectIds.length;

        for (uint256 i = 0; i < _noOfWinningProjects; i++) {
            s_winnningProjects.push(_projectIds[i]);
        }
        s_totalNoOfWinningProjects = _noOfWinningProjects;

        ProjectItem[] memory topProjects = getTopProjects(_noOfWinningProjects);

        uint256 totalAmtForDistribution = 0;

        for (uint256 i = 0; i < _noOfWinningProjects; i++) {
            if (!contains(s_winnningProjects, (s_topProjects[i].projectId))) {
                totalAmtForDistribution += topProjects[i].totalCollectedAmt;
            }
        }

        for (uint256 i = _noOfWinningProjects; i < s_totalNoOfProjects; i++) {
            totalAmtForDistribution += s_projects[i].totalCollectedAmt;
        }

        // 50% for Devs and 50% for Bidders
        totalAmtForDistribution = totalAmtForDistribution / 2;

        s_winningAmountPerProject = FixedPointMathLib.divWadDown(totalAmtForDistribution, _noOfWinningProjects);
    }

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

    function randomNumber(bytes32 _input) public view returns (uint64) {
        address provider = entropy.getDefaultProvider();

        uint256 fee = entropy.getFee(provider);
        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(provider, _input);

        return sequenceNumber;
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

    function mintCrossChainNFT(uint256 _totalAmt, uint256 _destinationChainId) private {
        CrossChainDetails memory crossChainDetails = s_crossChainDetails[_destinationChainId];

        bytes32 recipient = addressToBytes32(crossChainDetails.destinationChainAddress);
        bytes memory body = abi.encodePacked(_totalAmt);
        address mailbox = crossChainDetails.sourceMailbox;
        uint32 destinationChainId = crossChainDetails.destinationChainId;

        uint256 fee = IMailbox(mailbox).quoteDispatch(destinationChainId, recipient, body);

        IMailbox(mailbox).dispatch{value: fee}(destinationChainId, recipient, body);

        emit DAB_NFTMintInitialised(msg.sender);
    }

    // alignment preserving cast
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }
}
