import React from "react";
import "../global.styles.css";
import { ChakraProvider } from "@chakra-ui/core";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />{" "}
      </ChakraProvider>{" "}
    </>
  );
}
