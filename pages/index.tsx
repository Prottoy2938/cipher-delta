import React, { useState, useEffect } from "react";
import HandleInput from "../src/components/encoding/handle-input/handle-input";
import HandleOutput from "../src/components/encoding/handle-output/handle-output";
import Head from "next/head";
import { Box, Heading, Button, useColorMode } from "@chakra-ui/core";
import Drawer from "../src/components/drawer/drawer";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import EncryptionKey from "../src/components/encoding/encryption-key/encryption-key";
import { Grid, GridItem } from "@chakra-ui/core";

const Home: React.FC = () => {
  const [userContent, setUserContent] = useState("");
  const [encKey, setEncKey] = useState({ key: "", enabled: false });
  const [skip, setSkip] = useState(1);
  const { colorMode, setColorMode } = useColorMode();

  //due to this issue: https://github.com/chakra-ui/chakra-ui/issues/2106
  //answer from here: https://github.com/chakra-ui/chakra-ui/pull/2114
  //default theme is dark
  useEffect(() => {
    if (!colorMode) {
      if (window.localStorage) {
        const savedTheme = window.localStorage.getItem("chakra-ui-color-mode");
        if (savedTheme == "light" || savedTheme == "dark") {
          setColorMode(savedTheme);
        } else {
          setColorMode("light");
        }
      } else {
        setColorMode("light");
      }
    }
  }, [colorMode, setColorMode]);

  return (
    <>
      <Head>
        <title>Encoding - Cipher Delta</title>
        <link rel="shortcut icon" href="/favicon.svg" />

        <meta property="og:title" content="Encoding - Cipher Delta" />
        <meta
          name="description"
          content="A web application that helps encode and decode plain content"
        />
        <meta
          property="og:description"
          content="A web application that helps encode and decode plain content"
        />
        <meta
          property="og:image"
          content="https://cipher-delta.edrini.xyz/logo-img-1200.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <a href="/decoding" target="_blank" rel="noopener noreferrer">
        <Button
          rightIcon={<ExternalLinkIcon />}
          colorScheme="gray"
          variant="link"
          pos="absolute"
          ml={[1, 1, 2, 3]}
          bottom={["5px", "5px", "5px", "auto"]}
          right={["5px", "5px", "5px", "auto"]}
          mb={[3, 3, 3, 0]}
        >
          Decoding
        </Button>
      </a>
      <Drawer />

      <Box textAlign="center" margin="0 auto">
        <Heading mt={2} mb={16}>
          Encoding
        </Heading>
        <Grid templateColumns="repeat(15, 1fr)" gap={2} p={3}>
          <GridItem colSpan={[15, 15, 15, 5]}>
            <HandleInput
              setUserContent={setUserContent}
              userContent={userContent}
            />
          </GridItem>
          <GridItem colSpan={[15, 15, 15, 6]}>
            <EncryptionKey
              setEncKey={setEncKey}
              encKey={encKey}
              skip={skip}
              setSkip={setSkip}
            />
          </GridItem>
          <GridItem colSpan={[15, 15, 15, 4]}>
            <HandleOutput
              encKey={encKey}
              userContent={userContent}
              skip={skip}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
