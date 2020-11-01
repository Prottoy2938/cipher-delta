import React, { useState } from "react";
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
} from "@chakra-ui/core";
import { Props } from "./decryption-key.model";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isMobile } from "react-device-detect";

const DecryptionKey: React.FC<Props> = (props: Props) => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { setEncKey, encKey, skip, setSkip } = props;

  const [showEncKey, setShowEncKey] = useState(false);

  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEncKey({ ...encKey, key: e.target.value });
  };

  const handleEncryptContent = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
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
      <Box
        display="grid"
        justifyContent="center"
        mt={5}
        as="form"
        onSubmit={handleEncryptContent}
      >
        <InputGroup size="sm">
          <InputLeftAddon
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
            pl={[1, 2, 3, 4]}
            pr={[1, 2, 3, 4]}
          >
            {isMobile ? "enc. key" : "encryption key"}
          </InputLeftAddon>

          <Input
            type="text"
            placeholder="leave empty if there's none"
            width={["220px", "240px", "270px", "200px", "300px"]}
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
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
              <Button
                borderRadius={0}
                height="100%"
                width="60px"
                size="sm"
                fontWeight="regular"
                type="submit"
              >
                apply
              </Button>
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
      <Image mt={8} src="/arrow-sketch.svg" width="100%" height="30px" />
    </Box>
  );
};

export default DecryptionKey;
