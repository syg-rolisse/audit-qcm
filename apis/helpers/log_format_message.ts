export function logFormatMessage(request: any, message: string): string {
  const logObject = {
    message,
    ip: request.ip(),
    userAgent: request.header('user-agent'),
    method: request.method(),
    url: request.url(),
    source: request.header('referer') || request.header('host') || 'Source inconnue', // Source de la requête
  }

  return JSON.stringify(logObject)
}
