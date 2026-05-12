import React from "react";
import { AppProps } from "next/app";
import "../styles/main.css";
import { poppins, roboto } from "@styles/fonts";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable} ${roboto.variable} font-roboto`}>
      <Component {...pageProps} />
    </main>
  );
}

export default CustomApp;
