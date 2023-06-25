import { Navbar, Text, Image } from "@nextui-org/react";

import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import globalStyles from "../styles/globalStyles";

import UserLayout from "@/src/components/layouts/UserLayout";
import AdminLayout from "@/src/components/layouts/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const router = useRouter();

  return (
    <>
      <Navbar variant={"sticky"} id="nav" css={{ zIndex: "$10" }}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Logo
          </Text>
        </Navbar.Brand>
        {router.asPath.startsWith("/supervisor") ? (
          <AdminLayout />
        ) : (
          <UserLayout />
        )}
      </Navbar>
      <Image
        id="bgi"
        css={{
          position: "fixed",
          zIndex: "-1",
        }}
        src="/gradient-right-dark.svg"
      />
      <Component {...pageProps} />
    </>
  );
}
