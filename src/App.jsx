import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', status: 'Incomplete' },
    { id: 2, text: 'Finish React project', status: 'In Progress' },
    { id: 3, text: 'Read a book', status: 'Completed' }
  ]);
  const [input, setInput] = useState('');
  const [inputStatus, setInputStatus] = useState('Incomplete');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [showAuth, setShowAuth] = useState(true); // Show login/register by default
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [authForm, setAuthForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [authError, setAuthError] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, status: inputStatus }
    ]);
    setInput('');
    setInputStatus('Incomplete');
  };

  const startEdit = (id, text, status) => {
    setEditId(id);
    setEditInput(text);
    setEditStatus(status);
  };

  const saveEdit = (id) => {
    if (editInput.trim() === '') return;
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editInput, status: editStatus } : task
    ));
    setEditId(null);
    setEditInput('');
    setEditStatus('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditInput('');
    setEditStatus('');
  };

  // const toggleTask = (id) => {
  //   setTasks(tasks.map(task =>
  //     task.id === id ? { ...task, status: task.status === 'Completed' ? 'Incomplete' : 'Completed' } : task
  //   ));
  // };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Dummy auth handler (no backend)
  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!authForm.username || !authForm.password) {
      setAuthError('Please enter username and password.');
      return;
    }
    setShowAuth(false);
    setAuthError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!authForm.username || !authForm.password || !authForm.confirmPassword) {
      setAuthError('Please fill all fields.');
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setShowAuth(false);
    setAuthError('');
  };

  return (
    <div className="app-container">
      {showAuth ? (
        <div className="auth-container">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={authForm.username}
              onChange={handleAuthChange}
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={authForm.password}
              onChange={handleAuthChange}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={authForm.confirmPassword}
                onChange={handleAuthChange}
                autoComplete="new-password"
              />
            )}
            {authError && <div className="auth-error">{authError}</div>}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <div className="auth-toggle">
            {isLogin ? (
              <span>Don't have an account? <button onClick={() => { setIsLogin(false); setAuthError(''); }}>Register</button></span>
            ) : (
              <span>Already have an account? <button onClick={() => { setIsLogin(true); setAuthError(''); }}>Login</button></span>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1>Task Management App</h1>
          <h3 className="add-task-heading">Add New Task</h3>
          <form onSubmit={addTask} className="task-form">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Task Name"
            />
            <select
              className="edit-status-select"
              value={inputStatus}
              onChange={e => setInputStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button type="submit">Add Task</button>
          </form>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={task.status === 'Completed' ? 'completed' : ''}>
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={e => setEditInput(e.target.value)}
                      className="edit-input"
                    />
                    <select
                      className="edit-status-select"
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                    <button className="save-btn" onClick={() => saveEdit(task.id)}>Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span className="task-text">{task.text}</span>
                    <span className={`status-label status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                    <div className="btn-group">
                      <button className="edit-btn" onClick={() => startEdit(task.id, task.text, task.status)}>Update</button>
                      <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
