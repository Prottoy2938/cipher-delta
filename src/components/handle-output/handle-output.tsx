import React from "react";
import { Props } from "./handle-output.model";
import styles from "./handle-output.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton, useToast } from "@chakra-ui/core";
import { CopyIcon } from "@chakra-ui/icons";
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
    });
  };
  return (
    <div className={styles.container}>
      <CopyToClipboard text={content}>
        <IconButton
          aria-label="copy result"
          float="right"
          ml="-53px"
          mt="-33px"
          size="sm"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          onClick={triggerCopyToast}
          icon={<CopyIcon />}
        />
      </CopyToClipboard>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default HandleOutput;
