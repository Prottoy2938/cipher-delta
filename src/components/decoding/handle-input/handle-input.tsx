import React, { useRef } from "react";
import { Props } from "./handle-input.model";
import { Heading, IconButton, Tooltip, Textarea } from "@chakra-ui/core";
import { CloseIcon } from "@chakra-ui/icons";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, userContent } = props;

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
      <Heading as="h3" size="md" textAlign="start">
        Cipher Text
      </Heading>

      <Tooltip label="clear input" bg="black" placement="top">
        <IconButton
          aria-label="clear input"
          size="xs"
          pos="absolute"
          zIndex={10}
          right={5}
          top={20}
          onClick={clearUserContent}
          icon={<CloseIcon />}
        />
      </Tooltip>
      <Textarea
        mt={10}
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
