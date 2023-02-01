import { Web3Storage } from "web3.storage";

const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const StoreContent = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files, {
    wrapWithDirectory: false,
  });
  console.log("stored files with cid:", cid);
  return cid;
};
