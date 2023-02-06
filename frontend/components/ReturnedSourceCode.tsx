import React from "react";

const ReturnedSourceCode = (props: any): JSX.Element => {
    const { sourceCode } = props

    return(
        <div className="text-white">
            {sourceCode}
        </div>
    )
}

export default ReturnedSourceCode