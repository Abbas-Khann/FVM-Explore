## HOW to use APIs ??

--> These are REST APIs , so you can use any method to call the certain API urls

Endpoints :

### Compile

=> **_/api/compile_** : Compiler to compile the code

Add the Solidity Code as Source Code
**_ const response = await fetch("./api/compile", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ sourceCode }),
}); _**

Reponse object can be parsed in the following way

\*\*\*
const formattedResponse = (await response.json()).output;

// formattedReponse = {abi: contractABI , bytecode : contractBytecode} \*\*\*

### Verify

=> **_/api/verifyContract_** Verifier to verify the contract code

- Prepare the Contract Data object as Follows
  **_
  const contractData = {
  name: contractName,
  address: contractAddress,
  deployer: address,
  abi: contractAbi,
  bytecode: contractbytecode,
  code: sourceCode,
  };
  _**

**_ const response = await fetch("./api/verifyContract", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ contractData }),
}); _**

the Response object will have the transaction info , which can be parsed as follow

\*\*\_ const formattedResponse = (await response.json()).output;

//formattedResponse = tx \_\*\*

### Get ContractData

=> **_ /api/searchContract _** Get ContractData for the contract

Send the contractAddress with the API Calls in the backend

**_ const response = await fetch("./api/searchContract", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ contractAddress }),
});_**

The response object will have contractData , which can be parsed again with

\*\*\_ const formattedResponse = (await response.json()).output;

//formattedResponse = {
name: contractName,
address: contractAddress,
deployer: address,
abi: contractAbi,
bytecode: contractbytecode,
code: sourceCode,
}; \_\*\*

### NOTE

--> No access Code is required for any API Call
