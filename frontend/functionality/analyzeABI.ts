export type argType = {
  internalType: string;
  name: string;
  type: string;
};

export type functionType =
  | {
      anonymous?: undefined;
      inputs: argType[];
      name?: string;
      outputs?: argType[];
      stateMutability?: string;
      type: string;
    }
  | {
      inputs: { internalType: string; name: string; type: string }[];
      stateMutability: string;
      type: string;
      anonymous?: undefined;
      name?: undefined;
      outputs?: undefined;
    }
  | {
      anonymous: boolean;
      inputs: {}[];
      name: string;
      type: string;
      stateMutability?: undefined;
      outputs?: undefined;
    };

export type abiType = functionType[];

export type dataType = {
  read: functionType[];
  write: functionType[];
  constructor: functionType[];
  event: functionType[];
  error: functionType[];
};

export const analyzeABI = async (abi: abiType) => {
  const functionJSONObject = {
    anonymous: true,
    inputs: [
      {
        internalType: "address",
        name: "inputName",
        type: "address",
      },
    ],
    name: "funcName",
    outputs: [
      {
        internalType: "string",
        name: "outputName",
        type: "string",
      },
    ],
    stateMutability: "nonpayable", // nonPayable or View
    type: "function", // function , constructor , event , receive , fallback , error
  };

  // Pickup the object and render according to the JSON Object

  async function filterReadFunctions() {
    const data: functionType[] = abi.filter(
      (functions: functionType) =>
        functions.type === "function" && functions.stateMutability === "view"
    );

    return data;
  }

  async function filterWriteFunctions() {
    const data: functionType[] = abi.filter(
      (functions: functionType) =>
        functions.type === "function" && functions.stateMutability !== "view"
    );

    return data;
  }

  async function filterConstructor() {
    const data: functionType[] = abi.filter(
      (functions: functionType) => functions.type === "constructor"
    );

    return data;
  }

  async function filterEvents() {
    const data: functionType[] = abi.filter(
      (functions: functionType) => functions.type === "event"
    );

    return data;
  }

  async function filterErrors() {
    const data: functionType[] = abi.filter(
      (functions: functionType) => functions.type === "error"
    );

    return data;
  }

  try {
    let readFunctions: functionType[] = await filterReadFunctions();
    let writeFunctions: functionType[] = await filterWriteFunctions();
    let constructors: functionType[] = await filterConstructor();
    let events: functionType[] = await filterEvents();
    let errors: functionType[] = await filterErrors();

    const data: dataType = {
      read: readFunctions,
      write: writeFunctions,
      constructor: constructors,
      event: events,
      error: errors,
    };
    return data;
  } catch (err) {
    console.log(err);
  }
};
