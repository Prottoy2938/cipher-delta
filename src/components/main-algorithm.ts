function reverse(s) {
  return s.split("").reverse().join("");
}

const engAlphabets = "abcdefghijklmnopqrstuvwxyz".repeat(3);
const reverseEngAlphabets = reverse("abcdefghijklmnopqrstuvwxyz").repeat(3);

//string reverse if negative number

/**
 * Returns substituted cipher version
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param content - The content you want to wrap
 * @param y - How many words you want to skip, default 1
 * @returns returns the cipher
 *
 * @beta
 */
const substituteContent = (userContent: string, skip = 1): string => {
  let substitutedContent = "";

  for (const char of userContent) {
    //finding the char index on the list
    const charIndex = engAlphabets.indexOf(char.toLowerCase());
    if (charIndex >= 0) {
      //if the user word is uppercase, keeping the letter casing
      if (char === char.toUpperCase()) {
        //if user wants to skip forward
        if (Math.sign(skip)) {
          substitutedContent = substitutedContent.concat(
            engAlphabets[charIndex + skip].toUpperCase()
          );
        }
        //if user wants to skip backward
        else {
          substitutedContent = reverseEngAlphabets.concat(
            engAlphabets[charIndex + Math.abs(skip)].toUpperCase()
          );
        }
      }
      //if the user word is lowercase
      else {
        //if user wants to skip forward
        if (Math.sign(skip)) {
          substitutedContent = substitutedContent.concat(
            engAlphabets[charIndex + skip]
          );
        }
        //if user wants to skip backward
        else {
          substitutedContent = reverseEngAlphabets.concat(
            engAlphabets[charIndex + Math.abs(skip)]
          );
        }
      }
    }
    //if the char doesn't exists in the alphabet list
    else {
      substitutedContent = substitutedContent.concat(char);
    }
  }

  return substitutedContent;
};

export default substituteContent;
