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
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  ButtonGroup,
} from "@chakra-ui/core";
import { Props } from "./decryption-key.model";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import { ChevronDownIcon } from "@chakra-ui/icons";

const DecryptionKey: React.FC<Props> = (props: Props) => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { setEncKey, encKey, skip, setSkip } = props;

  const [showEncKey, setShowEncKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    const storedKey = window.localStorage.getItem("cd-enc-key");
    if (storedKey) {
      setHasStoredKey(true);
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

  const handleEncryptContent = (): void => {
    if (encKey.key.length) {
      toast({
        status: "info",
        description: "Using the key",
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleEncryptContent();
    }
  };

  return (
    <Box width="100%" mt={["10%", "10%", "10%", "28%"]}>
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
      </Box>
      <Box display="grid" justifyContent="center" mt={5}>
        <InputGroup size="sm">
          <label htmlFor="enc-key">
            <InputLeftAddon
              borderColor={
                colorMode === "dark" ? "#292929 !important" : "gray.200"
              }
              pl={[1, 2, 3, 4]}
              pr={[1, 2, 3, 4]}
            >
              {isMobile ? "enc. key" : "encryption key"}
            </InputLeftAddon>
          </label>

          <Input
            type="text"
            id="enc-key"
            placeholder="leave empty if there's none"
            width={["220px", "240px", "270px", "200px", "300px"]}
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
            onKeyDown={handleKeyDown}
          />
          <InputRightAddon
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
            mr={3}
            padding="0"
          >
            {encKey.enabled ? (
              <Button
                borderRadius={0}
                height="100%"
                size="sm"
                fontWeight="regular"
                onClick={removeEncryption}
              >
                {isMobile ? "remove" : "remove key"}
              </Button>
            ) : (
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  borderRadius={0}
                  width="60px"
                  size="sm"
                  fontWeight="regular"
                  mr="-px"
                  onClick={handleEncryptContent}
                >
                  apply
                </Button>

                {hasStoredKey && (
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
                )}
              </ButtonGroup>
            )}
          </InputRightAddon>
          {!isMobile && (
            <Tooltip
              // hasArrow
              label={`${showEncKey ? "hide" : "view"} key`}
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="top"
            >
              <IconButton
                variant="outline"
                aria-label="view key"
                icon={showEncKey ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                onClick={(): void => setShowEncKey(!showEncKey)}
                borderRadius={1}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              />
            </Tooltip>
          )}
        </InputGroup>
        {isMobile && (
          <Tooltip
            // hasArrow
            label={`${showEncKey ? "hide" : "view"} key`}
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              margin="0 auto"
              mt={4}
              width="35px"
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
        )}
      </Box>

      <Image
        mt={8}
        src="/arrow-sketch.svg"
        width="100%"
        height="30px"
        alt="a sketched wave"
        className={colorMode === "dark" ? "svg-white" : "svg-black"}
      />
    </Box>
  );
};

export default DecryptionKey;
