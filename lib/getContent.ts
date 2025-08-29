export async function getContent(slug: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/content/${slug}`
  );
  if (!res.ok) {
    // Optionally log or handle error
    return null;
  }
  return res.json();
}
