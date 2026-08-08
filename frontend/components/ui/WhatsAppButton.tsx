import { toWhatsAppDigits } from '@/lib/phone';

interface WhatsAppButtonProps {
  numero: string;
}

export default function WhatsAppButton({ numero }: WhatsAppButtonProps) {
  const digits = toWhatsAppDigits(numero);
  const message = encodeURIComponent('Bonjour INTERFORMCI, je souhaite avoir des informations.');

  return (
    <a
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.652 4.527 1.785 6.393L4 29l7.79-1.748A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.988 16.988c-.293.828-1.452 1.518-2.386 1.717-.634.135-1.462.243-4.25-.913-3.566-1.477-5.86-5.09-6.038-5.327-.17-.238-1.44-1.918-1.44-3.658s.9-2.594 1.222-2.951c.293-.325.643-.407.858-.407.216 0 .43.002.618.012.198.01.464-.075.727.554.293.703.997 2.432 1.084 2.61.087.18.144.39.028.628-.115.238-.173.386-.34.594-.17.208-.357.464-.51.622-.17.176-.347.367-.15.72.198.352.878 1.45 1.885 2.348 1.295 1.155 2.386 1.513 2.738 1.68.352.17.556.145.76-.088.203-.234.868-1.012 1.1-1.36.234-.35.468-.29.79-.176.323.115 2.05.968 2.402 1.144.352.176.586.264.674.41.087.148.087.85-.204 1.678Z" />
      </svg>
    </a>
  );
}
