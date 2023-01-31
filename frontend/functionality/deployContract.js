const address = "";
const sourceCode = "";

// async function readFile(path) {
//   const code = readFileSync(path,'utf8');

// }

async function compile(code) {
  var input = {
    language: "Solidity",
    sources: {
      "file.sol": {
        content: code,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  /// getting out the contract file.sol
  for (var contractName in output.contracts["file.sol"]) {
    // preparing the response
    var response = {
      abi: output.contracts["file.sol"][contractName].abi, /// get the abi
      bytecode: `0x${output.contracts["file.sol"][contractName].evm.bytecode.object}`, // get the bytecode
    };
    return response;
  }
}

async function deploy(bytecode) {
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: address,
          gas: "0x2DC6C0",
          data: bytecode,
        },
      ],
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deployContract() {
  const data = await compile(sourceCode);
  console.log(data);

  const txData = await deploy(data.bytecode);
  console.log(txData);
}
