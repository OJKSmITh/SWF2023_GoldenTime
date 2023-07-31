import { ethers } from "hardhat";

const deploy = async () => {
    const contract = await ethers.getContractFactory("GoldenTime");
    const goldenTime = await contract.deploy();

    await goldenTime.deployed();

    console.log("goldenTime", goldenTime.address);
};

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
