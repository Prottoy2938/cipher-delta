import React, { useState } from "react";
import HandleInput from "../src/components/decoding/handle-input/handle-input";
import HandleOutput from "../src/components/decoding/handle-output/handle-output";
import Head from "next/head";
import { Box, Heading, Button } from "@chakra-ui/core";
import Drawer from "../src/components/drawer/drawer";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import DecryptionKey from "../src/components/decoding/decryption-key/decryption-key";
import { Grid, GridItem } from "@chakra-ui/core";

const Decoding: React.FC = () => {
  const [userContent, setUserContent] = useState("");
  const [encKey, setEncKey] = useState({ key: "", enabled: false });
  const [skip, setSkip] = useState(0);
  return (
    <>
      <Head>
        <title>Decoding - Cipher Delta</title>
        <link rel="shortcut icon" href="/favicon.svg" />

        <meta property="og:title" content="Decoding - Cipher Delta" />
        <meta name="description" content="Decode cipher text content" />
        <meta property="og:description" content="Decode cipher text content" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:image"
          content="https://cipher-delta.edrini.xyz/logo-img-1200.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <a href="/" target="_blank" rel="noopener noreferrer">
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
          Encoding
        </Button>
      </a>
      <Box>
        <Drawer />
        <Heading mt={2} mb={16} textAlign="center">
          Decoding
        </Heading>

        <Grid templateColumns="repeat(15, 1fr)" gap={2} p={3}>
          <GridItem colSpan={[15, 15, 15, 5]}>
            <HandleInput
              setUserContent={setUserContent}
              userContent={userContent}
            />
          </GridItem>
          <GridItem colSpan={[15, 15, 15, 6]}>
            <DecryptionKey
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

export default Decoding;
