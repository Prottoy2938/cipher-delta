import React from "react";
import { Props } from "./handle-output.model";
import styles from "./handle-output.module.css";

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
  return (
    <>
      <button className={styles.copyBtn}>copy</button>
      <div className={styles.container}>{substituteContent(userContent)}</div>
    </>
  );
};

export default HandleOutput;
