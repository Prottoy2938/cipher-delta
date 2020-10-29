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
  Radio,
  RadioGroup,
  Textarea,
  InputRightAddon,
  Button,
} from "@chakra-ui/core";
import { CloseIcon, CopyIcon } from "@chakra-ui/icons";
import OTPInput from "otp-input-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactCardFlip from "react-card-flip";

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
      <Heading as="h3" size="md" textAlign="start" mb={1}>
        Plain Text
      </Heading>

      <Stack isInline={true} spacing={2}>
        <Box width="100%">
          <ReactCardFlip
            isFlipped={inputMethod === "text-area"}
            flipDirection="vertical"
          >
            <>
              <RadioGroup
                mb={3}
                bg="white"
                float="right"
                onChange={(e: any): void => setInputMethod(e)}
                value={inputMethod}
                marginRight={6}
              >
                <Stack direction="row">
                  <Radio value="digit">digit</Radio>
                  <Radio value="text-area">text-area</Radio>
                </Stack>
              </RadioGroup>
              <Box
                padding="10px"
                overflow="auto"
                height="500px"
                width="100%"
                border="2px solid #f7f7f7"
                mb={2}
              >
                <Tooltip
                  hasArrow
                  label="clear input"
                  bg="black"
                  placement="top"
                >
                  <IconButton
                    aria-label="clear input"
                    size="xs"
                    float="right"
                    mb="-30px"
                    onClick={clearUserContent}
                    icon={<CloseIcon />}
                  />
                </Tooltip>
                <OTPInput
                  value={userContent}
                  onChange={setUserContent}
                  autoFocus
                  OTPLength={
                    userContent.length + 3 < 10 ? 10 : userContent.length + 3
                  }
                  otpType="any"
                  disabled={false}
                  className="user-input-field"
                  style={{ display: "block", textAlign: "start" }}
                />
              </Box>
            </>
            <>
              <RadioGroup
                bg="white"
                float="right"
                onChange={(e: any): void => setInputMethod(e)}
                value={inputMethod}
                mb={3}
                marginRight={6}
              >
                <Stack direction="row">
                  <Radio value="digit">digit</Radio>
                  <Radio value="text-area">text-area</Radio>
                </Stack>
              </RadioGroup>

              <Tooltip hasArrow label="clear input" bg="black" placement="top">
                <IconButton
                  aria-label="clear input"
                  size="xs"
                  pos="absolute"
                  right={2}
                  top={12}
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
            </>
          </ReactCardFlip>
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
                hasArrow
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
      <Box mt={2} className="encryption-inp-cn">
        <InputGroup size="sm">
          <InputLeftAddon>optional</InputLeftAddon>
          <Input
            type={showEncKey ? "text" : "password"}
            placeholder="encryption key"
            width="250px"
            value={encKey.key}
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
                onClick={handleEncryptContent}
              >
                encrypt
              </Button>
            )}
          </InputRightAddon>
          <Tooltip
            hasArrow
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
          <CopyToClipboard text={encKey} cursor="pointer">
            <Tooltip
              bg="black"
              hasArrow
              shouldWrapChildren
              label="copy key"
              placement="top"
            >
              <IconButton
                onClick={triggerCopyToast}
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
          </CopyToClipboard>
        </InputGroup>
      </Box>
    </>
  );
};

export default HandleInput;
