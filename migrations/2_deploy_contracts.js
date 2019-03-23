const PlataformaTokens = artifacts.require("PlataformaTokens");

module.exports = function(deployer) {
  deployer.deploy(PlataformaTokens);
};
