import React from "react";
import { Flex, Code } from "@chakra-ui/react";

const ReturnedSourceCode = (props: any): JSX.Element => {
    const { sourceCode } = props

    return(
        <Flex
        alignItems={"center"}
        justifyContent={"center"}
        paddingBottom={"20px"}
        >
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
        </Flex>
    )
}

export default ReturnedSourceCode