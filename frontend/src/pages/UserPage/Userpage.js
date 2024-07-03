import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import ContactList from '../../components/ContactList';

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.user);
  const [selectedContact, setSelectedContact] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    navigate('/create-user', { state: { contact } });
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-teal-100 ">
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactList
          contacts={users}
          onEditContact={handleEditContact}
          onDeleteContact={handleDeleteContact}
          isAdmin={userInfo?.role === "Admin"} 
        />
      )}
    </div>
  );
};

export default UserPage;
