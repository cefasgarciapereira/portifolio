export function handlePubDate(date: string): string {
  return date.split(" ")[0]
}

export function handleReadTime(content: string): Number {
  return Number((content.length / 1800).toFixed())
}