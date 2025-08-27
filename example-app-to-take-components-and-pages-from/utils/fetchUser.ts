"use server";
export async function fetchUser(uid: string) {
  try {
    const base = process.env.NEXT_PUBLIC_URL || "";
    const url = `${base ? base : ""}/api/users/${uid}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const err = await response.json().catch(() => ({} as any));
      return { error: err?.error || `HTTP ${response.status}` } as any;
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to fetch user data" } as any;
  }
}
