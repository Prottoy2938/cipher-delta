import React, { useState } from "react";
import HandleInput from "../src/components/decoding/handle-input/handle-input";
import HandleOutput from "../src/components/decoding/handle-output/handle-output";
import Head from "next/head";
import { Row, Col } from "react-grid-system";
import { Box, Heading, Button } from "@chakra-ui/core";
import Drawer from "../src/components/drawer/drawer";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DecryptionKey from "../src/components/decoding/decryption-key/decryption-key";

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
        <meta name="description" content="Decode cipher content" />
        <meta property="og:description" content="Decode cipher content" />

        <meta
          property="og:image"
          content="https://cipher-delta.edrini.xyz/logo-img-1200.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box mb="120px">
        <a href="/">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="gray"
            variant="link"
            pos="absolute"
            ml={[1, 1, 2, 3]}
          >
            Encoding
          </Button>
        </a>
        <Drawer />

        <Heading mt={2} mb={16} textAlign="center">
          Decoding
        </Heading>
        <Row className="grid-row">
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <HandleInput
              setUserContent={setUserContent}
              userContent={userContent}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5}>
            <DecryptionKey
              setEncKey={setEncKey}
              encKey={encKey}
              skip={skip}
              setSkip={setSkip}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={3} xl={3}>
            <HandleOutput
              encKey={encKey}
              userContent={userContent}
              skip={skip}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default Decoding;
