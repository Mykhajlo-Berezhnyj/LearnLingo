export function updateQueryParams(
  params: Record<string, string | null | undefined>
) {
  const current = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined) current.delete(k);
    else current.set(k, v);
  });

  const newQuery = current.toString();
  const newUrl =
    newQuery.length > 0 ? `?${newQuery}` : window.location.pathname;
  window.history.replaceState({}, "", newUrl);
}
