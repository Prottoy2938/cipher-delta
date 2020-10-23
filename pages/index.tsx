import React, { useState } from "react";
import HandleInput from "../src/components/handle-input/handle-input";
import HandleOutput from "../src/components/handle-output/handle-output";
import styles from "../src/styles/index.module.css";
import Head from "next/head";

const Home: React.FC = () => {
  const [userContent, setUserContent] = useState("");
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <HandleInput setUserContent={setUserContent} />
        <HandleOutput userContent={userContent} />
      </div>
    </>
  );
};

export default Home;
