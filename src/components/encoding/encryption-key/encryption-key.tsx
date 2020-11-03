import React, { useState, useEffect } from "react";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  InputRightAddon,
  Button,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Kbd,
  Code,
  Link,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  ButtonGroup,
} from "@chakra-ui/core";
import { CopyIcon, InfoIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrEmergency } from "react-icons/gr";
import { Props } from "./encryption-key.model";
import { isMobile } from "react-device-detect";
import { FaSave } from "react-icons/fa";

//generate random string
const genRan = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const EncryptionKey: React.FC<Props> = (props: Props) => {
  const toast = useToast();

  const { colorMode } = useColorMode();

  const { setEncKey, encKey, skip, setSkip } = props;

  const [showEncKey, setShowEncKey] = useState(false);
  const [savedKeyFeature, setSavedKeyFeature] = useState({
    showSave: false,
  });

  useEffect(() => {
    if (window.localStorage) {
      setSavedKeyFeature({ ...savedKeyFeature, showSave: true });
    }
  }, []);

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

  const handleEncryptContent = (): void => {
    if (encKey.key.length) {
      toast({
        status: "info",
        description: "Encryption key removed",
        isClosable: true,
        duration: 2200,
      });
      setEncKey({ ...encKey, enabled: true });
    } else {
      toast({
        status: "warning",
        title: "failed",

        description: "Encryption key is empty",
        isClosable: true,
        duration: 2200,
      });
    }
  };

  const removeEncryption = (): void => {
    setEncKey({ key: "", enabled: false });
    toast({
      status: "warning",
      description: "Encryption key removed",
      isClosable: true,
      duration: 2200,
    });
  };

  const handleUpdateKey = (): void => {
    setEncKey({ enabled: true, key: genRan(18) });
    toast({
      title: "Generated new encryption key",
      description: "Applied newly generated encryption key",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  const removeSavedKey = (): void => {
    window.localStorage.removeItem("cd-enc-key");
    toast({
      description: "key removed from localstorage",
      status: "warning",
      duration: 2500,
      isClosable: true,
    });
  };

  const useSavedKey = (): void => {
    const storedKey = window.localStorage.getItem("cd-enc-key");
    if (storedKey) {
      setEncKey({ enabled: true, key: storedKey });
      toast({
        description: "Using the previously saved key",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "failed",
        description: "No saved key were key found",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStoreKey = (): void => {
    if (encKey.key.length) {
      window.localStorage.setItem("cd-enc-key", encKey.key);
      toast({
        position: "bottom",
        isClosable: true,
        duration: 9000,
        // eslint-disable-next-line react/display-name
        render: ({ onClose }: any) => (
          <Alert
            status="success"
            variant={colorMode === "dark" ? "solid" : "subtle"}
          >
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Saved key</AlertTitle>
              <AlertDescription display="block" mt={6}>
                <Text>Saved key to browser storage (local storage)</Text>
                <Text mt={7}>
                  If this was a mistake,{" "}
                  <Button size="sm" height="25px" onClick={removeSavedKey}>
                    remove it
                  </Button>{" "}
                  from storage
                </Text>
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
    } else {
      toast({
        status: "warning",
        title: "failed",

        description: "Encryption key is empty",
        isClosable: true,
        duration: 2200,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleEncryptContent();
    }
  };

  return (
    <Box width="100%" mt={["10%", "10%", "10%", "23%"]}>
      <Box display="flex" justifyContent="center">
        <Text mr={5}>Substitute Letter Position: </Text>
        <NumberInput
          size="sm"
          max={25}
          min={-25}
          w="70px"
          h="30px"
          keepWithinRange={false}
          clampValueOnBlur={false}
          onChange={handleSkipChange}
          value={skip}
          borderColor={colorMode === "dark" ? "#292929 !important" : "gray.200"}
        >
          <NumberInputField />

          <NumberInputStepper
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            <Tooltip
              // hasArrow
              label="forward substitute letter position"
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="top"
            >
              <NumberIncrementStepper />
            </Tooltip>
            <Tooltip
              hasArrow
              label="backward substitute letter position"
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="bottom"
            >
              <NumberDecrementStepper />
            </Tooltip>
          </NumberInputStepper>
        </NumberInput>
        <Popover>
          <PopoverTrigger>
            <IconButton
              bg="transparent"
              size="sm"
              ml={3}
              aria-label="whats substitute letter position"
              icon={<InfoIcon />}
            />
          </PopoverTrigger>
          <PopoverContent
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader
              borderBottom="2px solid"
              borderColor={
                colorMode === "dark" ? "#292929 !important" : "gray.200"
              }
            >
              Substitute letter position
            </PopoverHeader>
            <PopoverBody textAlign="start">
              Set the substitute letter position. For example, if the position
              is in <Kbd>5</Kbd> then for the letter <Code>a</Code> it would be
              replaced by the letter <Code>e</Code>, and for the letter{" "}
              <Code>b</Code> it would be replaced by the letter <Code>f</Code>{" "}
              and the pattern will continue on all letters respectively.
              <Text mt={3}>
                This cipher method is also known as{" "}
                <Link
                  color={colorMode === "dark" ? "purple.400" : "purple.700"}
                  href="https://www.geeksforgeeks.org/difference-between-monoalphabetic-cipher-and-polyalphabetic-cipher/"
                >
                  monoalphabetic cipher.
                </Link>
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <Box display="grid" justifyContent="center" mt={5}>
        <InputGroup size="sm">
          {!isMobile && (
            <label htmlFor="des-key">
              <InputLeftAddon
                borderColor={
                  colorMode === "dark" ? "#292929 !important" : "gray.200"
                }
                pl={[1, 2, 3, 4]}
                pr={[1, 2, 3, 4]}
              >
                optional
              </InputLeftAddon>
            </label>
          )}
          <Input
            type="text"
            id="des-key"
            placeholder={
              isMobile ? "encryption key (optional)" : "encryption key"
            }
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
            width="250px"
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
            onKeyDown={handleKeyDown}
          />
          <InputRightAddon
            mr={3}
            padding="0"
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            {encKey.enabled ? (
              <Button
                borderRadius={0}
                height="100%"
                pl={[1, 2, 3, 4]}
                pr={[1, 2, 3, 4]}
                size="sm"
                fontWeight="regular"
                type="button"
                onClick={removeEncryption}
              >
                {isMobile ? "remove" : "remove encryption"}
              </Button>
            ) : (
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  borderRadius={0}
                  width="60px"
                  fontWeight="regular"
                  mr="-px"
                  onClick={handleEncryptContent}
                >
                  use
                </Button>

                <Popover>
                  <PopoverTrigger>
                    <Box>
                      <Tooltip
                        label="view other options"
                        bg={colorMode === "dark" ? "gray.300" : "black"}
                        placement="top"
                      >
                        <IconButton
                          width="10px"
                          borderRadius={0}
                          aria-label="more option"
                          icon={<ChevronDownIcon />}
                        />
                      </Tooltip>
                    </Box>
                  </PopoverTrigger>

                  <PopoverContent
                    width="100px"
                    m="0 auto"
                    p={0}
                    borderRadius={0}
                    border="none"
                  >
                    <PopoverBody p={0}>
                      <Box
                        onClick={useSavedKey}
                        as="button"
                        width="100%"
                        height="24px"
                        lineHeight="1.2"
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        border="1px"
                        px="8px"
                        borderRadius="2px"
                        fontSize="14px"
                        fontWeight="semibold"
                        bg="#f5f6f7"
                        borderColor="#ccd0d5"
                        color="#4b4f56"
                        _hover={{ bg: "#ebedf0" }}
                        _active={{
                          bg: "#dddfe2",
                          transform: "scale(0.98)",
                          borderColor: "#bec3c9",
                        }}
                        _focus={{
                          boxShadow:
                            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                        }}
                        type="button"
                      >
                        use saved key
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </ButtonGroup>
            )}
          </InputRightAddon>
        </InputGroup>
        <Box mt={[8, 8, 8, 6]}>
          <Tooltip
            label={`${showEncKey ? "hide" : "view"} key`}
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              variant="outline"
              // size="sm"
              aria-label="view key"
              icon={showEncKey ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              onClick={(): void => setShowEncKey(!showEncKey)}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>

          <Tooltip
            bg={colorMode === "dark" ? "gray.300" : "black"}
            shouldWrapChildren
            label="copy current key"
            placement="top"
          >
            <IconButton
              onClick={handleKeyCopy}
              ml={6}
              variant="outline"
              // size="sm"
              aria-label="copy encryption key"
              icon={<CopyIcon />}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>
          {savedKeyFeature.showSave && (
            <Tooltip
              // hasArrow
              textAlign="center"
              label="save current key to browser storage (localstorage) for later use"
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="top"
            >
              <IconButton
                variant="outline"
                // size="sm"
                aria-label="save current key to browser storage (localstorage) for later use"
                icon={<FaSave />}
                borderRadius={1}
                ml={6}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                onClick={handleStoreKey}
              />
            </Tooltip>
          )}
          <Tooltip
            label="generate new key and apply"
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              ml={6}
              variant="outline"
              // size="sm"
              aria-label="generate new key and apply"
              icon={<GrEmergency />}
              onClick={handleUpdateKey}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>
        </Box>
      </Box>
      <Image
        src="/line-arrow-sketch.svg"
        width="300px"
        m="0 auto"
        mt={8}
        height="30px"
        alt="a line that went through a sketched wave"
        className={colorMode === "dark" ? "svg-white" : "svg-black"}
      />
    </Box>
  );
};

export default EncryptionKey;
