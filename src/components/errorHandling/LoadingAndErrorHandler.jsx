import LoadingEffect from '../animations/LoadingEffect';
import ErrorMessage from './ErrorMessage';

const LoadingAndErrorHandler = ({ isLoading, isError, error }) => {
  if (isLoading) {
    return <LoadingEffect />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }
};

export default LoadingAndErrorHandler;
