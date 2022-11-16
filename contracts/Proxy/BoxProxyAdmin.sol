// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// Does upgrades, changes proxy admins, etc.
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract BoxProxyAdmin is ProxyAdmin {
    constructor(
        address /* owner */
    ) ProxyAdmin() {}
}
