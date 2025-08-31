import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { http } from "wagmi";
// RainbowKit 的 getDefaultConfig 帮你完成了 createConfig 的工作
export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "34aa39eadfae6c3aadbe3a7ec910d861",
  //默认网络节点
  chains: [mainnet, polygon, optimism, arbitrum, base, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [polygon.id]: http(`https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [optimism.id]: http(`https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [arbitrum.id]: http(`https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [base.id]: http(`https://base-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    // 🚀 重点：强制指定 Sepolia 的 Infura 节点
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
  },
  ssr: true,
});
