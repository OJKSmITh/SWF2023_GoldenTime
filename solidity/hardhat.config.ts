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
            accounts: require("./accounts.json").privateKey,
            chainId: 11155111,
            gas: 20000000,
            gasPrice: 25000000000,
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

