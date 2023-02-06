## HOW to use APIs ??

--> These are REST APIs , so you can use any method to call the certain API urls

Endpoints :

### Compile

=> ` _/api/compile_` : Compiler to compile the code

Add the Solidity Code as Source Code

```bash
const response = await fetch("./api/compile", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ sourceCode }),
});
```

Reponse object can be parsed in the following way

```bash
const formattedResponse = (await response.json()).output;

// formattedReponse = {abi: contractABI , bytecode : contractBytecode}
```

### Verify

=> `_/api/verifyContract_` Verifier to verify the contract code

- Prepare the Contract Data object as Follows

```bash
  const contractData = {
  name: contractName,
  address: contractAddress,
  deployer: address,
  abi: contractAbi,
  bytecode: contractbytecode,
  code: sourceCode,
  };
```

```bash
const response = await fetch("./api/verifyContract", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ contractData }),
});
```

the Response object will have the transaction info , which can be parsed as follow

```bash
const formattedResponse = (await response.json()).output;

//formattedResponse = tx

```

### Get ContractData

=> `_ /api/searchContract ` Get ContractData for the contract

Send the contractAddress with the API Calls in the backend

```bash
const response = await fetch("./api/searchContract", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ contractAddress }),
});
```

The response object will have contractData , which can be parsed again with

```bash
const formattedResponse = (await response.json()).output;

//formattedResponse = {
name: contractName,
address: contractAddress,
deployer: address,
abi: contractAbi,
bytecode: contractbytecode,
code: sourceCode,
};

```

### NOTE

--> No access Code is required for any API Call
