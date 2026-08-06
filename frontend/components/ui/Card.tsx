import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
      {children}
    </div>
  );
}
