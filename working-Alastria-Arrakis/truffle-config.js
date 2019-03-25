
module.exports = {

  networks: {

     ganache: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

	   localAlastria: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 22001,            // general 1
      network_id: "*",       // Any network (default: none)
      gasPrice:0,
      gas: 4500000
     },

     alastria: {
       host: "138.4.143.82",
       port: 8545,
       network_id: "*",       // Any network (default: none)
       from: "0x994319e1b1de09aac4aa5b225a7d5cade79d04ed",
       gasPrice:0,
       gas: 4500000
     }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
