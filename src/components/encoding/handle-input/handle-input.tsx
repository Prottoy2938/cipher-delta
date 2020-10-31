import React from "react";
import { Props } from "./handle-input.model";
import { Box, Heading, IconButton, Tooltip, Textarea } from "@chakra-ui/core";
import { CloseIcon } from "@chakra-ui/icons";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent, userContent } = props;

  const clearUserContent = (): void => {
    setUserContent("");
  };

  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mb={1}>
        Plain Text
      </Heading>

      <Box width="100%" mt={8}>
        <Tooltip label="clear input" bg="black" placement="top">
          <IconButton
            aria-label="clear input"
            size="xs"
            pos="absolute"
            zIndex={10}
            right={28}
            top={20}
            onClick={clearUserContent}
            icon={<CloseIcon />}
          />
        </Tooltip>
        <Textarea
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
          autoFocus
          placeholder="your input"
          overflow="auto"
          height="500px"
          width="100%"
        />
      </Box>
    </>
  );
};

export default HandleInput;
