import { useState } from 'react';

function WithDraw() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('提取成功！');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-3">
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            提取 ETH
          </h1>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
        <p className="text-gray-300 text-lg">提取您已质押的 ETH 和累积奖励</p>
      </div>
      
      {/* 余额信息 */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-400">2.5000</div>
            <div className="text-sm text-gray-300">已质押 (ETH)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">0.1250</div>
            <div className="text-sm text-gray-300">累计奖励 (ETH)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">2.6250</div>
            <div className="text-sm text-gray-300">可提取总额 (ETH)</div>
          </div>
        </div>
      </div>
      
      {/* 提取表单 */}
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            提取数量 (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                MAX
              </button>
            </div>
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setWithdrawAmount('0.1250')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            提取奖励
          </button>
          <button 
            onClick={() => setWithdrawAmount('2.6250')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            全部提取
          </button>
        </div>
        
        {/* 确认提取按钮 */}
        <button 
          onClick={handleWithdraw}
          disabled={!withdrawAmount || isLoading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              处理中...
            </div>
          ) : (
            <>
              确认提取
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default WithDraw;