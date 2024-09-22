// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "solmate/tokens/ERC20.sol";
import {Plugin} from "token-plugins/Plugin.sol";
import {IERC20Plugins} from "token-plugins/interfaces/IERC20Plugins.sol";
import {IXPPlugin} from "./interfaces/IXPPlugin.sol";
import "forge-std/console.sol";

contract XPPlugin is IXPPlugin, Plugin, ERC20 {
    error ApproveDisabled();
    error TransferDisabled();

    struct Tier {
        uint256 threshold;
        uint256 rewardRate;
    }

    Tier[] public tiers;
    mapping(address => uint256) public lastUpdateTime;

    constructor(string memory name_, string memory symbol_, IERC20Plugins token_)
        ERC20(name_, symbol_)
        Plugin(token_)
    {
        tiers.push(Tier(100, 1));   // Bronze: 1% reward rate
        tiers.push(Tier(1000, 2));  // Silver: 2% reward rate
        tiers.push(Tier(10000, 3)); // Gold: 3% reward rate
    }

    function _updateBalances(address from, address to, uint256 amount) internal override {
        _updateBalances(from, to, from == address(0) ? address(0) : from, to == address(0) ? address(0) : to, amount);
    }

    function _updateBalances(address, /* from */ address, /* to */ address from, address to, uint256 amount)
        internal
        virtual
    {
        console.log("Updating balances");
        if (from != to && amount > 0) {
            if (from == address(0)) {
                console.log("Minting %d to %s", amount, to);
                _mint(to, amount);
            } else if (to == address(0)) {
                console.log("Burning %d from %s", amount, from);
                uint256 minOf = amount < balanceOf(from) ? amount : balanceOf(from);
                _burn(from, minOf);
            } else {
                console.log("Transferring %d from %s to %s", amount, from, to);
                _transfer(from, to, amount);
            }
        }

        if (from != address(0)) {
            _updateRewards(from);
        }
        if (to != address(0)) {
            _updateRewards(to);
        }
    }

    function getRewardRate(uint256 balance) public view returns (uint256) {
        for (uint i = tiers.length - 1; i >= 0; i--) {
            if (balance >= tiers[i].threshold) {
                return tiers[i].rewardRate;
            }
        }
        return 0;
    }

    function _updateRewards(address account) internal {
        uint256 balance = IERC20Plugins(token).pluginBalanceOf(address(this), msg.sender);
        uint256 lastTime = lastUpdateTime[account];

        uint256 timePassed = block.timestamp - lastTime;
        uint256 rewardRate = getRewardRate(balance);
        
        uint256 reward = (balance * rewardRate * timePassed) / 100 / 365 / 24 / 3600;
        _mint(account, reward);
        
        lastUpdateTime[account] = block.timestamp;
    }

    // ERC20 overrides

    function transfer(address, /* to */ uint256 /* amount */ ) public pure override(IERC20, ERC20) returns (bool) {
        revert TransferDisabled();
    }

    function transferFrom(address, /* from */ address, /* to */ uint256 /* amount */ )
        public
        pure
        override(IERC20, ERC20)
        returns (bool)
    {
        revert TransferDisabled();
    }

    function approve(address, /* spender */ uint256 /* amount */ ) public pure override(ERC20, IERC20) returns (bool) {
        revert ApproveDisabled();
    }

    // function increaseAllowance(address /* spender */, uint256 /* addedValue */) public pure override returns (bool) {
    //     revert ApproveDisabled();
    // }

    // function decreaseAllowance(address /* spender */, uint256 /* subtractedValue */) public pure override returns (bool) {
    //     revert ApproveDisabled();
    // }
}
