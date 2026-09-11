interface ResponseLike {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(data?: string): void;
}

export function sendJson(
  res: ResponseLike,
  statusCode: number,
  data: unknown,
): void {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(data));
}

export function sendError(
  res: ResponseLike,
  statusCode: number,
  message: string,
): void {
  sendJson(res, statusCode, {
    error: message,
  });
}

export function sendNoContent(res: ResponseLike): void {
  res.statusCode = 204;
  res.end();
}
