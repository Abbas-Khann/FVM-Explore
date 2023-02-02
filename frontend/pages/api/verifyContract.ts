// send in the ContractData as

type contractDataType = {
  name: string;
  address: string;
  deployer: string;
  abi: any[];
  bytecode: string;
  code: any;
};

import { Registery_ABI, Registery_address } from "@/constants/constants";
import { storeContract } from "@/functionality/storeData";
import { Contract, Wallet, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const RPC_LINK = process.env.NEXT_PUBLIC_RPC_URL;

async function verifyContract(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.contractData) {
    return res.status(400).json({ message: "Contract Data required" });
  }

  const contractData: contractDataType = req.body.contractData;

  if (!contractData) {
    return res.status(400).json({ message: "Check contract Data Again" });
  }

  try {
    const CID = await storeContract(contractData);
    const IPFSURL = `https://w3s.link/ipfs/${CID}`;
    console.log(IPFSURL);
    // setIpfsLink(IPFSURL);

    /// Store the IPFS link somewhere

    const provider = new ethers.providers.JsonRpcProvider(RPC_LINK);
    const manager_wallet = new Wallet(private_key, provider);
    const registery_contract = new Contract(
      Registery_address,
      Registery_ABI,
      manager_wallet
    );

    const tx = await registery_contract.addContractRecord(
      contractData.address,
      IPFSURL
    );

    await tx.wait();
    console.log("Record Added in the registery");

    /// Record of the tx with the txHash
    res.status(200).json({ output: tx });
  } catch (error) {
    res.status(400).json({ output: error });
    console.log(error);
  }
}

export default verifyContract;
