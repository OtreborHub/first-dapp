const UtilLib = artifacts.require("UtilLib");
const TestContract = artifacts.require("TestContract");

module.exports = function (deployer) {
  deployer.deploy(UtilLib);
  deployer.link(UtilLib, TestContract);
  deployer.deploy(TestContract);
};