import React from "react";
import "../global.styles.css";
import { ChakraProvider } from "@chakra-ui/core";
import customTheme from "../theme";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />{" "}
      </ChakraProvider>{" "}
    </>
  );
}
