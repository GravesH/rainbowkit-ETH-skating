import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAccount } from 'wagmi'

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
  const { address } = useAccount();
console.log(address,'address');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };
  
  return (
    <header className="bg-blue-900/80 backdrop-blur-sm shadow-lg">  
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
      <div className="flex items-center">
        <ConnectButton />
      </div>
    </div>
    </header>
  );
}

export default Header;