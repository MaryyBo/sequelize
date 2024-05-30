import React, { useState, useEffect } from 'react'; // використовуємо сніпет rfc 
import { getUsers } from '../../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, SetError] = useState(null);
    const [page, setPage] = useState(1);

    const loadUsers = (pageNumber) => {
        getUsers(pageNumber)
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                SetError(error)
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    useEffect(() => {
        loadUsers(page)// запускаємо loadUsers 1й аргумнент
    }, [page]);
// Пустий масив залежностей це ComponentDidMount 


    return (
        <div>

        </div>
    );
}

export default UserList;
