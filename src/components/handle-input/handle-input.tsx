import React from "react";
import { Props } from "./handle-input.model";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Stack,
} from "@chakra-ui/core";
import OTPInput from "otp-input-react";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, skip, setSkip, userContent } = props;
  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  return (
    <Stack isInline={true} spacing={2}>
      <Box
        padding="10px"
        overflow="auto"
        height="500px"
        width="100%"
        border="2px solid #f7f7f7"
      >
        <OTPInput
          value={userContent}
          onChange={setUserContent}
          autoFocus
          OTPLength={userContent.length + 3 < 10 ? 10 : userContent.length + 3}
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
  );
};

export default HandleInput;
