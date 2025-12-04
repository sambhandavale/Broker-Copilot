export const Logo = () =>{
    return(
        <a className="flex items-center gap-2 relative z-10 w-fit" href="/">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                <img src="/logo.svg" alt="" className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">BrokerFlow</span>
        </a>
    )
}