//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9 ;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldenTime is ERC721URIStorage, Ownable {
    uint256 private _tokenId = 0;

    constructor() ERC721("AmbulanceToken", "AMBT") {}

    mapping(uint256 => address[]) private HospitalLists;
    mapping(uint256 => address) private chosen;

    mapping(address => bool) private Hospital;
    mapping(address => bool) private ambulance;

    event Minted(
        string toInfo,
        uint256 tokenId
    );

    event Emergency(
        uint level,
        uint age,
        uint gender,
        string state,
        uint timestamp,
        uint _tokenId
    );

    event Choice(
        uint256 tokenId,
        address _hospital
    );

    event HospitalList(
        uint256 tokenId,
        address _hospital,
        bool state,
        string reason
    );

    function occurs(
        uint level,
        uint age,
        uint gender,
        string memory state
    ) public {
        // require(checkAmbAddress(msg.sender),"Not a licensed ambulance");

        emit Emergency(level, age, gender, state, block.timestamp, _tokenId);
        mint(state);
    }

    function mint(string memory toInfo) public {
        // require(checkAmbAddress(msg.sender),"Not a licensed ambulance");

        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, toInfo);
        emit Minted(toInfo, _tokenId);
        _tokenId++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function received(uint256 tokenId, address _hospital) public {
        // require(checkHospitalAddress(msg.sender),"Not a licensed hospital");

        HospitalLists[tokenId].push(_hospital);
        emit HospitalList(tokenId, _hospital, true, "accept");
    }

    function reject(uint256 tokenId, address _hospital, string memory reason) public {
        emit HospitalList(tokenId, _hospital, false, reason);
    }

    function getHospitalList(uint256 key) external view returns (address[] memory) {
        uint256 count = HospitalLists[key].length;
        address[] memory clone = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            clone[i] = HospitalLists[key][i];
        }
        return clone;
    }

    function choice (uint256 tokenId, address _hospital) public {
        // require(checkAmbAddress(msg.sender),"Not a licensed ambulance");
        chosen[tokenId] = _hospital;

        emit Choice(tokenId, _hospital);
    }

    function setAmb (address _amb) public onlyOwner{
        ambulance[_amb] = true;
    }

    function setHospital (address _hospital) public onlyOwner{
        Hospital[_hospital] = true;
    }

    function checkAmbAddress (address _amb) public view returns(bool){
        return ambulance[_amb];
    }

    function checkHospitalAddress (address _hospital) public view returns(bool){
        return ambulance[_hospital];
    }

    function getList () public view returns(string[] memory){
        if(_tokenId < 20){
            string[] memory uris = new string[](_tokenId);
            for(uint256 i = 0; i < _tokenId; i++){
                uris[i] = tokenURI(i);
            }
            return uris;
        } else {
            string[] memory uris = new string[](20);
            for(uint256 i = _tokenId - 20; i < _tokenId; i++){
                uris[i] = tokenURI(i);
            }
            return uris;
        }
    }
}