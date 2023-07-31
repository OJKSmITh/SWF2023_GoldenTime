//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AMB is ERC721URIStorage {
    uint256 private _tokenId = 0;
    uint256 private patientLevel;
    uint256 private patientAge;
    uint256 private patientSex;

    constructor() ERC721("AmbulanceToken", "AMBT") {}

    event Minted(
        string toInfo,
        uint256 patientAge,
        uint256 patientLevel,
        uint256 patientSex,
        uint256 tokenId
    );
    event Emergency(
        uint level,
        uint age,
        uint sex,
        string state,
        uint timestamp
    );

    function occurs(
        uint level,
        uint age,
        uint sex,
        string memory state
    ) public {
        patientLevel = level;
        patientAge = age;
        patientSex = sex;
        emit Emergency(level, age, sex, state, block.timestamp);
        mint("test");
    }

    function mint(string memory toInfo) public returns (uint256) {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, toInfo);
        emit Minted(toInfo, patientAge, patientLevel, patientSex, _tokenId);
        _tokenId++;
        return _tokenId;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    //갈병원 지정한다.(환자 받을 준비할 수 있도록)
    function connect(address _address) public {}

    //가지 않을 병원에는 안간다는 의사를 보여줘야한다. (준비안하게)
    function disconnect(address _address) public {}
}
