import React, { useState } from "react";
import { Props } from "./handle-input.model";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Heading,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  Textarea,
  InputRightAddon,
  Button,
} from "@chakra-ui/core";
import { CloseIcon, CopyIcon } from "@chakra-ui/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col } from "react-grid-system";

const HandleInput: React.FC<Props> = (props: Props) => {
  const toast = useToast();

  const {
    setUserContent,
    setEncKey,
    encKey,
    skip,
    setSkip,
    userContent,
  } = props;

  const [showEncKey, setShowEncKey] = useState(false);
  const [inputMethod, setInputMethod] = useState("digit");

  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEncKey({ ...encKey, key: e.target.value });
  };

  const triggerCopyToast = (): void => {
    toast({
      status: "info",
      description: "Copied",
      isClosable: true,
      duration: 3000,
    });
  };

  const clearUserContent = (): void => {
    setUserContent("");
  };

  const handleEncryptContent = (): void => {
    if (encKey.key.length) {
      toast({
        status: "info",
        description: "Key encryption enabled",
        isClosable: true,
        duration: 3000,
      });
      setEncKey({ ...encKey, enabled: true });
    } else {
      toast({
        status: "warning",
        description: "Encryption key cannot be empty",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const removeEncryption = (): void => {
    setEncKey({ key: "", enabled: false });
    toast({
      status: "warning",
      description: "Key encryption removed",
      isClosable: true,
      duration: 3000,
    });
  };

  // letter spacing output
  return (
    <>
      <Heading as="h3" size="md" textAlign="start">
        Cipher Text
      </Heading>

      <Tooltip label="clear input" bg="black" placement="top">
        <IconButton
          aria-label="clear input"
          size="xs"
          pos="absolute"
          zIndex={10}
          right={5}
          top={20}
          onClick={clearUserContent}
          icon={<CloseIcon />}
        />
      </Tooltip>
      <Textarea
        mt={10}
        value={userContent}
        onChange={(e) => setUserContent(e.target.value)}
        autoFocus
        placeholder="your input"
        overflow="auto"
        height="400px"
        width="100%"
      />
    </>
  );
};

export default HandleInput;
