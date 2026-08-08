export function toE164(numero: string): string {
  return `+${numero.replace(/\D/g, '')}`;
}

export function toWhatsAppDigits(numero: string): string {
  return numero.replace(/\D/g, '');
}
