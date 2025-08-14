export async function refreshAccess() {
  const result = await fetch("http://127.0.0.1:8000/refresh", {
    method: "GET",
    credentials: "include",
  });

  return JSON.parse(await result.text());
}
