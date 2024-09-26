export function handlePubDate(date: string): string {
  return date.split(" ")[0];
}

export function handleReadTime(content: string): Number {
  return Number((content.length / 1800).toFixed());
}

export function formatSlug(title: string): string {
  let slug = title.replace(/[^a-zA-Z-\s]/g, "");
  slug = slug.charAt(0) === " " ? slug.slice(1) : slug;
  slug = slug.replace(/\s+/g, "-");
  slug = slug.toLocaleLowerCase();
  return `${slug}`;
}
