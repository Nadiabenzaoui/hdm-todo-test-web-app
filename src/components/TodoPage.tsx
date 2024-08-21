/* @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, Icon, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async () => {
   // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
   if (newTaskName.trim() !== '') {
    try {
      const newTask: Task = {
        id: 0, // Set id to 0 for new tasks
        name: newTaskName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: false,
      };

      await api.post('/tasks', newTask);
      setNewTaskName('');
      await handleFetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
  };
  const handleEdit = async (task: Task) => {
    try {
      const updatedTask: Task = {
        ...task,
        name: task.name,
        updatedAt: new Date().toISOString(),
      };

      await api.patch(`/tasks/${task.id}`, updatedTask);
      await handleFetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const handleComplete = async (task: Task) => {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };

    //
    setTasks((prevTasks) =>
    prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
  );
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []); 

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <Typography 
            value={task.name} 
            >
              {task.name}
            </Typography>
 
            <IconButton
              style={{ color: task.completed ? 'green' : 'gray' }} 
              onClick={() => handleComplete(task)}
            >
              <Check />
            </IconButton>

       
            <IconButton color="error" onClick={() => handleDelete(task.id)}>
              <Delete />
            </IconButton>
            <IconButton color="error" onClick={() => handleEdit(task)}>

            <Button variant="outlined">Edit</Button>
            </IconButton>

          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            label="Nouvelle tâche"
            variant="outlined"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            size="small"
            sx={{ maxWidth: 350 }}
          />
        </Box>
  
        

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={newTaskName.trim() === ''}
          >
            Add Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;