import React, { useState } from "react";
import HandleInput from "../src/components/encoding/handle-input/handle-input";
import HandleOutput from "../src/components/encoding/handle-output/handle-output";
import Head from "next/head";
import { Row, Col } from "react-grid-system";
import { Box, Heading, Button } from "@chakra-ui/core";
import Drawer from "../src/components/drawer/drawer";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Home: React.FC = () => {
  const [userContent, setUserContent] = useState("");
  const [encKey, setEncKey] = useState({ key: "", enabled: false });
  const [skip, setSkip] = useState(1);
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <a href="/decoding">
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="gray"
          variant="link"
          pos="absolute"
          ml={[1, 1, 2, 3]}
        >
          Decoding
        </Button>
      </a>
      <Drawer />

      <Box textAlign="center" margin="0 auto">
        <Heading mt={2} mb={16}>
          Encoding
        </Heading>
        <Row style={{ margin: 0 }}>
          <Col xs={12} sm={12} md={12} lg={7} xl={7}>
            <HandleInput
              setUserContent={setUserContent}
              skip={skip}
              setSkip={setSkip}
              userContent={userContent}
              setEncKey={setEncKey}
              encKey={encKey}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5}>
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

export default Home;
