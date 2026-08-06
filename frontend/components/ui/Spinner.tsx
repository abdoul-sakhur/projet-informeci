interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = 'h-6 w-6' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Chargement en cours"
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    />
  );
}
