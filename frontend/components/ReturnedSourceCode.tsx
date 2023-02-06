import React from "react";
import { Code } from "@chakra-ui/react";

const ReturnedSourceCode = (props: any): JSX.Element => {
    const { sourceCode } = props

    return(
        <div className="flex items-center justify-center flex-col pb-10">
        <pre>
        <Code 
        variant="subtle"
        padding={10}
        color={"whiteAlpha.800"}
        bgColor={"gray.900"}
        rounded={"md"}
        >
            {sourceCode}
        </Code>
        </pre>
        </div>
    )
}

export default ReturnedSourceCode