import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
  });

  return (
    <div>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={() => mutation.mutate({ title, description })}>
        Add Task
      </button>
    </div>
  );
}
