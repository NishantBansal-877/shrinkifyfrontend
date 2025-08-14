export async function refreshAccess() {
  const result = await fetch("https://shrinkifybackend.netlifly.app/refresh", {
    method: "GET",
    credentials: "include",
  });

  return JSON.parse(await result.text());
}
