// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPlugin} from "token-plugins/interfaces/IPlugin.sol";

interface IParticipationPlugin is IPlugin, IERC20 {
    event Vouched(address account, address vouchee, uint256 amount);

    function vouch(address vouchee, uint256 amount) external;
    function vouchFrom(address fromVouchee, address toVouchee, uint256 amount) external;
}
