import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import Header from "../components/header";
import Stake from "../components/stake";
import WithDraw from "../components/withDraw";
import { useAccount, useContractWrite,useContractRead } from "wagmi";
import MyTokenAbi from "../abi/MyToken.json";
import StakingAbi from "../abi/Staking.json";
import StakingTokenAbi from "../abi/StakingToken.json";

const contractAddress = "0x1EA3096253b4B4D72C3F3b7155bfcEA489e6d0a4";
enum Tab {
  Stake = 0,
  WithDraw = 1,
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(Tab.Stake);

  const handleTabChange = (value: number) => {
    setActiveTab(value);
  };

  return (
    <>
      <Header value={activeTab} onTabChange={handleTabChange} />
      <main className="min-h-screen relative overflow-hidden">
        {/* 科技感背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* 动态网格背景 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        {/* 浮动光点效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        </div>
        
        {/* 主要内容区域 */}
        <div className="relative  flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-2xl">
            {/* 玻璃态卡片 */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
              {/* 卡片发光边框 */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"></div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
              
              {/* 内容 */}
              <div className="relative ">
                {activeTab === Tab.Stake ? (
                  <Stake />
                ) : (
                  <WithDraw />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}