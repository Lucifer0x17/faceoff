// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import {ERC20} from "solmate/tokens/ERC20.sol";
// import {ERC20Plugins} from "token-plugins/ERC20Plugins.sol";

// contract BetToken is ERC20Plugins {
//     constructor(string memory name, string memory symbol, uint256 maxPluginsPerAccount, uint256 pluginCallGasLimit)
//         ERC20(name, symbol, 18)
//         ERC20Plugins(maxPluginsPerAccount, pluginCallGasLimit)
//     {} // solhint-disable-line no-empty-blocks

//     function mint(address account, uint256 amount) external {
//         _mint(account, amount);
//     }

//     function burn(address account, uint256 amount) external {
//         _burn(account, amount);
//     }
// }
