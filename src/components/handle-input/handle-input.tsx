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
  HStack,
  Button,
  Input,
  useNumberInput,
} from "@chakra-ui/core";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent } = props;
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 5,
    min: -25,
    max: 25,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
        <HStack maxW="320px">
          <Button {...inc}>+</Button>
          <Input {...input} />
          <Button {...dec}>-</Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default HandleInput;
