const solc = require("solc");

export default function handler(req, res) {
  if (!req.body.sourceCode) {
    return res.status(400).json({ message: "Input required" });
  }

  const code = req.body.sourceCode;

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
  //   console.log(output);

  // Error handling
  if (output.errors) {
    // console.log(output.errors);
    // console.log(output.errors[0].formattedMessage);

    res.status(400).json({ output: output.errors[0].formattedMessage });
  }

  var response;
  /// getting out the contract file.sol
  for (var contractName in output.contracts["file.sol"]) {
    // preparing the response on successFull compilation
    response = {
      abi: output.contracts["file.sol"][contractName].abi, /// get the abi
      bytecode: `0x${output.contracts["file.sol"][contractName].evm.bytecode.object}`, // get the bytecode
    };

    res.status(200).json({ output: response });
  }
}
