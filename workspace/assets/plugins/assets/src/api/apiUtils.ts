export async function fetchAPIAuth(
  baseURL: string,
  token: string,
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const url = `${baseURL}${endpoint}`;
  const base64Auth = Buffer.from(`${token}:`).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64Auth}`,
  };

  const response: Response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      `Error: ${response.status} ${
        response.statusText
      }, Details: ${JSON.stringify(errorDetails)}`,
    );
  }
  return response.json();
}

export async function fetchAPI(
  baseURL: string,
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const url = `${baseURL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    const errorDetails = await response.json();

    throw new Error(
      `Error: ${response.status} ${
        response.statusText
      }, Details: ${JSON.stringify(errorDetails)}`,
    );
  }
  return response.json();
}

export async function formatTime(ms: number): Promise<string> {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
  const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export async function formatTimeString(dateString: string): Promise<string> {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Madrid',
  };

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate;
}
export function prueba(str: string): string {
  return str.toLowerCase();
}

export const mapDataTypeToColumnType = (dataType: string) => {
  switch (dataType) {
    case 'int':
    case 'bigint':
    case 'smallint':
    case 'tinyint':
    case 'numeric':
    case 'decimal':
    case 'float':
    case 'real':
      return 'numeric';
    case 'date':
    case 'datetime':
    case 'datetime2':
    case 'smalldatetime':
    case 'timestamp':
      return 'datetime';
    default:
      return 'string';
  }
};

export const mapDataTypeToColumnTypeCI = (dataType: string) => {
  switch (dataType) {
    case 'int':
    case 'bigint':
    case 'smallint':
    case 'tinyint':
    case 'numeric':
    case 'decimal':
    case 'float':
    case 'real':
    case 'NUMBER':
    case 'OBJECTID':
      return 'string';
    case 'date':
    case 'datetime':
    case 'datetime2':
    case 'smalldatetime':
    case 'timestamp':
      return 'datetime';
    default:
      return 'string';
  }
};
