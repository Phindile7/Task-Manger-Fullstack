import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, deleteTask, updateTask } from '../api/tasks';
import type { Task } from '../api/tasks';

export const TaskList = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: (task: Task) =>
      updateTask({ ...task, completed: !task.completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div>
      {tasks?.map((task) => (
        <div key={task.id} style={{ marginBottom: '10px' }}>
          <h3>
            {task.title} {task.completed ? '✅' : '❌'}
          </h3>
          <p>{task.description}</p>
          <button onClick={() => toggleCompleteMutation.mutate(task)}>
            Toggle Complete
          </button>
          <button onClick={() => deleteMutation.mutate(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
