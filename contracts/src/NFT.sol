pragma solidity 0.8.25;

import {ERC721} from "solmate/tokens/ERC721.sol";

contract NFT is ERC721 {
    event ReceivedMessage(uint32 _origin, bytes32 _sender, uint256 _value, string _data);

    constructor() ERC721("DAB", "DAB") {}

    // alignment preserving cast
    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external payable virtual override {
        address sender = bytes32ToAddress(_sender);
        uint256 totalAmt = abi.decode(_data, (uint256));

        emit ReceivedMessage(_origin, _sender, msg.value, string(_data));
    }
}
