import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";

// RainbowKit 的 getDefaultConfig 帮你完成了 createConfig 的工作
export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "34aa39eadfae6c3aadbe3a7ec910d861",
  //默认网络节点
  chains: [mainnet, polygon, optimism, arbitrum, base, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])],
  ssr: true,
});
