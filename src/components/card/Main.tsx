import { CardProps } from "./types";

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={`border border-border bg-card shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
