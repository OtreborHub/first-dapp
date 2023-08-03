module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8080,
      network_id: "5777"
    },
    loc_testvsganache_testvsganache: {
      host: "127.0.0.1",
      port: 8080,
      network_id: "*"
    }
  },
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.11"
    }
  }
};
