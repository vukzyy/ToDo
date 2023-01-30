import React, {useState} from 'react';

import bem from "easy-bem";

import './style.scss'
import {Link} from "react-router-dom";

const Main = ({todoItems, setTodoItems, setUser}) => {

    const [edit, setEdit] = useState(-1);
    const [inputValue, setInputValue] = useState('')

    const cn = bem('main')


    const formHandler = (e) => {
        e.preventDefault()

        const inputValue = e.target.children[0].value;

        if (!inputValue.length) return;

        const todo = {
            description: inputValue,
            isDone: false,
        }

        setTodoItems([...todoItems, todo])

        e.target.children[0].value = '';

        setEdit(-1)
    }


    const deleteHandler = (todo) => {
        const filteredTodos = todoItems.filter(item => item !== todo)

        setTodoItems([...filteredTodos])
    }


    const doneHandler = (todo) => {
        const item = {...todo,isDone: true};

        const filteredTodos = todoItems.filter(item => item !== todo)

        setTodoItems([...filteredTodos, item])

    }


    const countComplete = () => {
        let count = 0;
        todoItems.filter(item => item.isDone ? count++ : count)
        return count
    }


    const countPending = () => {
        let count = 0;
        todoItems.filter(item => item.isDone ? count : count++)
        return count
    }


    const editHandler = (todo) => {
        setEdit(todoItems.indexOf(todo))
        setInputValue(todo.description)
    }

    const editInputValue = (event) => {
        setInputValue(event.target.value)
    }

    const saveHandler = (todo) => {
        const item = {
            ...todo,
            description: inputValue,
        }

        const filteredTodos = todoItems.filter(elem => elem !== todo)

        setTodoItems([...filteredTodos, item])

        setEdit(-1)
    }

    const logOut = () => {
        setUser('')
        window.location.reload()
    }

    return (
        <div className={cn()}>
            <form className={cn('inputBox')} onSubmit={(e) => formHandler(e)}>
                <input type="text" className={cn('input')}/>
                <button className={cn('add')} type='submit'>Add</button>
            </form>

            <div className={cn('container')}>
                <h3 className={cn('title')}>Todo's</h3>
                <h4 className={cn('subtitle')}>{todoItems.length} Total, {countComplete()} Complete and {countPending()} Pending</h4>
                <div className={cn('todosBox')}>
                    {
                        todoItems.map((item, index) => (
                            <div className={cn('todo')} key={'todo' + index}>
                                {
                                    edit === index ?
                                        <input type="text"
                                               value={inputValue}
                                               onChange={(e) => editInputValue(e)}
                                               className={cn('todo-input')}/>
                                        :
                                        <p className={cn(`todo-des ${item.isDone ? 'active' : ''}`)}>
                                            {item.description}
                                        </p>
                                }

                                <div className={cn('buttonBox')}>
                                    <button
                                        className={cn('buttonBox-delete')}
                                        onClick={() => deleteHandler(item)}>
                                        Delete
                                    </button>
                                    {
                                        edit === index ?
                                            <button className={cn('buttonBox-edit')}
                                                    onClick={() => saveHandler(item)}>
                                                Save
                                            </button>
                                            :
                                            <button className={cn('buttonBox-edit')}
                                                    onClick={() => editHandler(item)}>
                                                Edit
                                            </button>
                                    }
                                    <button
                                        className={cn('buttonBox-done')}
                                        onClick={() => doneHandler(item)}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
            <button
            onClick={() => setTodoItems([])}
            className={cn('clear')}>
            Clear All
        </button>
            <button className={cn('Log')} onClick={() => logOut()}>Logout</button>
        </div>
    );
};

export default Main;