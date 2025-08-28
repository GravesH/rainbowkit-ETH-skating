import { useState, useEffect } from "react";
import MyTokenAbi from "../abi/MyToken.json";
import StakingAbi from "../abi/Staking.json";
import StakingTokenAbi from "../abi/StakingToken.json";
import { injected } from "wagmi/connectors";
import { formatUnits, parseUnits } from "viem";
import { ethers } from "ethers";
import {
  useWriteContract,
  useReadContract,
  useConnect,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
const contractAddress = "0xeee6b302D3F831DAA541e61ba1fDd87146fAbae1";
// 支持的代币列表
const SUPPORTED_TOKENS = [
  {
    id: "eth",
    name: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    decimals: 18,
    isNative: true, // ETH是原生币
  },
  {
    id: "usdt",
    name: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
    decimals: 6,
    isNative: false,
  },
];
function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<any>(undefined);
  const res = useWaitForTransactionReceipt({ hash: hash });
  const { writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  //选择代币
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0]);
  useEffect(() => {
    console.log(res);
    if (res.isSuccess) {
      setIsLoading(false);
    }
  }, [res]);

  const handleConnectWallet = () => {
    connect({ connector: injected() });
  };
  const handleStake = async () => {
    //质押前  肯定要先判断是否链接到了钱包
    if (!isConnected) {
      console.log("请先连接钱包");
      handleConnectWallet();
      return;
    }
    //链接后  需要进行金额的校验
    if (
      isNaN(Number(stakeAmount)) ||
      Number(stakeAmount) <= 0 ||
      !stakeAmount
    ) {
      alert("请输入有效的质押数量");
      return;
    }
    setIsLoading(true);

    try {
      //金额精度处理
      const amountInWei = parseUnits(stakeAmount, selectedToken.decimals);
      console.log("质押金额（wei）:", amountInWei);

      const tsHash = await writeContract({
        address: contractAddress,
        abi: StakingAbi,
        functionName: "stake",
        args: [amountInWei],
      });
      setHash(tsHash);
    } catch (e) {
      console.error("发送交易失败:", e);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-3">
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ETH 质押
          </h1>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
        </div>
        <p className="text-gray-300 text-lg">将您的 ETH 质押到去中心化网络中</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">4.5%</div>
          <div className="text-sm text-gray-300">年化收益率</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">$2.1B</div>
          <div className="text-sm text-gray-300">总质押量</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">24h</div>
          <div className="text-sm text-gray-300">解锁时间</div>
        </div>
      </div>

      {/* 质押表单 */}
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            质押数量 (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                MAX
              </button>
            </div>
          </div>
        </div>

        {/* 收益预估 */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">预计年收益</span>
            <span className="font-semibold text-green-400">
              {stakeAmount
                ? (parseFloat(stakeAmount) * 0.045).toFixed(4)
                : "0.0000"}{" "}
              ETH
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">日收益</span>
            <span className="text-green-300">
              {stakeAmount
                ? ((parseFloat(stakeAmount) * 0.045) / 365).toFixed(6)
                : "0.000000"}{" "}
              ETH
            </span>
          </div>
        </div>

        {/* 质押按钮 */}
        <button
          onClick={handleStake}
          disabled={!stakeAmount || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              处理中...
            </div>
          ) : (
            <>
              确认质押
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </>
          )}
        </button>
      </div>

      {/* 风险提示 */}
      <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-400 text-lg">⚠️</div>
          <div className="text-sm text-gray-300">
            <div className="font-medium text-yellow-400 mb-1">风险提示</div>
            <div>
              质押存在市场风险，请谨慎投资。质押期间资金将被锁定，无法随时提取。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
