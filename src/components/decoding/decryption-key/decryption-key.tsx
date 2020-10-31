import React, { useState } from "react";
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
  Image,
  Text,
} from "@chakra-ui/core";
import { Props } from "./decryption-key.model";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const DecryptionKey: React.FC<Props> = (props: Props) => {
  const toast = useToast();

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

  return (
    <Box width="100%" mt={["10%", "10%", "10%", "28%"]}>
      <Box display="flex" justifyContent="center">
        <Text mr={5}>Substitute Letter Position: </Text>
        <NumberInput
          size="sm"
          max={25}
          min={-25}
          w="70px"
          keepWithinRange={false}
          clampValueOnBlur={false}
          onChange={handleSkipChange}
          value={skip}
        >
          <NumberInputField />

          <NumberInputStepper bg="white">
            <Tooltip
              // hasArrow
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
      <Box
        display="grid"
        justifyContent="center"
        mt={5}
        as="form"
        onSubmit={handleEncryptContent}
      >
        <InputGroup size="sm">
          <InputLeftAddon>encryption key</InputLeftAddon>

          <Input
            type="text"
            placeholder="leave empty if there's none"
            width={["220px", "240px", "270px", "200px", "300px"]}
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
          />
          <InputRightAddon mr={3} padding="0">
            {encKey.enabled ? (
              <Button
                borderRadius={0}
                height="100%"
                width="180px"
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
                type="text"
              >
                apply
              </Button>
            )}
          </InputRightAddon>
          <Tooltip
            // hasArrow
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
        </InputGroup>
      </Box>
      <Image mt={8} src="/arrow-sketch.svg" width="100%" height="30px" />
    </Box>
  );
};

export default DecryptionKey;
