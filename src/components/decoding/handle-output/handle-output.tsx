import React, { useState, useEffect } from "react";
import { Props } from "./handle-output.model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useToast,
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  CloseButton,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  IconButton,
  Kbd,
  Link,
} from "@chakra-ui/core";
import substituteContent from "../../main-algorithm";
import CryptoJS from "crypto-js";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip, encKey } = props;

  const [convertedContent, setConvertedContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (encKey.enabled) {
      const cypherText = substituteContent(
        CryptoJS.AES.decrypt(
          userContent, //multiplying by -1 will make the process backwards, thus solving the substituted text
          encKey.key
        ).toString(CryptoJS.enc.Utf8),
        skip * -1
      );
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
      duration: 30000,
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
      {convertedContent.length ? (
        <Box mt={7} textAlign="end">
          <Popover>
            <PopoverTrigger>
              <IconButton
                bg="white"
                size="sm"
                aria-label="Info on getting expected output"
                icon={<QuestionOutlineIcon />}
              />
            </PopoverTrigger>
            <PopoverContent textAlign="center">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Not getting expected output?</PopoverHeader>
              <PopoverBody textAlign="start">
                Make sure you've entered the correct letter substitution
                position.
                <Text mt={3}>
                  If the content is encrypted using a key, then also make sure
                  that you've entered the right key.
                </Text>
                <Text>
                  Note that, currently for key encryption or decryption this
                  application only uses{" "}
                  <Link
                    color="purple.700"
                    href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
                  >
                    <Kbd>AES</Kbd>
                  </Link>{" "}
                  algorithm.
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      ) : null}
    </>
  );
};

export default HandleOutput;
