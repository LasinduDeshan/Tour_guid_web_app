import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-neutral-100 bg-white text-neutral-950 shadow-sm ${className || ""}`}
      {...props}
    />
  );
}
