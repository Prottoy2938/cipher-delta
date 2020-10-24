import React from "react";
import { Props } from "./handle-output.model";
import styles from "./handle-output.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton, useToast, Box } from "@chakra-ui/core";
import { CopyIcon } from "@chakra-ui/icons";

const substituteContent = (userContent, skip = 1) => {
  const engAlphabets = "abcdefghijklmnopqrstuvwxyz";
  let substitutedContent = "";

  for (const char of userContent) {
    //finding the char index on the list
    const charIndex = engAlphabets.indexOf(char.toLowerCase());
    if (charIndex >= 0) {
      //keeping the letter casing
      if (char === char.toUpperCase()) {
        substitutedContent = substitutedContent.concat(
          engAlphabets[charIndex + skip].toUpperCase()
        );
      } else {
        substitutedContent = substitutedContent.concat(
          engAlphabets[charIndex + skip]
        );
      }
    }
    //if the char doesn't exists in the alphabet list
    else {
      substitutedContent = substitutedContent.concat(char);
    }
  }

  return substitutedContent;
};

const HandleOutput: React.FC<Props> = (props: Props) => {
  const { userContent } = props;
  const content = substituteContent(userContent);
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
