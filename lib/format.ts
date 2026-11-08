const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Formatted manually in UTC so server and client output always match during hydration.
export function formatDate(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function yearOf(iso: string | null): string {
  return iso ? String(new Date(iso).getUTCFullYear()) : 'Undated';
}
