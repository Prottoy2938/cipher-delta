import React from "react";
import { Props } from "./handle-input.model";
import { Heading, IconButton, Tooltip, Textarea } from "@chakra-ui/core";
import { CloseIcon } from "@chakra-ui/icons";

const HandleInput: React.FC<Props> = (props: Props) => {
  const {
    setUserContent,

    userContent,
  } = props;

  const clearUserContent = (): void => {
    setUserContent("");
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
        onChange={(e) => setUserContent(e.target.value)}
        autoFocus
        placeholder="your input"
        overflow="auto"
        height="400px"
        width="100%"
      />
    </>
  );
};

export default HandleInput;
