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

  const [convertedContent, setConvertedContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (encKey.enabled) {
      const cypherText = CryptoJS.AES.decrypt(
        substituteContent(userContent, skip * -1), //multiplying by -1 will make the process backwards, thus solving the substituted text
        encKey.key
      ).toString();
      setConvertedContent(cypherText);
    } else {
      //multiplying by -1 will make the process backwards, thus solving the substituted text
      const cypherText = substituteContent(userContent, skip * -1);
      console.log(cypherText);
      setConvertedContent(cypherText);
    }
  }, [userContent, encKey.enabled, encKey.key, skip]);

  const triggerCopyToast = (): void => {
    toast({
      position: "bottom-right",
      isClosable: true,
      duration: 20000,
      // eslint-disable-next-line react/display-name
      render: ({ onClose }: any) => (
        <Alert status="success" variant="left-accent">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Copied</AlertTitle>
            <AlertDescription display="block" mt={6}>
              <Text mb={3}>Content copied to clipboard</Text>
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={onClose}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      ),
    });
  };
  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mt={[24, 24, 24, 0]}>
        Plain Outcome
      </Heading>

      <CopyToClipboard text={convertedContent} cursor="pointer">
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
          {convertedContent}
        </Box>
      </CopyToClipboard>
    </>
  );
};

export default HandleOutput;
