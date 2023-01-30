import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";

import Auth from "../Auth";
import Main from "../Main";
import Users from "../Users";

import './style.scss'

const App = () => {

    const [user, setUser] = useState('')
    const [todoItems, setTodoItems] = useState([]);
    const [allUsers,setAllUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (user.length){
            const data = JSON.parse(localStorage.getItem('todo'))
            const userData = data.filter((item) => item.name === user)


            if (userData.length){
                setTodoItems(userData[0].todos)
            }

            navigate('/')
        }
        else{navigate('/auth')}
    },[user])

    useEffect( () => {
        const latestStorage = JSON.parse(localStorage.getItem('todo')) || []

        let checkUser = [];

        if (latestStorage.length) {
            checkUser = latestStorage.filter((item) => item.name !== user)
        }
        const users = [...checkUser, {
            name:user,
            todos:todoItems,
        }]

        const namesInfo = users
            .filter(item => item.name.length)
        setAllUsers(namesInfo)

            localStorage.setItem('todo', JSON.stringify(users))
    }, [todoItems])

    return (
        <div className='container'>
            <Routes>
                <Route
                    path={'/auth'}
                    element={<Auth
                            setUser={setUser}
                            />}
                />
                <Route
                    path={'/'}
                    element={<Main
                            todoItems={todoItems}
                            setTodoItems= {setTodoItems}
                            setUser={setUser}
                        />}
                />
                <Route
                    path={'/users'}
                    element={<Users
                            allUsers={allUsers}/>}
                />
            </Routes>
        </div>
    );
};

export default App;