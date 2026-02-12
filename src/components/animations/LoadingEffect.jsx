import { memo } from 'react';
import { ThreeDot } from 'react-loading-indicators';

const LoadingEffect = memo(function LoadingEffect() {
  const loadingEffect = (
    <ThreeDot
      color="black"
      size="large"
      text="Please wait..."
      textColor=""
      className=""
    />
  );
  return (
    <div className="fixed top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-50 flex justify-center items-center">
      {loadingEffect}
    </div>
  );
});

export default LoadingEffect;
