export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="loader flex flex-col items-center">
        <div className="loader-inner animate-spin w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        <div className="loader-text mt-4 text-lg font-semibold text-gray-700 animate-pulse">
          Checking...
        </div>
      </div>
    </div>
  );
}
