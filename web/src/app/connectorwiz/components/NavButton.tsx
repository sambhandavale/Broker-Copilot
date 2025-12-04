export const NavButton = ({ active, onClick, icon, title, subtitle, connected }) => (
  <button 
    onClick={onClick}
    className={`w-full gap-2 flex items-center justify-between p-4 rounded-xl transition-all duration-200 border ${
      active 
        ? 'bg-gray-50 border-gray-200 shadow-sm' 
        : 'bg-white border-transparent hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-white shadow-sm text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
        {icon}
      </div>
      <div className="text-left">
        <p className={`font-semibold text-sm ${active ? 'text-gray-900' : 'text-gray-600'}`}>{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
    
    <div className="flex items-center">
      {connected ? (
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
          LINKED
        </span>
      ) : (
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
        }`}>
          {active ? 'Select' : 'Connect'}
        </div>
      )}
    </div>
  </button>
);