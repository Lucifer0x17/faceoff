// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import {ERC20} from "solmate/tokens/ERC20.sol";
// import {Plugin} from "token-plugins/Plugin.sol";
// import {IERC20Plugins} from "token-plugins/interfaces/IERC20Plugins.sol";
// import {IParticipationPlugin} from "./interfaces/IReputationPlugin.sol";
// import "forge-std/console.sol";

// contract ReputationPlugin is IReputationPlugin, Plugin, ERC20 {
//     error ApproveDisabled();
//     error TransferDisabled();

//     mapping(address => mapping(address => uint256)) public vouched;

//     constructor(string memory name_, string memory symbol_, IERC20Plugins token_)
//         ERC20(name_, symbol_)
//         Plugin(token_)
//     {} // solhint-disable-line no-empty-blocks

//     function vouch(address vouchee, uint256 amount) public virtual {
//         require(vouchee != msg.sender, "Cannot vouch for yourself!");

//         uint256 senderBalance = IERC20Plugins(token).pluginBalanceOf(address(this), msg.sender);
//         uint256 receiverBalance = IERC20Plugins(token).pluginBalanceOf(address(this), vouchee);

//         require(receiverBalance + amount <= 1000, "Choose lower amount. Score Cap Reached!");

//         if (senderBalance >= amount) {
//             _updateBalances(msg.sender, vouchee, amount);
//         }

//         vouched[msg.sender][vouchee] += amount;
//         emit Vouched(msg.sender, vouchee, amount);
//     }

//     function vouchFrom(address from, address to, uint256 amount) public virtual {
//         require(vouched[msg.sender][from] >= amount, "Not enough vouching power!");
//         require(to != msg.sender, "Cannot vouch for yourself!");

//         uint256 receiverBalance = IERC20Plugins(token).pluginBalanceOf(address(this), to);
//         require(receiverBalance + amount <= 1000, "Choose lower amount. Score Cap Reached!");

//         vouched[msg.sender][from] -= amount;
//         vouched[msg.sender][to] += amount;
//         emit Vouched(msg.sender, to, amount);

//         _updateBalances(from, to, amount);
//     }

//     function _updateBalances(address from, address to, uint256 amount) internal override {
//         _updateBalances(from, to, from == address(0) ? address(0) : from, to == address(0) ? address(0) : to, amount);
//     }

//     function _updateBalances(address, /* from */ address, /* to */ address from, address to, uint256 amount)
//         internal
//         virtual
//     {
//         console.log("Updating balances");
//         if (from != to && amount > 0) {
//             if (from == address(0)) {
//                 console.log("Minting %d to %s", amount, to);
//                 _mint(to, amount);
//             } else if (to == address(0)) {
//                 console.log("Burning %d from %s", amount, from);
//                 uint256 minOf = amount < balanceOf(from) ? amount : balanceOf(from);
//                 _burn(from, minOf);
//             } else {
//                 console.log("Transferring %d from %s to %s", amount, from, to);
//                 _transfer(from, to, amount);
//             }
//         }
//     }

//     // ERC20 overrides

//     function transfer(address, /* to */ uint256 /* amount */ ) public pure override(IERC20, ERC20) returns (bool) {
//         revert TransferDisabled();
//     }

//     function transferFrom(address, /* from */ address, /* to */ uint256 /* amount */ )
//         public
//         pure
//         override(IERC20, ERC20)
//         returns (bool)
//     {
//         revert TransferDisabled();
//     }

//     function approve(address, /* spender */ uint256 /* amount */ ) public pure override(ERC20, IERC20) returns (bool) {
//         revert ApproveDisabled();
//     }

//     // function increaseAllowance(address /* spender */, uint256 /* addedValue */) public pure override returns (bool) {
//     //     revert ApproveDisabled();
//     // }

//     // function decreaseAllowance(address /* spender */, uint256 /* subtractedValue */) public pure override returns (bool) {
//     //     revert ApproveDisabled();
//     // }
// }
