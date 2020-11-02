import React, { useRef } from "react";
import { Props } from "./handle-input.model";
import {
  Heading,
  IconButton,
  Tooltip,
  Textarea,
  useColorMode,
} from "@chakra-ui/core";
import { CloseIcon } from "@chakra-ui/icons";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, userContent } = props;
  const { colorMode } = useColorMode();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const clearUserContent = (): void => {
    setUserContent("");
    inputRef.current.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setUserContent(e.target.value);
  };

  // letter spacing output
  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={[3, 4, 5, 10]}>
        Cipher Text
      </Heading>

      <Tooltip
        label="clear input"
        bg={colorMode === "dark" ? "gray.300" : "black"}
        placement="top"
      >
        <IconButton
          aria-label="clear input"
          size="xs"
          zIndex={10}
          float="right"
          mt="8px"
          mb="-50px"
          mr={4}
          onClick={clearUserContent}
          icon={<CloseIcon />}
        />
      </Tooltip>
      <Textarea
        borderColor={colorMode === "dark" ? "#3b3b3b" : "gray.200"}
        value={userContent}
        onChange={handleChange}
        autoFocus
        placeholder="your input"
        overflow="auto"
        height="400px"
        width="100%"
        ref={inputRef}
      />
    </>
  );
};

export default HandleInput;
