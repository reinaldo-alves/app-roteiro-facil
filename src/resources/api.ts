const headers = (token: string | null): HeadersInit => {
  const defaultHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  if (token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }
  return defaultHeaders;
};

export const apiGet = async (route: string, token: string | null) =>
  await fetch(`/server/${route}`, {
    method: "GET",
    headers: headers(token),
  });

export const apiPost = async (
  route: string,
  body: unknown,
  token: string | null
) =>
  await fetch(`/server/${route}`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(body),
  });

export const apiPut = async (
  route: string,
  body: unknown,
  token: string | null
) =>
  await fetch(`/server/${route}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(body),
  });

export const apiDelete = async (route: string, token: string | null) =>
  await fetch(`/server/${route}`, {
    method: "DELETE",
    headers: headers(token),
  });
