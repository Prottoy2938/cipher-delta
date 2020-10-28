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
} from "@chakra-ui/core";
import { CloseIcon, CopyIcon } from "@chakra-ui/icons";
import OTPInput from "otp-input-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    setEncKey(e.target.value);
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

  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={5}>
        Plain Text
      </Heading>

      <Stack isInline={true} spacing={2}>
        <Box
          padding="10px"
          overflow="auto"
          height="500px"
          width="100%"
          border="2px solid #f7f7f7"
        >
          <Tooltip hasArrow label="clear input" bg="black" placement="top">
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
            value={encKey}
            onChange={handleKeyChange}
          />
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
