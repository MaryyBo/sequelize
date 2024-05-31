import React, { useState, useEffect } from 'react'; // використовуємо сніпет rfc 
import { getUsers } from '../../api';
import UserCard from './UserCard';
import UserCardModal from './UserCardModel';
import AddUserFormModal from './AddUserFormModel';
import './style.css'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Модалка перегляду інфи конкретного користувача
    const [isModalAddOpen, setIsModalAddOpen] = useState(false); // Модалка додавання коритсувача
  
    const loadUsers = (pageNumber) => {
      getUsers(pageNumber)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  
    const renderUsers = () => {
      return users.map((user) => <UserCard 
        user={user} 
        key={user.id} 
        onClick={() => {
          setSelectedUser(user);
          setIsModalOpen(true);
        }}
      />);
    }
  
    const prevBtnHandler = () => {
      if(page > 1) {
        setPage(page - 1);
      }
    }
  
    const nextBtnHandler = () => {
      setPage(page + 1);
    }
  
    useEffect(() => {
      loadUsers(page)
    }, [page]);
    // Пустий масив залежностей - componentDidMount
  
    return (
      <div>
        <h1>User List</h1>
        <button onClick={() => setIsModalAddOpen(true)}>Add user</button>
  
        {isLoading && <h2 className='loading'>Loading....</h2>}
        <section className='card-container'>
          {users.length > 0 ? renderUsers() : <h2 className='error'>Users not found</h2>}
        </section>
  
        <div>
          <button onClick={prevBtnHandler} disabled={page === 1}>Previous page</button>
          <button onClick={nextBtnHandler} disabled={users.length < 5}>Next page</button>
        </div>
  
        {/* Модальні вікна */}
        <UserCardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedUser={selectedUser}
        />
        <AddUserFormModal
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
        />
      </div>
    );
  }
  
  export default UserList;