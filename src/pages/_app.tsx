import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
//存储请求数据什么的
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 提供链上数据
import { WagmiProvider } from "wagmi";
// 提供钱包连接
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// 配置
import { config } from "../wagmi";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
