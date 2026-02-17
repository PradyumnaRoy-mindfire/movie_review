function logError(error, type) {
  const errorDetails = {
    time: new Date().toLocaleString(),
    message: error.message,
    type: type || 'GENERAL',
  };

  console.error('Error:', errorDetails);
}

function logApiError(error, endpoint) {
  console.error('API Error at ' + endpoint + ' ', error.message);
}

export { logError, logApiError };
