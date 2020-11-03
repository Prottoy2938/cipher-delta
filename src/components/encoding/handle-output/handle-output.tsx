import React, { useState, useEffect } from "react";
import { Props } from "./handle-output.model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useToast,
  Box,
  Heading,
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
  useColorMode,
  Textarea,
  Kbd,
} from "@chakra-ui/core";
import substituteContent from "../../main-algorithm";
import CryptoJS from "crypto-js";
import { isMobile } from "react-device-detect";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip, encKey } = props;

  const [viewAs, setViewAs] = useState("converted");
  const [convertedContent, setConvertedContent] = useState("");
  const toast = useToast();

  const { colorMode } = useColorMode();

  const handleKeyCopy = (): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(encKey.key);

      toast({
        title: "Copied",
        description: "encryption key copied to the clipboard",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: "something went wrong, couldn't copy",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
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
      position: isMobile ? "bottom" : "bottom-right",
      isClosable: true,
      duration: 90000,
      // eslint-disable-next-line react/display-name
      render: ({ onClose }: any) => (
        <Alert
          status="success"
          variant={colorMode === "dark" ? "solid" : "subtle"}
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Cipher copied to clipboard</AlertTitle>
            <AlertDescription display="block" mt={6}>
              <Text mb={3}>
                Substitute Letter Position:{" "}
                <Code colorScheme={colorMode === "dark" ? "black" : "blue"}>
                  {skip}
                </Code>
              </Text>
              {encKey.enabled ? (
                <>
                  <Text>
                    Encryption method: <Kbd>AES</Kbd>
                  </Text>
                  <Text mt={2}>
                    Encryption key:{" "}
                    <Button
                      onClick={handleKeyCopy}
                      size="xs"
                      colorScheme={colorMode === "dark" ? "teal" : "gray"}
                    >
                      copy
                    </Button>
                  </Text>
                </>
              ) : (
                <Text>Encryption key: none</Text>
              )}
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

  const handleChange = (e: any) => {
    setViewAs(e);
  };

  return (
    <>
      <Heading
        as="h3"
        size="md"
        textAlign="start"
        mt={[24, 24, 24, 0]}
        mb={[3, 4, 5, 10]}
      >
        {/* Cipher Outcome */}
        Cipher Text
      </Heading>

      <CopyToClipboard
        text={viewAs === "converted" ? convertedContent : userContent}
      >
        <Textarea
          onClick={triggerCopyToast}
          cursor="pointer"
          background={colorMode === "dark" ? "#292929" : "#f5f5f5"}
          color={colorMode === "dark" ? "white" : "black"}
          m="0 auto"
          width="100%"
          height="350px"
          borderRadius={2}
          textAlign="start"
          padding={5}
          overflow="auto"
          border="2px solid"
          borderColor={colorMode === "dark" ? "#292929" : "#e8e8e8"}
          value={viewAs === "converted" ? convertedContent : userContent}
          readOnly
        />
      </CopyToClipboard>
      <RadioGroup
        float="right"
        mt={5}
        value={viewAs}
        onChange={handleChange}
        mb={[20, 20, 20, 0]}
      >
        <Stack spacing={5} direction="row">
          <Radio colorScheme="gray" value="converted">
            cipher
          </Radio>
          <Radio colorScheme="red" value="plain">
            plain
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

export default HandleOutput;
