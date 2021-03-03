import axios from 'axios';

export async function getAllTodos() {
  try {
    const res = await axios.get('/api/todo');

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return [];
  }
}

export async function createTodo(text = '') {
  try {
    const res = await axios.post('/api/todo', { text });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
}

export async function updateTodoText(id, text = '') {
  try {
    const res = await axios.put(`/api/todo/text/${id}`, { text });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
}

export async function toggleTodoComplete(id) {
  try {
    const res = await axios.put(`/api/todo/complete/${id}`);

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
}

export async function setDueDate(id, dueDate = null) {
  try {
    const res = await axios.put(`/api/todo/due/${id}`, { dueDate });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
}

export async function deleteTodo(id) {
  try {
    await axios.delete(`/api/todo/${id}`);

    return true;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
}
