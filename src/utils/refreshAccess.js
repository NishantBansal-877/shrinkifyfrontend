export  function refreshAccess() {
  const result = await fetch("https://shrinkifybackend.vercel.app/refresh", {
    method: "GET",
    credentials: "include",
  });

  return JSON.parse(await result.text());
}
