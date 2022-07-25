require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
            blockConfirmations: 1,
            // ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
            gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
            callbackGasLimit: "500000", // 500,000 gas
            mintFee: "10000000000000000", // 0.01 ETH
            subscriptionId: "7108", // add your ID here!
            name: "Random IPFS NFT",
            symbol: "RIN",
        },
        localhost: {
            chainId: 31337,
        },
        rinkeby: {
            chainId: 4,
            blockConfirmations: 6,
            saveDeployments: true,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
            vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
            gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
            callbackGasLimit: "500000", // 500,000 gas
            mintFee: "10000000000000000", // 0.01 ETH
            subscriptionId: "7108", // add your ID here!
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            rinkeby: ETHERSCAN_API_KEY,
        },
    },
    mocha: {
        timeout: 300000, // 200 sec
    },
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
}
