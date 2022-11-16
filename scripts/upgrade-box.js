// Manual way
const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    // proxyBoxV1 has the abi of Box, but the address of BoxProxy
    // Whenever we use it, it will call the proxy,
    // which will delegatecall to Box
    const proxyBoxV1 = await ethers.getContractAt(
        "Box",
        transparentProxy.address
    )

    let version = await proxyBoxV1.version()
    console.log(`Current Box contract version is: ${version.toString()}`)

    const boxV2 = await ethers.getContract("BoxV2")

    console.log("Upgrading Box contract...")
    // Calling upgrade() on BoxProxyAdmin,
    // which in turn calls upgradeTo() from BoxProxy
    const upgradeTx = await boxProxyAdmin.upgrade(
        transparentProxy.address,
        boxV2.address
    )
    await upgradeTx.wait(1)

    console.log("Box contract updated!")

    const proxyBoxV2 = await ethers.getContractAt(
        "BoxV2",
        transparentProxy.address
    )

    version = await proxyBoxV2.version()
    console.log(`Current Box contract version is: ${version.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
