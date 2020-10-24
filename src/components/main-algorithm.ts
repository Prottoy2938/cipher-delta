const substituteContent = (userContent, skip = 1) => {
  const engAlphabets = "abcdefghijklmnopqrstuvwxyz";
  let substitutedContent = "";

  for (const char of userContent) {
    //finding the char index on the list
    const charIndex = engAlphabets.indexOf(char.toLowerCase());

    if (charIndex >= 0) {
      //if the letter is 'z' or the index position is 25
      if (charIndex === 25) {
        substitutedContent = substitutedContent.concat("a");
      } else {
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
    }
    //if the char doesn't exists in the alphabet list
    else {
      substitutedContent = substitutedContent.concat(char);
    }
  }

  return substitutedContent;
};

export default substituteContent;
