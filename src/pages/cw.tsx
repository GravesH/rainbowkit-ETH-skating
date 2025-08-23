import { ConnectButton } from "@rainbow-me/rainbowkit";
import {useAccount,useBalance,useChainId} from 'wagmi'
function ConnectWallet() {
  //// 获取当前连接的账户信息
  const { address,isConnected,connector } = useAccount();
  /// 获取指定地址的余额（这里以ETH为例）
  const { data: balance,isError: isBalanceError ,isLoading: isBalanceLoading } = useBalance({ address });
  const chainId = useChainId();
  console.log(address,'address');
  console.log(balance,'balance');
  console.log(chainId,'chainId');
  console.log(isConnected,'isConnected');
  console.log(connector,'connector');
  return (
    <div>
      <h1>Connect Wallet</h1>
      <ConnectButton />
      <div>
        <p>地址：{address}</p>
        <p>余额：{balance?.value}</p>
        <p>链ID：{chainId}</p>
        <p>是否连接：{isConnected ? '是' : '否'}</p>
        <p>连接器：{connector?.name}</p> 
      </div>
    </div>
  );
}

export default ConnectWallet;