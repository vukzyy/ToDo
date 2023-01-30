import React from 'react';
import bem from "easy-bem";

import './style.scss'
import {Link} from "react-router-dom";

const Users = ({allUsers}) => {

    const cn = bem('user')
    return (
        <div className={cn()}>
            <Link to={'/auth'} className={''}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.40991 10.58L2.82991 6L7.40991 1.41L5.99991 0L-8.7738e-05 6L5.99991 12L7.40991 10.58Z" fill="#787878"/>
                </svg>
                Назад
            </Link>
            <h3 className={cn('title')}>Список пользователей</h3>
            <div className={cn('box')}>
                {
                    allUsers.map((item) => (
                        <div className={cn('item')}>
                            <h3 className={cn('item-title')}>{item.name}</h3>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default Users;