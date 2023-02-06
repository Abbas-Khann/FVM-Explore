import React from "react";

const ReturnedAbi = ({ contractData }: any): JSX.Element => {
    return(
        <div
        className="text-white text-lg p-10"
        >
            {/* <div>
            {contractData.inputs.join(", ")}
            </div>
            <div>
            {contractData.stateMutability}
            </div>
            <div>{contractData}</div> */}
            {contractData.toString()}
        </div>
    )
}

export default ReturnedAbi