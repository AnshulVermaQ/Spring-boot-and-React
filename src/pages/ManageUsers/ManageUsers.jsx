import React, { useEffect, useState } from 'react';
import './ManageUser.css';
import UserForm from '../../components/UserForm/UserForm';
import { fetchUsers } from '../../Services/UserService';
import UserList from '../../components/UserList/UserList';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
  }, []);

  return (
    <div className='users-container text-light'>
      <div className='left-column'>
        <UserForm setUsers={setUsers} />
      </div>

      <div className='right-column'>
        <UserList users={users} loading={loading} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
