export async function parseJsonBody(
  req: AsyncIterable<unknown>,
): Promise<unknown> {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  return JSON.parse(body);
}
