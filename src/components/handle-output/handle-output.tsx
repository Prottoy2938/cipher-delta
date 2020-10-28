import React, { useState } from "react";
import { Props } from "./handle-output.model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useToast,
  Box,
  Heading,
  Tooltip,
  RadioGroup,
  Radio,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Button,
  CloseButton,
  Code,
} from "@chakra-ui/core";
import substituteContent from "../main-algorithm";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip, encKey } = props;

  const [viewAs, setViewAs] = useState("converted");
  const convertedContent = substituteContent(userContent, skip);
  const toast = useToast();

  const showCopyToast = (): void => {
    toast({
      title: "Copied",
      description: "encryption key copied to the clip-board",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  const triggerCopyToast = (): void => {
    toast({
      position: "bottom-right",
      isClosable: true,
      duration: 20000,
      // eslint-disable-next-line react/display-name
      render: () => (
        <Alert status="success" variant="left-accent">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle> Copied</AlertTitle>
            <AlertDescription display="block" mt={6}>
              <Text mb={3}>
                Substitute Letter Position:{" "}
                <Code colorScheme="blue">{skip}</Code>
              </Text>
              <Text>
                Encryption Key:{" "}
                {encKey ? (
                  <CopyToClipboard text={encKey}>
                    <Button onClick={showCopyToast} size="xs">
                      copy
                    </Button>
                  </CopyToClipboard>
                ) : (
                  "none"
                )}
              </Text>
            </AlertDescription>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      ),
    });
  };
  return (
    <>
      <Heading as="h3" size="md" textAlign="start" mt={[24, 24, 24, 0]}>
        Cipher Text
      </Heading>

      <CopyToClipboard
        text={viewAs === "converted" ? convertedContent : userContent}
        cursor="pointer"
      >
        <Box
          onClick={triggerCopyToast}
          cursor="text"
          background="#f5f5f5"
          m="0 auto"
          mt={10}
          width="100%"
          height={["100%", "100%", "100%", "80%"]}
          border="2px solid #e8e8e8"
          borderRadius={2}
          textAlign="start"
          padding={5}
          fontSize="lg"
        >
          {viewAs === "converted" ? convertedContent : userContent}
        </Box>
      </CopyToClipboard>
      <RadioGroup
        float="right"
        mt={5}
        value={viewAs}
        onChange={(e: any): void => setViewAs(e)}
        mb={[16, 16, 16, 0]}
      >
        <Stack spacing={5} direction="row">
          <Radio colorScheme="gray" value="converted">
            converted
          </Radio>
          <Radio colorScheme="red" value="plain">
            plain
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

export default HandleOutput;
