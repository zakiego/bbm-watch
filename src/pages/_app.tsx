import { type AppType } from "next/app";

import { api } from "../utils/api";
import { ChakraProvider } from "@chakra-ui/react";

import "~/src/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
