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
  const { setUserContent } = props;
  return (
    <Flex>
      <Box flex={1}>
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
        <NumberInput defaultValue={15} min={10} max={20}>
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
