export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.339-.292-2.611-.835-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5zm-1.636-4.677a1.125 1.125 0 111.59.002l.002.002a2.625 2.625 0 003.703-3.301 1.125 1.125 0 111.955-1.13 4.875 4.875 0 01-6.879 6.133l-.002-.002a1.125 1.125 0 01-1.59-.002l-.002-.002L8.72 13.8a2.625 2.625 0 00-3.703 3.301 1.125 1.125 0 11-1.955 1.13 4.875 4.875 0 016.879-6.133l.002.002z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-bold text-lg text-slate-900">PolicyAI</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Support</a>
        </div>
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} PolicyAI Inc.
        </div>
      </div>
    </footer>
  );
};