// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract BasicUSDC is ERC20 {
    constructor() ERC20("Basic USDC", "USDC", 6) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
