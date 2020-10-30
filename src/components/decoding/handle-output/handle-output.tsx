import React, { useState, useEffect } from "react";
import { Props } from "./handle-output.model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useToast,
  Box,
  Heading,
  Tooltip,
  RadioGroup,
  Radio,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Button,
  CloseButton,
  Code,
} from "@chakra-ui/core";
import substituteContent from "../../main-algorithm";
import CryptoJS from "crypto-js";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip, encKey } = props;

  const [viewAs, setViewAs] = useState("converted");
  const [convertedContent, setConvertedContent] = useState("");
  const toast = useToast();

  const showCopyToast = (): void => {
    toast({
      title: "Copied",
      description: "encryption key copied to the clip-board",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (encKey.enabled) {
      const cypherText = CryptoJS.AES.encrypt(
        substituteContent(userContent, skip),
        encKey.key
      ).toString();
      setConvertedContent(cypherText);
    } else {
      setConvertedContent(substituteContent(userContent, skip));
    }
  }, [userContent, encKey.enabled, encKey.key, skip]);

  const triggerCopyToast = (): void => {
    toast({
      position: "bottom-right",
      isClosable: true,
      duration: 20000,
      // eslint-disable-next-line react/display-name
      render: () => (
        <Alert status="success" variant="left-accent">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Copied</AlertTitle>
            <AlertDescription display="block" mt={6}>
              <Text mb={3}>Content copied to clipboard</Text>
            </AlertDescription>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      ),
    });
  };
  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mt={[24, 24, 24, 0]}>
        Plain Outcome
      </Heading>

      <CopyToClipboard
        text={viewAs === "converted" ? convertedContent : userContent}
        cursor="pointer"
      >
        <Box
          onClick={triggerCopyToast}
          cursor="text"
          background="#f5f5f5"
          m="0 auto"
          mt={10}
          width="100%"
          height="350px"
          border="2px solid #e8e8e8"
          borderRadius={2}
          textAlign="start"
          padding={5}
          overflow="auto"
        >
          {userContent}
        </Box>
      </CopyToClipboard>
    </>
  );
};

export default HandleOutput;
