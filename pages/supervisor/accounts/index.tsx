import Accounts from "@/src/components/Admin/Accounts";
import { Container, Text } from "@nextui-org/react";
import Head from "next/head";

export default function $Accounts() {
  return (
    <>
      <Head>
        <title>E-Portfolio</title>
        <meta name="description" content="Generated by E-Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container css={{ maxW: "1350px" }}>
        <Accounts />
      </Container>
    </>
  );
}