import React from "react";
import { Props } from "./handle-output.model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast, Box, Text, Heading } from "@chakra-ui/core";
import substituteContent from "../main-algorithm";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip } = props;
  const content = substituteContent(userContent, skip);
  const toast = useToast();

  const triggerCopyToast = (): void => {
    toast({
      position: "bottom-right",
      status: "success",
      description: "Copied",
      isClosable: true,
      duration: 3000,
    });
  };
  return (
    <>
      <Heading as="h3" size="md" textAlign="start">
        Converted Content
      </Heading>
      <CopyToClipboard text={content} cursor="pointer">
        <Box
          onClick={triggerCopyToast}
          cursor="text"
          background="#f5f5f5"
          m="0 auto"
          mt={10}
          width="100%"
          height={["100%", "100%", "100%", "80%"]}
          border="2px solid #e8e8e8"
          borderRadius={2}
          textAlign="start"
          padding={5}
          fontSize="lg"
        >
          {content}
        </Box>
      </CopyToClipboard>
    </>
  );
};

export default HandleOutput;
