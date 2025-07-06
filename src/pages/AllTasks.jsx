import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, fetchData, editUser } from '../features/thunk';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { CiCalendarDate, CiTimer } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const AllTasks = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTodo(id));
    }
  };

  const handleEdit = (todo) => {
    setEditData({ ...todo.val, id: todo.id });
  };

  const handleUpdate = () => {
    const { id, ...val } = editData;
    dispatch(editUser({ id, val }));
    setEditData(null);
  };

  return (
    <div className="row p-4">
      <h4 className="fw-bold mb-4">📋 All Tasks</h4>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {todos?.length === 0 && !loading ? (
        <p className="text-muted">No tasks found.</p>
      ) : (
        todos
          .filter((todo) => todo?.val)
          .map((todo) => (
            <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
              <Card
                className="shadow-sm h-100 border-0"
                style={{
                  borderRadius: '1rem',
                  backgroundColor:
                    todo.val.status === 'completed' ? '#e6fff4' : '#fffbea',
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2">
                      📝 {todo.val.title}
                    </h5>
                    <p
                      className="text-secondary mb-3"
                      style={{ fontSize: '0.95rem' }}
                    >
                      {todo.val.description || 'No description provided.'}
                    </p>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span className="badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
                        <CiCalendarDate size={20} />
                        {todo.val.dueDate || 'N/A'}
                      </span>
                      <span className="badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
                        <CiTimer size={20} />
                        {todo.val.dueTime || 'N/A'}
                      </span>
                      <span
                        className={`badge px-3 py-2 rounded-pill shadow-sm d-flex align-items-center ${
                          todo.val.status === 'completed'
                            ? 'bg-success text-white'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {todo.val.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => handleEdit(todo)}
                    >
                      <FaEdit size={18} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <MdDelete size={20} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
      )}

      {/* Edit Modal */}
      <Modal show={!!editData} onHide={() => setEditData(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={editData?.title || ''}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editData?.description || ''}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={editData?.dueDate || ''}
                onChange={(e) =>
                  setEditData({ ...editData, dueDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Time</Form.Label>
              <Form.Control
                type="time"
                value={editData?.dueTime || ''}
                onChange={(e) =>
                  setEditData({ ...editData, dueTime: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editData?.status || 'pending'}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditData(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllTasks;
