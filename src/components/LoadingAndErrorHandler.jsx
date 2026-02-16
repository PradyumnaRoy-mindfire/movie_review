import LoadingEffect from './animations/LoadingEffect';

const LoadingAndErrorHandler = ({ isLoading, isError, error }) => {
  if (isLoading) {
    return <LoadingEffect />;
  }

  if (isError) {
    return <div className="text-3xl text-red-400">Error: {error.message}</div>;
  }
};

export default LoadingAndErrorHandler;
