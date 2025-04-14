export function formatDate(timestamp: any): string {
  if (!timestamp?.seconds) return 'N/A'

  const date = new Date(timestamp.seconds * 1000)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  return date.toLocaleDateString('en-US', options)
}
