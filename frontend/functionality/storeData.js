import { Web3Storage } from "web3.storage";

const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const storeContract = async (obj) => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "contract.json")];
  console.log("Uploading the Contract data to IPFS via web3.storage");
  const client = makeStorageClient();
  const cid = await client.put(files, {
    wrapWithDirectory: false,
  });
  console.log("stored files with cid:", cid);
  return cid;
};
