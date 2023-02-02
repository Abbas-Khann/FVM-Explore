async function verifyContract(
  contractName: string,
  output: { abi: any[], bytecode: string }
) {
  /// store the contract info on the Web3.storage and add the data , CID to a Contract or Web2 Database
  if (!output && !contractAddress) {
    console.log("Compile & Deploy the Contract first");
    return;
  }

  const contractData = {
    name: contractName,
    address: contractAddress,
    abi: output?.abi,
    bytecode: output?.bytecode,
    deployer: address,
  };

  const CID = await storeContract(contractData);
  const IPFSURL = `https://w3s.link/ipfs/${CID}`;
  console.log(IPFSURL);
  // setIpfsLink(IPFSURL);

  /// Store the IPFS link somewhere
  const manager_wallet = new Wallet(private_key, provider);
  const registery_contract = new Contract(
    Registery_address,
    Registery_ABI,
    manager_wallet
  );

  const tx = await registery_contract.addContractRecord(
    contractAddress,
    IPFSURL
  );

  await tx.wait();

  console.log(tx);

  console.log("Record Added in the registery");
}
