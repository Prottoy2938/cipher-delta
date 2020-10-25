import React from "react";
import VerificationInput from "react-verification-input";
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

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, skip, setSkip } = props;
  const handleSkipChange = (skip: number) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(skip);
    }
  };
  return (
    <Flex m={0}>
      <Box>
        <VerificationInput
          input={{ onChange: (e: string) => setUserContent(e) }}
          removeDefaultStyles
          length={12}
          placeholder=" "
          container={{
            className: "container",
          }}
          characters={{
            className: "characters",
          }}
          character={{
            className: "character",
            classNameInactive: "character--inactive",
            classNameSelected: "character--selected",
          }}
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
