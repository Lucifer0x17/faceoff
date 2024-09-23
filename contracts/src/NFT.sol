pragma solidity 0.8.25;

import {ERC721} from "solmate/tokens/ERC721.sol";

contract NFT is ERC721 {
    event ReceivedMessage(uint32 _origin, bytes32 _sender, uint256 _value, string _data);

    constructor() ERC721("DAB", "DAB") {}

    function mint(address _to, uint256 _tokenId) public {
        _ownerOf[_tokenId] = _to;
        _balanceOf[_to]++;
        emit Transfer(address(0), _to, _tokenId);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return
        "https://harlequin-occasional-lobster-427.mypinata.cloud/ipfs/QmW3E7h2KXFUcg2drThSVLoh5FsPd71LezQQaSPD7V6e4d";
    }

    // alignment preserving cast
    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external payable virtual {
        address sender = bytes32ToAddress(_sender);
        uint256 totalAmt = abi.decode(_data, (uint256));

        emit ReceivedMessage(_origin, _sender, msg.value, string(_data));
    }
}
