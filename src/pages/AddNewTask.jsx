import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/thunk';

const AddTask = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      status,
      description,
      dueDate,
      dueTime,
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(createTodo(newTask)).unwrap(); // dispatch Redux thunk
      setSuccess(true);

      setTitle('');
      setStatus('pending');
      setDescription('');
      setDueDate('');
      setDueTime('');
    } catch (err) {
      alert('Error adding task: ' + err);
    }
  };

  return (
    <div>
      <h4 className="mb-3 fw-bold">➕ Add New Task</h4>
      <form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
        {success && <div className="alert alert-success">Task added successfully!</div>}

        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Time</label>
            <input
              type="time"
              className="form-control"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
