import React, { useState } from "react";
import HandleInput from "../src/components/handle-input/handle-input";
import HandleOutput from "../src/components/handle-output/handle-output";
import Head from "next/head";
import { Row, Col } from "react-grid-system";
import { Box, Heading } from "@chakra-ui/core";

const Home: React.FC = () => {
  const [userContent, setUserContent] = useState("hello world");
  const [skip, setSkip] = useState(5);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box textAlign="center" margin="0 auto">
        <Heading mt={2} mb={16}>
          Substitution Cipher
        </Heading>
        <Row style={{ margin: 0 }}>
          <Col xs={12} sm={12} md={12} lg={7} xl={7}>
            <HandleInput
              setUserContent={setUserContent}
              skip={skip}
              setSkip={setSkip}
              userContent={userContent}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5}>
            <HandleOutput userContent={userContent} skip={skip} />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default Home;
