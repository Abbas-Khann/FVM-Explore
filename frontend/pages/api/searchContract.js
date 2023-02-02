import { Contract, Wallet, ethers } from "ethers";
import { Registery_ABI, Registery_address } from "@/constants/constants";
const RPC_LINK = process.env.NEXT_PUBLIC_RPC_URL;

// Response from the API
// type contractDataType = {
//   name: string,
//   address: string,
//   deployer: string,
//   abi: any[],
//   bytecode: string,
//   code: any,
// };

async function searchContract(req, res) {
  if (!req.body.contractAddress) {
    return res.status(400).json({ message: "Contract Data required" });
  }

  const address = req.body.contractAddress;

  const provider = new ethers.providers.JsonRpcProvider(RPC_LINK);

  const registery_contract = new Contract(
    Registery_address,
    Registery_ABI,
    provider
  );

  try {
    const response = await registery_contract.getContractRecord(address);
    // console.log(response);
    if (!response) {
      console.log("Contract does not exist");
      res
        .status(400)
        .json({ output: "Contract is not verified , verify First" });
    }
    const ipfsURL = response;
    const contractData = await (await fetch(ipfsURL)).json();
    // console.log(contractData);

    if (!contractData) {
      res.status(400).json({ output: "Contract data not found " });
    }

    res.status(200).json({ output: contractData });
  } catch (error) {
    res.status(400).json({ output: error });
    console.log(error);
  }
}

export default searchContract;
