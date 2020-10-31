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
import { GrEmergency } from "react-icons/gr";

//generate random string
const genRan = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

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

  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEncKey({ ...encKey, key: e.target.value });
  };

  const handleKeyCopy = (): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(encKey.key);

      toast({
        status: "info",
        description: "Copied",
        isClosable: true,
        duration: 1500,
      });
    } else {
      toast({
        description: "Something went wrong, couldn't copy",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clearUserContent = (): void => {
    setUserContent("");
  };

  const handleEncryptContent = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (encKey.key.length) {
      toast({
        status: "info",
        description: "Key encryption enabled",
        isClosable: true,
        duration: 2200,
      });
      setEncKey({ ...encKey, enabled: true });
    } else {
      toast({
        status: "warning",
        description: "Encryption key cannot be empty",
        isClosable: true,
        duration: 2200,
      });
    }
  };

  const removeEncryption = (): void => {
    setEncKey({ key: "", enabled: false });
    toast({
      status: "warning",
      description: "Key encryption removed",
      isClosable: true,
      duration: 2200,
    });
  };

  const handleUpdateKey = (): void => {
    setEncKey({ enabled: true, key: genRan() });
    toast({
      title: "Generated new encryption key",
      description: "Applied newly generated encryption key",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={1}>
        Plain Text
      </Heading>

      <Stack isInline={true} spacing={2}>
        <Box width="100%" mt={8}>
          <Tooltip label="clear input" bg="black" placement="top">
            <IconButton
              aria-label="clear input"
              size="xs"
              pos="absolute"
              zIndex={10}
              right={28}
              top={20}
              onClick={clearUserContent}
              icon={<CloseIcon />}
            />
          </Tooltip>
          <Textarea
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
            autoFocus
            placeholder="your input"
            overflow="auto"
            height="500px"
            width="100%"
          />
        </Box>

        <Box w="70px">
          <NumberInput
            size="sm"
            max={25}
            min={-25}
            keepWithinRange={false}
            clampValueOnBlur={false}
            onChange={handleSkipChange}
            value={skip}
          >
            <NumberInputField />

            <NumberInputStepper bg="white">
              <Tooltip
                label="forward substitute letter position"
                bg="black"
                placement="top"
              >
                <NumberIncrementStepper />
              </Tooltip>
              <Tooltip
                hasArrow
                label="backward substitute letter position"
                bg="black"
                placement="bottom"
              >
                <NumberDecrementStepper />
              </Tooltip>
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Stack>
      <Box
        mt={2}
        className="encryption-inp-cn"
        as="form"
        onSubmit={handleEncryptContent}
      >
        <InputGroup size="sm">
          <InputLeftAddon>optional</InputLeftAddon>
          <Input
            type="text"
            placeholder="encryption key"
            width="250px"
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
          />
          <InputRightAddon mr={3} padding="0">
            {encKey.enabled ? (
              <Button
                borderRadius={0}
                height="100%"
                width="130px"
                size="sm"
                fontWeight="regular"
                onClick={removeEncryption}
              >
                remove encryption
              </Button>
            ) : (
              <Button
                borderRadius={0}
                height="100%"
                width="60px"
                size="sm"
                fontWeight="regular"
                type="submit"
              >
                use
              </Button>
            )}
          </InputRightAddon>
          <Tooltip
            label={`${showEncKey ? "hide" : "view"} key`}
            bg="black"
            placement="top"
          >
            <IconButton
              variant="outline"
              size="sm"
              aria-label="view key"
              icon={showEncKey ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              onClick={(): void => setShowEncKey(!showEncKey)}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>

          <Tooltip
            bg="black"
            shouldWrapChildren
            label="copy key"
            placement="top"
          >
            <IconButton
              onClick={handleKeyCopy}
              ml={2}
              variant="outline"
              size="sm"
              aria-label="copy encryption key"
              icon={<CopyIcon />}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>

          <Tooltip
            label="generate new key and apply"
            bg="black"
            placement="top"
          >
            <IconButton
              ml={4}
              variant="outline"
              size="sm"
              aria-label="generate new key and apply"
              icon={<GrEmergency />}
              onClick={handleUpdateKey}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>
        </InputGroup>
      </Box>
    </>
  );
};

export default HandleInput;
