import React from "react";
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
} from "@chakra-ui/core";
import { CloseIcon } from "@chakra-ui/icons";
import OTPInput from "otp-input-react";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, skip, setSkip, userContent } = props;
  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={5}>
        Input
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
              onClick={() => setUserContent("")}
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
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Stack>
    </>
  );
};

export default HandleInput;
