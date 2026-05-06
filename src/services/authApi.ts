const AUTH_URL = 'https://taskdone-node.onrender.com/api/login';

let token: string | null = null;

class AuthApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthApiError';
  }
}

export function getToken(): string | null {
  return token;
}

export function setToken(newToken: string | null): void {
  token = newToken;
  if (newToken) {
    localStorage.setItem('task_token', newToken);
  } else {
    localStorage.removeItem('task_token');
  }
}

export function loadToken(): string | null {
  token = localStorage.getItem('task_token');
  return token;
}

export function getAuthHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export const authApi = {
  async login(username: string, password: string): Promise<string> {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AuthApiError(
        errorData.message || `Error HTTP: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json() as { token: string } | { accessToken: string };
    const newToken = 'token' in data ? data.token : 'accessToken' in data ? data.accessToken : null;

    if (!newToken) {
      throw new AuthApiError('Respuesta de login inválida: no se encontró token');
    }

    setToken(newToken);
    return newToken;
  },

  logout(): void {
    setToken(null);
  },
};
