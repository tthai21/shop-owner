import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import Layout from "@/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
