import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAccount, useDisconnect } from 'wagmi';
import { useState, useRef, useEffect } from 'react';

const tabs = [
  {
    label: 'Stake',
    value: 0,
  },
  {
    label: 'Withdraw',
    value: 1,
  },
]

interface HeaderProps {
  value: number;
  onTabChange: (value: number) => void;
}

function Header({ value, onTabChange }: HeaderProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showDisconnect, setShowDisconnect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDisconnect(false);
  };

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDisconnect(false);
      }
    };

    if (showDisconnect) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDisconnect]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  return (
    <header className="bg-blue-900/80 backdrop-blur-sm shadow-lg relative z-50">  
    <div className="flex justify-between items-center px-8 py-4">
      <div className="flex items-center">
        <h3 className="text-2xl font-bold text-white">Eth Staking</h3>
      </div>
      <Tabs 
        value={value} 
        onChange={handleChange}
        sx={{
          '& .MuiTab-root': {
            color: 'white',
            '&.Mui-selected': {
              color: '#60A5FA', // blue-400
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#60A5FA', // blue-400
          }
        }}
      >
          {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} />
        ))}
        </Tabs>
      <div className="flex items-center relative" ref={dropdownRef}>
          <div className="flex items-center space-x-3">
            {/* 显示连接状态和地址 */}
            {/* <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">
                {formatAddress(address!)}
              </span>
            </div> */}
            <ConnectButton />
         {
            isConnected && (
            <>
            <button
              onClick={() => setShowDisconnect(!showDisconnect)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              断开连接
            </button>
            </>
          )
         }
            
            {/* 确认断开弹窗 - 修复层级问题 */}
            {showDisconnect && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-[9999] min-w-[200px] transform translate-y-1">
                <div className="text-gray-800 font-medium mb-3">确认断开连接？</div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDisconnect}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    确认
                  </button>
                  <button
                    onClick={() => setShowDisconnect(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
    </header>
  );
}

export default Header;