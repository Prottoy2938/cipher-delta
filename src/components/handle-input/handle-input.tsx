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
} from "@chakra-ui/core";
import OtpInput from "react-otp-input";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, skip, setSkip, userContent } = props;
  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  return (
    <Flex>
      {/* <Box width={["90%", "80%", "60%", "50%"]} overflow="auto" height={"50%"}> */}
      <Box overflow="auto" height={"50%"}>
        <OtpInput
          containerStyle="user-input-field"
          value={userContent} //use usercontent replace
          onChange={(e) => {
            console.log(e);
            setUserContent(e);
          }}
          numInputs={userContent.length + 3 < 10 ? 10 : userContent.length + 3}
          separator={<span className="input-field-separator"></span>}
        />
      </Box>
      <Box w="100px">
        <NumberInput
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
    </Flex>
  );
};

export default HandleInput;
