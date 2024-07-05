import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
// import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import MenubarDemo from "@/components/Menubar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {asPath } = router;
  const noNav = ["/","/login","/session-expired","/signup"]
  return (
    <Theme>
     {noNav.includes(asPath) ? null : <MenubarDemo />}
        <Component {...pageProps} />
    
    </Theme>
  );
}
