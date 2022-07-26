const { deployments, getNamedAccounts, network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------")
    const args = []
    const box = await deploy("Box", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    if (!network.config.chainId == "31337" && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(box.address, args)
    }
}
