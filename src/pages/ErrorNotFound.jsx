import { Home, ArrowLeft } from 'lucide-react';

const ErrorNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-8xl font-bold text-red-500 tracking-wider animate-bounce [animation-duration:3s]">
        404
      </h1>
      <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
      <div>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <Home className="inline mr-1" /> Home
        </button>

        <button
          onClick={() => window.history.back()}
          className="mt-6 ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          <ArrowLeft className="inline mr-1" /> Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorNotFound;
