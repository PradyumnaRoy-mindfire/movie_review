const ErrorMessage = ({ message }) => {
  return (
    <div className="text-center text-red-500 mt-6">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
