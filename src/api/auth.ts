const API_URL = 'https://localhost:7163/api';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Invalid username or password');
  }

  return res.json();
}
