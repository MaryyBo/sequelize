import React, { useState, useEffect } from 'react'; // використовуємо сніпет rfc 
import { getUsers } from '../../api';
import UserCard from './UserCard';

const UserList = () => {
    const [users, setUsers] = useState([]); //  запит на юзерів, десь треба зберігати, в цьому стейті
    const [isLoading, setIsLoading] = useState(true); // крутилка, поки ми щось намагаємось запустити
    const [error, setError] = useState(null); // якщо щось хотіли загрузити але не змогли
    const [page, setPage] = useState(1); // контролювати номер сторінки, чи ми зараз на 1 чи на 5 чи на 29 сторінці, ця інфа зберігається тут, по замовчуванню запрос робиться на 1шу сторінку

    const loadUsers = (pageNumber) => {
        getUsers(pageNumber)
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    const renderUsers = () => {
        return users.map((user) => <UserCard user={user} key={user.id} />)
    }

    console.log(renderUsers());

    const prevBtnHandler = () => {
        if (page > 1) {
            setPage (page - 1);
        }
    }

    const nextBtnHandler = () => {
        if (page > 1) {
            setPage (page + 1);
        }
    }


    useEffect(() => {
        loadUsers(page)// запускаємо loadUsers 1й аргумнент
    }, [page]);
    // Пустий масив залежностей це буде працювати як ---> ComponentDidMount 


    return (
        <div>
            <h1>User List</h1>
            {isLoading && <h2 className='loading'>...loading</h2>}
            <section className='card-container'>
                { users.length > 0 && isLoading === false ? renderUsers() : <h2 className='error'>Users not found</h2>}
                {error && <h2>{error.message}</h2>}
            </section>

            <div>
                <button onClick={prevBtnHandler} disabled={page === 1}>Prev page</button>
                <button onClick={nextBtnHandler}>Next page</button>
            </div>
        </div>
    );
}

export default UserList;




