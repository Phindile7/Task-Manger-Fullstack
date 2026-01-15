import axios from 'axios';

const API_URL = 'https://localhost:7163'; 

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/api/Products`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axios.post(`${API_URL}/api/Products`, task, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/api/Products/${task.id}`, task, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${API_URL}/api/Products/${taskId}`, {
    headers: getAuthHeader(),
  });
};
