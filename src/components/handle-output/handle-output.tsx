import React from "react";
import { Props } from "./handle-output.model";
import styles from "./handle-output.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast, Button, Box } from "@chakra-ui/core";
import substituteContent from "../main-algorithm";

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent, skip } = props;
  const content = substituteContent(userContent, skip);
  const toast = useToast();

  const triggerCopyToast = (): void => {
    toast({
      position: "bottom-right",
      status: "success",
      description: "Copied",
      isClosable: true,
      duration: 3000,
    });
  };
  return (
    <CopyToClipboard text={content} cursor="pointer">
      <Box onClick={triggerCopyToast}>
        <div className={styles.container}>
          <div className={styles.content}>{content}</div>
        </div>
      </Box>
    </CopyToClipboard>
  );
};

export default HandleOutput;
