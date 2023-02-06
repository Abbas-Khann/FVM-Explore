import React from "react";
import { Code } from "@chakra-ui/react";

const ReturnedSourceCode = (props: any): JSX.Element => {
    const { sourceCode } = props

    return(
        <Code 
        colorScheme={"gray"}
        variant="subtle"
        padding={10}
        >
            {sourceCode}
        </Code>
    )
}

export default ReturnedSourceCode