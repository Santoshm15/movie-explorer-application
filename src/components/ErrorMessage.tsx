interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <h3>Something went wrong</h3>

      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
