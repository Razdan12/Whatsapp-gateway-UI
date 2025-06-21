export const Message = ({
    isError,
    message,
  }: {
    isError?: boolean;
    message?: string;
  }) => {
    if (!isError) return null;
    return (
      <div className="label">
        <span className="label-text-alt text-red-600">{message}</span>
      </div>
    );
  };