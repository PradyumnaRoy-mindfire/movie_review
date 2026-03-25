function logError(error, type) {
  const message = error instanceof Error ? error.message : error;

  const logMessage = `Error: ${message} | Time: ${new Date().toLocaleTimeString()} | Type: ${type || 'GENERAL'}`;

  console.error(logMessage);
}

function logApiError(error, endpoint) {
  const message = error?.message || String(error);
  console.error('API Error at ' + endpoint + ' ', message);
}

export { logError, logApiError };
