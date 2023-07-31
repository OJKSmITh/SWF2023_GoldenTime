import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        hardhat: {
            chainId: 1337,
            accounts: {
                mnemonic: "test test test test test test test test test test test junk",
            },
        },
        goerli: {
            url: "https://goerli.infura.io/v3/a489405bf8564256a8d2e3f99e1c1403",
            accounts: require("./accounts.json").privateKey,
            chainId: 5,
            gas: 20000000,
            gasPrice: 25000000000,
        },
        sepolia: {
            url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
            accounts: ["cb27d8183c54f7fbcece11313d75274048a4d8f54767db9a23ae294599cce431"],
            chainId: 11155111,
        },
        cronos: {
            url: "https://evm-t3.cronos.org/",
            chainId: 338,
            accounts: require("./accounts.json").privateKey,
            gasPrice: 5000000000000,
        },
    },
};

export default config;

