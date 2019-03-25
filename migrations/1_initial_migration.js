const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

// Para Alastria
/*
module.exports = function(deployer, network, accounts) {
  web3.personal.unlockAccount("0x994319e1b1de09aac4aa5b225a7d5cade79d04ed", "Alumnos_2018_Q4_IKx5srvT");
  deployer.deploy(Migrations, {from:"0x994319e1b1de09aac4aa5b225a7d5cade79d04ed"});
};
*/
