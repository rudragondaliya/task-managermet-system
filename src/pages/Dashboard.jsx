import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/thunk';
import DataTable from 'react-data-table-component';
import { Badge } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.val?.status === 'completed').length;
  const pendingCount = todos.filter((t) => t.val?.status === 'pending').length;

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.val.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.val.description || '—',
      wrap: true,
    },
    {
      name: 'Due Date',
      selector: (row) => row.val.dueDate || '—',
      sortable: true,
    },
    {
      name: 'Due Time',
      selector: (row) => row.val.dueTime || '—',
    },
    {
      name: 'Status',
      selector: (row) => row.val.status,
      cell: (row) => (
        <Badge bg={row.val.status === 'completed' ? 'success' : 'warning'} className="text-capitalize">
          {row.val.status}
        </Badge>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="">
      <h2 className="fw-bold mb-4">Task Dashboard</h2>
   
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#f0f0f0' }}>
            <h5 className="fw-semibold text-dark mb-2">Total Tasks</h5>
            <h2 className="fw-bold">{totalCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#d4edda' }}>
            <h5 className="fw-semibold text-dark mb-2">Completed Tasks</h5>
            <h2 className="fw-bold text-success">{completedCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#fff3cd' }}>
            <h5 className="fw-semibold text-dark mb-2">Pending Tasks</h5>
            <h2 className="fw-bold text-warning">{pendingCount}</h2>
          </div>
        </div>
      </div>

  
      <div className="card p-3 shadow-sm bg-white rounded">
        <h3>Recent Activity</h3>
        <DataTable
          columns={columns}
          data={todos?.filter((t) => t?.val) || []}
          pagination
          progressPending={loading}
          highlightOnHover
          striped
          responsive
          defaultSortFieldId={1}
        />
      </div>
    </div>
  );
};

export default Dashboard;
