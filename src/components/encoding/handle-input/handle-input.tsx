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

  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={[3, 4, 5, 10]}>
        Plain Text
      </Heading>

      <Tooltip
        label="clear input"
        placement="top"
        bg={colorMode === "dark" ? "gray.300" : "black"}
      >
        <IconButton
          aria-label="clear input"
          size="xs"
          // pos="absolute"
          zIndex={10}
          // right={5}
          float="right"
          mt="8px"
          mb="-50px"
          mr={4}
          // top={[12, 12, 12, 20]}
          onClick={clearUserContent}
          icon={<CloseIcon />}
        />
      </Tooltip>
      <Textarea
        value={userContent}
        onChange={handleChange}
        autoFocus
        placeholder="your input"
        overflow="auto"
        height="400px"
        width="100%"
        ref={inputRef}
        borderColor={colorMode === "dark" ? "#3b3b3b" : "gray.200"}
      />
    </>
  );
};

export default HandleInput;
