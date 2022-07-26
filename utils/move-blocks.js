const { network } = require("hardhat")

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function moveBlocks(amount, sleepAmount = 0) {
    console.log("Moving block...")
    for (let index = 0; index < amount; index++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        })
        if (sleepAmount) {
            console.log(`Sleeping for ${sleepAmount} seconds`)
            await sleep(sleepAmount)
        }
    }
}

module.exports = {
    moveBlocks,
    sleep,
}
