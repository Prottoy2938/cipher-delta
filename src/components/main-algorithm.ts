function reverse(s) {
  return s.split("").reverse().join("");
}

const engAlphabets = "abcdefghijklmnopqrstuvwxyz".repeat(3);
const reverseEngAlphabets = reverse("abcdefghijklmnopqrstuvwxyz").repeat(3);

const engAlIndexes = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

const revEngAlIndexes = {
  z: 0,
  y: 1,
  x: 2,
  w: 3,
  v: 4,
  u: 5,
  t: 6,
  s: 7,
  r: 8,
  q: 9,
  p: 10,
  o: 11,
  n: 12,
  m: 13,
  l: 14,
  k: 15,
  j: 16,
  i: 17,
  h: 18,
  g: 19,
  f: 20,
  e: 21,
  d: 22,
  c: 23,
  b: 24,
  a: 25,
};

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
  for (let i = 0; i < userContent.length; i++) {
    const char = userContent[i];
    //if user wants to skip forward
    if (skip >= 0) {
      //finding the char index on the list
      const charIndex = engAlIndexes[char.toLowerCase()];
      if (charIndex >= 0) {
        //if the user word is uppercase, keeping the letter casing
        if (char === char.toUpperCase()) {
          //if user wants to skip forward
          substitutedContent = `${substitutedContent}${engAlphabets[
            charIndex + skip
          ].toUpperCase()}`;
        }
        //if the user word is lowercase
        else {
          substitutedContent = `${substitutedContent}${
            engAlphabets[charIndex + skip]
          }`;
        }
      }
      //if the char doesn't exists in the alphabet list
      else {
        substitutedContent = `${substitutedContent}${char}`;
      }
    }
    //if user wants to skip backward
    else if (skip >= -25) {
      //finding the char index on the list
      const charIndex = revEngAlIndexes[char.toLowerCase()];
      if (charIndex >= 0) {
        //if the user word is uppercase, keeping the letter casing
        if (char === char.toUpperCase()) {
          //if user wants to skip forward
          substitutedContent = `${substitutedContent}${reverseEngAlphabets[
            charIndex + Math.abs(skip)
          ].toUpperCase()}`;
        }
        //if the user word is lowercased
        else {
          substitutedContent = `${substitutedContent}${
            reverseEngAlphabets[charIndex + Math.abs(skip)]
          }`;
        }
      }
      //if the char doesn't exists in the alphabet list
      else {
        substitutedContent = `${substitutedContent}${char}`;
      }
    }
  }

  return substitutedContent;
};

export default substituteContent;
